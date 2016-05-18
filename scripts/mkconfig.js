var glob = require('glob');
var path = require('path');
var util = require('util');

// options is optional
glob("./images/avatarmale/*", null, function(er, files) {

	var buffer = [];


	files.forEach(function(file) {

		var filename = path.basename(file, '.png');
		//console.log('--', filename);
		var parts = filename.split('-');

		// format 
		// 0 type
		// 1 layer
		// 2 variant
		// 3 color 


		if (!buffer[parts[1]]) {
			buffer[parts[1]] = {
				name: parts[1],
				options: []
			};
		}
		//if (!buffer[parts[1]].options[parts[2]]){
			var haystack = buffer[parts[1]].options;
			var needle = parts[2];
			//console.log('c',haystack,needle,haystack[needle]);
//			if (!buffer[parts[1]].options[parts[2]]){
//				buffer[parts[1]].options[parts[2]] = {};
//			}
			buffer[parts[1]].options.push({
//				name : filename,
				tile : '__this.resolveUrl("' + path.dirname(file) + '/' + filename + '.png")__',
				//variant: parts[2],
				group : parts[3]
			});


	});


//var config=



console.log(util.inspect(buffer,false,null));

})