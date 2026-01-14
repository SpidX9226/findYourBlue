const colorHolder = document.querySelector(".color_holder");
const colorTint = document.getElementById("b_channel");
const progressBar = document.getElementById("progressBar");
const colorText = document.getElementById("result_text");

const btnBrighter = document.getElementById("btn_brighter");
const btnDarker = document.getElementById("btn_darker");
const btnReset = document.getElementById("btn_reset");

let count = 0;
let b_channel = 128;
const maxIteration = 8;

function updateInfo() {
    colorHolder.style.backgroundColor = `rgb(0, 0, ${b_channel})`;
    colorTint.textContent = b_channel;
    const progress = (count / maxIteration) * 100;
    progressBar.style.width = `${progress}%`;
    colorText.innerText = `Closest shade is: ${getClosestShade(b_channel)}!`
}

function setControlsDisabled(isDisabled) {
    btnBrighter.disabled = isDisabled;
    btnDarker.disabled = isDisabled;
}

const extendedBluePalette = [
    { name: "Navy", value: 128 },
    { name: "Dark Blue", value: 139 },
    { name: "Medium Blue", value: 170 },
    { name: "Blue", value: 255 },
    { name: "Midnight Blue", value: 112 },
    { name: "Royal Blue", value: 179 },
    { name: "Steel Blue", value: 180 },
    { name: "Dodger Blue", value: 216 },
    { name: "Deep Sky Blue", value: 191 },
    { name: "Cornflower Blue", value: 153 },
    { name: "Sky Blue", value: 135 },
    { name: "Light Sky Blue", value: 176 },
    { name: "Powder Blue", value: 176 },
    { name: "Light Blue", value: 173 },
    { name: "Alice Blue", value: 240 },
    { name: "Azure", value: 240 },
    { name: "Baby Blue", value: 190 },
    { name: "Electric Blue", value: 240 },
    { name: "Sapphire", value: 150 },
    { name: "Cobalt Blue", value: 160 },
    { name: "Ultramarine", value: 140 },
    { name: "Indigo Blue", value: 130 },
    { name: "Prussian Blue", value: 100 },
    { name: "Cerulean", value: 200 },
    { name: "Blue Gray", value: 180 },
    { name: "Ice Blue", value: 230 },
    { name: "Denim Blue", value: 150 },
    { name: "Ocean Blue", value: 210 },
    { name: "Arctic Blue", value: 220 },
    { name: "Teal Blue", value: 180 },
    { name: "Pacific Blue", value: 200 },
    { name: "Capri Blue", value: 230 },
    { name: "Maya Blue", value: 200 },
    { name: "True Blue", value: 180 },
    { name: "Zaffre", value: 120 },
    { name: "Yale Blue", value: 140 }
];

function getClosestShade(value) {
    let closest = extendedBluePalette[0];
    let minDiff = Math.abs(value - closest.value);

    for (const shade of extendedBluePalette) {
        const diff = Math.abs(value - shade.value);
        if (diff < minDiff) {
            minDiff = diff;
            closest = shade;
        }
    }
    return closest.name;
}

function binarySearch(isDarker) {
    if (count >= maxIteration) {
        showResult();
        return;
    }

    const step = Math.max(1, Math.floor(128 / (2 ** count)));

    b_channel = isDarker
        ? Math.max(0, b_channel - step)
        : Math.min(255, b_channel + step);

    btnDarker.disabled = b_channel === 0;
    btnBrighter.disabled = b_channel === 255;

    count++;

    if (count >= maxIteration) {
        showResult();
        setControlsDisabled(true);
    }
}

function brighter() {
    binarySearch(false);
    updateInfo();
}

function darker() {
    binarySearch(true);
    updateInfo();
}

function reset() {
    count = 0;
    b_channel = 128;
    colorText.innerText = "";
    setControlsDisabled(false);
    updateInfo();
}

function showResult() {
    alert(`Final blue channel: ${b_channel} and closest shade is: ${getClosestShade(b_channel)}`);
}

btnBrighter.addEventListener("click", brighter);
btnDarker.addEventListener("click", darker);
btnReset.addEventListener("click", reset);

updateInfo();