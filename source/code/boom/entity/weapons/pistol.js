Boom.Pistol = function( params ){
  this.type = Boom.Assets.world.ENTITY.PISTOL; //TODO: THIS SHOULD BE DONE IN A BETTER WAY
  this.cooldown = 350;
  this.last_shot = Boom.getCurrentTime();
  this.hud = {
    name: 'WEAPON',
    type:  Boom.Assets.world.ENTITY.PISTOL,
    icon: '<img class="boom-ui-icon" src="resources/ui/icons/pistol_add.png">'
  };
  this.position = params.position;
  this.rotation = params.rotation;
  this.scale = params.scale;
  Boom.Entity.call(this, {name: 'WEAPON_PistolEntity', addToScene: false, is_static: false, faction: params.faction, local:true});
};

Boom.Pistol.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Pistol,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    //Components
    var physics = new Boom.PhysicalComponent(
      {
        name: "pistol_physics",
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.weapons.pistol,
        scale: this.scale,
        position: this.position,
        rotation: this.rotation,
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
        ms: this.cooldown,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    
    var audio_shoot = new Boom.AudioComponent(
      {
        name: 'pistol_audio_shoot',
        sound: Boom.Assets.sounds.weapons.pistol.shoot,
        owner: this
      }
    );
    this.components[audio_shoot.name] = audio_shoot;

    var audio_empty = new Boom.AudioComponent(
      {
        name: 'pistol_audio_empty',
        sound: Boom.Assets.sounds.weapons.pistol.empty,
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

      var spawn = new THREE.Vector3( -6 , 4 , 0 );
      this.getObjectComponent().object.localToWorld(spawn);
      Boom.GameFactory.spawn(type, {direction: dir, spawn: spawn, faction: this.faction});
      this.components['pistol_animation_shoot'].animate();
      this.components['pistol_audio_shoot'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  },

  empty: function(){
    if( (Boom.getCurrentTime() - this.last_shot) >= this.cooldown ){
      this.components['pistol_audio_empty'].play();

      this.last_shot = Boom.getCurrentTime();
      return true;
    }
    return false;
  }

});
