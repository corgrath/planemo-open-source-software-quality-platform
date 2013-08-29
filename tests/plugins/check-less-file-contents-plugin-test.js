/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-html-properties-and-values-plugin.js" );

/*
 * Tests
 */

exports.testNotAllowedToStartWithNotArray = function ( test ) {

	var options = {
		disallowPropertiesStartingWith: true
	};
	var file = "c:\\source.js";
	var elementName = "div";
	var property = "ng-click";
	var value = "ng-click";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "The \"disallowPropertiesStartingWith\" has to be an array." );
	}

	test.expect( 1 );
	test.done();

}

exports.testNotAllowedToStartWithValid = function ( test ) {

	var options = {
		disallowPropertiesStartingWith:
			[
				"ng-"
			]
	};

	var file = "c:\\source.js";
	var elementName = "div";
	var property = "ng-click";
	var value = "about();";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "Found HTML property \"ng-click\" name that starts invalid in file \"c:\\source.js\"." );
	}

	test.expect( 1 );
	test.done();

}

exports.testDisallowValuesStartingWith = function ( test ) {

	var options = {
		"disallowValuesStartingWith": {
			"-translation$": "DataModelViewer\\."
		}
	};

	var file = "c:\\page.html";
	var elementName = "p";
	var property = "data-title-translation";
	var value = "DataModelShower.Key.Value";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "Found disallowed value \"DataModelShower.Key.Value\" for property \"data-title-translation\"." );
		test.equal( error.elementName, elementName );
		test.equal( error.property, property );
		test.equal( error.value, value );
		test.equal( error.file, file );
	}

	test.expect( 5 );
	test.done();

}
