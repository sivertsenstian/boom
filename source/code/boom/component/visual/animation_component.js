Boom.AnimationComponent = function( params ) {
  params = params || {};
  //Object
  if (typeof(params.object) === "undefined" || params.object === null){
    throw Boom.Exceptions.ObjectNotDefinedException;
  }
  else{
    this.object = params.object;
  }

  this.initial_rotation = this.object.rotation.clone();
  this.rotation = params.rotation || null;

  this.initial_position = this.object.position.clone();
  this.position = params.position || null;

  this.initial_scale = this.object.scale.clone();
  this.scale = params.scale || null;

  this.ms = params.ms || 1000;
  this.easing = params.easing || TWEEN.Easing.Linear.None;
  this.permanent = params.hasOwnProperty('permanent') ? params.permanent : false;
  this.yoyo = params.hasOwnProperty('yoyo') ? params.yoyo : true;
  if(this.yoyo){
    this.repeat = 1;
  }
  else{
    this.repeat = params.repeat || 0;
  }

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

  animate: function(){
    try{
      if (typeof(this.object) === "undefined" || this.object === null){
        throw Boom.Exceptions.ObjectNotDefinedException;
      }
      var scope = this;

      //Rotation
      //Rotates from initial object-rotation to target-rotation given by (initial object rotation + given rotation)
      //Yoyos and repeats once to return to initial state by default
      if(this.rotation !== null){
        if(this.permanent){ //the object has moved its initial rotation after animation
          this.initial_rotation = this.object.rotation.clone();
        }
        this.start_rotation = this.initial_rotation.clone();
        this.target_rotation = new THREE.Vector3( this.start_rotation.x + this.rotation.x,
                                                  this.start_rotation.y + this.rotation.y,
                                                  this.start_rotation.z + this.rotation.z);

        this.animation = new TWEEN.Tween( this.start_rotation )
          .to( this.target_rotation, this.ms )
          .onUpdate( function () {
              scope.object.rotation.set( scope.start_rotation.x, scope.start_rotation.y, scope.start_rotation.z );
          } )
          .repeat( this.repeat )
          .yoyo( this.yoyo )
          .easing( this.easing )
          .start();
      }

      //Position
      //Moves from initial object-position to target-position given by (initial object position + given position)
      //Yoyos and repeats once to return to initial state by default
      if(this.position !== null){
        if(this.permanent){ //the object has moved its initial position after animation
          this.initial_position = this.object.position.clone();
        }
        this.start_position = this.initial_position.clone();
        this.target_position = new THREE.Vector3( this.start_position.x + this.position.x,
                                                  this.start_position.y + this.position.y,
                                                  this.start_position.z + this.position.z);

        this.animation = new TWEEN.Tween( this.start_position )
          .to( this.target_position, this.ms )
          .onUpdate( function () {
              scope.object.position.set( scope.start_position.x, scope.start_position.y, scope.start_position.z );
          } )
          .repeat( this.repeat )
          .yoyo( this.yoyo )
          .easing( this.easing )
          .start();
      }

      //Scale
      //Alters from initial object-scale to target-scale given by (initial object scale + given scale)
      //Yoyos and repeats once to return to initial state by default
      if(this.scale !== null){
        if(this.permanent){ //the object has altered its initial scale after animation
          this.initial_scale = this.object.scale.clone();
        }
        this.start_scale = this.initial_scale.clone();
        this.target_scale = new THREE.Vector3( this.start_scale.x + this.scale.x,
                                                  this.start_scale.y + this.scale.y,
                                                  this.start_scale.z + this.scale.z);

        this.animation = new TWEEN.Tween( this.start_scale )
          .to( this.target_scale, this.ms )
          .onUpdate( function () {
              scope.object.scale.set( scope.start_scale.x, scope.start_scale.y, scope.start_scale.z );
          } )
          .repeat( this.repeat )
          .yoyo( this.yoyo )
          .easing( this.easing )
          .start();
      }
      
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Animate');
    }
  },

  dispose: function(){
    TWEEN.remove(this.tween_position);
    TWEEN.remove(this.tween_rotation);
    TWEEN.remove(this.tween_scale);
     //Call super
    Boom.Component.prototype.dispose.call(this);
  }

});