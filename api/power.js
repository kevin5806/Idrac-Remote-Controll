const axios = require('axios');

exports.handler = async (event, context) => {

    const { USER, PASS, IP, PIN } = process.env;

    const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

    //body.action = on/off
    //body.pin = "es 213124"
    const reqBody = event.body;

    // Azioni da eseguire tramite api
    if (reqBody.action === "on") {

        const requestData = { ResetType: "On" }

    } else if (reqBody.action === "off") {

        const requestData = { ResetType: "GracefulShutdown" }

    } else {
        // Nessuna azione selezionata

        return {
            statusCode: 400,
            body: "400"
        }
    

    }

    if (reqBody.PIN !== PIN) {
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
            const data = response.data;

            return {

                statusCode: 200,
                body: JSON.stringify(data)

            }
        } catch (error) {

            return {
                statusCode: error.response.status,
                body: JSON.stringify(error.response.data)
            }

        }

    }

}