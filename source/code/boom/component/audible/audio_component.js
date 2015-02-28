Boom.AudioComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.AUDIO;
  this.object = params.sound;
  this.object.volume = params.volume || this.object.volume;
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

  play: function( position ){
    if(typeof(position) !== 'undefined'){
      this.object.play( position );
    }
    else{
      try{ //try to retrieve position from owner
        var owner_obj = this.owner.getObjectComponent().object;
        var play_pos = owner_obj.position.clone();
        this.position = this.owner.__local ? owner_obj.localToWorld( play_pos ) : play_pos;
      }
      catch( error ){ //if not possible keep standard 0.0.0 position
        //continue
        //TODO: LOG HERE ?
      }
      this.object.play( this.position );
    }
  },

  dispose: function(){
    //Call super
    Boom.Component.prototype.dispose.call(this);
  }

});