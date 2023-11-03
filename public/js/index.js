const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status', { method: 'GET' });

    console.log(statusRes);

    HTMLstatus.textContent = await statusRes.json();

}