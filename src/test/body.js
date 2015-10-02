var THREE = require('three');

function Body(radius) {
    var geometry = new THREE.SphereGeometry(radius, 32, 16);
    var material = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
    });

    this.mesh = new THREE.Mesh(geometry, material);
}

module.exports = Body;
