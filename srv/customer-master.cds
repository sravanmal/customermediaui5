using my.customerMaster as my from '../db/schema';
using  media.db as myy from '../db/media';

using from '@cap-js/change-tracking';
// using sap.changelog as myy;

service CustomerMasterService {

    entity CustomerMaster as projection on my.CustomerMaster;
    // entity ChangeLog as projection on myy.ChangeLog;
    entity media as projection on myy.media;
    // action button for create or updating the customermaster entity
    action addCustomer(ID : UUID,
                       CustomerNumber : String,
                       Soldto : String,
                       Shipto : many {
        ShiptoNr : String;
    },
                       Billto : many {
        BilltoNr : String;
    },
                       Payer : String,
                       PARNR : Integer,
                       PARAU : String,
                       NAMEV : String(35),
                       NAME1 : String(35),
                       TELF1 : String(16),
                       SORTL : String(10))

    returns {
        success : Boolean;
        message : String;
        customer : {
            ID : UUID;
            CustomerNumber : String;
            Soldto : String;
            Shipto : many {
                ShiptoNr : String;
            };
            Billto : many {
                BilltoNr : String;
            };
            Payer : String;
            PARNR : Integer;
            PARAU : String;
            NAMEV : String;
            NAME1 : String;
            TELF1 : String;
            SORTL : String;
        }
    }
}


// annotate my.CustomerMaster with @changelog: [
//     NAME1,
//     modifiedAt
// ] {
//     Soldto @changelog;
//     Shipto @changelog;
//     Billto @changelog;
//     Payer  @changelog;
//     PARNR  @changelog;
//     NAMEV  @changelog;
//     NAME1  @changelog;
//     TELF1  @changelog;
//     PARAU  @changelog;
//     SORTL  @changelog
// };
