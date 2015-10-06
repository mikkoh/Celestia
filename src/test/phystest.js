// Dependencies
var THREE = require('three');
var Body = require('./body.js');

// File-scoped variables
var scene, camera, renderer;

var SCREEN = {
    w: window.innerWidth,
    h: window.innerHeight
};


var bodies = [];


// Methods


function init(argument) {
    var container = document.createElement('div');

    scene = new THREE.Scene();

    var VIEW_ANGLE = 45,
        ASPECT = SCREEN.w / SCREEN.h,
        NEAR = 0.1,
        FAR = 60000;

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 150, 700);
    camera.lookAt(scene.position);
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(SCREEN.w, SCREEN.h);
    renderer.setClearColor(0x555555);


    // var light = new THREE.AmbientLight(0x404040); // soft white light
    var light = new THREE.PointLight(0xCC9999);
    light.position.set(0, 250, 0);
    scene.add(light);


    addBodies();


    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    animate();

    document.body.appendChild(container);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    for (var i = bodies.length - 1; i >= 0; --i) {
        bodies[i].update(bodies);
    }
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    SCREEN.w = window.innerWidth;
    SCREEN.h = window.innerHeight;

    renderer.setSize(SCREEN.w, SCREEN.h);
    camera.aspect = SCREEN.w / SCREEN.h;
    camera.updateProjectionMatrix();
}


function addBodies() {
    var numBodies = 3;

    var initPos = {
        x: 0,
        y: 0,
        z: 0
    };

    var physics = {
        mass: 1
    };

    for (var i = 0, body = null; i < numBodies; i++) {
        initPos.x = Math.random() * 250;
        initPos.y = Math.random() * 250;
        initPos.z = Math.random() * 250;

        body = new Body(25, initPos, physics);

        scene.add(body.mesh);
        bodies.push(body);
    }
}


window.onload = init;
