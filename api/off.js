export default async function handler(request, response) {
    const axios = require('axios');

    require('dotenv').config();

    const idracIpAddress = process.env.IP;
    const idracUsername = process.env.USER;
    const idracPassword = process.env.PASS;

    const powerControlEndpoint = `https://${idracIpAddress}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

    const powerControlData = {
        ResetType: 'GracefulShutdown',
    };

    const config = {
        auth: {
            username: idracUsername,
            password: idracPassword,
        },
    };

    axios.post(powerControlEndpoint, powerControlData, config);

    return response.status(200);
}