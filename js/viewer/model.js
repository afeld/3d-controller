require('../vendor/STLLoader');

var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

var load = function(callback) {
  var loader = new THREE.STLLoader();
  loader.addEventListener('load', function(event) {
    var geometry = event.content;
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set( 0, - 0.37, - 0.6 );
    mesh.rotation.set( - Math.PI / 2, 0, 0 );
    mesh.scale.set( 2, 2, 2 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    callback(mesh);
  });
  // http://www.thingiverse.com/thing:331035/#files
  loader.load('./assets/Robot_Maker_Faire_65pc.stl');
};


module.exports = {
  load: load
};
