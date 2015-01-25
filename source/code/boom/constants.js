Boom.Constants = {
  
  TRUE: '46e25702-b22f-4d18-a391-7f7e0bba137c',

  FALSE: '1cf21342-39c3-4bf0-865c-d28f19448112',

  World:{
    WIDTH: 32,
    HEIGHT: 32,
    SIZE: 24,
    GRAVITY: new THREE.Vector3(0, -6, 0),
    SKYBOX_SCALAR: 2,
    LAYER: {
      FLOOR: 0,
      WALLS: 1,
      CEILING: 2,
      COLLISION: 3,
      LIGHT: 4,
      ENTITIES: 5
    }

  },

  Component:{
    BOX: Boom.guid(),
    SPHERE: Boom.guid(),
    MODEL: Boom.guid(),
    TYPE: {
      BASIC: 'basic',
      PHYSICAL: 'physics',
      AUDIO: 'audio',
      ANIMATION: 'animation',
      INPUT: 'input',
      ACTION: 'action',
      WEAPON: 'weapon',
      UI: 'UI'
    }
  },

  Message: {
    ALL: Boom.guid(),
    Input: {
      FORWARD: Boom.guid(),
      BACKWARD: Boom.guid(),
      LEFT: Boom.guid(),
      RIGHT: Boom.guid(),
      LEFTCLICK: Boom.guid(),
      RIGHTCLICK: Boom.guid()
    },
    Action: {
      VELOCITY_FLAT: Boom.guid(),
      VELOCITY: Boom.guid(),
      GRAVITY: Boom.guid(),
      SHOOT: Boom.guid(),
      JUMP: Boom.guid(),
      LAND: Boom.guid(),
      HIT: Boom.guid()
    }
  },
  
  Objects:{
    FLOOR: Boom.guid(),
    SKYBOX: Boom.guid(),
    WALL: Boom.guid(),
    COLLECTION: Boom.guid(),
    CEILING: Boom.guid(),
    FOG: Boom.guid(),
    GRAVITY: Boom.guid(),
    LIGHT: Boom.guid(),
    DEBUG: Boom.guid(),
    RENDERER: Boom.guid(),
    CAMERA: Boom.guid(),
    SCENE: Boom.guid(),
    PLAYER: Boom.guid(),
    WEAPON: Boom.guid()

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
    FPS: 60,
    ANTIALIAS: false
  }


};