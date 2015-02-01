Boom.Alien = function( params ){
  this.size = 6;
  this.height = 24;
  this.onGround = Boom.Constants.FALSE;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  Boom.Entity.call(this, {name: 'ENEMY_ALIEN_Entity', is_static: false});
};

Boom.Alien.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Alien,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this); 
    var physics = new Boom.PhysicalComponent(
       {
        name: 'alien_physics',
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.enemies.alien,
        position: this.position,
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

    var collision = new Boom.NeighbourCollisionActionComponent(
      {
        name: 'alien_collision',
        distance: this.size,
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var gravity = new Boom.GravityActionComponent(
      {
        name: 'alien_gravity',
        owner: this
      }
    );
    this.components[gravity.name] = gravity;

    var weapon = new Boom.WeaponActionComponent({
      name: 'alien__weapon',
      owner: this
    });
    this.components[weapon.name] = weapon;

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
