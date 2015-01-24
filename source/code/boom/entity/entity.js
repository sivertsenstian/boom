Boom.Entities = Boom.Entities || {};
Boom.MergedEntities = Boom.MergedEntities || [];
Boom.Collidables = Boom.Collidables || [];

Boom.Entity = function( params ){
  params = params || {};
  this.id = Boom.guid();
  this.name = params.name || "EntityName";
  this.__addToScene = params.hasOwnProperty('addToScene') ? params.addToScene : true; //Defaults to new
  this.__isStatic = params.hasOwnProperty('is_static') ? params.is_static : true; //Defaults to static
  this.__isMerged = params.hasOwnProperty('is_merged') ? params.is_merged : false; //Defaults to un-merged
  this.__dispose = params.dispose || false;
  this.components = {};
  this.children = [];

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

  send: function( message ){
    try{
      for (component in this.components) {
        if (!this.components.hasOwnProperty(component)) {
            continue;
        }
        if (!message.hasOwnProperty('receiver')){
          throw Boom.Exceptions.NoMessageReceiverException;
        }
        if( message.receiver === Boom.Constants.Message.ALL || this.components[component].type === message.receiver){
          this.components[component].receive( message );
        }
      }
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Entity.send()');
    }
  },

  add: function( other, override ){
    this.children.push( other );
    var this_physical = this.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
    var other_physical = other.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
    if( this_physical && other_physical ){
      var parent = override || this_physical.object;
      parent.add( other_physical.object );
    }
  },

  remove: function( other ){
    for(var i = 0; i < this.children.length; i++ ){
      if( this.children[i].id === other.id ){
        var this_physical = this.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
        var other_physical = other.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
        if( this_physical && other_physical ){
          this_physical.object.remove( other_physical.object );
        }
        this.children.splice(i, 1);
      }
    }
  },

  child: function( id ){
    for(var i = 0; i < this.children.length; i++ ){
      if( this.children[i].id === id ){
        return this.children[i];
      }
    }
    return false;
  },

  dispose: function(){
    this.__dispose = true;
  },

  getComponent: function( c ){
    for (component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      if( this.components[component].type === c || this.components[component].name === c){
        return this.components[component];
      }
    }
    return false;
  }

};
