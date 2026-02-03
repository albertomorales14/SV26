const noBtn = document.getElementById("noBtn");
const siBtn = document.getElementById("siBtn");

let posX = 0;
let posY = 0;

function colocarBotonesIniciales() {
    const siRect = siBtn.getBoundingClientRect();
    posX = siRect.right + 50;
    posY = siRect.top;
    mantenerDentroPantalla();
}

function mantenerDentroPantalla() {
    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    posX = Math.max(0, Math.min(posX, maxX));
    posY = Math.max(0, Math.min(posY, maxY));

    noBtn.style.left = posX + "px";
    noBtn.style.top = posY + "px";
}

function moverDesdePunto(x, y) {
    const rect = noBtn.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const distX = x - centroX;
    const distY = y - centroY;
    const distancia = Math.sqrt(distX ** 2 + distY ** 2);

    if (distancia < 150) {
        const fuerza = 250;
        posX -= (distX / distancia) * fuerza;
        posY -= (distY / distancia) * fuerza;

        posX += (Math.random() - 0.5) * 120;
        posY += (Math.random() - 0.5) * 120;

        mantenerDentroPantalla();
    }
}

document.addEventListener("mousemove", (e) => moverDesdePunto(e.clientX, e.clientY));
document.addEventListener("touchstart", (e) => moverDesdePunto(e.touches[0].clientX, e.touches[0].clientY));
document.addEventListener("touchmove", (e) => moverDesdePunto(e.touches[0].clientX, e.touches[0].clientY));

window.addEventListener("load", colocarBotonesIniciales);
window.addEventListener("resize", mantenerDentroPantalla);

noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
});

// 🔥 REDIRECCIÓN
siBtn.addEventListener("click", () => {
    window.location.href = "si.html";
});

