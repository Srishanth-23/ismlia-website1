/**
 * ISMLIA 2026 Registration Google Apps Script
 * Spreadsheet ID: 12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI
 * Main Drive Folder ID: 1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var SPREADSHEET_ID = "12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI";
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

    // Auto-create header row if sheet is empty
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
        "Abstract PDF URL"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#d4af37").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);

    // Target Main Google Drive Folder ID provided by user
    var MAIN_FOLDER_ID = "1Ofo88bXVJ7b4mbmCivjT2wFAYnsGqWeB";
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

    // Create a dedicated subfolder for this participant: e.g. ISMLIA-436625_John_Doe
    var safeFName = (data.fname || "").trim().replace(/\s+/g, "_");
    var safeLName = (data.lname || "").trim().replace(/\s+/g, "_");
    var participantFolderName = (data.regId || "ISMLIA-USER") + "_" + safeFName + "_" + safeLName;

    var participantFolder = mainFolder.createFolder(participantFolderName);
    try {
      participantFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (sharingErr) {}

    var screenshotUrl = "N/A";
    var pdfUrl = "N/A";

    // Save payment screenshot inside participant's subfolder
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

    // Save abstract PDF inside participant's subfolder if provided
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

    var fullName = ((data.fname || "") + " " + (data.lname || "")).trim();

    // Append attendee registration details to sheet
    sheet.appendRow([
      new Date(),
      data.regId || "",
      fullName,
      data.email || "",
      data.org || "",
      data.designation || "",
      data.pass || "",
      data.poster || "",
      data.txid || "",
      participantFolder.getUrl(),
      screenshotUrl,
      pdfUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        regId: data.regId, 
        folderUrl: participantFolder.getUrl() 
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

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "running", message: "ISMLIA 2026 Google Apps Script is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}
