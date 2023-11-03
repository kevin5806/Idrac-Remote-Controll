const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event, context) => {

    const { USER, PASS, IP, PIN } = process.env;

    const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

    //body.action = on/off
    //body.pin = "es 213124"

    const parsedBody = querystring.parse(event.body);

    // Azioni da eseguire tramite api
    if (parsedBody.action === "on") {

        const requestData = { ResetType: "On" }

    } else if (parsedBody.action === "off") {

        const requestData = { ResetType: "GracefulShutdown" }

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

            return {

                statusCode: 200,
                body: JSON.stringify(response.data)

            }
        } catch (error) {

            return {
                statusCode: error.response.status,
                body: JSON.stringify(error.response.data)
            }

        }

    }

}