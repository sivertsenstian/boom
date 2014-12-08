Boom.Player = function( camera ){
  this.camera = camera;
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
        type: Boom.Constants.Component.SPHERE,
        position: new THREE.Vector3(64, 0, 64),
        color: 0xFFFF00,
        size: 6,
        mass: 100,
        friction: 0,
        restitution: 0
      }
    );
    this.components[physics.name] = physics;

    var controls = new Boom.InputComponent( this );
    this.components[controls.name] = controls;

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
