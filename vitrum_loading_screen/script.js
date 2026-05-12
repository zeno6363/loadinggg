const adminList = document.getElementById("adminList");
const queuePanel = document.getElementById("queuePanel");
const queuePosition = document.getElementById("queuePosition");
const queueTotal = document.getElementById("queueTotal");
const queueEta = document.getElementById("queueEta");
const statusEl = document.getElementById("status");
const percentEl = document.getElementById("percent");
const progressFill = document.getElementById("progressFill");

let filesTotal = 1;
let fakeProgress = 0;

function renderAdmins() {
  adminList.innerHTML = CONFIG.admins.map(admin => `
    <div class="admin">
      <div class="avatar">${admin.avatar || "👤"}</div>
      <div>
        <b>${admin.name}</b>
        <small style="color:${admin.color || "#39a8ff"}">${admin.role}</small>
      </div>
    </div>
  `).join("");
}

function formatTime(seconds) {
  seconds = Math.max(0, Number(seconds) || 0);
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function showQueue(position, total, etaSeconds) {
  queuePanel.classList.remove("hidden");
  queuePosition.textContent = position;
  queueTotal.textContent = total;
  queueEta.textContent = formatTime(etaSeconds);
}

function hideQueue() {
  queuePanel.classList.add("hidden");
}

// Peut être appelé par un backend/endpoint si tu en ajoutes un plus tard.
window.QueueStatus = function(isFull, position, total, etaSeconds) {
  if (!isFull) return hideQueue();
  showQueue(position || 1, total || 1, etaSeconds || ((position || 1) * CONFIG.queue.averageSecondsPerPlayer));
};

function readQueueFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const queueEnabled = params.get("queue") === "1" || CONFIG.queue.enabledByDefault;

  if (!queueEnabled) return hideQueue();

  const pos = Number(params.get("pos") || 1);
  const total = Number(params.get("total") || 1);
  const eta = Number(params.get("eta") || pos * CONFIG.queue.averageSecondsPerPlayer);
  showQueue(pos, total, eta);
}

function setProgress(value) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  progressFill.style.width = safe + "%";
  percentEl.textContent = safe + "%";
}

window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
  if (mapname) statusEl.textContent = `Chargement de la map ${mapname}...`;
};

window.SetStatusChanged = function(status) {
  if (status) statusEl.textContent = status;
};

window.SetFilesTotal = function(total) {
  filesTotal = Number(total) || 1;
};

window.SetFilesNeeded = function(needed) {
  const loaded = filesTotal - Number(needed || 0);
  setProgress((loaded / filesTotal) * 100);
};

document.querySelectorAll("[data-link]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const link = btn.getAttribute("data-link");
    if (link) window.open(link, "_blank");
  });
});

document.getElementById("leaveQueue").addEventListener("click", () => {
  statusEl.textContent = "Sortie de la file demandée...";
  hideQueue();
});

function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 44; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (5 + Math.random() * 8) + "s";
    p.style.animationDelay = (Math.random() * 8) + "s";
    p.style.opacity = Math.random();
    container.appendChild(p);
  }
}

// Preview hors GMod.
setInterval(() => {
  if (window.location.protocol === "file:" || !window.SetFilesNeeded.called) {
    fakeProgress = (fakeProgress + Math.random() * 4) % 100;
    setProgress(fakeProgress);
  }
}, 700);

renderAdmins();
readQueueFromUrl();
createParticles();
