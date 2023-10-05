/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var objectKeys = require( '@stdlib/utils-keys' );
var defineProperty = require( '@stdlib/utils-define-property' );
var propertyDescriptor = require( '@stdlib/utils-property-descriptor' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var setConfigurableReadOnly = require( './../../dist' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof setConfigurableReadOnly, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function sets a property on a provided object', function test( t ) {
	var obj = {};
	setConfigurableReadOnly( obj, 'foo', 'bar' );
	t.equal( obj.foo, 'bar', 'returns expected value' );
	t.end();
});

tape( 'the read-only property is not writable', function test( t ) {
	var obj = {};
	setConfigurableReadOnly( obj, 'foo', 'bar' );
	t.throws( foo, Error, 'property cannot be set' );
	t.end();

	function foo() {
		obj.foo = 'bip';
	}
});

tape( 'the read-only property is configurable', function test( t ) {
	var desc;
	var obj;

	obj = {};
	setConfigurableReadOnly( obj, 'foo', 'bar' );
	setConfigurableReadOnly( obj, 'beep', 'boop' );

	desc = {
		'configurable': true,
		'enumerable': false,
		'writable': true,
		'value': 'buzz'
	};
	defineProperty( obj, 'foo', desc );
	t.deepEqual( propertyDescriptor( obj, 'foo' ), desc, 'property can be reconfigured' );

	t.equal( obj.beep, 'boop', 'returns expected value' );
	t.equal( hasOwnProp( obj, 'beep' ), true, 'has property' );

	// Configurable properties can be deleted...
	delete obj.beep;
	t.equal( obj.beep, void 0, 'returns expected value' );
	t.equal( hasOwnProp( obj, 'beep' ), false, 'does not have property' );

	t.end();
});

tape( 'the read-only property is enumerable', function test( t ) {
	var obj = {};
	setConfigurableReadOnly( obj, 'foo', 'bar' );
	t.deepEqual( objectKeys( obj ), [ 'foo' ], 'property is enumerable' );
	t.end();
});
