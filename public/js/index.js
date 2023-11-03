const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    statusRes = await statusRes.json();

    statusRes = statusRes.Status;

    console.log(statusRes);

    HTMLstatus.innerHTML = `
        Health: ${statusRes.Health} <br>
        HealthRollup: ${statusRes.HealthRollup} <br>
        State: ${statusRes.State}
    `;

}

updateStatus();