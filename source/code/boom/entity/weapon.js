Boom.Weapon = function( owner ) {
  this.owner = owner;

  //Basic Gun
  var params = {  mass: 0, 
              size: 0.5, 
              scale: new THREE.Vector3(1.5, 1, 4),
              position: new THREE.Vector3(2, -2, -3),
              rotation: new THREE.Vector3(0, 0, 0),
              color: 0x008BAE
          };
  
  Boom.Entity.call( this, params );

  this.object.name = Boom.Constants.Objects.WEAPON;
  this.animation = new Boom.Animation({ 
                       target_position: this.object.position,
                       target_rotation: this.object.rotation,
                       position: new THREE.Vector3(this.object.position.x, 
                                                  this.object.position.y,
                                                  this.object.position.z + 0.5), 
                       rotation: new THREE.Vector3(this.object.rotation.x + 0.5,
                                                   this.object.rotation.y,
                                                   this.object.rotation.z), 
                       ms: 500 });
  this.bullets = [];
};

Boom.Weapon.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Weapon,

  init: function(){
    Boom.Entity.prototype.init.call(this);

  },

  load: function(){
    Boom.Entity.prototype.load.call(this);

  },

  update: function(){
    Boom.Entity.prototype.update.call(this);

    for(var i = this.bullets.length - 1; i >= 0; i--){
      if(this.bullets[i].disposed){
        this.bullets.splice(i, 1);
      }
      else{
        this.bullets[i].update();
      }
    }
  },

  shoot: function(){
    var _this = this;
    //Get weapons world-position
    var spawn = new THREE.Vector3(0, 0, this.object.position.z);
    var dir = this.owner.controls.getDirection();
    this.object.localToWorld(spawn);

    //Spawn new bullet at weapons world-position
    var bullet = new Boom.Bullet( spawn, dir, this.owner );
    //Add bullet to scene TODO: FIX THIS SO THE SCENE IS ACCESSED IN A NICER WAY?
    this.owner.scene.add( bullet.object );
    bullet.fire(dir);

    this.bullets.push( bullet ); 
    Boom.Animate( this.object, this.animation );
  }

});