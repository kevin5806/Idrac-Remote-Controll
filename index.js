const axios = require('axios');

require('dotenv').config();

const idracIpAddress = '10.58.1.60';
const idracUsername = process.env.USER;
const idracPassword = process.env.PASS;

const powerControlEndpoint = `https://${idracIpAddress}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

const powerControlData = {
    ResetType: 'On',
};

const config = {
    auth: {
        username: idracUsername,
        password: idracPassword,
    },
};

axios.post(powerControlEndpoint, powerControlData, config);