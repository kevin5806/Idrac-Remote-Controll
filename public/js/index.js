const HTMLstatus = document.getElementById("status");
const HTMLinputPin = document.getElementById("inputPin");
const HTMLpowerRes = document.getElementById("powerRes");

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

    data.append('action', `${action}`);
    data.append('pin', HTMLinputPin);

    await fetch('/.netlify/functions/power', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        body: data.toString()

    }).then((response) => console.log(response.json()) /* powerRes.innerHTML = `${response.json()}` */);

}