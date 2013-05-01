#!/usr/bin/env node
/*
 *
 * Copyright 2013 Tim Kim
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

var glob = require('glob'),
    fs = require('fs');

module.exports = function searchCordovaVersion(paths) {
    var possibleResults = [];
    for(var path in paths){
        possibleResults = possibleResults.concat(search(paths[path]));
    }

    return bestMatch(possibleResults);
}

function search(srcGlob) {
    // this only returns the first line of the file we are searching for
    var files = glob.sync(srcGlob);
    var contents = [];
    var firstLine;

    for (var i in files) {
        var file = files[i];
        if (fs.lstatSync(file).isFile()) {
            firstLine = fs.readFileSync(file, "utf-8").split('\n')[0];
            contents.push(firstLine);
        }
    }
    return contents;
}

function bestMatch(possibleResults) {
    var matchCount = {};
    var bestResult;
    
    if(possibleResults.length == 1) return possibleResults[0]
    
    for(var result in possibleResults){
        if(result == 0) bestResult = possibleResults[result];
        if(matchCount[possibleResults[result]]){
            matchCount[possibleResults[result]]++;
            if(matchCount[possibleResults[result]] > matchCount[bestResult]) bestResult = possibleResults[result];
        }else{
            matchCount[possibleResults[result]] = 1;
        }
    }
    return bestResult
}
