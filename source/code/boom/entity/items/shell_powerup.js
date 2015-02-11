Boom.ShellPowerup = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.size = params.size || 12;
  this.texture = Boom.Assets.textures[this.type];
  this.value = params.value || 10;

  this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.INVENTORY, data: {name: Boom.Constants.Ammunition.SHELL, value: this.value}, type: Boom.Constants.Message.Action.INCREASE_AMMO, sender: this.type });

  Boom.Entity.call(this, {name: 'POWERUP_ITEM_BULLETS', is_singular: true});
};

Boom.ShellPowerup.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.ShellPowerup,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'powerup_item_shell_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0x000000,
        size: this.size,
        scale: new THREE.Vector3(0.5,0.75,1.0),
        texture: this.texture,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "powerup_item_shell_animation",
        object: physics.object,
        position: new THREE.Vector3(0, 0, 0), 
        rotation: new THREE.Vector3(0, 2*Math.PI, 0), 
        ms: 6000,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    animation.animate( Infinity );

    var audio = new Boom.AudioComponent(
      {
        name: 'SHELL_AUDIO',
        sound: Boom.Assets.sounds.items.shell_powerup,
        owner: this
      }
    );
    this.components[audio.name] = audio;
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
    this.components.SHELL_AUDIO.play();
  }
});