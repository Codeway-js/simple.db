# asimpledb
### Description
asimple db is a db in json. it was writed for simplicity liked quick.db but more easier to install
it is simple to install (just fs is require)
it is simple to use
it is simple to read the data without code
### Install
`$ npm install asimpledb`
### documentation
## English 
# How to setup a database
```js
const asimpledb = require('asimpledb') 
const db = new asimpledb('path/to/json/file',{init:true /* if the file doesnt exist */})
```
# How to insert data on database
```js
db.set("Data", "Anything you want here")
```
Write a __string__
```js
// Output : Data : Anything you want here
``` 

# How to find data on database
```js
db.get("Data")
```
Return a __string__
```js
//Output : Anything you want here
```

# How to verify if a data is on a database
return a __boolean__
```js
db.has("Data")
//Output : true

db.has("Data1")
//Output : false
```
## Français
# Comment setup une base de données
```js
const asimpledb = require('asimpledb') 
const db = new asimpledb('chemin/du/fichier/json',{init:true /* Si le fichier n'existe pas */})
```
# Comment insérer une donnée dans la base de données
```js
db.set("Data", "Ce que vous voulez ici")
```
Écris une valeur sous la forme __d'une chaine de caracètres__
# Comment trouver une donnée dans une base de données
