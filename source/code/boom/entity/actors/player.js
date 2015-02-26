Boom.Player = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.camera = Boom.Constants.PLAYER_CAMERA;
  this.size = 1;
  this.height = 24;
  this.onGround = Boom.Constants.FALSE;
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  if( typeof this.camera === 'undefined' || this.camera === null){
      throw Boom.Exceptions.CameraMissingException;
  }

  Boom.Entity.call(this, {name: 'PLAYER_Entity', is_static: false, faction: Boom.Constants.FRIENDLY});
};

Boom.Player.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Player,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var hud = new Boom.HUDComponent({
      name: 'player_HUD',
      owner: this
    });
    this.components[hud.name] = hud;

    var health = new Boom.HealthActionComponent({
      name: 'player_health',
      player: true,
      value: 100,
      owner: this
    });
    this.components[health.name] = health;

    var physics = new Boom.PhysicalComponent(
       {
        name: 'player_physics',
        update_collision: true,
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0xFFFF00,
        size: this.size,
        height: this.height,
        gravity: true,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var wall_collision = new Boom.NeighbourCollisionActionComponent(
      {
        name: 'player_wall_collision',
        distance: this.size,
        owner: this
      }
    );
    this.components[wall_collision.name] = wall_collision;


    var item_pickup_collision = new Boom.PreciseItemCollisionActionComponent(
      {
        name: 'player_item_collision',
        owner: this
      }
    );
    this.components[item_pickup_collision.name] = item_pickup_collision;

    var trigger_collision = new Boom.PreciseTriggerCollisionActionComponent(
      {
        name: 'player_trigger_collision',
        owner: this
      }
    );
    this.components[trigger_collision.name] = trigger_collision;

    var gravity = new Boom.GravityActionComponent(
      {
        name: 'player_gravity',
        owner: this
      }
    );
    this.components[gravity.name] = gravity;

    var controls = new Boom.PlayerInputActionComponent( 
      { 
        camera: this.camera, 
        object: physics.object, 
        name: 'player_controls', 
        owner: this 
      } 
    );
    this.components[controls.name] = controls;

    var basic_movement = new Boom.MovementActionComponent( 
      { 
        name: 'player_movement', 
        owner: this, 
        speed: 3.5
      } 
    );
    this.components[basic_movement.name] = basic_movement;

    var basic_jump = new Boom.JumpActionComponent( 
      { 
        name: 'player_jump', 
        owner: this, 
        height: 60
      } 
    );
    this.components[basic_jump.name] = basic_jump;

    var inventory = new Boom.InventoryComponent({
      name: 'player_inventory',
      camera: this.camera,
      player: true,
      owner: this
    });
    this.components[inventory.name] = inventory;

    var basic_sprint = new Boom.SprintActionComponent( 
      { 
        name: 'player_sprint', 
        owner: this
      } 
    );
    this.components[basic_sprint.name] = basic_sprint;

    var crosshair = new Boom.UiComponent({
      name: 'player_crosshair',
      camera: this.camera,
      material: new THREE.MeshBasicMaterial(),
      geometry: new THREE.CircleGeometry( 0.02, 25 ),
      position: new THREE.Vector3(0, 0, -6),
      color: 0xFFA500,
      owner: this
    });
    this.components[crosshair.name] = crosshair;

    var death = new Boom.DeathActionComponent({
      name: 'player_death',
      owner: this
    });
    this.components[death.name] = death;

    var win = new Boom.WinActionComponent({
      name: 'player_win',
      owner: this
    });
    this.components[win.name] = win;

    var death_audio = new Boom.AudioComponent(
      {
        name: 'DEATH_AUDIO',
        sound: Boom.Assets.sounds.player.death,
        owner: this
      }
    );
    this.components[death_audio.name] = death_audio;

    var win_audio = new Boom.AudioComponent(
      {
        name: 'WIN_AUDIO',
        sound: Boom.Assets.sounds.player.win,
        owner: this
      }
    );
    this.components[win_audio.name] = win_audio;

    this.load();
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
  }


});
