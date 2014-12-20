Boom.Pistol = function(){
  Boom.Entity.call(this, {name: 'WEAPON_PistolEntity', addToScene: false, is_static: false});
  this.cooldown = 200;
  this.last_shot = Boom.getCurrentTime();
};

Boom.Pistol.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Pistol,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var physics = new Boom.PhysicalComponent(
      {
        name: "pistol_physics",
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.weapons.gun,
        scale: new THREE.Vector3(0.1, 0.1, 0.1),
        position: new THREE.Vector3(2, -2, -4),
        rotation: new THREE.Vector3(0 , -Math.PI/2, 0),
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "pistol_animation_shoot",
        object: physics.object,
        position: new THREE.Vector3(0, 0.25, 0.25), 
        rotation: new THREE.Vector3(0.25, 0, 0), 
        ms: 500,
        owner: this
      }
    );
    this.components[animation.name] = animation;

    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'pistol_audio_shoot',
        sound: Boom.Assets.sounds.weapons.gun.shoot,
        owner: this
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

  shoot: function( dir ){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      var _this = this;
    
      var spawn = new THREE.Vector3( 0 , 12 , 10 );
      this.components['pistol_physics'].object.localToWorld(spawn);
      new Boom.Bullet( dir, spawn );
      this.components['pistol_animation_shoot'].animate();
      this.components['pistol_audio_shoot'].play();

      this.last_shot = Boom.getCurrentTime();
    }
  }

});
