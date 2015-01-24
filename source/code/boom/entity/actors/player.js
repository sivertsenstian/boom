Boom.Player = function( camera ){
  this.camera = camera;
  this.size = 6;
  this.height = 24;
  this.onGround = false;
  if( typeof this.camera === 'undefined' || this.camera === null){
      throw Boom.Exceptions.CameraMissingException;
  }

  Boom.Entity.call(this, {name: 'PLAYER_Entity', is_static: false});
};

Boom.Player.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Player,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name: 'player_physics',
        shape: Boom.Constants.Component.SPHERE,
        position: new THREE.Vector3(200, 50, 124),
        color: 0xFFFF00,
        size: this.size,
        height: this.height,
        mass: 100,
        friction: 0,
        restitution: 0.5,
        gravity: true,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var collision = new Boom.CollisionActionComponent(
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
        height: 100
      } 
    );
    this.components[basic_jump.name] = basic_jump;

    var weapon = new Boom.WeaponActionComponent({
      name: 'player_weapon',
      owner: this
    });
    this.components[weapon.name] = weapon;
    this.add( weapon.object, this.camera );

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
