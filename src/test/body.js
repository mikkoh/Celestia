var THREE = require('three');

function Body(radius, physics) {
    var geometry = new THREE.SphereGeometry(radius, 32, 16);
    var material = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(physics.coordinates);

    this.phys = {
        G: 6.673E-11, // Gravitational Constant
        m: physics.mass, // Mass
        a: new THREE.Vector3(), // Acceleration
        v: physics.velocity, // Velocity
        c: this.mesh.position // Coordinates
    };

    this.remove = false;
}

Body.prototype.update = function(delta, bodies) {
    var F, r2;

    this.phys.a.set(0, 0, 0);

    // update acceleration vector
    for (var i = bodies.length - 1; i >= 0; --i) {
        if (bodies[i] !== this) {
            r2 = this.phys.c.distanceToSquared(bodies[i].phys.c);
            F = (this.phys.G * this.phys.m * bodies[i].phys.m) / r2;
            F = bodies[i].phys.c.clone().sub(this.phys.c).multiplyScalar(F).divideScalar(Math.sqrt(r2));
            // F = this.phys.c.clone().sub(bodies[i].phys.c).multiplyScalar(F).divideScalar(Math.sqrt(r2));
            this.phys.a.add(F.divideScalar(this.phys.m));
        }
    }

    // update position
    this.phys.v.add(this.phys.a.multiplyScalar(delta));
    this.phys.c.add(this.phys.v.clone().multiplyScalar(delta));

    // detect collision
    for (var i = bodies.length - 1; i >= 0; --i) {
        if (bodies[i] !== this) {
            if (this.phys.c.distanceTo(bodies[i].phys.c) <
                this.mesh.geometry.boundingSphere.radius + bodies[i].mesh.geometry.boundingSphere.radius) {
                this.remove = true;
            }
        }
    }
};

module.exports = Body;
