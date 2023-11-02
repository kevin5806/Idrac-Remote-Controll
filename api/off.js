const axios = require('axios');

export default async (req, res) => {
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

    try {
        const response = await axios.post(powerControlEndpoint, powerControlData, config);
        console.log('Il server è stato acceso con successo.');
        res.status(200).json({ message: 'Il server è stato acceso con successo.' });
    } catch (error) {
        console.error('Errore durante l\'accensione del server:', error);
        res.status(500).json({ message: 'Errore durante l\'accensione del server.' });
    }
};
