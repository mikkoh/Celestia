if (!require('./support.js')) {
    return;
}

var canvasEl = require('./canvas.js');

window.onload = init;

function init() {
    document.body.appendChild(canvasEl);
}
