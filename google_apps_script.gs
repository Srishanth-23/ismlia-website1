/**
 * ISMLIA 2026 Registration Google Apps Script
 *
 * Spreadsheet ID: 12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI
 * Main Drive Folder ID: 1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // =========================================================
    // CONFIGURATION
    // =========================================================
    var SPREADSHEET_ID = "12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI";
    var MAIN_FOLDER_ID = "1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB";

    // =========================================================
    // OPEN SPREADSHEET
    // =========================================================
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

    // =========================================================
    // CREATE HEADER IF SHEET IS EMPTY (14 Columns)
    // =========================================================
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Registration ID",
        "Full Name",
        "Email",
        "Institution / Company",
        "Designation",
        "Pass Category",
        "Poster Session",
        "Transaction ID / UTR",
        "Participant Drive Folder URL",
        "Payment Screenshot URL",
        "Abstract PDF URL",
        "Email Sent",
        "Email Error"
      ]);
      sheet
        .getRange(1, 1, 1, 14)
        .setFontWeight("bold")
        .setBackground("#d4af37")
        .setFontColor("#ffffff");
    }

    // =========================================================
    // READ FORM DATA
    // =========================================================
    var data = JSON.parse(e.postData.contents);
    var fullName = ((data.fname || "") + " " + (data.lname || "")).trim();
    var participantEmail = (data.email || "").trim();

    // =========================================================
    // OPEN MAIN DRIVE FOLDER
    // =========================================================
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

    // =========================================================
    // CREATE PARTICIPANT SUBFOLDER
    // =========================================================
    var safeFName = (data.fname || "").trim().replace(/\s+/g, "_");
    var safeLName = (data.lname || "").trim().replace(/\s+/g, "_");
    var participantFolderName = (data.regId || "ISMLIA-USER") + "_" + safeFName + "_" + safeLName;
    var participantFolder = mainFolder.createFolder(participantFolderName);

    // Set folder sharing permissions
    try {
      participantFolder.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );
    } catch (sharingErr) {
      console.log("Folder sharing notice: " + sharingErr.toString());
    }

    // =========================================================
    // DEFAULT FILE URLS
    // =========================================================
    var screenshotUrl = "N/A";
    var pdfUrl = "N/A";

    // =========================================================
    // PAYMENT SCREENSHOT
    // =========================================================
    if (data.screenshotBase64) {
      try {
        var decodedScreenshot = Utilities.base64Decode(data.screenshotBase64);
        var mimeType = data.screenshotMime || "image/jpeg";
        var fileName = (data.regId || "Receipt") + "_Screenshot_" + (data.screenshotName || "screenshot.jpg");
        var screenshotBlob = Utilities.newBlob(decodedScreenshot, mimeType, fileName);
        var screenshotFile = participantFolder.createFile(screenshotBlob);
        try {
          screenshotFile.setSharing(
            DriveApp.Access.ANYONE_WITH_LINK,
            DriveApp.Permission.VIEW
          );
        } catch (sErr) {}
        screenshotUrl = screenshotFile.getUrl();
      } catch (imgErr) {
        screenshotUrl = "Upload error: " + imgErr.toString();
      }
    }

    // =========================================================
    // ABSTRACT PDF
    // =========================================================
    if (data.pdfBase64) {
      try {
        var decodedPdf = Utilities.base64Decode(data.pdfBase64);
        var pdfFileName = (data.regId || "Abstract") + "_Abstract_" + (data.pdfName || "abstract.pdf");
        var pdfBlob = Utilities.newBlob(decodedPdf, "application/pdf", pdfFileName);
        var pdfFile = participantFolder.createFile(pdfBlob);
        try {
          pdfFile.setSharing(
            DriveApp.Access.ANYONE_WITH_LINK,
            DriveApp.Permission.VIEW
          );
        } catch (pErr) {}
        pdfUrl = pdfFile.getUrl();
      } catch (pdfErr) {
        pdfUrl = "Upload error: " + pdfErr.toString();
      }
    }

    // =========================================================
    // APPEND REGISTRATION ROW
    // =========================================================
    var registrationRow = sheet.getLastRow() + 1;
    sheet.appendRow([
      new Date(),
      data.regId || "",
      fullName,
      participantEmail,
      data.org || "",
      data.designation || "",
      data.pass || "",
      data.poster || "",
      data.txid || "",
      participantFolder.getUrl(),
      screenshotUrl,
      pdfUrl,
      "NO",
      ""
    ]);

    // =========================================================
    // SEND CONFIRMATION EMAIL IMMEDIATELY
    // =========================================================
    var emailSent = false;
    var emailError = "";

    if (participantEmail) {
      try {
        sendRegistrationEmail(
          participantEmail,
          fullName,
          data.regId || "",
          data.pass || "",
          participantFolder.getUrl()
        );
        emailSent = true;
        // Column 13 (M): Email Sent
        sheet.getRange(registrationRow, 13).setValue("YES");
        // Column 14 (N): Email Error
        sheet.getRange(registrationRow, 14).setValue("");
      } catch (mailErr) {
        emailSent = false;
        emailError = mailErr.toString();
        sheet.getRange(registrationRow, 13).setValue("NO");
        sheet.getRange(registrationRow, 14).setValue(emailError);
      }
    } else {
      emailError = "Participant email address is missing.";
      sheet.getRange(registrationRow, 13).setValue("NO");
      sheet.getRange(registrationRow, 14).setValue(emailError);
    }

    // =========================================================
    // RETURN SUCCESS RESPONSE
    // =========================================================
    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "success",
          regId: data.regId,
          folderUrl: participantFolder.getUrl(),
          emailSent: emailSent
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({ status: "error", message: error.toString() })
      )
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================
 * SEND REGISTRATION CONFIRMATION EMAIL
 * ============================================================
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
      "<p style='color:#666666;font-size:0.9em;margin:0;'>Regards,<br/><b>ISMLIA 2026 Organizing Team</b><br/>Chennai Institute of Technology</p>" +
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
    "ISMLIA 2026 Organizing Team\n" +
    "Chennai Institute of Technology";

  GmailApp.sendEmail(email, subject, plainBody, {
    htmlBody: htmlBody,
    name: "ISMLIA 2026 Secretariat"
  });
}

/**
 * ============================================================
 * TEST EMAIL AUTHORIZATION
 * ============================================================
 * Run this function manually once inside Apps Script to authorize Gmail permissions.
 */
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

/**
 * ============================================================
 * GET REQUEST STATUS CHECK
 * ============================================================
 */
function doGet(e) {
  return ContentService
    .createTextOutput(
      JSON.stringify({ status: "running", message: "ISMLIA 2026 Google Apps Script is active." })
    )
    .setMimeType(ContentService.MimeType.JSON);
}
