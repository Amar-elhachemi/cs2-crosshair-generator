const size = document.getElementById("size");
const thickness = document.getElementById("thickness");
const color = document.getElementById("color");

const parts = document.querySelectorAll(".crosshair span");

function updatePreview() {

    parts.forEach(part => {
        part.style.backgroundColor = color.value;
    });

    document.querySelectorAll(".top,.bottom").forEach(part => {
        part.style.height = `${size.value * 5}px`;
        part.style.width = `${thickness.value}px`;
    });

    document.querySelectorAll(".left,.right").forEach(part => {
        part.style.width = `${size.value * 5}px`;
        part.style.height = `${thickness.value}px`;
    });
}

size.addEventListener("input", updatePreview);
thickness.addEventListener("input", updatePreview);
color.addEventListener("input", updatePreview);

updatePreview();

function copyConfig() {

    const config = `cl_crosshairsize "${size.value}"
cl_crosshairthickness "${thickness.value}"
cl_crosshaircolor "${color.value}"`;

    navigator.clipboard.writeText(config);

    alert("Config copied!");
}