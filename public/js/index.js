const HTMLstatus = document.getElementById("status");

let statusRes = "none";

async function updateStatus() {

    statusRes = await fetch('/api/status');

    console.log(await statusRes.json());

    HTMLstatus.textContent = await statusRes.json();

}