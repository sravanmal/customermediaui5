using my.customerMaster as my from '../db/schema';
using from '@cap-js/change-tracking';
using sap.changelog as myy;


annotate my.CustomerMaster with @changelog: [
    NAME1,
    modifiedAt
] {
    Soldto @changelog;
    Shipto @changelog;
    Billto @changelog;
    Payer  @changelog;
    PARNR  @changelog;
    NAMEV  @changelog;
    NAME1  @changelog;
    TELF1  @changelog;
    PARAU  @changelog;
    SORTL  @changelog
};

annotate my.CustomerMaster with @title: 'CustomerMaster';

annotate sap.changelog.aspect @(UI.Facets: [{
    $Type : 'UI.ReferenceFacet',
    ID    : 'ChangeHistoryFacet',
    Label : '{i18n>ChangeHistory}',
    Target: 'changes/@UI.PresentationVariant',
    ![@UI.PartOfPreview]
}]);


service ChangeTrackingService {
    entity ChangeLog as projection on myy.ChangeLog; 

}


