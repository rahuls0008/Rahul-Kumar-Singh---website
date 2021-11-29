
// ------------------  Smooth Scroll  ----------//


/*
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags);    //returns array with all <a>

for(var i = 0; i < navMenuAnchorTags.length; i++){
	navMenuAnchorTags[i].addEventListener('click',function(event){
		event.preventDefault();   //prevents default behavior of the element (here default onclick behavior of Anchor Tag is removed)
		
		var targetSectionID = this.textContent.trim().toLowerCase();  // fetch textContent of current Anchor Tag -> trim to remove extra spaces -> convert to lower case
																	//  <a>  Skills  </a>        ->  skills

		console.log(targetSectionID);	  // click on link n observe console

		var targetSection = document.getElementById(targetSectionID);      //fetch ID
		console.log(targetSection);


		
		
		var interval = setInterval(function(){

			var targetSectionCoordinates = targetSection.getBoundingClientRect();

			if(targetSectionCoordinates.top <= 0){
				clearInterval(interval);     //stop
			}
			window.scrollBy(0, 50);      //scroll by 50px
		}, 20);   //every 20ms

	});
}                                    */




// Code Optimization       *** - changes

var interval;       // *** make var interval global

var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags);    //returns array with all <a>

for(var i = 0; i < navMenuAnchorTags.length; i++){
	navMenuAnchorTags[i].addEventListener('click',function(event){
		event.preventDefault();   //prevents default behavior of the element (here default onclick behavior of Anchor Tag is removed)
		
		var targetSectionID = this.textContent.trim().toLowerCase();  // fetch textContent of current Anchor Tag -> trim to remove extra spaces -> convert to lower case
																	//  <a>  Skills  </a>        ->  skills

		console.log(targetSectionID);	  // click on link n observe console

		var targetSection = document.getElementById(targetSectionID);      //fetch ID
		console.log(targetSection);
		
		// Method 2 - 
		interval = setInterval(scrollVertically,   20,       targetSection);   //every 20ms
							   //function     //interval(ms)  // Argument to the func

		// Method 3 - Calling in Separate function to pass the argument 'targetSection'
		// interval = setInterval(function(){
		// 	scrollVertically(targetSection);
		// }, 20);
	}); 
}

//*** implement scrollVertically function separately 
function scrollVertically(targetSection){                  // pass targetSection to the function( since the var is in previous func)
	var targetSectionCoordinates = targetSection.getBoundingClientRect();

	if(targetSectionCoordinates.top <= 0){
		clearInterval(interval);     //stop
		return;
	}
	window.scrollBy(0, 60);      //scroll by 50px
}





// Handle scroll event on Window 
// Check that skills sections container is currently visible or not
// Ensure that initial width of colored skill divs is Zero --> intiliased/reset to 0 width value
// As soon as it is visible Start animation on every skill --> increase skill widh from 0 to skill level
// Store skill level --> HTML with the help data attribute


var progressBars = document.querySelectorAll('.skill-progress > div');   // Fetch all the Progress Bars [outer div]
var skillsContainer = document.getElementById('skills-container'); 
window.addEventListener('scroll', checkScroll);

var animationDone = false;

//Initially Filled 
initialiseBars();     // Make it empty & then Fill them to create  animation

function initialiseBars() {
	//for-of loop to traverse progressBars
	for(let bar  of progressBars){
		bar.style.width = 0 + '%';
	}
}
    

       // ** NOT VAR because we want different width for each iteration  LET IS IMPORTANT **//
function fillBars(){
	for(let bar of progressBars){
		let targetWidth = bar.getAttribute('data-bar-width');             // ** NOT VAR because we want different width for each iteration  **//
		let currentWidth = 0;
		let interval = setInterval(function(){
			if(currentWidth > targetWidth){
				clearInterval(interval);
				return;
			}

			currentWidth++;
			bar.style.width = currentWidth + '%';     //update the width of the bar
		},15);
	}
}

function checkScroll(){
	//Check whether skill-container is on the screen
	var skillCoordinates = skillsContainer.getBoundingClientRect();

	if(!animationDone && skillCoordinates.top < window.innerHeight){          // window.innerHeight  -> viewport height   i.e skills section is visible on the screen      
		
		animationDone = true;       //to make animation take place only once
		console.log('Skills Section is visible on the screen'); 

		fillBars(); 
	
	}else if(skillCoordinates.top > window.innerHeight){    
		animationDone = false;
		initialiseBars();  
	}
}


