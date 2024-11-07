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
        item.setUploadUrl(url);	
        oUploadSetTable.setHttpRequestMethod("PUT")
        oUploadSetTable.uploadItem(item);
    }		
    }

    return Module;
});
