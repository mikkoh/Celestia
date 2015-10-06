var THREE = require('three');

function Body(radius, pos, physics) {
    var geometry = new THREE.SphereGeometry(radius, 32, 16);
    var material = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(pos.x, pos.y, pos.z);

    this.phys = {
        G: 6.673E-11, // Gravitational Constant
        m: physics.mass, // Mass
        F: new THREE.Vector3(), // Force
        a: new THREE.Vector3(), // Acceleration
        v: new THREE.Vector3(), // Velocity
        c: this.mesh.position // Coordinates
    };
}

Body.prototype.update = function(bodies) {
    // update acceleration vector
    for (var i = bodies.length - 1; i >= 0; i--) {

    }

    // update position
};

module.exports = Body;
