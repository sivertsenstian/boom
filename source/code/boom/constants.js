var Boom;
Boom = Boom || {};

Boom.Constants = {
  World:{
    WIDTH: 32,
    HEIGHT: 32,
    SIZE: 24,
    GRAVITY: new THREE.Vector3(0, -200, 0),
    SKYBOX_SCALAR: 2

  },

  Component:{
    BOX: 0,
    SPHERE: 1,
    MODEL: 2,
    NAME: {
      PHYSICAL: 'physics',
      AUDIO: 'audio',
      ANIMATION: 'animation',
      INPUT: 'input'
    }
  },
  
  Objects:{
    FLOOR: 0,
    SKYBOX: 1,
    WALL: 2,
    COLLECTION: 3,
    CEILING: 4,
    FOG: 66,
    GRAVITY: 77,
    LIGHT: 88,
    DEBUG: 99,
    RENDERER: 198,
    CAMERA: 199,
    SCENE: 200,
    PLAYER: 300,
    WEAPON: 500

  },

  Debug:{
    FLOOR: function(){ 
      var t = new THREE.ImageUtils.loadTexture( '/resources/DEBUG/floor.png' );
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set( Boom.Constants.World.WIDTH, Boom.Constants.World.HEIGHT );
      return new THREE.MeshBasicMaterial( { map: t, side: THREE.DoubleSide });
    },
    WALL: function(){ return new THREE.MeshBasicMaterial({color: 0xFF00FF, wireframe: true})},
    SKYBOX: function(){ return new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe: true})}
  },

  Colors:{
    DEFAULT: 0x00FF00,
    X: 0xFF0000,
    Y: 0x00FF00,
    Z: 0x0000FF,
    CLEAR: 0x000000
  },

  Base:{
    FOV: 90,
    NEAR: 0.1,
    FAR: 1000,
    TIMESTEP: 0.01666,
    ANTIALIAS: true
  }


};