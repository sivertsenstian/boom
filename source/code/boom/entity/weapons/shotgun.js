Boom.Shotgun = function( params ){
  this.type = Boom.Assets.world.ENTITY.SHOTGUN; //TODO: THIS SHOULD BE DONE IN A BETTER WAY
  this.cooldown = 800;
  this.last_shot = Boom.getCurrentTime();
  this.hud = {
    name: 'WEAPON',
    type:  Boom.Assets.world.ENTITY.SHOTGUN,
    icon: '<img class="boom-ui-icon" src="resources/ui/icons/shotgun_add.png">',
  };
  this.shells_per_burst = 8;
  this.spread = 0.05;
  this.position = params.position;
  this.rotation = params.rotation;
  this.scale = params.scale;
  Boom.Entity.call(this, {name: 'WEAPON_ShotgunEntity', addToScene: false, is_static: false, faction: params.faction, local:true});
};

Boom.Shotgun.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Shotgun,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    //Components
    var physics = new Boom.PhysicalComponent(
      {
        name: "shotgun_physics",
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.weapons.shotgun,
        scale: this.scale,
        position: this.position,
        rotation: this.rotation,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "shotgun_animation_shoot",
        object: physics.object,
        position: new THREE.Vector3(0, 0.25, 0.25), 
        rotation: new THREE.Vector3(0.25, 0, 0), 
        ms: 175,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    
    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'shotgun_audio_shoot',
        sound: Boom.Assets.sounds.weapons.shotgun.shoot,
        owner: this
      }
    );
    this.components[audio_shoot.name] = audio_shoot;

    var audio_empty = new Boom.AudioComponent(
      {
        name: 'shotgun_audio_empty',
        sound: Boom.Assets.sounds.weapons.shotgun.empty,
        owner: this
      }
    );
    this.components[audio_empty.name] = audio_empty;

    var audio_equip = new Boom.AudioComponent(
      {
        name: 'shotgun_audio_equip',
        sound: Boom.Assets.sounds.weapons.shotgun.pickup,
        owner: this
      }
    );
    this.components[audio_equip.name] = audio_equip;
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Entity.prototype.update.call(this);
  },

  shoot: function( dir, type ){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      var _this = this;

      var spawn = new THREE.Vector3( -6 , 4 , 0 );
      this.getObjectComponent().object.localToWorld(spawn);
      for(var i = 0; i < this.shells_per_burst; i++){
        var spread_dir = new THREE.Vector3(dir.x + Boom.randomRange(-this.spread, this.spread), 
                                           dir.y + Boom.randomRange(-this.spread, this.spread), 
                                           dir.z + Boom.randomRange(-this.spread, this.spread)
                                           );
        Boom.GameFactory.spawn(type, {direction: spread_dir, spawn: spawn, faction: this.faction});
      }
      this.components.shotgun_animation_shoot.animate();
      this.components.shotgun_audio_shoot.play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  empty: function(){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      this.components.shotgun_audio_empty.play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  equip: function( equipper ){
    this.components['shotgun_audio_equip'].play( equipper.position );
  }

});
