const noBtn = document.getElementById("noBtn");
const siBtn = document.getElementById("siBtn");

let posX = 0;
let posY = 0;

function colocarAlLadoDeSi() {
    const siRect = siBtn.getBoundingClientRect();
    posX = siRect.right + 15;
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

    if (distancia < 140) {
        const fuerza = 220;

        posX -= (distX / distancia) * fuerza;
        posY -= (distY / distancia) * fuerza;

        posX += (Math.random() - 0.5) * 100;
        posY += (Math.random() - 0.5) * 100;

        mantenerDentroPantalla();
    }
}

// 🖱️ Mouse
document.addEventListener("mousemove", (e) => {
    moverDesdePunto(e.clientX, e.clientY);
});

// 📱 Dedo (cuando tocas)
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    moverDesdePunto(touch.clientX, touch.clientY);
});

// 📱 Dedo moviéndose
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    moverDesdePunto(touch.clientX, touch.clientY);
});

window.addEventListener("load", colocarAlLadoDeSi);
window.addEventListener("resize", mantenerDentroPantalla);

noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
});

siBtn.addEventListener("click", () => {
    alert("Has pulsado SI ❤️");
});
