'use strict';

var _ = require('underscore');
var undercut = require('../lib/undercut.js');
var underscoreString = require('underscore.string');

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
    //console.log(_);
    done();
  },
  'no args': function(test) {
  //  test.expect(1);
    // tests here

    test.deepEqual(_.filterStartsWith(['abc','def','axl'], 'a'), ['abc','axl'], "should be ['abc','alx']");
    test.deepEqual(_.filterEndsWith(['abc','def','axl'], 'l'), ['axl'], "should be ['axl']");
    test.deepEqual(_.filterEndsWith(['abc',null,'axl'], 'l'), ['axl'], "should be ['axl']");
    test.done();
  }
};
