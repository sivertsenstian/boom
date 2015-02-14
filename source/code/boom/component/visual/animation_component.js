Boom.AnimationComponent = function( params ) {
  params = params || {};

  //Object
  if (typeof(params.object) === "undefined" || params.object === null){
    throw Boom.Exceptions.ObjectNotDefinedException;
  }
  else{
    this.object = params.object;
  }
  //Animation
  this.type = params.type || Boom.Constants.Component.TYPE.ANIMATION;
  this.initial_position = params.position || new THREE.Vector3(0, 0, 0);
  this.initial_rotation = params.rotation || new THREE.Vector3(0, 0, 0);
  this.initial_scale = params.scale || new THREE.Vector3(0, 0, 0);

  this.initial_target_position = params.target_position || null;
  this.initial_target_rotation = params.target_rotation || null;
  this.initial_target_scale = params.target_scale || null;

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

    var animate_position = this.initial_position.clone();
    var animate_rotation = this.initial_rotation.clone();
    var animate_scale = this.initial_scale.clone();

    this.position = animate_position.add( this.object.position );
    this.rotation = animate_rotation.set( this.object.rotation.x + animate_rotation.x, 
                                                         this.object.rotation.y + animate_rotation.y, 
                                                         this.object.rotation.z + animate_rotation.z);

    this.scale = animate_scale.add( this.object.scale );

    this.target_position = this.initial_target_position ? this.initial_target_position.clone() : this.object.position.clone();
    this.target_rotation = this.initial_target_rotation ? this.initial_target_rotation.clone() : this.object.rotation.clone();
    this.target_scale = this.initial_target_scale ? this.initial_target_scale.clone() : this.object.scale.clone();

    try{
      //TWEEN.removeAll(); //TODO: FIX THIS - REMOVES ALL ANIMATIONS, SHOULD REMOVE CURRENT IF PLAYED AGAIN ??
      if (typeof(object) === "undefined" || object === null){
        throw Boom.Exceptions.ObjectNotDefinedException;
      }
      var pos = this.position.clone();
      var rot = this.rotation.clone();
      var scale = this.scale.clone();

      var tween_position = new TWEEN.Tween( pos ).to( this.target_position, this.ms).repeat( repeat );
      var tween_rotation = new TWEEN.Tween( rot ).to( this.target_rotation, this.ms).repeat( repeat );
      var tween_scale = new TWEEN.Tween( scale ).to( this.target_scale, this.ms).repeat( repeat );

      tween_position.onUpdate(function(){
        object.position.set( pos.x, pos.y, pos.z );
      });

      tween_rotation.onUpdate(function(){
        object.rotation.set( rot.x, rot.y, rot.z );
      });

      tween_scale.onUpdate(function(){
        object.scale.set( scale.x, scale.y, scale.z );
      });

      tween_position.easing( this.easing );
      tween_rotation.easing( this.easing );
      tween_scale.easing( this.easing );

      tween_position.start();
      tween_rotation.start();
      tween_scale.start();
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Animate');
    }
  }

});