var io = require('socket.io/node_modules/socket.io-client');
require('./vendor/STLLoader');
var DeviceOrientationControls = require('./DeviceOrientationControls');

var container, stats;

var camera, scene, renderer, mesh, controls;

init();
animate();


function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 150;
  camera.position.z = 250;

  // scene

  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0x777777 );
  scene.add( ambient );

  var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
  directionalLight1.position.set( 0, 0, 1 );
  scene.add( directionalLight1 );

  var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
  directionalLight2.position.set( 0, 1, 0 );
  scene.add( directionalLight2 );

  // texture

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {

    console.log( item, loaded, total );

  };

  var texture = new THREE.Texture();

  var loader = new THREE.ImageLoader( manager );
  loader.load( 'UV_Grid_Sm.jpg', function ( image ) {

    texture.image = image;
    texture.needsUpdate = true;

  } );

  // model

  var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

  var loader = new THREE.STLLoader();
  loader.addEventListener( 'load', function ( event ) {

    var geometry = event.content;
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, - 0.37, - 0.6 );
    mesh.rotation.set( - Math.PI / 2, 0, 0 );
    mesh.scale.set( 2, 2, 2 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    controls = new DeviceOrientationControls(mesh);
    controls.connect();

    scene.add( mesh );

  } );
  // http://www.thingiverse.com/thing:331035/#files
  loader.load( './Robot_Maker_Faire_65pc.stl' );

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );

  var socket = io();
  socket.on('drag', onDragEvent);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function scale(event) {
  var scalar = 1 - event.dy / 80;
  mesh.scale.multiplyScalar(scalar);
}

function pan(event) {
  var scalar = 2;
  var dx = event.dx * scalar;
  var dy = -1 * event.dy * scalar;
  var v = new THREE.Vector3(dx, dy, 0);

  // apply pan relative to rotation of model
  v.applyQuaternion(mesh.quaternion);

  mesh.position.add(v);
}

function onDragEvent(event) {
  if (mesh) {
    if (event.type === 'zoom') {
      scale(event);
    } else {
      pan(event);
    }
  }
}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  if (controls) {
    controls.update();
  }

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}
