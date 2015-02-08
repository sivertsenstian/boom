Boom.ItemFactory = function(){
  this.init();
};

Boom.ItemFactory.prototype = {
  constructor: Boom.ItemFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnItem: function( type, params ){
    switch( type ){
      case Boom.Constants.Items.HEALTHPACK:
        return new Boom.Healthpack( params );
        break;
      case Boom.Constants.Items.BULLETS:
        return new Boom.Bullets( params );
        break;  
      default:
        console.error( 'Item of type "' + type + '" does not exist!');
        break;
    }
  }
};