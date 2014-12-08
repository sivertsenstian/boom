Boom.Entities = Boom.Entities || {};

Boom.Entity = function( params ){
  params = params || {};
  this.id = Boom.guid();
  this.name = params.name || "EntityName";
  this.__addToScene = params.hasOwnProperty('addToScene') ? params.addToScene : true; //Defaults to new
  this.__dispose = params.dispose || false;
  this.components = {};
  this.owner = params.owner || null; //TODO: REMOVE THIS! msg system instead

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
    for (component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      this.components[component].load();
    }
  },

  update: function(){
    for (component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      this.components[component].update();
    }
  },

  getObject: function(){
    if( this.components.hasOwnProperty( Boom.Constants.Component.NAME.PHYSICAL ) ){
      return this.components[Boom.Constants.Component.NAME.PHYSICAL].object;
    }
    return false;
  },

  send: function( message ){
    for (component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      this.components[component].receive( message );
    }
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
