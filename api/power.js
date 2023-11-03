const axios = require('axios');

exports.handler = async (event, context) => {

    const { USER, PASS, IP, PIN } = process.env;

    const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

    //body.action = on/off
    //body.pin = "es 213124"
    const reqBody = JSON.parse(event.body);

    const requestData = {};

    // Azioni da eseguire tramite api
    if (reqBody.action === "on") {

        requestData = { ResetType: "On" }

    } else if (reqBody.action === "off") {

         requestData = { ResetType: "GracefulShutdown" }

    } else {
        // Nessuna azione selezionata

        return {
            statusCode: 400,
            body: JSON.stringify("400")
        }
    

    }

    if (reqBody.PIN !== PIN) {
        // Pin inviato dal utente errato

        return {
            statusCode: 401,
            body: JSON.stringify("401")
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