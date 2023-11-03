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

/* async function setPower(action) {

    const data = {
        action: "on",
        pin: HTMLinputPin.value
    }

    await fetch('/.netlify/functions/power', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => powerRes.innerHTML = `${response.json()}`)

} */

async function setPower(action) {

    const data = new URLSearchParams();
    data.append('action', 'on');
    data.append('pin', '1221');

    await fetch('/.netlify/functions/power', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
        .then((response) => /* powerRes.innerHTML = `${response.json()}` */ console.log(response.json()))

}