
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