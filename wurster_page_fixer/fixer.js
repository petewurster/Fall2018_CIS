'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {
    // //// Remove the alert and then get started.
    // alert('The HTML of this page is broken. ' +
    //     'You need to write some JavaScript to put it back together.');

    // // Your code goes here!

//repair h1
    document.getElementById('main-title').innerHTML = 'Fix <em>this</em> Page';

//modify img attributes
    let image = document.getElementsByTagName('img')[0];
	    image.src = 'mars.jpg';
    	image.width = 500;
    	image.height = 500;

//add class to ol
    document.getElementsByTagName('ol')[0].className = 'engage';

//append h3
    document.getElementsByTagName('h3')[0].innerHTML += ' about Javascript';

//modify ul
    let list = document.getElementById('knowledge-list');
 	let targets = list.children;
 	//create new elements
 	let liRel = document.createElement('li');
    let	liRelText = document.createTextNode('Relation to HTML');
    	liRel.appendChild(liRelText);  
    let liSyn = document.createElement('li');
    let	liSynText = document.createTextNode('Syntax');
    	liSyn.appendChild(liSynText);
    let liUsi = document.createElement('li');
    let	liUsiText = document.createTextNode('Using the DOM');
    	liUsi.appendChild(liUsiText);
    //edit the ul
    list.insertBefore(liRel, targets[0]);
    list.insertBefore(liSyn, targets[2]);
    list.appendChild(liUsi);
    list.removeChild(targets[4]);

//change p tag h6
	//isolate p element
	let ptag = document.getElementsByClassName('change-me')[0];

    //the EASY way (that I figured out AFTER the one below!!)
    ptag.outerHTML = '<h6>' + ptag.innerHTML + '</h6>'


    ////////alternate method
	// //create new h6 element
	// let h6tag = document.createElement('h6');
	// let h6Text = document.createTextNode(ptag.innerHTML);
	// 	h6tag.appendChild(h6Text);
	// 	h6tag.className = 'change-me';
	// //replace p with new h6
	// document.body.replaceChild(h6tag, ptag);

//create aside
    let aside = document.createElement('aside');
    let	asideText = document.createTextNode('JavaScript is only fun when we can use it to manipulate HTML!');
    	aside.appendChild(asideText);
    document.body.appendChild(aside);

// Leave this line alone.
});
