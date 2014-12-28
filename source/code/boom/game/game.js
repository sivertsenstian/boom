Boom.Game = function() {
  Boom.Base.call(this);

  this.updated = false;
  this.firstLoad = true;
  this.firstPlay = true;
  this.mapWon = false;
  this.restartedLevel = false;
  
  //this.antialias = true;
  this.cameraFov = 75;
  this.cameraFar = 2000;

  //Game Components
  this.world;
};

Boom.Game.prototype = Boom.inherit(Boom.Base, {
  constructor: Boom.Game,

  init: function() {
    //Call super
    Boom.Base.prototype.init.call(this);
  },

  update: function(){
    try{
      //Call super
      Boom.Base.prototype.update.call(this);
      //Update entities
      for (id in Boom.Entities) {
        if (!Boom.Entities.hasOwnProperty(id)) {
            continue;
        }
        var entity = Boom.Entities[id];
        
        if(!entity.__isStatic){
          //console.log("Updating " + entity.name );
          entity.update();
        }

        if( entity.__addToScene && !entity.__isStatic ){
          var component = entity.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
          if ( component ){
            console.log("ADDING " + entity.name);
            this.scene.add( component.object );
          }
          entity.__addToScene = false;
        }

        if ( entity.__dispose ){
          var component = entity.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
          if ( component ){
            entity.dispose();
            this.scene.remove( component.object );
            delete Boom.Entities[id];
          }
        }

        //console.log(entity);
        //console.log(" ------------- ");
      }

      for (e in Boom.MergedEntities) {
        var entity = Boom.MergedEntities[e];
        if( !entity.__addToScene ){
          Boom.Collidables.push(entity.object);
          this.scene.add( entity.object );
          entity.__addToScene = true;
        }
      }

      //Update world
      this.world.update();
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Game.update()');
      this.requestAnimationFrameId = null;
    }
  },

  load: function(){
    try{
      //Player
      var p = new Boom.Player( this.camera );

      //World
      this.world = new Boom.World();

      //Build world
      this.world.build(this.scene);

      var totalGeom = new THREE.Geometry()
      var materials = [];
      for (id in Boom.Entities) {
        if (!Boom.Entities.hasOwnProperty(id)) {
            continue;
        }
        var entity = Boom.Entities[id];

        if(entity.__isStatic && !entity.__isMerged){
          var component = entity.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
          if ( component ){
            for ( var face in component.object.geometry.faces ) {
              component.object.geometry.faces[face].materialIndex = materials.length;
            }
            component.object.updateMatrix();
            totalGeom.merge( component.object.geometry, component.object.matrix );
            materials.push( component.object.material );
            entity.__isMerged = true;
          }
        }
      }

      var total = new THREE.Mesh(totalGeom, new THREE.MeshFaceMaterial( materials ));
      Boom.MergedEntities.push( { name: 'WALLS/GROUND', __addToScene: false, __isStatic: true, __isMerged: true, object: total });
      console.log( Boom.MergedEntities );
      console.log( Object.keys(Boom.Entities).length );
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Game.load()');
    }

    //Call super
    Boom.Base.prototype.load.call(this);

  }

});