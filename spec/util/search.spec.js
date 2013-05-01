#!/usr/bin/env node
/*
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var http   = require('http'),
    osenv  = require('osenv'),
    path   = require('path'),
    fs     = require('fs'),
    temp   = path.join(osenv.tmpdir(), 'plugman'),
    shell  = require('shelljs'),
    plugins = require('../../src/util/plugins'),
    version_project = path.join(__dirname, '..', 'projects', 'version_test', '*')
    
describe('search util', function(){
    beforeEach(function() {
        shell.mkdir('-p', temp);
        shell.cp('-rf', version_project, temp);
    });
    afterEach(function() {
        shell.rm('-rf', temp);
    });
    it('should return the correct version in the project from cordova.js', function(){
        var possibleLocations = [temp+'/**/cordova.js'];
        expect(plugins.searchCordovaVersion(possibleLocations)).toBe('2.7.0rc1');    
    });

});



