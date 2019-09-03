'use strict'
//run script after loaded
$(()=> {
	let terms = [
		{'API' : 'abbreviation for Application Programming Interface: a way of communicating with a particular computer program or internet service'},
		{'browser' : 'a computer program that makes it possible for you to read information on the internet'},
		{'email' : 'the system for using computers to send messages over the internet'},
		{'Spam' : 'trademark[ed] brand name for a type of meat sold in metal containers, made mostly from pork'},
		{'DHCP' : 'abbreviation for Dynamic Host Configuration Protocol: a method that gives a new IP address to a computer each time it joins a network'},
	];

	//loop via recursion
	function start(index) {
		if(index > terms.length-1) {
			index = 0;
		}
		//change the tag
		$('h1').text(Object.keys(terms[index]) + ' : ' + terms[index][Object.keys(terms[index])]);
		//set the timer
		setTimeout(()=> {
			start(index + 1);
		//randomize timeout
		}, Math.random()*3500);
	};
	
	//begin loop
	start(0);
//end of pageload func 
});