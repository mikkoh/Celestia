// Dependencies
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

// File-scoped variables
var scene, camera, renderer;

var SCREEN = {
    w: window.innerWidth,
    h: window.innerHeight
};


var parent, moon;


// Methods


function init(argument) {
    var container = document.createElement('div');


    scene = new THREE.Scene();


    var VIEW_ANGLE = 45,
        ASPECT = SCREEN.w / SCREEN.h,
        NEAR = 0.1,
        FAR = 60000;

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(SCREEN.w, SCREEN.h);

    controls = new OrbitControls(camera, renderer.domElement);

    var light = new THREE.PointLight(0xCC9999);
    light.position.set(0, 250, 0);
    scene.add(light);


    var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
    var moonTexture = THREE.ImageUtils.loadTexture('../data/images/moonmap.jpg');
    // var bumpTexture = THREE.ImageUtils.loadTexture('../data/images/moonbump.jpg');
    var moonMaterial = new THREE.MeshLambertMaterial({
        map: moonTexture
        // bumpMap: bumpTexture,
        // bumpScale: 0.002
    });
    moon = new THREE.Mesh(sphereGeometry, moonMaterial);
    moon.position.set(150, 50, -50);
    // scene.add(moon);

    parent = new THREE.Object3D();
    scene.add(parent);

    var pivot = new THREE.Object3D();
    pivot.rotation.y = 0;
    pivot.add(moon);
    parent.add(pivot);


    scene.add(new THREE.AxisHelper(100));


    var floorTexture = new THREE.ImageUtils.loadTexture('../data/images/heightmap.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    // floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);



    // renderer.setClearColor(0x444444, 1);
    var imagePrefix = "../data/images/nebula-";
    var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.BoxGeometry(50000, 50000, 50000);

    var imageURLs = [];
    for (var i = 0; i < 6; i++)
        imageURLs.push(imagePrefix + directions[i] + imageSuffix);
    var textureCube = THREE.ImageUtils.loadTextureCube(imageURLs);
    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = textureCube;
    var skyMaterial = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: true,
        side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);



    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    animate();

    return container;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    controls.update();

    moon.rotation.y += 0.01;
    (moon.rotation.y >= Math.PI * 2) && (moon.rotation.y = 0);

    parent.rotation.y += 0.01;
    (parent.rotation.y >= Math.PI * 2) && (parent.rotation.y = 0);
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

module.exports = init();
