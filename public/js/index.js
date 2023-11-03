const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status', { method: 'GET' });

    console.log(await statusRes.json());

    HTMLstatus.textContent = await statusRes.json();

}