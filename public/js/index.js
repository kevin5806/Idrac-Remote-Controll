const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    statusRes = await statusRes.Status.json();

    console.log(statusRes);

    HTMLstatus.textContent = statusRes;

}