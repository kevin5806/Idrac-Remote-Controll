const axios = require('axios');
const querystring = require('querystring');

require("dotenv").config();

exports.handler = async function (event, context) {

    const { USER, PASS, IP, PIN } = process.env;

    const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

    //body.action = on/off
    //body.pin = "es 213124"

    const parsedBody = querystring.parse(event.body);

    const requestData = {};

    // Azioni da eseguire tramite api
    if (parsedBody.action == "on") {

        requestData.ResetType = "On";

    } else if (parsedBody.action == "off") {

        requestData.ResetType = "GracefulShutdown";

    } else {
        // Nessuna azione selezionata

        return {
            statusCode: 400,
            body: "400"
        }
    
    }

    if (parsedBody.pin !== PIN) {
        // Pin inviato dal utente errato

        return {
            statusCode: 401,
            body: "401"
        }

    } else {
        // Pin giusto

        const headers = {
            Authorization: `Basic ${Buffer.from(`${USER}:${PASS}`).toString('base64')}`,
        }
    
        try {
            
            const response = await axios.post(redfishEndpoint, requestData, { headers });

            const responseData = response.data || "OK";

            return {

                statusCode: 200,
                body: JSON.stringify(responseData)

            }

        } catch (error) {

            return {
                statusCode: 500,
                body: JSON.stringify("error: " + error)
            }

        }

    }

}