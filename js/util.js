var Pages = function(newRows) {
	this.rows = 4;
	this.pages = [[]];

	this.add = function(row) {
		if (this.pages[this.pages.length - 1].length >= this.rows) {
			this.pages.push([]);
		}
		this.pages[this.pages.length - 1].push(row);
	}

	this.remove = function(page, index) {
		this.pages[page].splice(index, 1);
		for (i = page; i < this.pages.length - 1; i++) {
			this.pages[i].push(this.pages[i + 1].shift());
		}
		if (this.pages.length > 1 && this.pages[this.pages.length - 1].length == 0)
			this.pages.pop();
	}

	this.addAll = function(newRows) {
		for (index = 0; index < newRows.length; index++) {
			this.add(newRows[index]);
		}
	}

	this.flatten = function() {
		return this.pages.reduce(function(a, b) { return a.concat(b) });
	}
	if (newRows) this.addAll(newRows);
}

var updateStyle = function(transition) {
	if(localStorage.getItem('hide_weather') == 'true') {
		$('#hide_weather').text('show weather');
		if (transition) $('#weather').hide('fast');
		else $('#weather').hide();
	} else {
		$('#hide_weather').text('hide weather');
		if (transition) $('#weather').show('fast');
		else $('#weather').show();
	}
	
	var style = '';
	if(localStorage.getItem('font')) {
		font = localStorage.getItem('font');
		if(font == 0) {
			style += 'body { font-family: "Segoe UI", Helvetica, Arial, sans-serif; }';
			style += 'body { font-weight: normal; }';
		} else { 
			style += 'body { font-family: Raleway, "Segoe UI", Helvetica, Arial, sans-serif; }';
			style += 'body { font-weight: bold; }';
		}
	}

	var background_color = localStorage.getItem('background-color');
	var options_color = localStorage.getItem('options-color');
	var main_color = localStorage.getItem('main-color');
	var title_color = localStorage.getItem('title-color');

	style += '* { border-color: ' + options_color + '}';
	style += '::-webkit-scrollbar { background: ' + background_color + '}';
	style += '::-webkit-scrollbar-thumb { background: ' + options_color + '}';

	if (transition) {
		$('.background-color').animate({'backgroundColor': background_color}, {duration: 800, queue: false});
		$('.title-color').animate({'color': title_color}, {duration: 400, queue: false});
		$('body').animate({'color': main_color}, {duration: 400, queue: false});
		$('.options-color').animate({'color': options_color}, {duration: 400, queue: false});
	} else {
		style += '.background-color { background-color: ' + background_color + '}';
		style += '.title-color { color: ' + title_color + '}';
		style += 'body { color: ' + main_color + '}';
		style += '.options-color { color: ' + options_color + '}';
	}

	$('#new-style').remove();
	$('body').append('<style id="new-style">' + style + '</style>');
}

/**
  Convert values from fahrenheit to celsius
  */
var toCelsius = function(fah) {
	return Math.floor(((parseFloat(fah) - 32) * 5) / 9);
}