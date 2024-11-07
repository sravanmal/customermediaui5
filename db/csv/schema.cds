namespace my.customerMaster;

using {
  managed,
  cuid
} from '@sap/cds/common';


entity CustomerMaster : managed, cuid {
  CustomerNumber : String     @mandatory;
  Soldto         : String     @mandatory;
  Shipto         : Composition of many ShiptoAddress
                     on Shipto.customer = $self;
  Billto         : Composition of many BilltoAddress
                     on Billto.customer = $self;
  Payer          : String     @mandatory;
  PARNR          : Integer    @assert.range: [
    0,
    9999999999
  ]  @mandatory;
  NAMEV          : String(35);
  NAME1          : String(35);
  TELF1          : String(16);
  PARAU          : String(40) @mandatory;
  SORTL          : String(10);
  // @UI.Hidden // hide the field from UI form if needed
  // virtual FullName   : String ;
  FullName   : String = NAME1 || ' ' || NAMEV;

  
}

entity ShiptoAddress : cuid {
  ShiptoNr : String;
  customer : Association to CustomerMaster;
}

entity BilltoAddress : cuid {
  BilltoNr : String;
  customer : Association to CustomerMaster;
}