var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.y = 150;
camera.position.z = 250;

module.exports = camera;
