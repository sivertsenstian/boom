Boom.DragonMouth = function( params ){
  this.type = Boom.Assets.world.ENTITY.DRAGONFIRE; //TODO: THIS SHOULD BE DONE IN A BETTER WAY
  this.cooldown = 1000;
  this.last_shot = Boom.getCurrentTime();
  this.hud = {};
  this.position = params.position;
  this.rotation = params.rotation;
  this.scale = params.scale;
  this.shots_per_burst = 8;
  this.spread = 0.10;
  Boom.Entity.call(this, {name: 'WEAPON_DragonMouthEntity', addToScene: false, is_static: false, faction: params.faction, local:true});
};

Boom.DragonMouth.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.DragonMouth,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    //Components
    var physics = new Boom.PhysicalComponent(
      {
        name: "dragonmouth_physics",
        shape: Boom.Constants.Component.BOX, 
        scale: this.scale,
        color: 0xFF0000,
        position: this.position,
        rotation: this.rotation,
        owner: this
      }
    );
    this.components[physics.name] = physics;
    
    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'dragonmouth_audio_shoot',
        sound: Boom.Assets.sounds.weapons.dragonmouth.shoot,
        owner: this
      }
    );
    this.components[audio_shoot.name] = audio_shoot;

    var audio_empty = new Boom.AudioComponent(
      {
        name: 'dragonmouth_audio_empty',
        sound: Boom.Assets.sounds.weapons.dragonmouth.empty,
        owner: this
      }
    );
    this.components[audio_empty.name] = audio_empty;
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

      var spawn = new THREE.Vector3( 0 , 0 , 0 );
      this.getObjectComponent().object.localToWorld(spawn);
      for (var i = 0; i < this.shots_per_burst; i++) {
          var spread_dir = new THREE.Vector3(dir.x + Boom.randomRange(-this.spread, this.spread), 
                                      dir.y + Boom.randomRange(-this.spread, this.spread), 
                                      dir.z + Boom.randomRange(-this.spread, this.spread)
          );
          Boom.GameFactory.spawn(Boom.Constants.Ammunition.DRAGONFIRE, { direction: spread_dir, spawn: spawn, faction: this.faction });
      }

      this.components['dragonmouth_audio_shoot'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  empty: function(){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      this.components['dragonmouth_audio_empty'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  equip: function(){
  }

});
