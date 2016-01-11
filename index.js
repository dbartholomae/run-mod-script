var path = require('path');

module.exports = function(scriptRunner, dir, options){
  var cwd = process.cwd();

  var argv = require('minimist')(process.argv.slice(2));
  var files = argv._.map(function(file){
    return(path.relative(dir, path.join(cwd, file)));
  });

  delete argv._;

  for (key in options) {
    argv[key] = options[key];
  }

  process.argv = process.argv.slice(0, 2);
  process.argv = process.argv.concat(files);
  for (var key in argv) {
    process.argv.push("-" + key);
    process.argv.push(argv[key]);
  }

  process.chdir(path.relative(cwd, dir));
  scriptRunner();
  process.chdir(path.relative(dir, cwd));
}
