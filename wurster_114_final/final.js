'use strict';

//run script after loaded
$(() => {

	//import list of fonts
	let fontReq = $.ajax({
        method: 'GET',
        url: 'config.json',
        dataType: 'json',
    });
	//set links so they can be targeted
	let links = $('a');
	links.prop('href', 'javascript:void(0)');

	//create toolbar
    let toolbar = $('<form id="toolbar" class="tool">');
		toolbar.css({
			'width' : '675px',
			'background-color' : '#ababab',
			'border' : 'ridge 3px #000000',
			'position' : 'fixed',
			'top' : '40px',
			'left' : '30px',
		});

	//populate tools once config is loaded
	fontReq.done((data) => {
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
			radios.append($('<div class="tool"><label for="radioFont" class="radio tool notSlider"><input type="radio" name="colorWhat" id="colorWhat" class="radio tool notSlider" value="font" checked>Font</label>'));
			radios.append($('<div class="tool"><label for="radioBack" class="radio tool notSlider"><input type="radio" name="colorWhat" id="radioBack" class="radio tool notSlider" value="back">BkGrnd</label>'));
			$('#radioFont').attr('checked', true);
			radios.css({
				'float' : 'right',
				'margin-right' : '10px',
			});
		toolbar.append(radios);
		//add checkboxes
		let checks = $('<div id="checks" class="tool">');
			checks.append($('<label for="ckeckB" class="tool notSlider"><input type="checkbox" name="checkB" id="checkB" class="tool notSlider">Bold</label>'));
			checks.append($('<label for="ckeckI" class="tool notSlider"><input type="checkbox" name="checkI" id="checkI" class="tool notSlider">Italic</label>'));
			checks.append($('<label for="ckeckU" class="tool notSlider"><input type="checkbox" name="checkU" id="checkU" class="tool notSlider">Under</label>'));
			checks.css({
				'margin-right' : '10px',
				'float' : 'right'
			});
		toolbar.append(checks);
		//add font selection
		let fontList = '';
		//build list from AJAX data
		for(let item of data.fonts) {
			fontList += '<option value="'+ item + '" class="tool notSlider">'+ item + '</option>';
		}
		let fonts = $('<div id="fonts-div" class="tool notSlider">');
			fonts.append($('<select name="fonts" id="fonts" class="tool notSlider">' +
				'<option value="" id="userFont" class="tool notSlider"></option>' +	fontList
			));
			fonts.css({
				'float' : 'right',
				'margin-right' : '30px',
			});
		toolbar.append(fonts);
		//add display feedback box
		let current = $('<p id="current" class="tool">');
			current.css({
				'color' : '#ffffff',
				'font-weight' : 'bold',
				'margin' : '43px 10px 3px 10px',
				'padding' : '3px',
				'border' : 'solid 2px #000000',
				'width' : '120px'
			});
		toolbar.append(current);
		//add export button
		let exportCSS = $('<span id="exportCSS" class="tool">View Code</span>');
			exportCSS.css({
				'width' : '35px',
				'position' : 'absolute',
				'top' : '34px',
				'left' : '164px',
				'border' : 'outset 2px #ababab',
				'background-color' : '#dedede',
			});
		toolbar.append(exportCSS);
		//add image size buttons
		let resizeUp = $('<span id="resizeUp" class="tool sizer">IMG +</span>');
			resizeUp.css({
				'width' : '40px',
				'font-size' : '11px',
				'position' : 'absolute',
				'top' : '35px',
				'left' : '220px',
				'padding-right' : '2px',
				'border' : 'outset 2px #ababab',
				'background-color' : '#dedede',
			});
		toolbar.append(resizeUp);
		let resizeDn = $('<span id="resizeDn" class="tool sizer">IMG -</span>');
			resizeDn.css({
				'width' : '40px',
				'font-size' : '11px',
				'position' : 'absolute',
				'top' : '52px',
				'left' : '220px',
				'padding-right' : '2px',
				'border' : 'outset 2px #ababab',
				'background-color' : '#dedede',
			});
		toolbar.append(resizeDn);
	});

	//AJAX failure
	fontReq.fail((response) => {
        console.log('ERROR:' + response.statusText);
    });

	
	//defaults for demo page
	$('body').css('font-family', 'serif');
	$('.figRight').css('float', 'right');

	//set primary event listener
	$('body').on('click', pick);


	//fires on click from resize buttons
	function resize(e) {
		let whichSize = $(this);
		whichSize.css('border', 'inset 2px #ababab');
		setTimeout(() => {
			whichSize.css('border', 'outset 2px #ababab');
		}, 200);
		let height = $('img').css('height');
		let heightStr ='';
		let width = $('img').css('width');
		let widthStr = '';
		for(let i in height) {
			if(height[i] === '%' || height[i] === 'p') {
				heightStr = height.slice(i);
				height = Number(height.slice(0, i));
			}
		}
		for(let i in width) {
			if(width[i] === '%' || width[i] === 'p') {
				widthStr = width.slice(i);
				width = Number(width.slice(0, i));
			}
		}
		$('img').css((whichSize.prop('id') === 'resizeUp')? {
			'height' : Math.round(height + height * .1) + heightStr,
			'width' : Math.round(width + width * .1) + widthStr
		} : {
			'height' : Math.round(height - height * .1) + heightStr,
			'width' : Math.round(width - width * .1) + widthStr
		});
	}


	//fires on click from view code button
	function showResult() {
		$('#results').remove();
		$('#exportCSS').css('border', 'inset 2px #ababab');
		setTimeout(() => {
			$('#exportCSS').css('border', 'outset 2px #ababab');
		}, 200);
		//build results window
		let resultList = $('<ul id="results" class="tool">');
		let allhtml = $('body').find('*');
		let dupChecker = [];
		for(let element of allhtml) {
			element=$(element);
			//reject toolbar css
			if(element.hasClass('tool')) {
				continue;
			}
			//only add css for program-modified items (and inline styled elements)
			if(element.prop('style').cssText) {
				//reject duplicate tags
				if (dupChecker.indexOf(element.prop('tagName'))!== -1) {
					continue;
				}
				//append list to avoid duplicate entries
				dupChecker.push(element.prop('tagName'));
				//create new list
				let cssRule = $('<li>' + element.prop('tagName') + ' {' + element.prop('style').cssText + '}</li>');
				resultList.append(cssRule);
			}
		}
		//include body if changes were made to entire document
		if($('body').prop('style').cssText) {
			resultList.append($('<li>BODY {' + $('body').prop('style').cssText + '}</li>'));
		}
		$('#toolbar').append(resultList);
	}


	//updates the form to show current settings 
	function display(picked) {
		//display current target name
		let what = $(picked.target);
		$('#current').text(what.prop('tagName'));
		//use sub-func to handle slider bug
		fixColorSlider(what);
		//display font
		//'i' selected to help differentiate wide-width fonts, and 'w' for narrow ones
		let font = what.css('font-family');
		font = font.split(',');
		let base;
		let test;
		//loop over font-family
		for(let x of font) {
			//build elements to compare visual widths
			base = $('<span>iiiiiiiiiiiiiiiiiiiiiiiiiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>');
			base.css({
				'font-family' : what.css('font-family'),
				'font-size' : '100px',
				'display' : 'inline',
			});
			$('body').append(base);
			//isolate one font as X for testing
			test = $('<span>iiiiiiiiiiiiiiiiiiiiiiiiiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>');
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
				$('#fonts').prop('value', x);
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
		$('#checkB').prop('checked', (what.css('font-weight') === '700')? true : false);
		$('#checkI').prop('checked', (what.css('font-style') === 'italic')?	true : false);
		$('#checkU').prop('checked', (what.css('text-decoration') === 'underline')?	true : false);
		return what;
	}


	//built to isolate color-setting to redundancy during radio-based 
	//attribute-reassignment of slider inputs
	function fixColorSlider(what) {
		let color;
		color = (($('form input:radio[name=colorWhat]:checked').val() === 'font')?
			$(what).css('color') : $(what).css('background-color'));
		//depending on browser, sometimes unspecified backgrounds display
		//as transparent. these are set to white here
		if(color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
			color = 'rgb(255, 255, 255)';
		}
		color = color.slice(4, color.length-1);
		color = color.split(',');
		for(let x in color) {
			color[x] = Number(color[x]);
		}
		//display target color
		$('#colorR').prop('value', color[0]);
		$('#colorG').prop('value', color[1]);
		$('#colorB').prop('value', color[2]);
	}

	
	//begin css editing
	function pick(e) {
		//show the toolbar
		$('body').first().before(toolbar);
		let what = display(e);
		$('body').off();
		$('.tool').css({
			'color' : '#8000ff',
			'font-weight' : 'bold',
			'font-style' : 'normal',
			'text-decoration' : 'none',
			'font-family' : 'monospace'
		});
		$('#current').css('background-color', '#ffffff');
		//activate listener on toolbar
		toolbar.on('change', (e) => {
			change(e, what);
		});
		//re-activate results listener
		$('#exportCSS').on('click', showResult);
		$('.sizer').on('click', resize);
		//activate listener BEHIND toolbar
		$('body').on('click', (e) => {
			//disable toolbar and re-enable element selection
			if($(e.target).hasClass('tool')){
			//pass
			}else{
				//clean up & reset primary listener
				$('#userFont').prop('value','');
				$('#toolbar').off();
				$('#results').remove();
				$('#toolbar').remove();
				$('body').off();
				$('body').on('click', pick);
			}
		});
	}


	//do changes
	function change(e, what) {
		$('#results').remove();
		let toolChange = $(e.target);
		let targetTxt = $($('#current').text());
		if(toolChange.hasClass('radio')) {
			 fixColorSlider(what);
		}else{
			let color = 'rgb(' + $('#colorR').prop('value') + ', ' + $('#colorG').prop('value') + ', ' + $('#colorB').prop('value') + ')';
			let x = (($('form input:radio:checked').val() === 'font')?
				'color' : 'background-color');
			let changes = {
				[x] : color,
				'font-weight' : ($('#checkB').prop('checked')? 'bold' : 'normal'),
				'font-style' :  ($('#checkI').prop('checked')? 'italic' : 'normal'),
				'text-decoration' : ($('#checkU').prop('checked')? 'underline' : 'none'),
				'font-family' : $('#toolbar select').val(),
			};
			//apply changes real-time
			targetTxt.css(changes);
		}
	}

//end of pageload func 
});