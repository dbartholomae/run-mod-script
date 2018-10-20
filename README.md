# run-mod-script@1.0.0

[![Greenkeeper badge](https://badges.greenkeeper.io/dbartholomae/run-mod-script.svg)](https://greenkeeper.io/)

**run-mod-script** runs a script with modified options and cwd. The path
to the files the script is run on is modified to work in the new cwd. 

```
runModified = require('run-mod-script')
scriptRunner = function(){
  require('coffeelint/bin/coffeelint');
}
cwd = __dirname;
options = {
  f: ".coffeelint.json"
};

runModified(scriptRunner, cwd, options);
```
