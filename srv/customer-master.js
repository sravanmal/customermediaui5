// version 2

module.exports = function () {

    const { CustomerMaster, ShiptoAddress, BilltoAddress } = this.entities;

    this.before('CREATE', 'media', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/MediaService/media(${req.data.ID})/content`
    });

    // custom logic for action button addCustomer 
    this.on('addCustomer', async (req, res) => {

        const { ID, CustomerNumber, Soldto, Shipto, Billto, Payer, PARNR, PARAU, NAMEV, NAME1, TELF1, SORTL } = req.data;
        const data = req.data;
        const response = (message) => {
            return {
                success: true,
                message: `Customer ${CustomerNumber} has been ${message}`,
                customer: {
                    ID,
                    CustomerNumber,
                    Soldto,
                    Shipto: Shipto.map(shipto => ({ ShiptoNr: shipto.ShiptoNr })),
                    Billto: Billto.map(billto => ({ BilltoNr: billto.BilltoNr })),
                    Payer,
                    PARNR,
                    PARAU,
                    NAMEV,
                    NAME1,
                    TELF1,
                    SORTL
                }
            };
        }


        try {


            // IF-ELSE STATEMENT FOR VALIDATING THE DATA 
            if (Object.keys(data).length != 0) {

                //validating input fields if blank fields it should return error

                //storing blank fields in nullKeys array
                const nullKeys = [];

                for (const key in data) {
                    if (data[key] === "") {
                        nullKeys.push(key);
                        console.log(nullKeys)
                    }
                }



                // returning error if blank fields are present 

                if (nullKeys.length > 0) {
                    console.log(`${nullKeys.join(" and ")} ${nullKeys.length > 1 ? 'are' : 'is'} missing.`);
                    req.error(400, `${nullKeys.join(" and ")} ${nullKeys.length > 1 ? 'are' : 'is'} missing.`);
                } else {
                    console.log("No fields are missing.");
                    //check if customer present in the database 
                    const CustomerRecord = await SELECT.one.from(CustomerMaster).where({ CustomerNumber })
                    console.log(CustomerRecord);

                    //CREATED AND UPDATE IF ELSE STATEMENT 
                    if (!CustomerRecord) {

                        await INSERT.into(CustomerMaster).entries(data)
                        req.reply(response("created"));

                    }
                    else {
                        await this.update(CustomerMaster).set(data).where({ CustomerNumber })
                        req.reply(response("updated"));
                    }
                }


            } else {
                req.error(400, "no input body")
            }


        } catch (error) {
            return { success: false, message: 'Error adding customer' };

        }
        


    });
}
