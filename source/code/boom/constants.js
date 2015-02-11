Boom.Constants = {
  
  TRUE: '46e25702-b22f-4d18-a391-7f7e0bba137c',
  FALSE: '1cf21342-39c3-4bf0-865c-d28f19448112',
  PLAYER_CAMERA: null,
  HOSTILE: '63fc00f3-416d-43db-9fcf-315ae62c01e9',
  FRIENDLY: 'ba75d021-1988-4cbb-a6c5-05071b69572f',

  UI: {
    BASE_WIDTH:250,
    HEIGHT: 0,
    WIDTH: 0
  },

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
      ACTORS: 5,
      ITEMS: 6
    }

  },

  Actors:{
    PLAYER: '44ade206-60e5-43b7-aaa3-045e147a1c88',
    ALIEN:'0a89b621-e2ed-4618-ad90-57641ba6a563'
  },

  Items:{
    HEALTHPACK_POWERUP: 'db9fdc72-5195-49b2-9327-346919b644df',
    BULLET_POWERUP: '2bccdac5-f515-4926-b203-95334bc240a1',
    SHELL_POWERUP: '1d2b839d-151e-4f4b-bbb4-f1809ec9a558',
    PISTOL_POWERUP: 'e6a2d0c2-ff2d-46e5-b66e-2e94c541b709',
    SHOTGUN_POWERUP: 'e697f30b-77eb-4c32-9b0d-e1c363466b70'
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
      UI: 'UI',
      HUD: 'HUD',
      LIGHT: 'light',
      INVENTORY: 'inventory'
    }
  },

  Lights:{
    AMBIENT: 'a45494b9-7876-428f-b339-626c75a1a10b',
    DIRECTIONAL: 'a3b53140-a4ee-43e3-bda2-fb0b37bc3527',
    HEMISPHERE: 'e37e182d-1c35-47cb-9463-678b916e9362',
    POINT: 'dc16baf2-c933-4db4-a071-89ef72679925'
  },

  Weapon: {
    PISTOL: 'a55a989b-d8dc-46c9-8614-2fee2e52fc29',
    SHOTGUN: '3c8e662c-44e5-4348-b959-ccd74e09dec5'
  },

  Ammunition:{
    BULLET: '96fc013d-623b-4b0a-86ef-cdb9698d843f',
    SHELL: '02709816-7162-4c37-a9e7-b037cace65e0'
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
      INCREASE_AMMO: Boom.guid(),
      ADD_WEAPON: Boom.guid(),
      SET_WEAPON: Boom.guid(),
      DEATH: Boom.guid()
    },
    Hit: {
      DISPOSE: Boom.guid(),
      DISPOSE_DEALDAMAGE: Boom.guid(),
      ITEM_PICKUP: Boom.guid()

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