'use strict';

var _ = require('underscore');
var undercut = require('../lib/undercut.js');
var underscoreString = require('underscore.string');
var validator = require('validator');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.undercut = {
  setUp: function(done) {
    // setup here
    _.mixin(undercut.filterMixins(_, underscoreString, ["startsWith", "endsWith"]));
    _.mixin(undercut.filterMixins(_, validator, [
      "contains",
      "matches",
      "isDivisibleBy",
      "isLength",
      "isDate",
      "isAfter",
      "isBefore",
      "isNull",
      "isIn"
    ]));
    _.mixin(undercut.mapMixins(_, _, [ 'omit', 'pluck' ]));
    //console.log(_);
    done();
  },
  'no args': function(test) {
  //  test.expect(1);
    // tests here

    test.deepEqual(_.filterStartsWith(['abc','def','axl'], 'a'), ['abc','axl']);
    test.deepEqual(_.filterEndsWith(['abc','def','axl'], 'l'), ['axl']);
    test.deepEqual(_.filterEndsWith(['abc',null,'axl'], 'l'), ['axl']);

    test.ok       (_.everyContains(['abc','dadf','axl'], 'a'));
    test.deepEqual(_.filterContains(['abc','dadf','axl'], 'z'), []);
    test.ok       (_.everyMatches  (['abc','cbc','fbz'], "\\Sb\\S"));
    test.ok       (_.someMatches   (['zzz','cbc','zzz'], "\\Sb\\S"));
    test.deepEqual(_.filterMatches (['zzz','cbc','zzz'], "z+"), ['zzz','zzz']);
    test.deepEqual(_.filterIsDivisibleBy ([11,12,13,14,15], 3), [12,15]);
    test.deepEqual(_.filterIsLength(["a","abc","defg"], 4), ["defg"]);
    test.ok       (! _.everyIsDate   (["1/23/1996", "2/11/2004", "foo"]));
    test.ok       (_.everyIsDate   (["1/23/1996", "2/11/2004", "6/12/2012"]));
    test.deepEqual(_.rejectIsNull  ([1,2,3,true,null]), [1,2,3,true]);
    test.ok       (_.everyIsBefore (["1/10/2014","2/12/2014"], new Date()));
    test.ok       (_.everyIsAfter  (["1/10/2030","2/12/2030"], new Date()));
    test.ok       (_.everyIsIn     (["CA","GA","OH"], ["AL","AK","GA","OH","CA","FL","MI"]));
    test.ok       (_.someIsIn      (["YY","XX","OH"], ["AL","AK","GA","OH","CA","FL","MI"]));
    test.deepEqual(_.filterIsIn    (["YY","XX","OH"], ["AL","AK","GA","OH","CA","FL","MI"]), ["OH"]);
 
    test.deepEqual(_.mapOmit       ([{'foo':1,'bar':2},{'foo':false, 'bar':3, 'baz':false}],['bar','baz']), [ { foo: 1 }, { foo: false } ] );


    test.done();
  }
};


