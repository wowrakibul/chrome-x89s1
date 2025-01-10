
// ap.js update -- V3 (08.01.2025 - Wow Rakibul)


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
    copyToClipboard(hexValue);
});

function updateColor(hex) {
    const rgb = hexToRgb(hex);
    document.getElementById('hexValue').innerText = hex;
    document.getElementById('rgbValue').innerText = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    addToHistory(hex);
    copyToClipboard(hex); // Auto-copy HEX code
    showNotification(`Color copied to clipboard: ${hex}`); // Show notification
}

function addToHistory(hex) {
    const historyList = document.getElementById('colorHistory');
    const listItem = document.createElement('li');
    listItem.style.backgroundColor = hex;
    listItem.style.color = '#fff';
    listItem.style.padding = '5px';
    listItem.style.margin = '3px 0';
    listItem.style.cursor = 'pointer';
    listItem.innerText = hex;
    
    // Allow clicking history items to copy the color
    listItem.addEventListener('click', () => {
        copyToClipboard(hex);
        showNotification(`Color copied from history: ${hex}`);
    });
    
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

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log(`Copied to clipboard: ${text}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#333';
    notification.style.color = '#fff';
    notification.style.padding = '10px 15px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = 1000;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000); // Remove after 2 seconds
}


