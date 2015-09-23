Boom.RocketLauncherPowerup = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.size = params.size || 12;
  this.texture = Boom.Assets.textures[this.type];
  this.value = params.value || Boom.Constants.Ammunition.ROCKET; //ammo used by  this weapon

  this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.INVENTORY, data: {name:  Boom.Assets.world.ENTITY.ROCKETLAUNCHER, value: this.value}, type: Boom.Constants.Message.Action.ADD_WEAPON, sender: this.type });

  Boom.Entity.call(this, {name: 'POWERUP_ITEM_ROCKETLAUNCHER', is_singular: true, score: 100});
};

Boom.RocketLauncherPowerup.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.RocketLauncherPowerup,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'powerup_item_rocketlauncher_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0x000000,
        size: this.size,
        scale: new THREE.Vector3(0.75,1.0,1.25),
        texture: this.texture,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "powerup_item_rocketlauncher_animation",
        object: physics.object,
        rotation: new THREE.Vector3(0, 2*Math.PI, 0), 
        ms: 6000,
        repeat: Infinity,
        yoyo: false,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    animation.animate();

    var audio = new Boom.AudioComponent(
      {
        name: 'ROCKETS_AUDIO',
        sound: Boom.Assets.sounds.weapons.rocketlauncher.pickup,
        owner: this
      }
    );
    this.components[audio.name] = audio;

    var animation_disappear = new Boom.AnimationComponent( 
      {
        name: "powerup_item_rocketlauncher_animation_disappear",
        object: physics.object,
        scale: physics.object.scale.clone().negate(),
        ms: 200,
        yoyo:false,
        owner: this
      }
    );
    this.components[animation_disappear.name] = animation_disappear;

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
    this.components.ROCKETS_AUDIO.play();

    this.components.powerup_item_rocketlauncher_animation_disappear.animate();
    //Call super    
    window.setTimeout(function( entity ){ 
      Boom.Entity.prototype.dispose.call(entity);
    }, 
    this.components.powerup_item_rocketlauncher_animation_disappear.ms, this);
  },

  //Registers the entity as a player-used entity
  process: function(){
    Boom.Constants.UI.PLAYER.STATS.ITEMS++;
    //Call super
    Boom.Entity.prototype.process.call(this);
  },

  //Adds entity to world-total in statistics
  register: function(){
    Boom.Constants.World.STATS.ITEMS++;
    //Call super
    Boom.Entity.prototype.register.call(this);
  }
});
