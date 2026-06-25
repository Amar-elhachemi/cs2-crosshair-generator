// ======================
// ELEMENTS
// ======================

const size = document.getElementById("size");
const thickness = document.getElementById("thickness");
const gap = document.getElementById("gap");
const color = document.getElementById("color");

const centerDot = document.getElementById("centerDot");
const outline = document.getElementById("outline");

const output = document.getElementById("configOutput");

// ======================
// PRESETS
// ======================

const presets = {

    simple: {
        name: "s1mple",
        team: "NAVI",
        size: 2,
        thickness: 1,
        gap: 3,
        color: "#00ff00",
        dot: false,
        outline: false
    },

    donk: {
        name: "donk",
        team: "Team Spirit",
        size: 1,
        thickness: 1,
        gap: 4,
        color: "#00ff00",
        dot: false,
        outline: false
    },

    zywoo: {
        name: "ZywOo",
        team: "Vitality",
        size: 2,
        thickness: 1,
        gap: 3,
        color: "#00ff00",
        dot: false,
        outline: false
    },

    m0nesy: {
        name: "m0NESY",
        team: "G2",
        size: 2,
        thickness: 1,
        gap: 2,
        color: "#00ff00",
        dot: false,
        outline: false
    },

    niko: {
        name: "NiKo",
        team: "Falcons",
        size: 2,
        thickness: 1,
        gap: 3,
        color: "#00ff00",
        dot: false,
        outline: false
    }

};

// ======================
// COLOR CODE
// ======================

function getColorCode(hex){

    switch(hex.toLowerCase()){

        case "#00ff00":
            return 1;

        case "#ffff00":
            return 2;

        case "#0000ff":
            return 3;

        case "#00ffff":
            return 4;

        default:
            return 5;
    }
}

// ======================
// CONFIG GENERATOR
// ======================

function generateConfig(){

    const colorCode = getColorCode(color.value);

    return `cl_crosshaircolor ${colorCode}; cl_crosshairalpha 255; cl_crosshairdot ${centerDot.checked ? 1 : 0}; cl_crosshairgap -${gap.value}; cl_crosshairsize ${size.value}; cl_crosshairthickness ${thickness.value}; cl_crosshair_drawoutline ${outline.checked ? 1 : 0}; cl_crosshair_outlinethickness 1; cl_crosshairusealpha 1; cl_crosshair_t 0; cl_crosshair_recoil 0; cl_crosshairgap_useweaponvalue 0; cl_fixedcrosshairgap 3; cl_crosshairstyle 4; cl_crosshair_dynamic_splitdist 3; cl_crosshair_dynamic_splitalpha_innermod 0.1; cl_crosshair_dynamic_splitalpha_outermod 1; cl_crosshair_dynamic_maxdist_splitratio 1`;
}

// ======================
// PREVIEW
// ======================

function updateCrosshair(){

    document.getElementById("sizeValue").textContent = size.value;
    document.getElementById("thicknessValue").textContent = thickness.value;
    document.getElementById("gapValue").textContent = gap.value;

    const armLength = Number(size.value) * 8;
    const armThickness = Number(thickness.value);
    const armGap = Number(gap.value);

    const top = document.querySelector(".top");
    const bottom = document.querySelector(".bottom");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");

    [top,bottom,left,right].forEach(arm => {
        arm.style.backgroundColor = color.value;
    });

    top.style.width = armThickness + "px";
    top.style.height = armLength + "px";
    top.style.left = -(armThickness/2) + "px";
    top.style.top = -(armGap + armLength) + "px";

    bottom.style.width = armThickness + "px";
    bottom.style.height = armLength + "px";
    bottom.style.left = -(armThickness/2) + "px";
    bottom.style.top = armGap + "px";

    left.style.width = armLength + "px";
    left.style.height = armThickness + "px";
    left.style.left = -(armGap + armLength) + "px";
    left.style.top = -(armThickness/2) + "px";

    right.style.width = armLength + "px";
    right.style.height = armThickness + "px";
    right.style.left = armGap + "px";
    right.style.top = -(armThickness/2) + "px";

    const dot = document.getElementById("dot");

    if(centerDot.checked){

        dot.style.display = "block";
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.borderRadius = "50%";
        dot.style.backgroundColor = color.value;
        dot.style.left = "-3px";
        dot.style.top = "-3px";

    }else{

        dot.style.display = "none";
    }

    output.value = generateConfig();
}

// ======================
// LOAD PRESET
// ======================

function loadPreset(player){

    const p = presets[player];

    if(!p) return;

    size.value = p.size;
    thickness.value = p.thickness;
    gap.value = p.gap;
    color.value = p.color;

    centerDot.checked = p.dot;
    outline.checked = p.outline;

    document.getElementById("playerName").innerText = p.name;
    document.getElementById("playerTeam").innerText = p.team;

    document.querySelectorAll(".preset-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    localStorage.setItem("selectedPreset", player);

    updateCrosshair();
}

// ======================
// RANDOM
// ======================

function randomProPreset(){

    const keys = Object.keys(presets);

    const random =
        keys[Math.floor(Math.random() * keys.length)];

    loadPreset(random);
}

// ======================
// COPY
// ======================

function copyConfig(){

    navigator.clipboard.writeText(output.value);

    const toast =
        document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);
}

// ======================
// IMPORT
// ======================

function importConfig(){

    const imported =
        document.getElementById("importBox").value;

    if(!imported.trim()) return;

    output.value = imported;
}

// ======================
// EVENTS
// ======================

[size, thickness, gap, color].forEach(el => {
    el.addEventListener("input", updateCrosshair);
});

centerDot.addEventListener("change", updateCrosshair);
outline.addEventListener("change", updateCrosshair);

// ======================
// STARTUP
// ======================

const savedPreset =
    localStorage.getItem("selectedPreset");

if(savedPreset && presets[savedPreset]){

    loadPreset(savedPreset);

}else{

    updateCrosshair();
}