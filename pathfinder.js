var pf = (function() {

	var _pathFinder = function(data, path) {
		var data_type = _toType(data);
		if (data_type === 'array') {
			return _arrMultiplesObjects(data, path);
		} else if (data_type === 'object') {
			return _objProperties(data, path);
		} else {
			return '';
		}
	};

	var _toType = function(obj) {
		return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	};

	var _arrMultiplesObjects = function(elements, template) {
		var output = [];
		for (var i = 0, len = elements.length; i < len; i++) {
			output.push(_objProperties(elements[i], template));
		}
		return output;
	};

	var _objProperties = function(element, o) {
		if (o.indexOf('.') === -1 && o.indexOf('[') === -1) {
			if (element.hasOwnProperty(o)) {
				return element[o];
			}else {
				return '';
			}
		}else {
			try {
				return _objectPath(element, o);
			}
			catch (ex) {
				return '';
			}
		}
	};

	var _objectPath = function(elObj, nstr) {
		var obj = nstr.split('.');
		var current = 0, res = elObj;
		while (current < obj.length) {
			res = _objectPathStep(res, _objectPathStepArr(obj[current]));
			if (_toType(res) === 'array') {
				var pathArr = obj[current].split('[');
				if(pathArr.length > 1 ){
					var num = +(pathArr[1].replace(']', ''));
					res = res[num];
				}else{
					res = res;
				}
			}
			current++;
		}
		return res;
	};

	var _objectPathStep = function(parent, child) {
		if (parent.hasOwnProperty(child)) {
			return parent[child];
		} else {
			return '';
		}
	};

	var _objectPathStepArr = function(path) {
		var returnPath;
		if (path.indexOf('[') !== -1) {
			var pathArr = path.split('[');
			returnPath = pathArr[0];
		} else {
			returnPath = path;
		}
		return returnPath;
	};

return {
version: '0.1'
, author: '@daithi44'
, pathFinder: _pathFinder
};

})();

