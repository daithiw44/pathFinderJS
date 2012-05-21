var pf = (function() {
  'use strict';

  var pathFinder = function(data, path) {
		var data_type = this.toType(data), resp;
		if (data_type === 'array') {
			resp = this.arrMultiplesObjects(data, path);
		} else if (data_type === 'object') {
			resp = this.objProperties(data, path);
		} else {
			resp = '';
		}
    return resp;
	};

  pathFinder.prototype = {
    toType: function(obj) {
		return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	},

	arrMultiplesObjects: function(elements, template) {
		var output = [], i, len;
		for (i = 0, len = elements.length; i < len; i++) {
			output.push(this.objProperties(elements[i], template));
		}
		return output;
	},

	 objProperties: function(element, o) {
      var resp;
		if (o.indexOf('.') === -1 && o.indexOf('[') === -1) {
			if (element.hasOwnProperty(o)) {
				resp = element[o];
			}else {
				resp = '';
			}

		}else {
			try {
				resp = this.objectPath(element, o);
			}
			catch (ex) {
				resp = '';
			}
		}
      return resp;
	},

	 objectPath: function(elObj, nstr) {
		var obj = nstr.split('.'), pathArr, num, current = 0, res = elObj;
		while (current < obj.length) {
			res = this.objectPathStep(res, this.objectPathStepArr(obj[current]));
			if (this.toType(res) === 'array') {
				pathArr = obj[current].split('[');
				if (pathArr.length > 1) {
					num = +(pathArr[1].replace(']', ''));
					res = res[num];
				}	}
			current++;
		}
		return res;
	},

	objectPathStep: function(parent, child) {
      var resp;
		if (parent.hasOwnProperty(child)) {
			resp = parent[child];
		} else {
			resp = '';
		}
      return resp;
	},

	objectPathStepArr: function(path) {
		var returnPath, pathArr;
		if (path.indexOf('[') !== -1) {
			pathArr = path.split('[');
			returnPath = pathArr[0];
		} else {
			returnPath = path;
		}
		return returnPath;
	}
  };

  return {
    version: '0.1'
, author: '@daithi44'
, pathFinder: pathFinder
  };

}());

