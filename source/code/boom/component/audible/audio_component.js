Boom.AudioComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.AUDIO;
  this.sound = params.sound;
  this.sound.volume = params.volume || this.sound.volume;
  this.ref = 2;
  this.rollof = 4;
  this.audio, this.position;
  //Call super
  Boom.Component.call(this, params );
  
};

Boom.AudioComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AudioComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
  },

  play: function(){
    var play_pos = this.owner.getObjectComponent().object.position.clone();
    this.position = this.owner.__local ? this.owner.getObjectComponent().object.localToWorld( play_pos ) : play_pos;
    this.audio = new THREE.Audio( Boom.Constants.PLAYER_LISTENER );
    this.audio.gain.gain.value = this.sound.volume;
    this.audio.load( this.sound.url );
    this.audio.setRefDistance( this.ref );
    this.audio.setRolloffFactor( this.rollof );
    this.audio.panner.setPosition(this.position.x, this.position.y, this.position.z);
  }

});