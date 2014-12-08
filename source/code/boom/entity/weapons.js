Boom.Pistol = function( owner ){
  Boom.Entity.call(this, {name: 'WEAPON_PistolEntity', addToScene: false, owner: owner});
};

Boom.Pistol.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Pistol,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var physics = new Boom.PhysicalComponent(
      {
        type: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.weapons.gun,
        scale: new THREE.Vector3(0.1, 0.1, 0.1),
        position: new THREE.Vector3(2, -2, -4),
        rotation: new THREE.Vector3(0 , -Math.PI/2, 0)
      }
    );
    this.components[physics.name] = physics;

    var obj = this.getObject();
    var animation = new Boom.AnimationComponent( 
      {
        object: obj,
        position: new THREE.Vector3(0, 0.25, 0.25), 
        rotation: new THREE.Vector3(0.25, 0, 0), 
        ms: 500
      } 
    );
    this.components[animation.name] = animation;

    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'SHOOT',
        sound: Boom.Assets.sounds.weapons.gun.shoot
      }
    );
    this.components[audio_shoot.name] = audio_shoot;
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Entity.prototype.update.call(this);
  },

  shoot: function(){
    var _this = this;
    
    var spawn = new THREE.Vector3( 0 , 6.5 , 0 );

    this.getObject().localToWorld(spawn);

    new Boom.Bullet( this.owner.controls.getDirection(), spawn );

    this.components[Boom.Constants.Component.NAME.ANIMATION].animate();
    this.components.SHOOT.play();
  }

});
