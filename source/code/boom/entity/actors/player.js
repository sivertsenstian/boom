Boom.Player = function( camera ){
  this.camera = camera;
  if( typeof this.camera === 'undefined' || this.camera === null){
      throw Boom.Exceptions.CameraMissingException;
  }

  Boom.Entity.call(this, {name: 'PLAYER_Entity'});
};

Boom.Player.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Player,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    this.speed = 5;
    var physics = new Boom.PhysicalComponent(
       {
        name: 'player_physics',
        shape: Boom.Constants.Component.SPHERE,
        position: new THREE.Vector3(64, 0, 64),
        color: 0xFFFF00,
        size: 6,
        mass: 100,
        friction: 0,
        restitution: 0,
        owner: this
      }
    );
    this.components[physics.name] = physics;

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
        speed: 5 
      } 
    );
    this.components[basic_movement.name] = basic_movement;

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
