document.getElementById('pickColor').addEventListener('click', async () => {
    try {
        const eyeDropper = new EyeDropper();
        const color = await eyeDropper.open();
        updateColor(color.sRGBHex);
    } catch (error) {
        console.error('Color selection canceled', error);
    }
});







document.getElementById('copyColor').addEventListener('click', () => {
    const hexValue = document.getElementById('hexValue').innerText;
    navigator.clipboard.writeText(hexValue).then(() => {
        alert('Color copied to clipboard: ' + hexValue);
    });
});

function updateColor(hex) {
    const rgb = hexToRgb(hex);
    document.getElementById('hexValue').innerText = hex;
    document.getElementById('rgbValue').innerText = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    addToHistory(hex);
}

function addToHistory(hex) {
    const historyList = document.getElementById('colorHistory');
    const listItem = document.createElement('li');
    listItem.style.backgroundColor = hex;
    listItem.innerText = hex;
    historyList.appendChild(listItem);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}
