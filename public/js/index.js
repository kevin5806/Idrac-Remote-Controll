const HTMLstatus = document.getElementById("status");
const HTMLinputPin = document.getElementById("inputPin");
const HTMLpowerRes = document.getElementById("powerRes");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    statusRes = await statusRes.json();

    HTMLstatus.innerHTML = `
        Health: ${statusRes.Health} <br>
        HealthRollup: ${statusRes.HealthRollup} <br>
        State: ${statusRes.State}
    `;

}

async function setPower(action) {
    const body = {};

    body.action = action;
    body.pin = HTMLinputPin.value;

    const res = await fetch('/api/power', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    console.log(res);

    powerRes.innerHTML = `${await res.json()}`;
}