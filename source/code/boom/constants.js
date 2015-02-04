Boom.Constants = {
  
  TRUE: '46e25702-b22f-4d18-a391-7f7e0bba137c',
  FALSE: '1cf21342-39c3-4bf0-865c-d28f19448112',
  PLAYER_CAMERA: null,
  HOSTILE: '63fc00f3-416d-43db-9fcf-315ae62c01e9',
  FRIENDLY: 'ba75d021-1988-4cbb-a6c5-05071b69572f',

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

  Entities:{
    PLAYER: '44ade206-60e5-43b7-aaa3-045e147a1c88',
    ALIEN:'0a89b621-e2ed-4618-ad90-57641ba6a563'
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
      HIT: 'hit',
      WEAPON: 'weapon',
      UI: 'UI',
      HUD: 'HUD',
      LIGHT: 'light'
    }
  },

  Lights:{
    AMBIENT: 'a45494b9-7876-428f-b339-626c75a1a10b',
    DIRECTIONAL: 'a3b53140-a4ee-43e3-bda2-fb0b37bc3527',
    HEMISPHERE: 'e37e182d-1c35-47cb-9463-678b916e9362',
    POINT: 'dc16baf2-c933-4db4-a071-89ef72679925'
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
      REDUCE_HEALTH: Boom.guid(),
      INCREASE_HEALTH: Boom.guid(),
      DEATH: Boom.guid()
    },
    Hit: {
      DISPOSE: Boom.guid(),
      DISPOSE_DEALDAMAGE: Boom.guid(),

    },
    HUD: {
      REGISTER: Boom.guid(),
      UPDATE: Boom.guid()
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