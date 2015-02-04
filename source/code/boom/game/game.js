Boom.Game = function() {
  Boom.Base.call(this);

  this.updated = false;
  this.firstLoad = true;
  this.firstPlay = true;
  this.mapWon = false;
  this.restartedLevel = false;
  
  //this.antialias = true;
  this.cameraFov = 75;
  this.cameraFar = 600; //OPTIMIZE - Performance draining???

  this.width = 800;
  this.height = 600;

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

        if( entity.__addToScene && (!entity.__isStatic || entity.__isStatic && entity.__singular) ){
          var component = entity.getObjectComponent();
          if ( component ){
            console.log("ADDING " + entity.name);
            this.scene.add( component.object );
          }
          entity.__addToScene = false;
        }

        if ( entity.__dispose ){
          var component = entity.getObjectComponent();
          if ( component ){
            console.log("DISPOSING " + entity.name);
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
      var current_map = Boom.Assets.world.MAP['TEST'];
      //var current_map = Boom.Assets.world.MAP['MAP01'];

      //Collisions
      Boom.GameGrid = new Boom.CollisionGrid( current_map );

      //World
      this.world = new Boom.World( current_map );
      this.scene.fog = this.world.fog; //TODO: figure out a way to to this without having to pass the scene to world

      //MERGE STATIC ENTITIES FOR OPTIMIZIATION 
      //TODO: MOVE THIS ? TO WHERE?
      var totalGeom = new THREE.Geometry();
      var materials = [new THREE.MeshLambertMaterial({ map: Boom.Assets.textures[Boom.Assets.world.ENTITY.MISSING] })];
      var material_index = {};
      //Add 'missing' texture for debug-purposes
      material_index[Boom.Assets.world.ENTITY.MISSING] = 0;
      for (id in Boom.Entities) {
        if (!Boom.Entities.hasOwnProperty(id)) {
            continue;
        }
        var entity = Boom.Entities[id];
        if(entity.__isStatic && !entity.__isMerged && !entity.__singular){
          var component = entity.getObjectComponent();
          if ( component ){
            for ( var face in component.object.geometry.faces ) {
              if(entity.type === null || entity.type === undefined){
                throw Boom.Exceptions.UndefinedEntityTypeException;
              }
              if(!material_index.hasOwnProperty(entity.type)){
                  materials.push(new THREE.MeshLambertMaterial({ map: Boom.Assets.textures[entity.type] }));
                  material_index[entity.type] = materials.length - 1;
              }
              if(Boom.Assets.textures[entity.type].sourceFile === ''){
                  component.object.geometry.faces[face].materialIndex = material_index[Boom.Assets.world.ENTITY.MISSING];
              }
              else{
                component.object.geometry.faces[face].materialIndex = material_index[entity.type];
              }
            }
            component.object.updateMatrix();
            totalGeom.merge( component.object.geometry, component.object.matrix );
            entity.__isMerged = true;
            delete Boom.Entities[id];
          }
        }
      }
      var total = new THREE.Mesh(totalGeom, new THREE.MeshFaceMaterial( materials ));
      Boom.MergedEntities.push( { name: 'MERGED_STATIC_STRUCTURES', __addToScene: false, __isStatic: true, __isMerged: true, object: total });
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Game.load()');
    }

    //Call super
    Boom.Base.prototype.load.call(this);

  }

});