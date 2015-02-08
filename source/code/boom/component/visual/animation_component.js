Boom.AnimationComponent = function( params ) {
  params = params || {};

  //Object
  if (typeof(params.object) === "undefined" || params.object === null){
    throw Boom.Exceptions.ObjectNotDefinedException;
  }
  else{
    this.object = params.object
  }
  //Animation
  this.type = params.type || Boom.Constants.Component.TYPE.ANIMATION;
  this.position = params.position ? params.position.add( this.object.position ) : this.object.position;
  this.rotation = params.rotation ? params.rotation.set( this.object.rotation.x + params.rotation.x, 
                                                         this.object.rotation.y + params.rotation.y, 
                                                         this.object.rotation.z + params.rotation.z)  
                                                        : new THREE.Vector3(0, 0, 0);
  this.target_position = params.target_position ? params.target_position.clone() : this.object.position.clone();
  this.target_rotation = params.target_rotation ? params.target_rotation.clone() : this.object.rotation.clone();
  this.ms = params.ms || 1000;
  this.easing = params.easing || TWEEN.Easing.Linear.None;

  //Call super
  Boom.Component.call(this, params );

};

Boom.AnimationComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AnimationComponent,

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

  animate: function( repeat ){
    repeat = repeat || 0;
    var object = this.object;
    try{
      //TWEEN.removeAll(); TODO: FIX THIS ??
      if (typeof(object) === "undefined" || object === null){
        throw Boom.Exceptions.ObjectNotDefinedException;
      }
      var pos = this.position.clone();
      var rot = this.rotation.clone();
      var tween_position = new TWEEN.Tween( pos ).to( this.target_position, this.ms).repeat( repeat );
      var tween_rotation = new TWEEN.Tween( rot ).to( this.target_rotation, this.ms).repeat( repeat );

      tween_position.onUpdate(function(){
        object.position.set( pos.x, pos.y, pos.z );
      });

      tween_rotation.onUpdate(function(){
        object.rotation.set( rot.x, rot.y, rot.z );
      });

      tween_position.easing( this.easing );
      tween_rotation.easing( this.easing );

      tween_position.start();
      tween_rotation.start();
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Animate');
    }
  }

});