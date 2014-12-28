Boom.CollisionActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.rays = [
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-1, 0, 1)
    ];
  this.caster = new THREE.Raycaster();
  this.distance = params.distance || 1;

  this.events = [Boom.Constants.Message.Action.VELOCITY];

  //Call super
  Boom.Component.call(this, params );
};

Boom.CollisionActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.CollisionActionComponent,

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

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      var physical = this.owner.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
      switch( message.type ){
        case Boom.Constants.Message.Action.VELOCITY:
          //console.log(" CHecking collision!");
          //console.log(message);
          // For each ray
          for (i = 0; i < this.rays.length; i += 1) {
            // We reset the raycaster to this direction
            this.caster.set(physical.object.position, this.rays[i]);
            // Test if we intersect with any obstacle mesh
            collisions = this.caster.intersectObjects(Boom.Collidables);
            // And disable that direction if we do
            if (collisions.length > 0 && collisions[0].distance <= this.distance) {
              // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
              if ((i === 0 || i === 1 || i === 7) && message.data.z > 0) {
                message.data.z = 0;
              } else if ((i === 3 || i === 4 || i === 5) && message.data.z < 0) {
                message.data.z = 0;
              }
              if ((i === 1 || i === 2 || i === 3) && message.data.x > 0) {
                message.data.x = 0;
              } else if ((i === 5 || i === 6 || i === 7) && message.data.x < 0) {
                message.data.x = 0;
              }
            }
          }
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
      var physical_msg = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, data: message.data, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
      //console.log('sending');
      //console.log(physical_msg);
      this.send( physical_msg );
    }
  }

});