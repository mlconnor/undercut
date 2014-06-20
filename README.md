# undercut [![Build Status](https://secure.travis-ci.org/mlconnor/undercut.png?branch=master)](http://travis-ci.org/mlconnor/undercut)

Undercut allows you to build mixins such as everyStartsWith and filterEndsWith into underscore.  It is made for people who are generally lazy and love terse code.

## Getting Started
Install the module with: `git clone https://github.com/mlconnor/undercut`

```javascript
var _ = require('underscore'),
    validator = require('validator'),
    undercut = require('undercut');

_.mixin(undercut.filterMixins(_, underscoreString, ["startsWith", "endsWith"]));
```

## Documentation
_(Coming soon)_

## Examples

```js
var _ = require('underscore'),
    validator = require('validator'),
    undercut = require('undercut');

_.mixin(undercut.filterMixins(_, underscoreString, ["startsWith", "endsWith"]));
```
This would mixin the following functions in underscore.

```js
  everyEndsWith()
  everyStartsWith()
  filterEndsWith()
  filterStartsWith()
  findEndsWith()
  findStartsWith()
  rejectEndsWith()
  rejectStartsWith()
  someEndsWith()
  someStartsWith() 
```

Undercut will basicallly take all the methods you give it and prepend every, find, filter, reject, some to each.  The idea is that instead of writing...

```js
_.filter("foobar", function(val) { val.startsWith("foo"); });
```

You can simply write.

```js
_.filterStartsWith("foobar", "foo");
```

Here are some more examples using the validator module.

```js
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
```

And then you can...

```js
/* returns ['abc','axl']) */
_.filterStartsWith(['abc','def','axl'], 'a');

/* returns ['axl'] */
_.filterEndsWith(['abc','def','axl'], 'l');

/* returns ['axl'] */
_.filterEndsWith(['abc',null,'axl'], 'l');

/* returns true */
_.everyContains(['abc','dadf','axl'], 'a');

/* returns [] */
_.filterContains(['abc','dadf','axl'], 'z'));

/* returns true */
_.everyMatches  (['abc','cbc','fbz'], "\\Sb\\S"));

/* returns true */
_.someMatches   (['zzz','cbc','zzz'], "\\Sb\\S"));

/* returns ['zzz','zzz'] */
_.filterMatches (['zzz','cbc','zzz'], "z+");

/* returns [12,15] */
_.filterIsDivisibleBy ([11,12,13,14,15], 3));

/* returns ["defg"] */
_.filterIsLength(["a","abc","defg"], 4));

/* returns false */
_.everyIsDate   (["1/23/1996", "2/11/2004", "foo"]);

/* returns true */
_.everyIsDate   (["1/23/1996", "2/11/2004", "6/12/2012"]));

/* returns [1,2,3,true] */
_.rejectIsNull  ([1,2,3,true,null]);

/* returns true */
_.everyIsBefore (["1/10/2014","2/12/2014"], new Date()));

/* returns true */
_.everyIsAfter  (["1/10/2030","2/12/2030"], new Date()));

/* returns true */
_.everyIsIn     (["CA","GA","OH"], ["AL","AK","GA","OH","CA","FL","MI"]));

/* returns true */
_.someIsIn      (["YY","XX","OH"], ["AL","AK","GA","OH","CA","FL","MI"]));

/* returns ["OH"] */
_.filterIsIn    (["YY","XX","OH"], ["AL","AK","GA","OH","CA","FL","MI"]);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Michael Connor. Licensed under the MIT license.
