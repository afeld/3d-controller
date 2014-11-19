var socket = require('../shared/socket');
var model = require('./model');
var DeviceOrientationControls = require('./DeviceOrientationControls');

var container, stats;

var camera, scene, renderer, mesh, controls;


function createCamera() {
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 150;
  camera.position.z = 250;
}

function createScene() {
  scene = new THREE.Scene();
}

function addLighting() {
  var ambient = new THREE.AmbientLight( 0x777777 );
  scene.add( ambient );

  var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
  directionalLight1.position.set( 0, 0, 1 );
  scene.add( directionalLight1 );

  var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
  directionalLight2.position.set( 0, 1, 0 );
  scene.add( directionalLight2 );
}

function loadTexture() {
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var texture = new THREE.Texture();

  var loader = new THREE.ImageLoader( manager );
  loader.load( 'assets/UV_Grid_Sm.jpg', function ( image ) {
    texture.image = image;
    texture.needsUpdate = true;
  } );
}

function initializeModel() {
  var $spinner = $('.loader');
  var loadModel = function(name) {
    $spinner.show();

    model.load(name, function(m){
      var oldMesh = mesh;
      mesh = m;

      controls = new DeviceOrientationControls(mesh);
      controls.connect();

      if (oldMesh) {
        scene.remove(oldMesh);
      }
      scene.add( mesh );

      $spinner.hide();
    });
  };

  var initialModel = $('.models li:first').text();
  loadModel(initialModel);

  $(window).on('hashchange', function() {
    var name = window.location.hash.replace(/^#/, '');
    loadModel(name);
  });
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
}

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  createCamera();
  createScene();
  addLighting();
  loadTexture();
  initializeModel();
  setupRenderer();

  window.addEventListener( 'resize', onWindowResize, false );
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


module.exports = {
  init: init,
  animate: animate
};
