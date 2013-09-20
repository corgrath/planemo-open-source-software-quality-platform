/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */

/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );
var errorUtil = require( "../utils/error-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onDirectoryFound( function checkDirectoryNameOnDirectoryFound ( directoriesToIgnore, basePath, fullPath, directoryName, responseFunction ) {
		exports.onDirectoryFound( options, directoriesToIgnore, basePath, fullPath, directoryName, responseFunction );
	} );

};

exports.onDirectoryFound = function onDirectoryFound ( options, directoriesToIgnore, basePath, fullPath, directoryName, responseFunction ) {

	if ( !options ) {
		throw errorUtil.create( "No options were defined." );
	}

	if ( !options.pattern ) {
		throw errorUtil.create( "Invalid pattern option." );
	}

	var regexp = new RegExp( options.pattern );

	var isLegalFilename = regexp.test( directoryName );

	if ( !isLegalFilename ) {

		responseFunction( errorUtil.create( "The directory name \"" + directoryName + "\" is not valid.", {
			basePath: basePath,
			fullPath: fullPath,
			directoryName: directoryName
		} ) );

	}

}