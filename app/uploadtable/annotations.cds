using CustomerMasterService as service from '../../srv/customer-master';
annotate service.CustomerMaster with @(
    
    UI.SelectionFields:[

        FullName,
        CustomerNumber,
        TELF1

     ],
     UI.LineItem:[

        {
            $Type : 'UI.DataField',
            Value : CustomerNumber,
            Label: 'Customer Number'
        },
        {
            $Type : 'UI.DataField',
            Value : FullName,
            Label: 'Full Name'
        },
        {
            $Type : 'UI.DataField',
            Value : PARAU,
            Label: 'Email Address'
        },
        {
            $Type : 'UI.DataField',
            Value : TELF1,
            Label: 'Telephone'
        }
     ],
     UI.HeaderInfo:{
        TypeName: 'Customer Master',
        TypeNamePlural: 'Customer Master',
    },

    UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label: 'General Information',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label: 'Ship to Address',
                    Target : '@UI.Identification'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label: 'Bill to address',
                    Target : '@UI.FieldGroup#Spiderman'
                },
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label: 'Ship to Address',
            Target : 'Shipto/@UI.LineItem',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label: 'Bill to Address',
            Target : 'Billto/@UI.LineItem',
        }
        
    ],
    UI.Identification:[
        {
            $Type : 'UI.DataField',
            Value : Shipto.customer_ID,
            Label: 'Customer ID'
        },
        {
            $Type : 'UI.DataField',
            Value : FullName,
            Label: 'Customer Name'
        }
    ],
    UI.FieldGroup #Spiderman: {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : TELF1,
                Label: 'Modile Number'
            },
            {
                $Type : 'UI.DataField',
                Value : PARAU,
                Label: 'Email'
            }
        ],

    },
);


annotate service.BilltoAddress with @(
 
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Value : customer_ID,

        },
        {
            $Type : 'UI.DataField',
            Value : BilltoNr,

        }
    ]);

annotate service.ShiptoAddress with @(
 
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Value : customer_ID,

        },
        {
            $Type : 'UI.DataField',
            Value : ShiptoNr,

        }
    ]);