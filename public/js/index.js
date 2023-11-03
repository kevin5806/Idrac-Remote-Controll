const HTMLstatus = document.getElementById("status");

const statusRes = fetch('/api/status');

HTMLstatus.textContent = statusRes;