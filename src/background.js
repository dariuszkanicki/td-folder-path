browser.customColumns.add("locationPathColumn", "Location (@)", "location_path");

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.command === "getPrefix") {
        // Retrieve the prefix from storage
        const result = await browser.storage.local.get('prefix');
        const prefix = result.prefix || '@';  // Use '@' as default if no prefix is saved
        sendResponse({ prefix: prefix });
    }
    return true;  // Keep the messaging channel open for async response
});