Boom.Debug = function(scene) {
  var self = this;
  this.scene = scene;
  this.visible = false;
  
  this.fpsCounter = {
    updateRate: 0,
    frameRate: 0,
    updates: 0,
    frames: 0,
    currentTime: Boom.getCurrentTime(),
  };
  
  this.drawDebugGeometry = function(item){
    switch(item.name){
      case Boom.Constants.Objects.FLOOR:
        self.registerItem(item);
        item.material = Boom.Constants.Debug.FLOOR();
        self.scene.add( self.createHelperArrow(item) );
        break;
      case Boom.Constants.Objects.WALL:
        self.registerItem(item);
        item.material = Boom.Constants.Debug.WALL();
        self.scene.add( self.createHelperArrow(item) );
        break;
      case Boom.Constants.Objects.SKYBOX:
        self.registerItem(item);
        item.material = Boom.Constants.Debug.SKYBOX();
        self.scene.add( self.createHelperArrow(item) );
        break;
    }
  };

  this.restoreOriginalGeometry = function(item){
    switch(item.name){
      case Boom.Constants.Objects.FLOOR:
      case Boom.Constants.Objects.WALL:
      case Boom.Constants.Objects.SKYBOX:
        if(self.ORIGINAL.hasOwnProperty(item.name)){
          item.material = self.ORIGINAL[item.name];
        }
        break;
      //TODO: FIGURE OUT WHY THIS IS FAILING
      //Uncaught TypeError: Cannot read property 'traverse' of undefined 
      /*case Boom.Constants.Objects.DEBUG:
        self.scene.remove(item);
        break;*/
      default:
        console.warn("=========================================");
        console.warn("Unable to restore item.name : " + item.name);
        console.warn(item);
        console.warn("=========================================");
        break;
    }
  };

  this.onKeyDown = function ( event ) {
    switch ( event.keyCode ) {

      case 220: /* | Chrome */ 
      case 172: /* | Firefox */ 
        this.visible = !this.visible;
        this.debugging = false;
        break;
    }
  };
  window.addEventListener( 'keydown', Boom.bind( this, this.onKeyDown ), false );
};

Boom.Debug.prototype =  {
  constructor: Boom.Debug,
  
  init: function(){
    //UPPER DIV CONTAINER
    this.container = document.createElement("DIV");
    this.container.style.cssText = 'position:absolute;left:0px;top:0;font-size:20px;color:white;';
    this.container.style.zIndex = '1';
    this.container.style.display = "none";
    document.body.appendChild( this.container );

    //FPS
    this.fps = document.createElement("SPAN");
    this.fps.style.color = "chartreuse";
    this.fps.innerHTML = "FPS: " + this.fpsCounter.frameRate;

    //UPS
    this.ups = document.createElement("SPAN");
    this.ups.style.color = "cyan";
    this.ups.innerHTML = "UPS: " + this.fpsCounter.updateRate;

    //AXIS DEFINITIONS
    this.axisHelper = document.createElement("DIV");
    this.axisHelper.style.display = "none";
    this.xHelper = document.createElement("DIV");
    this.xHelper.style.color = "#FF0000";
    this.xHelper.style.fontSize = "40px";
    this.xHelper.innerHTML = " X ";
    this.yHelper = document.createElement("DIV");
    this.yHelper.style.color = "#00FF00";
    this.yHelper.style.fontSize = "40px";
    this.yHelper.innerHTML = " Y ";
    this.zHelper = document.createElement("DIV");
    this.zHelper.style.color = "#0000FF";
    this.zHelper.style.fontSize = "40px";
    this.zHelper.innerHTML = " Z ";
    this.axisHelper.appendChild(this.xHelper);
    this.axisHelper.appendChild(this.yHelper);
    this.axisHelper.appendChild(this.zHelper);
    

    this.container.appendChild( this.fps );
    this.container.appendChild( this.ups );
    this.container.appendChild( this.axisHelper );

    this.ORIGINAL = {};
  },

  update: function(){
    //FPS
    this.ups.innerHTML = " UPDATERATE: " + this.fpsCounter.updateRate;
    this.fps.innerHTML = " FRAMERATE: " + this.fpsCounter.frameRate;
    this.container.style.display = "block";
    
    if(this.visible && Object.keys(this.ORIGINAL).length === 0){ //Turn On Debug-Mode
      //AXIS-HELPER
      this.axisHelper.style.display = "block";

      //Gravity
      this.ORIGINAL[Boom.Constants.Objects.GRAVITY] = Boom.Constants.World.GRAVITY;
      this.scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

      //Fog
      if(!this.ORIGINAL.hasOwnProperty(Boom.Constants.Objects.FOG)){
        this.ORIGINAL[Boom.Constants.Objects.FOG] = this.scene.fog.density;
      }
      this.scene.fog.density = 0;
      
      //Geometry
      this.scene.traverse(this.drawDebugGeometry);
    }
    else if (!this.visible && Object.keys(this.ORIGINAL).length > 0){//Turn Off Debug-Mode if originals are defined
      //AXIS-HELPER
      this.axisHelper.style.display = "none";

      //Gravity
      if(this.ORIGINAL.hasOwnProperty(Boom.Constants.Objects.GRAVITY)){
        this.scene.setGravity(this.ORIGINAL[Boom.Constants.Objects.GRAVITY]);
      }

      //Fog
      if(this.ORIGINAL.hasOwnProperty(Boom.Constants.Objects.FOG)){
        this.scene.fog.density = this.ORIGINAL[Boom.Constants.Objects.FOG];
      }

      //Geometry
      this.removeHelpers();
      this.scene.traverse(this.restoreOriginalGeometry);

      //Reset originals
      this.ORIGINAL = {};
    }
  },

  registerItem: function(item){
    var name = item.name;
    if(!this.ORIGINAL.hasOwnProperty(name)){
      this.ORIGINAL[name] = item.material;
    }
  },

  createHelperArrow: function(item, scalar, origin){
    if(typeof(scalar) === "undefined"){
      scalar = 1;
    }
    if(typeof(origin) === "undefined"){
      origin = false;
    }
    //Helper axis
    var origin = origin ? new THREE.Vector3( 0, 0, 0 ) : item.position;
    var length = (Boom.Constants.World.SIZE / 2) * scalar;
    var debug_arrow = new THREE.Object3D();
    debug_arrow.add(new THREE.ArrowHelper( new THREE.Vector3( 1, 0, 0 ), origin, length, Boom.Constants.Colors.X ));
    debug_arrow.add(new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), origin, length, Boom.Constants.Colors.Y ));
    debug_arrow.add(new THREE.ArrowHelper( new THREE.Vector3( 0, 0, 1 ), origin, length, Boom.Constants.Colors.Z ));
    debug_arrow.name = Boom.Constants.Objects.DEBUG;
    return debug_arrow;
    //this.scene.add(debug_arrow); 
  },

  removeHelpers: function(){
    for(var i = this.scene.children.length - 1; i >= 0; i--){
      var item = this.scene.children[i];
      if(item.name === Boom.Constants.Objects.DEBUG){
        this.scene.remove(item);
      }
    }
  }
};


Boom.Exceptions = {
  ObjectNotDefinedException: "Object is not defined",
  OwnerMissingException: "No Owner was defined",
  NoMessageReceiverException: "No Receiver was defined",
  CameraMissingException: "No Camera was defined",
  UndefinedEntityTypeException: "No Entity.type defined",
  DuplicateItemInHashException: 'Key already exists in hash',
  ItemNotDefinedInHashException: 'Key does not exist in hash',
  ComponentMustBeDefinedFirstException: 'This component MUST be defined first for the entity - and it isnt'
};