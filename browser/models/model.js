require('../vendor/STLLoader');

// https://github.com/mrdoob/three.js/issues/447#issuecomment-55111928
var getCentroid = function(boundingBox) {
  var centroid = boundingBox.min.clone();
  centroid.add(boundingBox.max);
  centroid.divideScalar(2);

  return centroid;
};

var getBoxSize = function(boundingBox) {
  var sizeVector = boundingBox.max.clone();
  sizeVector.sub(boundingBox.min);
  return sizeVector.length();
};

// http://stackoverflow.com/a/12749570/358804
var centerCentroid = function(geometry) {
  geometry.computeBoundingBox();
  var centroid = getCentroid(geometry.boundingBox);
  var translation = new THREE.Matrix4();
  translation.makeTranslation( - centroid.x, - centroid.y, - centroid.z );
  geometry.applyMatrix(translation);
};

var scaleToFit = function(mesh) {
  var boxSize = getBoxSize(mesh.geometry.boundingBox);
  var scale = 200 / boxSize;
  mesh.scale.set(scale, scale, scale);
};

var placeInFrontOfCamera = function(mesh) {
  var offset = new THREE.Vector3(0, -1, -1);
  mesh.position.copy(offset);
};

var setInitialPlacement = function(mesh) {
  var geometry = mesh.geometry;
  geometry.computeBoundingBox();

  centerCentroid(geometry);
  placeInFrontOfCamera(mesh);
  scaleToFit(mesh);

  mesh.rotation.set( - Math.PI / 2, 0, 0 );
};


var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

var load = function(name, callback) {
  var loader = new THREE.STLLoader();
  loader.addEventListener('load', function(event) {
    var geometry = event.content;

    var mesh = new THREE.Mesh(geometry, material);
    setInitialPlacement(mesh);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    callback(mesh);
  });

  loader.load('/models/' + name + '.stl');
};


module.exports = {
  load: load
};
