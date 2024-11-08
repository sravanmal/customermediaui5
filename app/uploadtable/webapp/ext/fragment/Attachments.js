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
        // item.setUploadUrl(url);	
        // oUploadSetTable.setHttpRequestMethod("PUT")
        // oUploadSetTable.uploadItem(item);
        var file = item._oFileObject;

                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var fileContent = event.target.result;
                        fetch(`https://port4004-workspaces-ws-5nbsb.us10.trial.applicationstudio.cloud.sap/odata/v4/customer-master/media(${id})/content`, {
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
