# asimpledb
## Description
asimple db is a db in json. it was writed for simplicity liked quick.db but more easier to install
it is simple to install (just fs is require)
it is simple to use
it is simple to read the data without code
## Install
`$ npm install asimpledb`
## documentation
because the module was inspired by ```quick.db``` go [here](https://quickdb.js.org/overview/docs) for more information and example
the db is a class and for initialized do
```javascript
const asimpledb = require('asimpledb') 
const db = new asimpledb('path/to/json/file',{init:true /* if the file doesnt exist */})
```


__Attention__ There are two major deference between `quick.db` and `asimpledb`
1. there are not table in `asimpledb`
2. `quick.db` use . for separator and `asimpledb` use /
