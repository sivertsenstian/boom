Boom.AudioComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.AUDIO;
  this.sound = params.sound || Boom.Assets.sounds.MISSING;
  this.sound.volume(parseFloat(params.volume) || 1.0);

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
    this.sound.play();
  }

});