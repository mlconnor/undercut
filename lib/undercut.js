/*
 * undercut
 * https://github.com/mlconnor/undercut
 *
 * Copyright (c) 2014 Michael Connor
 * Licensed under the MIT license.
 */

'use strict';
/*
var numericEvalFunctions = {
	Eq   : function(a,b) { return a === b; },
	Lt   : function(a,b) { return a  <  b; },
	LtEq : function(a,b) { return a  <= b; },
	Gt   : function(a,b) { return a  >  b; },
    GtEq : function(a,b) { return a  >= b; }
};
*/

exports.filterMixins = function(underscore, library, functionNames) {
  var mixins = {};

  var underscoreFns = ['every','find','filter','reject','some'];
  underscore.each(underscoreFns, function(underscoreFnName) {
    underscore.each(functionNames, function(functionName) {
      mixins[underscoreFnName + functionName.substring(0,1).toUpperCase() + functionName.substring(1)] = function() {
        var outerArgs = underscore.toArray(arguments);
        return underscore[underscoreFnName].call(underscore, outerArgs[0], function(value) {
          //console.log('val=' + value + ' calling func with ', arguments);
          return library[functionName].apply(library, [ value ].concat(outerArgs.slice(1)));
        });
      };
    });
  });

  return mixins;
};

exports.mapMixins = function(underscore, library, functionNames) {
  var mixins = {};

  underscore.each(functionNames, function(functionName) {
    var mixinFnName = 'map' + functionName.substring(0,1).toUpperCase() + functionName.substring(1); 
    mixins[mixinFnName] = function() {
      var outerArgs = underscore.toArray(arguments);
      return underscore.map(outerArgs[0], function(value) {
        var innerArgs = [ value ].concat(outerArgs.slice(1));
        var res = library[functionName].apply(library, innerArgs);
        //  console.log('val', value, 'calling func ' + functionName + ' with args ', innerArgs, 'res=', res);
        return res;
      });
    };
  });

  return mixins;
};
