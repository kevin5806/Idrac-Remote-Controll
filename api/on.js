// Importa il modulo node-fetch in modo dinamico
import('node-fetch').then(async (fetch) => {
    // Funzione principale per accendere il server
    async function accendiServer() {
      // Recupera le variabili d'ambiente
      const idracIP = process.env.IP;
      const idracUser = process.env.USER;
      const idracPassword = process.env.PASS;
  
      // Crea l'URL per la richiesta Redfish
      const redfishUrl = `https://${idracIP}/redfish/v1/Systems/1/Actions/ComputerSystem.Reset`;
  
      // Opzioni per la richiesta Redfish
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${idracUser}:${idracPassword}`).toString('base64')}`,
        },
      };
  
      try {
        const response = await fetch(redfishUrl, requestOptions);
  
        if (response.status === 204) {
          console.log('Richiesta Redfish riuscita. Il server è stato acceso.');
        } else {
          console.error('Errore durante la richiesta Redfish:', response.status);
        }
      } catch (error) {
        console.error('Errore durante la richiesta Redfish:', error.message);
      }
    }
  
    // Gestisce la richiesta HTTP in entrata da Vercel
    module.exports = async (req, res) => {
      if (req.method === 'POST') {
        // Esegui la funzione per accendere il server
        await accendiServer();
        res.status(200).send('Richiesta Redfish in corso.');
      } else {
        res.status(405).send('Metodo non consentito.');
      }
    };
  });
  