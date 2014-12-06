Boom.Component = function( params ){
  //this.name = params.name || 'UnnamedComponent';
  this.init();
};

Boom.Component.prototype = {
  constructor: Boom.Component,

  init: function(){

  },

  load: function(){

  },

  update: function(){
    
  }

};


/////////////////////////////////// PhysicalComponent //////////////////////////
Boom.PhysicalComponent = function( params ) {
  params = params || {};
  //Physical
  this.TYPE = params.type || Boom.Constants.Component.BOX;
  this.name = params.name || Boom.Constants.Component.NAME.PHYSICAL;
  this.model = params.model || null;
  this.color = params.color || 0xFFFFFF;
  this.scale = params.scale || new THREE.Vector3(1, 1, 1);
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.rotation = params.rotation || new THREE.Vector3(0, 0, 0);
  this.mass = params.mass || 0;
  this.size = params.size || 1;
  this.friction = params.friction || 0;
  this.restitution  = params.restitution  || 0;
  this.castShadow = params.castShadow || false;

  //Call super
  Boom.Component.call(this, params );
};

Boom.PhysicalComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PhysicalComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = undefined;
    switch ( this.TYPE ){
      case Boom.Constants.Component.BOX:
        this.object = new Physijs.BoxMesh ( 
          new THREE.BoxGeometry(this.size, this.size, this.size),
          Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: this.color }), this.friction, this.restitution), this.mass
        );

        break;
      case Boom.Constants.Component.SPHERE:
        this.object = new Physijs.BoxMesh ( 
          new THREE.SphereGeometry(this.size, this.size * 6, this.size * 8),
          Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: this.color }), this.friction, this.restitution), this.mass
        );
        break;
      case Boom.Constants.Component.MODEL:
        this.object = this.model;
        break;
      default:
        Boom.handleError( " ERROR: Component TYPE not defined: '" + this.TYPE + "'", "Boom.PhysicalComponent");
    }

    this.object.position.set( this.position.x, this.position.y, this.position.z );
    this.object.rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
    this.object.scale.set( this.scale.x, this.scale.y, this.scale.z );
    this.object.castShadow = this.castShadow;

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);


  }

});

/////////////////////////////////// AudioComponent(?) //////////////////////////
Boom.AudioComponent = function( params ) {
  params = params || {};
  this.name = params.name || Boom.Constants.Component.NAME.AUDIO;
  this.sound = new Howl(
    {
      urls: [ params.sound ]
    }
  );

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

/////////////////////////////////// AnimationComponent(?) //////////////////////////
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
  this.name = params.name || Boom.Constants.Component.NAME.ANIMATION;
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

  animate: function(){
    var object = this.object;
    try{
      TWEEN.removeAll();
      if (typeof(object) === "undefined" || object === null){
        throw Boom.Exceptions.ObjectNotDefinedException;
      }
      var pos = this.position.clone();
      var rot = this.rotation.clone();
      var tween_position = new TWEEN.Tween( pos ).to( this.target_position, this.ms);
      var tween_rotation = new TWEEN.Tween( rot ).to( this.target_rotation, this.ms);

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
