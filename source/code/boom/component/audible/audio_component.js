Boom.AudioComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.AUDIO;
  this.sound = params.sound;
  this.sound.volume = params.volume || this.sound.volume;
  this.ref = 1;
  this.rollof = 1;
  this.audio = null;
  this.position = new THREE.Vector3(0, 0, 0);
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
    try{ //try to retrieve position from owner
      var owner_obj = this.owner.getObjectComponent().object;
      var play_pos = owner_obj.position.clone();
      this.position = this.owner.__local ? owner_obj.localToWorld( play_pos ) : play_pos;
    }
    catch( error ){ //if not possible keep standard 0.0.0 position
      //continue
      //TODO: LOG HERE ?
    }
      
    this.audio = new THREE.Audio( Boom.Constants.PLAYER_LISTENER );
    this.audio.gain.gain.value = this.sound.volume;
    this.audio.load( this.sound.url );
    this.audio.setRefDistance( this.ref );
    this.audio.setRolloffFactor( this.rollof );
    this.audio.panner.setPosition(this.position.x, this.position.y, this.position.z);
  }

});