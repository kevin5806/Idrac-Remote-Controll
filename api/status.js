const axios = require('axios');

exports.handler = async (event, context) => {

    const { USER, PASS, IP} = process.env;

    const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1`;

    const headers = {
        Authorization: `Basic ${Buffer.from(`${USER}:${PASS}`).toString('base64')}`,
    }

    try {

        const response = await axios(redfishEndpoint, { headers });

        const responseData = response.data.Status || "none";

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