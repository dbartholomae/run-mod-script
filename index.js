var path = require('path');
var debug = require('debug')('run-mod-script');

module.exports = function(scriptRunner, dir, options){
  debug("Starting run-mod-script");
  var cwd = process.cwd();
  debug(" cwd: " + cwd);
  debug(" dir: " + dir);

  var argv = require('minimist')(process.argv.slice(2));
  var files = argv._.map(function(file){
    return(path.relative(dir, path.join(cwd, file)));
  });

  debug(" files: " + files);

  delete argv._;

  for (key in options) {
    argv[key] = options[key];
  }

  debug(" options: " + JSON.stringify(options, null, 2));

  process.argv = process.argv.slice(0, 2);
  for (var key in argv) {
    process.argv.push("-" + key);
    process.argv.push(argv[key]);
  }
  process.argv = process.argv.concat(files);

  var relToDir = path.relative(cwd, dir);
  var relFromDir = path.relative(dir, cwd);
  debug(" changing path to dir: " + relToDir);
  if(relToDir !== "")
    process.chdir(relToDir);
  debug(" running script");
  scriptRunner();
  debug(" changing path from dir: " + relToDir);
  if(relFromDir !== "")
    process.chdir(relFromDir);
}
