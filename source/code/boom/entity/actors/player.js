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
      owner: this
    });
    this.components[health.name] = health;

    var physics = new Boom.PhysicalComponent(
       {
        name: 'player_physics',
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

    var collision = new Boom.NeighbourCollisionActionComponent(
      {
        name: 'player_collision',
        distance: this.size,
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var gravity = new Boom.GravityActionComponent(
      {
        name: 'player_gravity',
        owner: this
      }
    );
    this.components[gravity.name] = gravity;

    var controls = new Boom.InputActionComponent( 
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
      owner: this
    });
    this.components[inventory.name] = inventory;

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
