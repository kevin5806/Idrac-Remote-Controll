module.exports = async (req, res) => {
    try {
        const data = {
            ResetType: 'On',
            auth: {
                username: process.env.USER,
                password: process.env.PASS,
            },
        };

        const apiUrl = `https://${process.env.IP}/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset`;

        const https = await import('https');
        const fetch = await import('node-fetch');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            agent: new https.Agent({ rejectUnauthorized: false }),
        };

        const response = await fetch.default(apiUrl, options);

        res.status(204).end();
    } catch (error) {

        console.error('Errore durante la richiesta POST:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante la richiesta POST' });

    }
};
