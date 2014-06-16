/*
 * undercut
 * https://github.com/mlconnor/undercut
 *
 * Copyright (c) 2014 Michael Connor
 * Licensed under the MIT license.
 */

'use strict';

//var _ = require('underscore');
//var undStr = require('underscore.string');
//var validator = require('validator');

/*
var numericEvalFunctions = {
	Eq   : function(a,b) { return a === b; },
	Lt   : function(a,b) { return a  <  b; },
	LtEq : function(a,b) { return a  <= b; },
	Gt   : function(a,b) { return a  >  b; },
    GtEq : function(a,b) { return a  >= b; }
};
*/

/* returns the nested value of a property */
function deep(obj, key, value) {

  var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
  root,
  i = 0,
  n = keys.length;

  while ((obj = obj[keys[i++]]) != null && i < n) {}
  value = i < n ? void 0 : obj;

  return value;
}

exports.filterMixins = function(underscore, library, methodNames) {
  var mixins = {};

  var underscoreFns = ['every','find','filter','reject','some'];
  underscore.each(underscoreFns, function(underscoreFnName) {
    underscore.each(methodNames, function(methodName) {
      mixins[underscoreFnName + methodName.substring(0,1).toUpperCase() + methodName.substring(1)] = function() {
        return underscore[underscoreFnName].call(null, outerArgs[0], function(value) {
          //console.log('val=' + value + ' calling func with ', arguments);
          return library[methodName].apply(null, [ value ].concat(outerArgs.slice(1)));
        });
      };
    });
  });

  return mixins;
};

//addMatcher(undStr, ["startsWith", "endsWith"]);
/*
addMatcher(validator, [
  "contains",
  "matches",
  "isEmail",
  "isURL",
  "isIP",
  "isAlpha",
  "isNumeric",
  "isAlphanumeric",
  "isBase64",
  "isHexadecimal",
  "isHexColor",
  "isLowercase",
  "isUppercase",
  "isInt",
  "isFloat",
  "isDivisibleBy",
  "isNull",
  "isLength",
  "isByteLength",
  "isUUID",
  "isDate",
  "isAfter",
  "isBefore",
  "isIn",
  "isCreditCard",
  "isISBN",
  "isJSON",
  "isMultibyte",
  "isAscii",
  "isFullWidth",
  "isHalfWidth",
  "isVariableWidth",
  "isSurrogatePair"
]);
*/
// transform - capitalize, chop, clean, swapCase, 

//console.log(_.keys(exports));
//onsole.log('count=' + _.keys(u).length);

//console.log(exports.filterStartsWith(['abc','def','aXY','aaa'], "a"));
//onsole.log(exports.filterIsEmail(['abc','mlconnor@yahoo.com','aXY','aaa']));


/*
function addEach(library, methodNames) {
  var underscoreFns = ['map','filter','reject','every'];
  _.each(underscoreFns, function(underscoreFnName) {
  	_.each(methodNames, function(methodName) {
	  u[underscoreFnName + undStr.capitalize(methodName)] = function() {
        var outerArgs = _.toArray(arguments);
        return _[underscoreFnName].call(null, outerArgs[0], function(value) {
      	  console.log('val=' + value + ' calling func with ', arguments);
          return library[methodName].apply(null, [ value ].concat(outerArgs.slice(1)));
        });
	  };
    });
  });
}
*/
// Get/set the value of a nested property
/*
function deep(obj, key, value) {

  var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
  root,
  i = 0,
  n = keys.length;

  while ((obj = obj[keys[i++]]) != null && i < n) {}
  value = i < n ? void 0 : obj;

  return value;
}
*/
//console.log('3 gt 4 ' + numericFunctions.Gt(3,4));
