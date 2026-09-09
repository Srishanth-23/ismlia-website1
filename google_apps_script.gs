/**
 * ISMLIA 2026 Registration Google Apps Script (Time-Driven Trigger Architecture)
 * Spreadsheet ID: 12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI
 * Main Drive Folder ID: 1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB
 * Sender Email: gowri.r@citchennai.net
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var SPREADSHEET_ID = "12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI";
    var MAIN_FOLDER_ID = "1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB";

    var doc;
    try {
      doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (err) {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var sheet = doc.getSheetByName("Registrations");
    if (!sheet) {
      sheet = doc.getSheets()[0];
    }

    var data = JSON.parse(e.postData.contents);
    var fname = (data.fname || "").trim();
    var lname = (data.lname || "").trim();
    var fullName = (fname + " " + lname).trim();
    var participantEmail = (data.email || "").trim();

    // Default standard headers if sheet is empty
    var defaultHeaders = [
      "Registration ID",
      "Pass Category",
      "First Name",
      "Last Name",
      "Email",
      "Organization",
      "Designation",
      "Poster Session",
      "Transaction UTR",
      "Screenshot Drive",
      "Abstract PDF Link",
      "Timestamp",
      "Email Status",
      "Email Sent Time",
      "Email Error"
    ];

    // Auto-create header row if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(defaultHeaders);
      sheet.getRange(1, 1, 1, defaultHeaders.length).setFontWeight("bold").setBackground("#d4af37").setFontColor("#ffffff");
    }

    // Read actual header column names from Row 1
    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headerRowValues = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Target Main Google Drive Folder
    var mainFolder;
    try {
      mainFolder = DriveApp.getFolderById(MAIN_FOLDER_ID);
    } catch (fErr) {
      var folders = DriveApp.getFoldersByName("ISMLIA 2026 Uploads");
      if (folders.hasNext()) {
        mainFolder = folders.next();
      } else {
        mainFolder = DriveApp.createFolder("ISMLIA 2026 Uploads");
      }
    }

    // Create participant dedicated subfolder: e.g. ISMLIA-436625_John_Doe
    var safeFName = fname.replace(/\s+/g, "_");
    var safeLName = lname.replace(/\s+/g, "_");
    var participantFolderName = (data.regId || "ISMLIA-USER") + "_" + safeFName + "_" + safeLName;
    var participantFolder = mainFolder.createFolder(participantFolderName);

    try {
      participantFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (sharingErr) {}

    var screenshotUrl = "N/A";
    var pdfUrl = "N/A";

    // Save payment screenshot
    if (data.screenshotBase64) {
      try {
        var decodedScreenshot = Utilities.base64Decode(data.screenshotBase64);
        var mimeType = data.screenshotMime || "image/jpeg";
        var fileName = (data.regId || "Receipt") + "_Screenshot_" + (data.screenshotName || "screenshot.jpg");
        var screenshotBlob = Utilities.newBlob(decodedScreenshot, mimeType, fileName);
        var screenshotFile = participantFolder.createFile(screenshotBlob);
        try {
          screenshotFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (sErr) {}
        screenshotUrl = screenshotFile.getUrl();
      } catch (imgErr) {
        screenshotUrl = "Upload error: " + imgErr.toString();
      }
    }

    // Save abstract PDF if provided
    if (data.pdfBase64) {
      try {
        var decodedPdf = Utilities.base64Decode(data.pdfBase64);
        var pdfFileName = (data.regId || "Abstract") + "_Abstract_" + (data.pdfName || "abstract.pdf");
        var pdfBlob = Utilities.newBlob(decodedPdf, "application/pdf", pdfFileName);
        var pdfFile = participantFolder.createFile(pdfBlob);
        try {
          pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (pErr) {}
        pdfUrl = pdfFile.getUrl();
      } catch (pdfErr) {
        pdfUrl = "Upload error: " + pdfErr.toString();
      }
    }

    // Construct row array dynamically matching each column in Row 1
    var rowValues = new Array(headerRowValues.length).fill("");

    for (var col = 0; col < headerRowValues.length; col++) {
      var h = String(headerRowValues[col] || "").trim().toLowerCase();
      if (!h) continue;

      if (h.indexOf("time") !== -1 && (h.indexOf("sent") !== -1 || h.indexOf("email") !== -1)) {
        // Email Sent Time (blank initially until trigger sends email)
        rowValues[col] = "";
      } else if (h.indexOf("status") !== -1 && h.indexOf("email") !== -1) {
        // Email Status: Marked as PENDING for the 1-minute trigger to process
        rowValues[col] = "PENDING";
      } else if (h.indexOf("sent") !== -1 && h.indexOf("time") === -1 && h.indexOf("status") === -1) {
        rowValues[col] = "NO";
      } else if (h.indexOf("error") !== -1 && h.indexOf("email") !== -1) {
        rowValues[col] = "";
      } else if (h.indexOf("time") !== -1 || h.indexOf("date") !== -1) {
        rowValues[col] = new Date();
      } else if (h.indexOf("screen") !== -1 || h.indexOf("receipt") !== -1 || h.indexOf("payment proof") !== -1) {
        rowValues[col] = screenshotUrl;
      } else if (h.indexOf("abstract") !== -1 || (h.indexOf("pdf") !== -1 && h.indexOf("screen") === -1)) {
        rowValues[col] = pdfUrl;
      } else if (h.indexOf("folder") !== -1 || (h.indexOf("drive") !== -1 && h.indexOf("screen") === -1 && h.indexOf("pdf") === -1)) {
        rowValues[col] = participantFolder.getUrl();
      } else if (h.indexOf("trans") !== -1 || h.indexOf("tx") !== -1 || h.indexOf("utr") !== -1 || h.indexOf("utf") !== -1) {
        rowValues[col] = data.txid || "";
      } else if (h.indexOf("first") !== -1 || h === "fname") {
        rowValues[col] = fname;
      } else if (h.indexOf("last") !== -1 || h === "lname") {
        rowValues[col] = lname;
      } else if (h.indexOf("full") !== -1 || h === "name") {
        rowValues[col] = fullName;
      } else if (h.indexOf("email") !== -1 || h.indexOf("mail") !== -1) {
        rowValues[col] = participantEmail;
      } else if (h.indexOf("org") !== -1 || h.indexOf("college") !== -1 || h.indexOf("institution") !== -1 || h.indexOf("company") !== -1) {
        rowValues[col] = data.org || "";
      } else if (h.indexOf("desig") !== -1 || h.indexOf("dept") !== -1 || h.indexOf("department") !== -1) {
        rowValues[col] = data.designation || "";
      } else if (h.indexOf("pass") !== -1 || h.indexOf("category") !== -1) {
        rowValues[col] = data.pass || "";
      } else if (h.indexOf("poster") !== -1) {
        rowValues[col] = data.poster || "";
      } else if (h.indexOf("reg") !== -1 || h.indexOf("id") !== -1) {
        rowValues[col] = data.regId || "";
      }
    }

    // Append new registration row to sheet
    sheet.appendRow(rowValues);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        regId: data.regId,
        folderUrl: participantFolder.getUrl(),
        screenshotUrl: screenshotUrl,
        pdfUrl: pdfUrl,
        emailStatus: "PENDING"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Time-Driven Trigger Function (Runs every 1 minute automatically)
 * Scans the sheet for all rows with PENDING or FAILED and dispatches emails
 */
function processPendingEmails() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;

  try {
    var SPREADSHEET_ID = "12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI";
    var doc;
    try {
      doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var sheet = doc.getSheetByName("Registrations") || doc.getSheets()[0];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2) return;

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var statusCol = -1;
    var timeCol = -1;
    var errCol = -1;
    var emailCol = -1;
    var fnameCol = -1;
    var lnameCol = -1;
    var nameCol = -1;
    var regIdCol = -1;
    var passCol = -1;
    var folderCol = -1;

    for (var i = 0; i < headers.length; i++) {
      var h = String(headers[i]).toLowerCase();
      if (h.indexOf("status") !== -1 && h.indexOf("email") !== -1) statusCol = i + 1;
      if (h.indexOf("sent time") !== -1 || h.indexOf("sent at") !== -1 || h.indexOf("email time") !== -1) timeCol = i + 1;
      if (h.indexOf("error") !== -1 && h.indexOf("email") !== -1) errCol = i + 1;
      if (h.indexOf("first") !== -1) fnameCol = i + 1;
      if (h.indexOf("last") !== -1) lnameCol = i + 1;
      if (h.indexOf("full") !== -1 || (h.indexOf("name") !== -1 && fnameCol === -1 && lnameCol === -1)) nameCol = i + 1;
      if (h.indexOf("email") !== -1 && h.indexOf("status") === -1 && h.indexOf("error") === -1 && h.indexOf("time") === -1) emailCol = i + 1;
      if (h.indexOf("reg") !== -1 || h.indexOf("id") !== -1) regIdCol = i + 1;
      if (h.indexOf("pass") !== -1) passCol = i + 1;
      if (h.indexOf("folder") !== -1 || h.indexOf("drive") !== -1) folderCol = i + 1;
    }

    var data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    for (var r = 0; r < data.length; r++) {
      var rowNum = r + 2;
      var currentStatus = statusCol > 0 ? String(data[r][statusCol - 1]).toUpperCase().trim() : "";

      // If status is PENDING or blank, send the email!
      if (currentStatus === "PENDING" || currentStatus === "") {
        var email = emailCol > 0 ? String(data[r][emailCol - 1]).trim() : "";
        var name = "";
        if (fnameCol > 0 || lnameCol > 0) {
          var fn = fnameCol > 0 ? String(data[r][fnameCol - 1]).trim() : "";
          var ln = lnameCol > 0 ? String(data[r][lnameCol - 1]).trim() : "";
          name = (fn + " " + ln).trim();
        } else if (nameCol > 0) {
          name = String(data[r][nameCol - 1]).trim();
        }
        if (!name) name = "Participant";

        var regId = regIdCol > 0 ? String(data[r][regIdCol - 1]).trim() : "";
        var pass = passCol > 0 ? String(data[r][passCol - 1]).trim() : "Participant";
        var folderUrl = folderCol > 0 ? String(data[r][folderCol - 1]).trim() : "https://drive.google.com/";

        if (email && email.indexOf("@") !== -1) {
          try {
            sendRegistrationEmail(email, name, regId, pass, folderUrl);
            if (statusCol > 0) sheet.getRange(rowNum, statusCol).setValue("SENT");
            if (timeCol > 0) sheet.getRange(rowNum, timeCol).setValue(new Date());
            if (errCol > 0) sheet.getRange(rowNum, errCol).setValue("");
          } catch (err) {
            if (statusCol > 0) sheet.getRange(rowNum, statusCol).setValue("FAILED");
            if (errCol > 0) sheet.getRange(rowNum, errCol).setValue(err.toString());
          }
        }
      }
    }
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sends the official HTML registration confirmation email
 */
function sendRegistrationEmail(email, fullName, registrationId, passCategory, folderUrl) {
  var subject = "ISMLIA 2026 Registration Confirmed - " + registrationId;
  var htmlBody = 
    "<div style='font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;'>" +
      "<h2 style='color:#d4af37;margin-bottom:5px;'>ISMLIA 2026</h2>" +
      "<h3 style='color:#333333;margin-top:0;'>One Day International Symposium</h3>" +
      "<hr style='border:none;border-top:1px solid #eee;margin:15px 0;'/>" +
      "<p>Dear <b>" + fullName + "</b>,</p>" +
      "<p>Thank you for registering for <b>ISMLIA 2026</b> at Chennai Institute of Technology.</p>" +
      "<p>Your registration details have been recorded successfully:</p>" +
      "<div style='background:#f9f9f9;padding:15px 20px;border-left:4px solid #d4af37;border-radius:4px;margin:15px 0;'>" +
        "<p style='margin:5px 0;'><b>Registration ID:</b> <span style='font-family:monospace;color:#111;'>" + registrationId + "</span></p>" +
        "<p style='margin:5px 0;'><b>Pass Category:</b> " + passCategory + " Pass</p>" +
      "</div>" +
      "<p>Your submitted documents and payment verification proof are securely stored in your personal registration folder:</p>" +
      "<p style='text-align:center;margin:25px 0;'>" +
        "<a href='" + folderUrl + "' style='background:#d4af37;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;'>" +
          "View Registration Folder" +
        "</a>" +
      "</p>" +
      "<p>Please keep your Registration ID handy for check-in on the day of the symposium.</p>" +
      "<hr style='border:none;border-top:1px solid #eee;margin:20px 0;'/>" +
      "<p style='color:#666666;font-size:0.9em;margin:0;'>Regards,<br/><b>Dr. R. Gowri</b><br/>Co-Chair, ISMLIA 2026<br/>HOD, Department of AIML<br/>Chennai Institute of Technology</p>" +
    "</div>";

  var plainBody = 
    "Dear " + fullName + ",\n\n" +
    "Thank you for registering for ISMLIA 2026.\n\n" +
    "Registration ID: " + registrationId + "\n" +
    "Pass Category: " + passCategory + "\n\n" +
    "Your submitted documents and payment proof have been stored successfully.\n\n" +
    "Registration Folder:\n" + folderUrl + "\n\n" +
    "Please keep your Registration ID handy for future communication.\n\n" +
    "Regards,\n" +
    "Dr. R. Gowri\n" +
    "Co-Chair, ISMLIA 2026\n" +
    "HOD, Department of AIML\n" +
    "Chennai Institute of Technology";

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: "Dr. R. Gowri - ISMLIA 2026"
  });
}

/**
 * Setup the 1-minute time-driven trigger automatically
 * Run this function ONCE inside Apps Script!
 */
function setupMinuteTrigger() {
  // Delete existing triggers for processPendingEmails to avoid duplicates
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "processPendingEmails") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create a new 1-minute time-driven trigger
  ScriptApp.newTrigger("processPendingEmails")
    .timeBased()
    .everyMinutes(1)
    .create();

  Logger.log("✅ 1-minute trigger successfully activated!");
}

/**
 * Custom Menu in Google Sheets
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("📧 ISMLIA Registration")
    .addItem("Process All Pending Emails Now", "processPendingEmails")
    .addItem("Activate 1-Minute Auto Trigger", "setupMinuteTrigger")
    .addItem("Send Test Email (to Me)", "testEmail")
    .addToUi();
}

function testEmail() {
  var testEmail = Session.getActiveUser().getEmail();
  sendRegistrationEmail(
    testEmail,
    "Test Participant",
    "ISMLIA-TEST-001",
    "Student",
    "https://drive.google.com/"
  );
  Logger.log("Test confirmation email sent to: " + testEmail);
}

function doGet(e) {
  return ContentService
    .createTextOutput(
      JSON.stringify({ status: "running", message: "ISMLIA 2026 Google Apps Script is active." })
    )
    .setMimeType(ContentService.MimeType.JSON);
}
