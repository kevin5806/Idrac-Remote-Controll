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

    const pin = HTMLinputPin.value;

    data.append('action', action);
    data.append('pin', pin);

    await fetch('/.netlify/functions/power', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    });

}