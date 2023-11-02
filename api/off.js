const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {

        const data = {
            ResetType: 'GracefulShutdown',
            auth: {
                username: process.env.USER,
                password: process.env.PASS,
            }
        }
        
        const apiUrl = `https://${process.env.IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        await fetch(apiUrl, options);

        res.status(204).end();

    } catch (error) {

        console.error('Errore durante la richiesta POST:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante la richiesta POST' });

    }
}
