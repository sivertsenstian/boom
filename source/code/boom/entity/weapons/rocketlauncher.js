Boom.RocketLauncher = function( params ){
  this.type = Boom.Assets.world.ENTITY.RocketLauncher; //TODO: THIS SHOULD BE DONE IN A BETTER WAY
  this.cooldown = 1000;
  this.last_shot = Boom.getCurrentTime();
  this.hud = {
    name: 'WEAPON',
    type:  Boom.Assets.world.ENTITY.ROCKETLAUNCHER,
    icon: '<img class="boom-ui-icon" src="resources/ui/icons/rocketlauncher_add.png">'
  };
  this.position = params.position;
  this.rotation = params.rotation;
  this.scale = params.scale;
  Boom.Entity.call(this, {name: 'WEAPON_RocketLauncherEntity', addToScene: false, is_static: false, faction: params.faction, local:true});
};

Boom.RocketLauncher.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.RocketLauncher,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    //Components
    var physics = new Boom.PhysicalComponent(
      {
        name: "rocketlauncher_physics",
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.weapons.rocketlauncher,
        scale: this.scale,
        position: this.position,
        rotation: this.rotation,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "rocketlauncher_animation_shoot",
        object: physics.object,
        position: new THREE.Vector3(0, 0, 0.50),
        ms: 175,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    
    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'rocketlauncher_audio_shoot',
        sound: Boom.Assets.sounds.weapons.rocketlauncher.shoot,
        owner: this
      }
    );
    this.components[audio_shoot.name] = audio_shoot;

    var audio_empty = new Boom.AudioComponent(
      {
        name: 'rocketlauncher_audio_empty',
        sound: Boom.Assets.sounds.weapons.rocketlauncher.empty,
        owner: this
      }
    );
    this.components[audio_empty.name] = audio_empty;

    var audio_equip = new Boom.AudioComponent(
      {
        name: 'rocketlauncher_audio_equip',
        sound: Boom.Assets.sounds.weapons.rocketlauncher.pickup,
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

      var spawn = new THREE.Vector3( -20 , 14 , 2 );
      this.getObjectComponent().object.localToWorld(spawn);
      Boom.GameFactory.spawn(type, {direction: dir, spawn: spawn, faction: this.faction});
      this.components['rocketlauncher_animation_shoot'].animate();
      this.components['rocketlauncher_audio_shoot'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  empty: function(){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      this.components['rocketlauncher_audio_empty'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  equip: function( equipper ){
    this.components['rocketlauncher_audio_equip'].play( equipper.position );
  }

});
