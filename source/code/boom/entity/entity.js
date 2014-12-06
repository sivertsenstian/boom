Boom.Entities = Boom.Entities || {};

Boom.Entity = function( params ){
  params = params || {};
  this.id = Boom.guid();
  this.name = params.name || "EntityName";
  this.__addToScene = params.hasOwnProperty('addToScene') ? params.addToScene : true; //Defaults to new
  this.__dispose = params.dispose || false;
  this.components = {};
  this.owner = params.owner || null;

  this.init();
};

Boom.Entity.prototype = {
  constructor: Boom.Entity,

  init: function(){
    try{
      Boom.Entities[this.id] = this;
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Entity');
    }
  },

  load: function(){

  },

  update: function(){

  },

  getObject: function(){
    if( this.components.hasOwnProperty( Boom.Constants.Component.NAME.PHYSICAL ) ){
      return this.components[Boom.Constants.Component.NAME.PHYSICAL].object;
    }
    return false;
  },

  getDirection: function() {

    // assumes the camera itself is not rotated

    var direction = new THREE.Vector3( 0, 0, -1 );
    var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
    var v = new THREE.Vector3();

    rotation.set( this.getObject().rotation.x, this.getObject().rotation.y, 0 );
    v.copy( direction ).applyEuler( rotation );
    
    return v;
  },

  add: function( other ){
    if( this.getObject() && other.getObject() ){
      this.getObject().add( other.getObject() );
    }
  },

  dispose: function(){
   /* console.log( "DISPOSING ENTITY ");
    console.log( this );*/
  }

};
