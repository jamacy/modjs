var fs = require('fs');
var path = require('path');
var glob = require("./glob");
var config = require('../config');
var rimraf = require('rimraf');
var _ = require('underscore');
var async = require('async');


var isWindows = process.platform === 'win32';

function frontSlash(path) {
    return path.replace(/\\/g, '/');
}


/**
 *
 * @param path
 * @returns {boolean}
 */
var exists = exports.exists = function(path) {
    if (isWindows && path.charAt(path.length - 1) === '/' &&
        path.charAt(path.length - 2) !== ':') {
        path = path.substring(0, path.length - 1);
    }

    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 *
 * @param path
 * @param callback
 * @returns {*}
 */
exports.isDir = function (path, callback) {

    if(callback){

        fs.stat(path, function (err, info) {
            if (err) {
                return callback(err);
            }
            return callback(null, {
                path: path,
                dir: info.isDirectory()
            });
        });

    }else{

        try{
            return fs.statSync(path).isDirectory();
        }catch(e){
            return false;
        }

    }


};

/**
 *
 * @param format
 * @returns {boolean}
 */
exports.isDirFormat = function(format){
    return path.extname(format) === '';
};


/**
 *
 * @param dest
 * @param src
 * @returns {*}
 */
exports.pathJoin = function(dest, src){
    if(exports.isDirFormat(dest)){
        dest = path.dirname(dest);
        return path.join(dest, src);

    }else{
        // return dest if file
        return dest;
    }

};

/**
 *
 * @param path
 * @param callback
 * @returns {*}
 */
exports.isFile = function (path, callback) {

    if(callback){
        fs.stat(path, function (err, info) {
            if (err) {
                return callback(err);
            }
            return callback(null, {
                path: path,
                file: info.isFile()
            });
        });
    }

    else{
        try{
            return fs.statSync(path).isFile();
        }catch(e){
            return false;
        }
    }
};

/**
 *
 * @param p
 * @returns {boolean}
 */
exports.isPlaintextFile= function (p) {

    var ext = path.extname(p);

    var binary = {
        ".png" : 1,
        ".jpg": 1,
        ".gif": 1,
        ".jpeg": 1,
        ".ico": 1,
        ".exe": 1
    };

    return !binary[ext];

};

/**
 *
 * @param data
 * @see https://github.com/zhuth/CsSC/blob/00ba5aaacd54030d68cedb6f2297945f2e2ec94d/Host.cs
 * @returns {boolean}
 */
exports.isUTF8Encoding = function(data) {
    // BOM header
    if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) return true;

    var charByteCounter = 1;

    var curByte;
    for (var i = 0, c = data.length; i < c; i++) {
        curByte = data[i];
        if (charByteCounter == 1) {
            if (curByte >= 0x80) {

                while (((curByte <<= 1) & 0x80) != 0) {
                    charByteCounter++;
                }

                if (charByteCounter == 1 || charByteCounter > 6) return false;
            }
        } else {

            if ((curByte & 0xC0) != 0x80) return false;
            charByteCounter--;
        }
    }

    if (charByteCounter > 1) return false;

    return true;
}

/**
 * file suffix append, like jquery.js => jquery.min.js
 * @param p
 * @param suffix .min
 * @return {*}
 */
exports.suffix = function( p, suffix ){

    var dn = path.dirname(p);
    var en = path.extname(p);
    var bn = path.basename(p, en);

    return path.join(dn , bn + suffix + en);
};


/**
 * List directories within a directory. Filters out regular files and
 * subversion .svn directory (if any).
 *
 * @param {String} dir
 * @param {Function} callback
 */
exports.listDirs = function (dir, callback) {
    // In Nodejs 0.8.0, existsSync moved from path -> fs.
    var pathExists = fs.exists || path.exists;

    pathExists(dir, function (exists) {
        if (!exists) {
            return callback(null, []);
        }
        fs.readdir(dir, function (err, files) {
            if (err) {
                return callback(err);
            }
            var paths = files.map(function (f) {
                return path.resolve(dir, f);
            });


            async.map(paths, exports.isDir, function (err, results) {
                if (err) {
                    return callback(err);
                }
                var dirs = _.compact(results.map(function (d) {
                    if (d.dir && path.basename(d.path) !== '.svn') {
                        return d.path;
                    }
                    return null;
                }));
                return callback(null, dirs);
            });
        });
    });
};


/**
 * pattern {String} Pattern to be matched
 * @param pattern
 * @param base
 * @returns {Array} filenames found matching the pattern
 * @see https://github.com/isaacs/node-glob
 */
exports.globSync = exports.glob = function(pattern, base){
    if (Array.isArray(pattern)) {
        var files = [];
        pattern.forEach(function(p) {
            var res = exports.globSync.call(exports, p, base);
            if (!res || res.length === 0) {
                res = [p];
            }
            [].splice.apply(files, [files.length, 0].concat(res));
        });
        return files;
    } else {
        return glob.glob(pattern, {cwd: base || process.cwd()});
    }
};

/**
 *
 * @param filepath
 * @returns {*}
 */
exports.delete = function(filepath){
    return rimraf.sync(filepath);
};

/**
 *
 * @param path
 * @param encoding
 * @returns {*}
 */
exports.read = function (/*String*/path, /*String?*/encoding) {
    if (encoding === 'utf-8') {
        encoding = 'utf8';
    }
    if (!encoding) {
        encoding = 'utf8';
    }

    var text = fs.readFileSync(path, encoding);

    //Hmm, would not expect to get A BOM, but it seems to happen,
    //remove it just in case.
    if (text.indexOf('\uFEFF') === 0) {
        text = text.substring(1, text.length);
    }

    return text;
};

/**
 *
 * @param fileName
 * @param fileContents
 * @param encoding
 */
exports.write = function (/*String*/fileName, /*String*/fileContents, /*String?*/encoding) {
    //summary: saves a *text* file.
    var parentDir;

    if (encoding === 'utf-8') {
        encoding = 'utf8';
    }
    if (!encoding) {
        encoding = 'utf8';
    }

    //Make sure destination directories exist.
    parentDir = path.dirname(fileName);
    if (!exists(parentDir)) {
        exports.mkdirsSync(parentDir);
    }

    fs.writeFileSync(fileName, fileContents, encoding);
};

/**
 *
 * @param src
 * @param dest
 * @returns {*}
 */
exports.copy = function(src, dest){

    if(exports.isFile(src)){
        return exports.copyFile(src, dest);
    }else if(exports.isDir(src)){
        return exports.copydir(src, dest);
    }
};


/**
 * Search for a filename in the given directory or all parent directories.
 * @param dirpath
 * @param filename
 * @returns {*}
 */
exports.findup = function (dirpath, filename) {
    var existsSync = fs.existsSync || path.existsSync;
    var filepath = path.join(dirpath, filename);
    // Return file if found.
    if (existsSync(filepath)) { return filepath; }
    // If parentpath is the same as dirpath, we can't go any higher.
    var parentpath = path.resolve(dirpath, '..');
    return parentpath === dirpath ? null : findup(parentpath, filename);
};


/**
 *
 * @param startDir
 * @param regExpFilters
 * @param makeUnixPaths
 * @returns {Array}
 */
exports.getFilteredFileList= function (/*String*/startDir, /*RegExp*/regExpFilters, /*boolean?*/makeUnixPaths) {
    //summary: Recurses startDir and finds matches to the files that match regExpFilters.include
    //and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
    //and it will be treated as the "include" case.
    //Ignores files/directories that start with a period (.) unless exclusionRegExp
    //is set to another value.
    var files = [], topDir, regExpInclude, regExpExclude, dirFileArray,
        i, stat, filePath, ok, dirFiles, fileName;

    var exclusionRegExp= /^\./;

    topDir = startDir;


    regExpInclude = regExpFilters.include || regExpFilters;
    regExpExclude = regExpFilters.exclude || null;

    if (exports.exists( topDir )) {

        dirFileArray = fs.readdirSync(topDir);
        for (i = 0; i < dirFileArray.length; i++) {
            fileName = dirFileArray[i];
            filePath = path.join(topDir, fileName);
            stat = fs.statSync(filePath);
            if (stat.isFile()) {
                if (makeUnixPaths) {
                    //Make sure we have a JS string.
                    if (filePath.indexOf("/") === -1) {
                        filePath = frontSlash(filePath);
                    }
                }

                ok = true;
                if (regExpInclude) {
                    ok = filePath.match(regExpInclude);
                }
                if (ok && regExpExclude) {
                    ok = !filePath.match(regExpExclude);
                }

                if (ok && (!exclusionRegExp ||
                    !exclusionRegExp.test(fileName))) {
                    files.push(filePath);
                }
            } else if (stat.isDirectory() &&
                (!exclusionRegExp || !exclusionRegExp.test(fileName))) {
                dirFiles = this.getFilteredFileList(filePath, regExpFilters, makeUnixPaths);
                files.push.apply(files, dirFiles);
            }
        }
    }

    return files; //Array
};

/**
 *
 * @param srcDir
 * @param destDir
 * @param regExpFilter
 * @param onlyCopyNew
 * @returns {Array}
 */
exports.copydir = function (/*String*/srcDir, /*String*/destDir, /*RegExp?*/regExpFilter, /*boolean?*/onlyCopyNew) {
    //summary: copies files from srcDir to destDir using the regExpFilter to determine if the
    //file should be copied. Returns a list file name strings of the destinations that were copied.
    regExpFilter = regExpFilter || /\w/;

    //Normalize th directory names, but keep front slashes.
    //path module on windows now returns backslashed paths.
    var cwd = process.cwd();

    // append "/" for replace
    srcDir = frontSlash(path.normalize(srcDir + "/"));
    destDir = frontSlash(path.normalize(destDir+ "/"));

    srcDir = frontSlash(path.join(cwd, srcDir));
    destDir = frontSlash(path.join(cwd, destDir));

    var fileNames = exports.getFilteredFileList(srcDir, regExpFilter, true),
        copiedFiles = [], i, srcFileName, destFileName;

    for (i = 0; i < fileNames.length; i++) {
        srcFileName = fileNames[i];
        destFileName = srcFileName.replace(srcDir, destDir);

        // console.log(srcDir, destDir, srcFileName,destFileName);

        if (exports.copyFile(srcFileName, destFileName, onlyCopyNew)) {
            copiedFiles.push(destFileName);
        }
    }

    return copiedFiles.length ? copiedFiles : null; //Array or null
};

/**
 *
 * @param srcFileName
 * @param destFileName
 * @param onlyCopyNew
 * @returns {boolean}
 */
exports.copyFile= function (/*String*/srcFileName, /*String*/destFileName, /*boolean?*/onlyCopyNew) {
    //summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
    //srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
    var parentDir;

    //logger.trace("Src filename: " + srcFileName);
    //logger.trace("Dest filename: " + destFileName);

    //If onlyCopyNew is true, then compare dates and only copy if the src is newer
    //than dest.
    if (onlyCopyNew) {
        if (exports.exists(destFileName) && fs.statSync(destFileName).mtime.getTime() >= fs.statSync(srcFileName).mtime.getTime()) {
            return false; //Boolean
        }
    }

    //Make sure destination dir exists.
    parentDir = path.dirname(destFileName);
    if (!exports.exists(parentDir)) {
        exports.mkdirsSync(parentDir);
    }

    fs.writeFileSync(destFileName, fs.readFileSync(srcFileName, 'binary'), 'binary');

    return true; //Boolean
};


/**
 * Given a path to a directory, create it, and all the intermediate directories as well
 *
 * @param dirPath the path to create
 * @param mode
 * @example
 *  file.mkdirs("/tmp/dir", 755)
 */
exports.mkdirs = exports.mkdirsSync = function (dirPath, mode) {
    if (dirPath[0] !== "/") {
        dirPath = path.join(process.cwd(), dirPath)
    }

    var dirs = dirPath.split(path.sep);
    var walker = [dirs.shift()];

    dirs.reduce(function (acc, d) {
        acc.push(d);
        var dir = acc.join("/");

        try {
            var stat = fs.statSync(dir);
            if (!stat.isDirectory()) {
                throw "Failed to mkdir " + dir + ": File exists";
            }
        } catch (err) {
            fs.mkdirSync(dir, mode);
        }
        return acc;
    }, walker);
};


/**
 * Given a path to a directory, walk the fs below that directory
 * @param start the path to startat
 * @param callback called for each new directory we enter
 * @example
 *      file.walk("/tmp", function(error, path, dirs, name) {
 *          // path is the current directory we're in
 *          // dirs is the list of directories below it
 *          // names is the list of files in it
 *      })
 */
exports.walk = exports.walkSync = function (start, callback) {
    var stat = fs.statSync(start);

    if (stat.isDirectory()) {
        var filenames = fs.readdirSync(start);

        var coll = filenames.reduce(function (acc, name) {
            var abspath = path.join(start, name);

            if (fs.statSync(abspath).isDirectory()) {
                acc.dirs.push(name);
            } else {
                acc.names.push(name);
            }

            return acc;
        }, {"names": [], "dirs": []});

        callback(start, coll.dirs, coll.names);

        coll.dirs.forEach(function (d) {
            var abspath = path.join(start, d);
            exports.walkSync(abspath, callback);
        });

    } else {
        throw new Error("path: " + start + " is not a directory");
    }
};


exports.createTempFile = function(src, contents){
    var temp = path.join(config.TMP_DIR , path.basename(src));
    exports.write(temp, contents);
    return temp;
}