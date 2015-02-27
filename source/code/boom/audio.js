Boom.Audio = function( params ){
  params = params || {};
  
  this.url = params.url || Boom.Assets.sounds.MISSING;
  this.volume = params.volume || 0.5;
  this.loop = params.loop || false;
  this.positional = params.hasOwnProperty('positional') ? params.positional : true;
  this.density = 0.0048;
  this.LOG2 = 1.442695;
  this.treshold = 0.05;

  this.sound = new Howl({
    urls: [this.url],
    loop: this.loop,
    volume: this.volume,
  });

  this.listener = new THREE.Vector3();
  this.volume_distance = 0;
  this.init();
};

Boom.Audio.prototype = {
  constructor: Boom.Audio,

  init: function(){

  },

  play: function( pos ){
    if( this.positional ){
      if( Boom.Constants.PLAYER && pos){
        this.listener = Boom.Constants.PLAYER.getObjectComponent().object.position.clone();
        this.volume_distance = Math.pow(2, - this.density * this.density * this.listener.distanceTo( pos ) * this.listener.distanceTo( pos ) * this.LOG2);
      }

      if( this.volume_distance > this.treshold){
        this.sound.volume( this.volume_distance * this.volume );
        this.sound.play();
      }
    }
    else{
      this.sound.volume( this.volume );
      this.sound.play();
    }
  }

};
