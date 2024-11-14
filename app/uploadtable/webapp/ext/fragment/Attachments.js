sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    var Module = { 
        onBeforeUploadStarts: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            const oUploadSetTable = this.byId("table-uploadSet");
            var item = oEvent.getParameter("item")
			    Module._createEntity(item)
				.then((id) => {
					Module._uploadContent(item, id , oUploadSetTable);
				})
				.catch((err) => {
					console.log(err);
				})
        },
        onUploadCompleted: function(oEvent) {
            const oUploadSetTable = this.byId("table-uploadSet");
            oUploadSetTable.getItems("items")
            const oBinding = oUploadSetTable.getBinding("items");
            oBinding.refresh();

        },
        openPreview: function(oEvent) {
			const originalUrl = oEvent.getSource().getBindingContext().getProperty("url");
            const sFileUrl = Module.transformUrl(originalUrl);
            // if (sFileUrl) {
            //     // Open the URL in a new tab for preview, or alternatively in an iframe/dialog if needed
            //     window.open(sFileUrl, "_blank");
            // } else {
            //     console.error("File URL not found for preview.");
            // }

            if (sFileUrl) {
                fetch(sFileUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const fileURL = URL.createObjectURL(blob);
                        
                        // Create an iframe preview dialog with the Blob URL
                        var oDialog = new sap.m.Dialog({
                            title: "File Preview",
                            contentWidth: "80%",
                            contentHeight: "80%",
                            resizable: true,
                            draggable: true,
                            content: new sap.ui.core.HTML({
                                content: `<iframe src="${fileURL}" width="100%" height="100%" style="border: none;"></iframe>`
                            }),
                            endButton: new sap.m.Button({
                                text: "Close",
                                press: function() {
                                    oDialog.close();
                                    URL.revokeObjectURL(fileURL);  // Clean up the URL
                                }
                            })
                        });
        
                        // Open the dialog
                        oDialog.open();
                    })
                    .catch(error => {
                        console.error("Error fetching the file content:", error);
                    });
            } else {
                console.error("File URL not found for preview.");
            }


            


		},
        transformUrl: function(originalUrl) {
            // Extract the media ID from the original URL using regex
            const idMatch = originalUrl.match(/media\(([^)]+)\)/);
            
            if (idMatch && idMatch[1]) {
                const id = idMatch[1];  // Extracted ID
                // Construct the new URL format
                const newUrl = `/odata/v4/customer-master/media(${id})/content`;
                return newUrl;
            } else {
                console.error("ID not found in the URL");
                return null;
            }
        },   
         _createEntity: function (item) {
            var data = {
                MediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
            };

            var settings = {
                url: "/odata/v4/customer-master/media",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

        return new Promise((resolve, reject) => {
            $.ajax(settings)
                .done((results, textStatus, request) => {
                    resolve(results.ID);
                })
                .fail((err) => {
                    reject(err);
                })
        })				
    },

    _uploadContent: function (item, id , oUploadSetTable) {
        var url = `/odata/v4/customer-master/media(${id})/content`
        var file = item._oFileObject;

                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var fileContent = event.target.result;
                        console.log(fileContent);
                        fetch(url, {
                            method: 'PUT',
                            body: fileContent
                        })
                        .then(function(putResponse) {
                            if (!putResponse.ok) {
                                throw new Error("PUT request failed.");
                            }
                            MessageToast.show("File uploaded and data updated successfully.");
                            

                        })
                        .catch(function(error) {
                            console.error("Error in upload sequence:", error);
                        });
                    };
                    reader.readAsText(file);
                };
    }		
    }

    return Module;
});
