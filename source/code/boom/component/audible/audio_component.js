Boom.AudioComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.AUDIO;
  this.sound = params.sound;
  this.sound.volume = params.volume || this.sound.volume;
  this.ref = 4;
  this.rollof = 10;
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
    this.position = this.owner.__local ? this.owner.getObjectComponent().object.localToWorld( this.owner.getObjectComponent().object.position ) :
                                        this.owner.getObjectComponent().object.position;
    
    /*var sound = new THREE.Audio( Boom.Constants.PLAYER_LISTENER );                                        
    sound.gain.gain.value = this.volume;
    sound.load( this.sound.urls(0)[0] );
    sound.setRefDistance( 20 );
    sound.setRolloffFactor( 10 );
    sound.panner.setPosition(position.x, position.y, position.z);*/
    this.audio = new THREE.Audio( Boom.Constants.PLAYER_LISTENER );
    this.audio.gain.gain.value = this.sound.volume;
    this.audio.load( this.sound.url );
    this.audio.setRefDistance( this.ref );
    this.audio.setRolloffFactor( this.rollof );
    this.audio.panner.setPosition(this.position.x, this.position.y, this.position.z);
  }

});