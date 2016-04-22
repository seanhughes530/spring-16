//////Initial Set up for page/////////

//set scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 10000 );



//set renderer
var renderer = new THREE.WebGLRenderer({
		preserveDrawingBuffer   : true   // required to support .toDataURL()
	});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls( camera, renderer.domElement );



//lights
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

var light = new THREE.HemisphereLight( 0x6B0061, 0xffffff, 1 ); 
scene.add( light );




//sphere
var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0xffff00, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading} );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(1,1,1);
scene.add( sphere );



//object array
var objectList = [];
objectList.push(sphere);



//camera start position
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;



//global variables 
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;



//for taking screen shot
var dataUrl = renderer.domElement.toDataURL("image/png");
THREEx.Screenshot.bindKey(renderer);


//reset everything button
var resetButton = document.querySelector('.reset');  //myself
resetButton.addEventListener('click',function (e){
	window.location.reload();
});


//reset camera button
var resetCameraButton = document.querySelector('.reset-camera');  //myself
resetCameraButton.addEventListener('click',function (e){
	camera.position.z = 10;
	camera.position.x = 10;
	camera.position.y = 10;
});




/////////Functions//////////////

//listening for click
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseMove, false );


//click function			
function onDocumentMouseMove (event) {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
	
	var intersects = raycaster.intersectObjects( objectList );


	if ( intersects.length > 0 ) {  //if clicked

		if ( INTERSECTED != intersects[ 0 ].object ) {

			var vector = new THREE.Vector3( mouse.x, mouse.y, 0 ).unproject( camera );

			document.body.style.cursor = 'pointer';
			console.log('touch');
			numberofParticles(vector); 

			playAudio();
			
		} 
	}
}




//make new particles function
function makeNewParticle(v) {

	//size of particles made
	var size = [ 1, 0.5, 1.5, 1.2, 0.3];
	var randomNumber = Math.floor(Math.random() * size.length);   
	var randomSize = size[randomNumber];


	//basics of sphere
	var geometry = new THREE.SphereGeometry( randomSize, 32, 32 );
	var material = new THREE.MeshPhongMaterial( {color: 0xffff00, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );


	//arrays of possible x and y coordinates
	var coordinateX = [1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4, -5, -6, -7, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, -0.5, -1.5, -2.5, -3.5, -4.5, -5.5, 10, 15, 20, 25, -10, -15, -20, -25, 30, 35, 40, 45, 50, 55, -30, -35, -40, -45, -50, -55];
	var coordinateY = [1, 2, 3, -1, -2, -3, 0.5, 1.5, 2.5, 3.5, -0.5, -1.5, -2.5, -3.5, 5, 7, 10, -5, -7, -10, 12, 14, 15, -12, -14, -15, 20, 25, -20, -25,  30, -30];
	var coordinateZ = [1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4, -5, -6, -7, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, -0.5, -1.5, -2.5, -3.5, -4.5, -5.5, 10, 15, 20, 25, -10, -15, -20, -25,  30, 35, 40, 45, 50, 55, -30, -35, -40, -45, -50, -55];


	//find random x and y coordinates
	var randomNumber = Math.floor(Math.random() * coordinateX.length);   
	var randomX = coordinateX[randomNumber];					 

	var randomNumber = Math.floor(Math.random() * coordinateY.length);  
	var randomY = coordinateY[randomNumber];

	var randomNumber = Math.floor(Math.random() * coordinateZ.length);  
	var randomZ = coordinateZ[randomNumber];
						

	//impliment random coordinates
	sphere.position.set(randomX , randomY, randomZ);
	scene.add( sphere );


	//push newly made circle into array of objects
	objectList.push(sphere);	


	//line
	var material = new THREE.LineDashedMaterial({
	color: "rgb(139, 184, 228)",
	linewidth: 0.5,
	opacity: 0.5,
	});


	// using object position as start for line instead of click 
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
	
	var intersects = raycaster.intersectObjects( objectList );

	
		if ( intersects.length > 0 ) {  

		 	if ( INTERSECTED != intersects[ 0 ].object ) {

				var sphereX = intersects[0].object.position.x;
				var sphereY = intersects[0].object.position.y;
				var sphereZ = intersects[0].object.position.z;

			} 
	 	}


	//line coordinates
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( sphereX, sphereY, sphereZ ),
		new THREE.Vector3( randomX, randomY, randomZ )
	);


	//make line
	var line = new THREE.Line( geometry, material );
	scene.add( line );

}




// audio function
function playAudio(){

	var mySound = soundManager.createSound('mySound','music/cycle.wav');

	mySound.play({
		volume: 30,
		loops:'2'
	});

}



function numberofParticles(vector) { 

	var randomNumber = Math.random();

		if (randomNumber <= 0.333){
			makeNewParticle(vector);
			makeNewParticle(vector);
		} else if (randomNumber > 0.333 && randomNumber < 0.666) {
			makeNewParticle(vector);
			makeNewParticle(vector);
			makeNewParticle(vector);
		} else if (randomNumber >= 0.666){
			makeNewParticle(vector);
			makeNewParticle(vector);
			makeNewParticle(vector);
			makeNewParticle(vector);
			makeNewParticle(vector);
		}
	}




//variables for color fade in and out
var bool = true;
var dec = 0;
var c = 0;
var d = .7;


function colorBreathe() {
	
		if (bool){
			c += .01;
			if (c >= .7){
				bool = false;
			}
		}else {
			c -= .01;
			if (c <= 0){
				bool = true;
			}
		}

		if (bool){
			d -= .01;
			if (d <= 0){
				bool = true;
			}
		}else {
			d += .01;
			if (d >= .7){
				bool = false;
			}
		}



	for (i = 0; i < objectList.length; i++) {

		if (i % 2 == 0){

			objectList[i].material.color.setRGB( 1, 1, c ); 

		}else if (i % 2 == 1){

			objectList[i].material.color.setRGB( 1, 1, d );
		}
		
	}

}




//render function
var render = function () {

	requestAnimationFrame( render );
	renderer.render(scene, camera);

};



//animate function or update
function animate() {

	colorBreathe();

	requestAnimationFrame(animate);
	controls.update();

}


animate();
render();

