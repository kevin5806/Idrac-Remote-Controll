const HTMLstatus = document.getElementById("status");

const statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    HTMLstatus.textContent = statusRes;

}