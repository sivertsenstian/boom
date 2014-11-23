Boom.Animation = function( params ){
  this.name = "AnimationName";
  
  //Defaults
  this.position = params.position ? params.position : new THREE.Vector3(0, 0, 0);
  this.rotation = params.rotation ? params.rotation : new THREE.Vector3(0, 0, 0);
  this.target_position = params.target_position ? params.target_position.clone() : new THREE.Vector3(0, 0, 0);
  this.target_rotation = params.target_rotation ? params.target_rotation.clone() : new THREE.Vector3(0, 0, 0);
  this.ms = params.ms ? params.ms : 1000;
  this.easing = params.easing ? params.easing : TWEEN.Easing.Linear.None;
};

Boom.Animation.prototype = {
  constructor: Boom.Animation
};

Boom.Animate = function( object, animation ){
  try{
    TWEEN.removeAll();
    if (typeof(object) === "undefined" || object === null){
      throw Boom.Exceptions.ObjectNotDefinedException;
    }
    var pos = animation.position.clone();
    var rot = animation.rotation.clone();
    var tween_position = new TWEEN.Tween( pos ).to( animation.target_position, animation.ms);
    var tween_rotation = new TWEEN.Tween( rot ).to( animation.target_rotation, animation.ms);

    tween_position.onUpdate(function(){
      object.position.set( pos.x, pos.y, pos.z );
    });

    tween_rotation.onUpdate(function(){
      object.rotation.set( rot.x, rot.y, rot.z );
    });

    tween_position.easing( animation.easing );
    tween_rotation.easing( animation.easing );

    tween_position.start();
    tween_rotation.start();
  }
  catch( error ){
    Boom.handleError( error , 'Boom.Animate');
  }
};

