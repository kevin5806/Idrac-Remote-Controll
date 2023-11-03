const axios = require('axios');

exports.handler = async (event, context) => {
  const { USER, PASS, IP } = process.env;
  const redfishEndpoint = `https://${IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

  const requestData = {
    ResetType: "On",
  };

  const headers = {
    Authorization: `Basic ${Buffer.from(`${USER}:${PASS}`).toString('base64')}`,
  };

  try {
    const response = await axios.post(redfishEndpoint, requestData, { headers });
    const data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error.response.data),
    };
  }
};