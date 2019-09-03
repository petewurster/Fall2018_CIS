'use strict'

//run script after loaded
$(()=> {

	// alert('This page is running Hatman5000\'s CSS editor.\nClick on an HTML element to view/edit its styles.')
	//define toolbar
	let toolbar = $('<form id="toolbar" class="tool">');
		toolbar.css({
			'width' : '675px',
			'background-color' : '#ababab',
			'border' : 'ridge 3px #000000',
			'position' : 'fixed',
			'top' : '40px',
			'left' : '30px',

		});
		//build slider div
		let sliders = $('<div id="sliders" class="tool">');
			sliders.append($('<label for="colorR" class="tool">R<input id="colorR" type="range" min="0" max="255" class="tool">'));
			sliders.append($('<label for="colorG" class="tool">G<input id="colorG" type="range" min="0" max="255" class="tool">'));
			sliders.append($('<label for="colorB" class="tool">B<input id="colorB" type="range" min="0" max="255" class="tool">'));
			sliders.css({
				'float' : 'right',
				'margin-top' : '10px',
			});
		toolbar.append(sliders);
		//add radios
		let radios = $('<div class="tool">');
			radios.append($('<div class="tool"><label for="radioFont" class="radio tool notSlider"><input type="radio" name="colorWhat" id="radioFont" class="radio tool notSlider" value="font" checked>Font</label>'));
			radios.append($('<div class="tool"><label for="radioBack" class="radio tool notSlider"><input type="radio" name="colorWhat" id="radioBack" class="radio tool notSlider" value="back">BkGrnd</label>'));
			$('#radioFont').attr('checked', true);
			radios.css({
				'float' : 'right',
				'margin-right' : '10px',
			});
		toolbar.append(radios);
		//add checkboxes
		let checks = $('<div id="checks">');
			checks.append($('<label for="ckeckB" class="tool notSlider"><input type="checkbox" name="checkB" id="checkB" class="tool notSlider">Bold</label>'));
			checks.append($('<label for="ckeckI" class="tool notSlider"><input type="checkbox" name="checkI" id="checkI" class="tool notSlider">Italic</label>'));
			checks.append($('<label for="ckeckU" class="tool notSlider"><input type="checkbox" name="checkU" id="checkU" class="tool notSlider">Under</label>'));
			checks.css({
				'margin-right' : '10px',
				'float' : 'right'
			});
		toolbar.append(checks);
		//add font selection
		let fonts = $('<div id="fonts" class="tool notSlider">');
			fonts.append($('<select name="fonts" id="fonts" class="tool notSlider">' +
				'<option value="" id="userFont" class="tool notSlider"></option>' +
				'<option value="Times New Roman" class="tool notSlider">Times New Roman</option>' +
				'<option value="Kunstler Script" class="tool notSlider">Kunstler Script</option>' +
				'<option value="Tahoma" class="tool notSlider">Tahoma</option>' +
				'<option value="Arial Black" class="tool notSlider">Arial Black</option>'
			));
			fonts.css({
				'float' : 'right',
				'margin-right' : '40px',
			});
		toolbar.append(fonts);
		//add display feedback box
		let current = $('<p id="current" class="tool">');
		current.css({
			'color' : '#ffffff',
			'font-weight' : 'bold',
			'margin' : '50px 10px 0px 10px',
			'padding' : '3px',
			'border' : 'solid 2px #000000',
			'width' : '120px'
		});
		toolbar.append(current);

	//primary event listener
	$('body').on('click', pick);


	//updates the form to show current settings 
	function display(picked) {
		//display current target name
		let what = $(picked.target)
		$('#current').text(what.prop('tagName'));
		//use sub-func to handle slider bug
		fixColorSlider(what);
		
		//display font
		// this is NOT an original idea: the code for this is my own, but I got the idea from
		// forum suggestions on how to detect which font from the family is currently applied... 
		//'i' selected to help differentiate wide-width fonts, and 'w' for narrow ones
		let font = what.css('font-family');
		font = font.split(',');
		let base;
		let test;
		//loop over font-family
		for(let x of font) {
			//build elements to compare visual widths
			base = $('<span>iiiiiiiiiiiiiiiiiiiiiiiiiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>')
			base.css({
				'font-family' : what.css('font-family'),
				'font-size' : '100px',
				'display' : 'inline',
			});
			$('body').append(base);
			//isolate one font as X for testing
			test = $('<span>iiiiiiiiiiiiiiiiiiiiiiiiiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>')
			test.css({
				'font-family' :  x,
				'font-size' : '100px',
				'display' : 'inline'
			});
			$('body').append(test);
			//check width of each element and assign first font that has matching width
			if(base.width() === test.width()) {
				$('#userFont').text(x);
				$('#userFont').prop('value', x);
				//clean-up
				base.remove();
				test.remove();
				break;
			}else{
				//just use whole family if no match
				$('#userFont').css('font-family', what.css('font-family'));
				base.remove();
				test.remove();
			}
		}

		//set checkboxes appropriately
		if(what.css('font-weight') === '700'){
			$('#checkB').prop('checked', true);
		}else{
			$('#checkB').prop('checked', false)
		}
		if(what.css('font-style') === 'italic'){
			$('#checkI').prop('checked', true);
		}else{
			$('#checkI').prop('checked', false)
		}
		if(what.css('text-decoration') === 'underline'){
			$('#checkU').prop('checked', true);
		}else{
			$('#checkU').prop('checked', false)
		}


		return what;
	};


	//built to isolate color-setting to redundancy during radio-based 
	//attribute-reassignment of slider inputs
	function fixColorSlider(what) {
		let color;
		// color = (($('form input:radio:checked').val() === 'font')?
			// $(what).css('color') : $(what).css('background-color'));
		if($('form input:radio:checked').val() === 'font') {
			color = $(what).css('color');
		}else{
			color = $(what).css('background-color');
		}
		//if(color.startsWith('rgb(')) {
		if(color === 'transparent') {
			color = 'rgb(255, 255, 255)';
		}
		color = color.slice(4, color.length-1);
		//}//else if(color.startsWith('rgba')) {
			//color = color.slice(5, color.length-4);
		//}///add more cond for hex and others??
		console.log(22, color)

		color = color.split(',');
		console.log(color)
		for(let x in color) {
			color[x] = Number(color[x]);
		}
		//display target color
		$('#colorR').prop('value', color[0]);
		$('#colorG').prop('value', color[1]);
		$('#colorB').prop('value', color[2]);
	};

	//begin css editing
	function pick(e) {
		//show the toolbar
		$('h1').before(toolbar);
		let targeted = $(e.target);
		let what = display(e);
		$('body').off();
		//activate listener on toolbar
		toolbar.on('change', (e)=> {
			change(e, what);
		});

		//activate listener BEHIND toolbar
		$('body').on('click', (e)=> {
			//disable toolbar and re-enable element selection
			if($(e.target).hasClass('tool')){
			//pass
			}else{
				$('#radioFont').attr('checked', true);
				toolbar.off();
				toolbar.remove();
				console.log(toolbar);
				$('body').off();

				// $('body').children().off('click');
				$('body').on('click', pick);
			}
		});

	};

	function change(e, what) {
		let toolChange = $(e.target);
		console.log( 20, toolChange);
		console.log(5, what)
		let targetTxt = $($('#current').text());
		if(toolChange.hasClass('radio')) {
			 fixColorSlider(what);
		


		}else{
			let color = 'rgb(' + $('#colorR').prop('value') + ', ' + $('#colorG').prop('value') + ', ' + $('#colorB').prop('value') + ')';
			let x = (($('form input:radio:checked').val() === 'font')?
				'color' : 'background-color');
			console.log(color);




			let changes = {
				[x] : color,
				'font-weight' : ($('#checkB').prop('checked')? 'bold' : 'normal'),
				'font-style' :  ($('#checkI').prop('checked')? 'italic' : 'normal'),
				'text-decoration' : ($('#checkU').prop('checked')? 'underline' : 'none'),
				'font-family' : $('#toolbar select').val(),
			};
			//apply changes real-time
			targetTxt.css(changes);
			console.log(1, changes);
			
		}
	};














//end of pageload func 
});