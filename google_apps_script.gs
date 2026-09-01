/**
 * ISMLIA 2026 Registration Google Apps Script
 * Spreadsheet ID: 12NOUMzXg0oAJxKIHEpwbXbLD-SmMxV61N5Zk5ktneaI
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait for up to 10 seconds for other processes to finish
  lock.tryLock(10000);

  try {
    // Open the spreadsheet by ID or active spreadsheet
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
        "Payment Screenshot URL",
        "Abstract PDF URL"
      ]);
      // Format header row
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#d4af37").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);

    // Folder for storing uploaded screenshots & PDFs
    var folderName = "ISMLIA 2026 Uploads";
    var folder;
    var folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }

    var screenshotUrl = "N/A";
    var pdfUrl = "N/A";

    // Save payment screenshot to Drive
    if (data.screenshotBase64) {
      try {
        var decodedScreenshot = Utilities.base64Decode(data.screenshotBase64);
        var mimeType = data.screenshotMime || "image/jpeg";
        var fileName = (data.regId || "Receipt") + "_Screenshot_" + (data.screenshotName || "screenshot.jpg");
        var screenshotBlob = Utilities.newBlob(decodedScreenshot, mimeType, fileName);
        var screenshotFile = folder.createFile(screenshotBlob);
        screenshotFile.setSharing(MimeType.OTHER, Access.ANYONE_WITH_LINK);
        screenshotUrl = screenshotFile.getUrl();
      } catch (imgErr) {
        screenshotUrl = "Upload error: " + imgErr.toString();
      }
    }

    // Save abstract PDF to Drive if provided
    if (data.pdfBase64) {
      try {
        var decodedPdf = Utilities.base64Decode(data.pdfBase64);
        var pdfFileName = (data.regId || "Abstract") + "_Abstract_" + (data.pdfName || "abstract.pdf");
        var pdfBlob = Utilities.newBlob(decodedPdf, "application/pdf", pdfFileName);
        var pdfFile = folder.createFile(pdfBlob);
        pdfFile.setSharing(MimeType.OTHER, Access.ANYONE_WITH_LINK);
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
      screenshotUrl,
      pdfUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", regId: data.regId, folderUrl: folder.getUrl() }))
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
