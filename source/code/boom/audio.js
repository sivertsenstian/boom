Boom.Audio = function( params ){
  params = params || {};
  
  this.url = params.url || Boom.Assets.sounds.MISSING;
  this.volume = params.volume || 0.5;
  this.loop = params.loop || false;

  this.init();
};

Boom.Audio.prototype = {
  constructor: Boom.Audio,

  init: function(){

  }

};
