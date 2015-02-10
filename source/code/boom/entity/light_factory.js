Boom.LightFactory = function(){
  this.init();
};

Boom.LightFactory.prototype = {
  constructor: Boom.LightFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnLight: function( properties, params ){
    switch( properties['Boom.ID'] ){
      case Boom.Constants.Lights.AMBIENT:
        params.color = properties['Boom.COLOR'];
        return new Boom.AmbientLight( params );
      case Boom.Constants.Lights.DIRECTIONAL:
        params.color = properties['Boom.COLOR'];
        params.intensity = properties['Boom.INTENSITY'];
        return new Boom.DirectionalLight( params );
      case Boom.Constants.Lights.HEMISPHERE:
        params.color_ground = properties['Boom.COLOR_GROUND'];
        params.color_sky = properties['Boom.COLOR_SKY'];
        params.intensity = properties['Boom.INTENSITY'];
        return new Boom.HemisphereLight( params );
      case Boom.Constants.Lights.POINT:
        params.color = properties['Boom.COLOR'];
        params.intensity = properties['Boom.INTENSITY'];
        params.distance = properties['Boom.DISTANCE'];
        return new Boom.PointLight( params );             
      default:
        console.error( 'Light of type "' + type + '" does not exist!');
        break;
    }
  }
};