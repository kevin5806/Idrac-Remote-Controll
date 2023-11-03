const HTMLstatus = document.getElementById("status");
const HTMLinputPin = document.getElementById("inputPin");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/.netlify/functions/status');

    statusRes = await statusRes.json();

    HTMLstatus.innerHTML = `
        Health: ${statusRes.Health} <br>
        HealthRollup: ${statusRes.HealthRollup} <br>
        State: ${statusRes.State}
    `;

}

async function setPower(action) {

    const data = new URLSearchParams();

    data.append('action', `${action.toString()}`);
    data.append('pin', HTMLinputPin);

    await fetch('/.netlify/functions/power', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        body: data.toString()

    })

}