		var createTerrainMatrix = function (scene, perlinNoise){
 
		    //every 100px on the z axis, add a bit of ground
		    for ( var z= 100; z > -200; z-=100 ) {
		 
		      //Create the perlin noise for the surface of the ground
		      var perlinSurface = new PerlinSurface(perlinNoise, 100, 100);
		      var ground = perlinSurface.surface;
		      //rotate 90 degrees around the xaxis so we can see the terrain
		      ground.rotation.x = -Math.PI/-2;
		      // Then set the z position to where it is in the loop (distance of camera)
		      ground.position.z = z;
		      ground.position.y -=4;
		 
		      //add the ground to the scene
		      scene.add(ground);
		      //finally push it to the floor array
		      this.floor.push(ground);
		    }
		 
		}