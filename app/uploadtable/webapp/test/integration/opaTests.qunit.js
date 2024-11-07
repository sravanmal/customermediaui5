sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sravan/ust/uploadtable/test/integration/FirstJourney',
		'sravan/ust/uploadtable/test/integration/pages/CustomerMasterList',
		'sravan/ust/uploadtable/test/integration/pages/CustomerMasterObjectPage',
		'sravan/ust/uploadtable/test/integration/pages/ShiptoAddressObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomerMasterList, CustomerMasterObjectPage, ShiptoAddressObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sravan/ust/uploadtable') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomerMasterList: CustomerMasterList,
					onTheCustomerMasterObjectPage: CustomerMasterObjectPage,
					onTheShiptoAddressObjectPage: ShiptoAddressObjectPage
                }
            },
            opaJourney.run
        );
    }
);