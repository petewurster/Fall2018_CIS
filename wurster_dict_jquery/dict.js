'use strict'

//run script after page is loaded
$(()=> {


	let lastPick = $();
		lastPick.addClass('term');

	let terms = [
		{'API' : 'abbreviation for Application Programming Interface: a way of communicating with a particular computer program or internet service'},
		{'browser' : 'a computer program that makes it possible for you to read information on the internet'},
		{'email' : 'the system for using computers to send messages over the internet'},
		{'Spam' : 'trademark[ed] brand name for a type of meat sold in metal containers, made mostly from pork'},
		{'DHCP' : 'abbreviation for Dynamic Host Configuration Protocol: a method that gives a new IP address to a computer each time it joins a network'},
	]

	//create random colors
	function makeColor() {
		let rgb = 'rgb(';
		for(let x = 0; x < 3; x ++){
			rgb += Math.floor(Math.random() * 256);
			if(x !== 2) {
				rgb += ', ';
			}
		}
		return rgb + ')';
	}

	//handle clicks
	function showDef(e) {
		let newColor = makeColor();
		//reset last clicked item
		lastPick.removeClass('selected');
		lastPick.attr('style', '');
		//add class to selected term
		$(this).addClass('selected');
		$(this).css( {'background-color': newColor} );
		//define new last click
		lastPick = $(this);
		//set h2 by isolating clicked id & associate with the terms array
		let id = $(this).attr('id').slice(2);
		let h2 = $('#h2');
			h2.text(terms[id][$(this).text()]);
			h2.css( {'background-color': newColor} );
	}

	//handle new entries
	function setDef(e) {
		//make new nodes and append to list
		// newThing.text('hello');
		let newWord = $('<li>');
			newWord.addClass('term');
			newWord.attr('id', 'li' + terms.length);
			newWord.text($(this).val());
			newWord.insertBefore($('#newDef'));
		//use placeholder until I can figure out how to use an API to auto-update the new definition
		//let newDefText = '\'s definition will eventually be completed via fetch() interaction
		//w/a REAL online dictionary'; 
		
		//update array with new term object
		terms.push({ [newWord.text()] : newWord.text() + '\'s definition will eventually be completed via fetch() interaction w/a REAL online dictionary'});
		//enable clicking for new terms
		newWord.on('click', showDef);
		$('#newDef').val('');
	}

	//build list from array
	for(let item = 0; item<terms.length; item ++) {
		let text = Object.keys(terms[item]);
		let lix = $('<li>');
			lix.text(text);
			lix.addClass('term');
			lix.attr('id','li' + item);
		$('ul').append(lix);
	}
	//paint listeners onto terms array
	$('li').on('click', showDef);

	//add input box to list
	let box = $('<input>');
		box.attr(
			{'type' : 'text',
			'id' : 'newDef',
			'placeholder' : ' type a new word here'}
		);
	$('ul').append(box);
	//add listener to input box
	box.on('change', setDef);


//end of pageloading function 
});