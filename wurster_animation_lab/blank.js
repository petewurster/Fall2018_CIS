'use strict'

//run script after loaded
$(()=> {
	let shimmer = $('#shimmer');
	let interval = setInterval(setShimmer, 5000);

	//shimmer every 3 seconds
	function setShimmer() {
		shimmer.css('background-image', 'linear-gradient(to bottom right, red, gray, gray, gray, gray, gray)');
		setTimeout(() => {
			shimmer.css('background-image', 'linear-gradient(to bottom right, gray, red, gray, gray, gray, gray)');
			setTimeout(() => {
				shimmer.css('background-image', 'linear-gradient(to bottom right, gray, gray, red, gray, gray, gray)');
				setTimeout(() => {
					shimmer.css('border','ridge 2px white')
					shimmer.css('background-image', 'linear-gradient(to bottom right, gray, gray, gray, red, red, red, gray, gray, silver)');
					setTimeout(() => {
						shimmer.css('border','ridge 1px black')
						shimmer.css('background-image', 'linear-gradient(to bottom right, gray, gray, gray, red, gray, gray)');
						setTimeout(() => {
							shimmer.css('background-image', 'linear-gradient(to bottom right, gray, gray, gray, gray, red, gray)');
							setTimeout(() => {
								shimmer.css('background-image', 'linear-gradient(to bottom right, gray, gray, gray, gray, gray, red)');
								setTimeout(() => {
									shimmer.css('background-image', 'none');
								}, 70);		
							}, 70);		
						}, 70);	
					},30);	
				}, 70);
			}, 70);
		}, 70);
	};

	//drop menu and disable shimmer
	shimmer.on('click', () => {
		$('li').hasClass('drop')?
			($('li').removeClass('drop'), clearInterval(interval))
			//or pick up menu and restart shimmer
			: ($('li:not(#shimmer)').addClass('drop') , interval = setInterval(setShimmer, 5000));
	});















//end of pageload func 
});