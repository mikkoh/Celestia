// Dependencies
var THREE = require('three');
var Body = require('./body.js');
require('./FlyControls.js')(THREE);

// File-scoped variables
var scene, camera, renderer, controls;
var clock, delta;

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

    clock = new THREE.Clock();

    controls = new THREE.FlyControls(camera, container);
    controls.movementSpeed = 600;
    controls.rollSpeed = Math.PI / 6;
    controls.dragToLook = true;


    // var light = new THREE.AmbientLight(0x404040); // soft white light
    var light = new THREE.PointLight(0xCC4444);
    light.position.set(0, 250, 0);
    scene.add(light);


    addBodies();


    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    document.body.appendChild(container);

    animate();
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    for (var i = bodies.length - 1; i >= 0; --i) {
        bodies[i].update(delta, bodies);

        if (bodies[i].remove) {
            scene.remove(bodies[i].mesh);
            bodies.splice(i, 1);
        }
    }

    controls.update(delta);
}

function render() {
    delta = clock.getDelta();
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
    var numBodies = 2;

    var physics = {
        mass: 0,
        velocity: new THREE.Vector3(),
        coordinates: new THREE.Vector3()
    };

    for (var i = 0, body = null; i < numBodies; i++) {
        physics.mass = Math.random() * 10E12;

        physics.coordinates.setX(Math.random() * 100 - 50);
        physics.coordinates.setY(Math.random() * 100 - 50);
        physics.coordinates.setZ(Math.random() * 100 - 50);

        // physics.velocity.setX(Math.random() * 10 - 5);
        // physics.velocity.setY(Math.random() * 10 - 5);
        // physics.velocity.setZ(Math.random() * 10 - 5);

        body = new Body(Math.random() * 10, physics);

        scene.add(body.mesh);
        bodies.push(body);
    }
}


window.onload = init;
