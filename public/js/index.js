const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    statusRes = await statusRes.json();

    console.log(statusRes.Status);

    HTMLstatus.textContent = statusRes.Status;

}