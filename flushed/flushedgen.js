let img = new Image(); //flushed svg
img.crossOrigin = "anonymous";
img.onload = () => { //draw on load
    updateFlush();
}
img.src = "./flushed.svg";
function drawFlush(imgWidth, imgHeight, polygonVertices, polygonRotation, color) {
    //get canvas and context and stuff
    let canvas = document.getElementById("flushedCanvas") 
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //calculate shit
    let absoluteWidth = imgWidth * canvas.width;
    let absoluteHeight = imgHeight * canvas.height;
    let poly = [];
    let n = polygonVertices;
    let rot = polygonRotation * Math.PI / 180;

    //generate polygon
    for (let i = 0; i < n; i++) {
        poly.push(canvas.width / 2 + canvas.width / 2 * Math.cos((2 * Math.PI * i / n + rot)));
        poly.push(canvas.height / 2 + canvas.height / 2 * Math.sin((2 * Math.PI * i / n + rot)));
    }

    //draw the actual thing
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for (let item = 2; item < poly.length - 1; item += 2) {
        ctx.lineTo(poly[item], poly[item + 1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(img, (canvas.width - absoluteWidth) / 2, (canvas.height - absoluteHeight) / 2, absoluteWidth, absoluteHeight);
}

document.getElementById('flushedDownload').onclick = () => { //function i stole from stackoverflow
    let link = document.createElement('a');
    link.download = 'flushed.png';
    link.href = document.getElementById('flushedCanvas').toDataURL();
    link.click();
    link.remove();
}

function updateFlush() { //update the flush on some value change
    //haha messy stuf
    let canvas = document.getElementById("flushedCanvas");
    let resX = document.getElementById('flushResX').value,
        resY = document.getElementById('flushResY').value;
    canvas.width = resX;
    canvas.height = resY;
    let imgw = document.getElementById('flushImageWidth').value,
        imgh = document.getElementById('flushImageHeight').value,
        pvert = document.getElementById('flushedVertices').value,
        prot = document.getElementById('flushRotation').value,
        color = document.getElementById('colorPicker').value;
    drawFlush(imgw, imgh, pvert, prot, color);
}

for (let o of document.getElementsByTagName('input')) { //add event listener to all inputs so i don't have to write that much
    o.addEventListener("input", () => {
        updateFlush();
    });
}

function enforceMinMax(el) { //idk html is weird 
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}