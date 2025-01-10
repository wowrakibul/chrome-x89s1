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



// v2 -- Auto Copy-to-Clipboard

// Color Picker Extension: Auto Copy-to-Clipboard

// Function to copy text to the clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log(`Copied to clipboard: ${text}`);
        showNotification("Color copied to clipboard!"); // Show confirmation
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

// Function to show a temporary notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "relative";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "#333";
    notification.style.color = "#fff";
    notification.style.width = "fit-content";
    notification.style.padding = "10px 15px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
    notification.style.zIndex = 1000;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000); // Remove after 2 seconds
}

// Eye-dropper tool integration
async function pickColor() {
    if (!window.EyeDropper) {
        alert("Your browser does not support the EyeDropper API.");
        return;
    }

    const eyeDropper = new EyeDropper();

    try {
        const result = await eyeDropper.open();
        const selectedColor = result.sRGBHex; // HEX color from the EyeDropper

        console.log(`Selected color: ${selectedColor}`);
        copyToClipboard(selectedColor); // Automatically copy HEX code
    } catch (error) {
        console.error("EyeDropper canceled or failed: ", error);
    }
}

// Attach the pickColor function to a button
const button = document.createElement("button");
button.innerText = "Pick a Color";
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
button.style.cursor = "pointer";
button.style.margin = "20px";
button.style.borderRadius = "5px";
button.style.border = "1px solid #ccc";
button.style.backgroundColor = "#f5f5f5";

button.addEventListener("click", pickColor);
document.body.appendChild(button);



// ap.js update -- V3 
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


