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

/*
Body.prototype.mass_val = function(F, a)
{
    private var MASS; 
    this.F = F; 
    this.a = a; 
    return MASS = (F / a); 
}; 

Body.prototype.acceleration_val = function(F, m)
{
    private var ACCELERATION; 
    this.F = F; 
    this.m = m; 
    return ACCELERATION = (F / m); 
}; 

Body.prototype.force_val = function(m, a)
{
    private var FORCE; 
    this.m = m; 
    this.a = a; 
    return FORCE = (m * a); 
}; 

Body.prototype.Force_xyz = function(m, ax, ay, az)
{
    this.force_xyz =
    {
        Fx_net: new THREE.Vector3(),
        Fy_net: new THREE.Vector3(),
        Fz_net: new THREE.Vector3()
    }; 

    this.forceX = function()
    {   
        this.force_xyz.Fx_net =  (this.m * this.ax); 
    }; 

    this.forceY = function()
    {
        this.force_xyz.Fy_net = (this.m * this.ay); 
    }

    this.forceZ = function()
    {
        this.force_xyz.Fz_net = (this.m * this.az); 
    }
}; 

Body.prototype.Acceleration_xyz = function(m, Fx, Fy, Fz)
{


}; 
*/

module.exports = Body;
