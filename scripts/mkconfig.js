var glob = require('glob');
var path = require('path');
var util = require('util');

// options is optional
glob("./images/avatarmale/*", null, function(er, files) {

	var buffer = [];
	var colors = {};

	files.sort();

	files.forEach(function(file) {

		var filename = path.basename(file, '.png');
		//console.log('--', filename);
		var parts = filename.split('-');

		// format 
		// 1 type
		// 2 layer
		// 3 variant
		// 4 color 

		var index_layer = 2;
		var index_variant = 3;
		var index_color = 4;

		colors[parts[index_color]] = {
			name: parts[index_color],
			class: parts[index_color]
		};

		if (!buffer[parts[index_layer]]) {
			buffer[parts[index_layer]] = {
				name: parts[index_layer],
				icon: '__this.resolveUrl("' + path.dirname(file) + '/' + parts[index_layer] + '-icon.png")__',
				options: []
			};
		}
		//if (!buffer[parts[1]].options[parts[2]]){
		var haystack = buffer[parts[index_layer]].options;
		var needle = parts[index_variant];
		//console.log('c',haystack,needle,haystack[needle]);
		//			if (!buffer[parts[1]].options[parts[2]]){
		//				buffer[parts[1]].options[parts[2]] = {};
		//			}
		buffer[parts[index_layer]].options.push({
			//				name : filename,
			tile: '__this.resolveUrl("' + path.dirname(file) + '/' + filename + '.png")__',
			//variant: parts[2],
			group: parts[index_color]
		});


	});



	// now the config layers are in an object. Convert this to an array

	var buffer2 = {
		layers: [],
		colors: []
	};
	Object.keys(buffer).forEach(function(key) {
		if (buffer[key].name) {
			buffer2.layers.push(buffer[key]);
		}
		//	console.log(util.inspect(buffer[key],false,null));
		//	console.log('-----');
	})

	Object.keys(colors).forEach(function(key) {
		if (key != 'undefined') {
			buffer2.colors.push(colors[key]);
		}
	});

	var str = util.inspect(buffer2, false, null);

	str = str.replace(/__\'/g, '');
	str = str.replace(/\'__/g, '');
	console.log(str);



	//var config=



})