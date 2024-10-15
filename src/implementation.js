var ThreadPaneColumns;
try
{
  ({ ThreadPaneColumns } = ChromeUtils.importESModule("chrome://messenger/content/thread-pane-columns.mjs"));
}
catch (err)
{
  ({ ThreadPaneColumns } = ChromeUtils.importESModule("chrome://messenger/content/ThreadPaneColumns.mjs"));
}

const ids = [];


var customColumns = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    context.callOnClose(this);
    return {
      customColumns: {
        async add(id, name, field) {
          ids.push(id);

          const callbacks = {

            location_path: function (message) {
              if (message.folder) {
                return message.folder.URI.replace(/^.*INBOX/, '') || "INBOX";
                // return folderPath || "INBOX";  // Return "INBOX" if nothing follows "INBOX/"
              }
              return 'Unknown Location';
            }, 

          }

          ThreadPaneColumns.addCustomColumn(id, {
            name: name,
            hidden: false,
            icon: false,
            resizable: true,
            sortable: true,
            textCallback: callbacks[field],
          });
        },

        async remove(id) {
          ThreadPaneColumns.removeCustomColumn(id);
          ids.remove(id);
        }
      },
    };
  }

  close() {
    for (const id of ids) {
      ThreadPaneColumns.removeCustomColumn(id);
    }
  }
};
