const fs = require('fs')
module.exports = class db {
    constructor(pathtofile, opts) {
        if (pathtofile.startsWith("./")) {
            this.path1 = '../../' + pathtofile.slice(2)
            this.path2 = pathtofile
        } else {
            this.path1 = '../../' + pathtofile
            this.path2 = './' + pathtofile
        }
        if (opts) {
            if (opts.init) {
                fs.writeFileSync(this.path2, "{}", function (err) {
                    if (err) return console.log(err);
                    console.log("is good")
                });
                this.db = {}
            }
        }
        else {

            this.getall(1)
        }
    }
    getall(num) {
        if (num == 1) {
            this.db = require(this.path1)

        }
        else {
            this.db = require(this.path2)
        }
        return this.db
    }
    write() {
        let str = JSON.stringify(this.db)
        fs.writeFileSync(this.path2, str, function (err) {
            if (err) return console.log(err);
            console.log(str)
        });
        this.getall(1)
    }
    init(path) {
        this.getall(1)
        let paths = path.split("/")
        let str = ""
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] != '') {
                str += "[`" + paths[i] + "`]"
                eval("if(!this.db" + str + "){this.db" + str + " = {}}")
            }
        }
        return str
    }
    set(path, data) {
        if (!data) throw "data must be specified"
        let str = this.init(path)
        if (typeof data == "object") {
            let str = this.init(path)
            str += "['" + Object.keys(data)[0] + "']"
            if (typeof data[Object.keys(data)[0]] == "object") {
                let data2 = Object.values(data)[0]
                data2.join(",")
                data2.slice(0, -1)
                eval("this.db" + str + " = [" + data2 + "]")
            }

            else if (typeof Object.values(data)[0] == "string") {
                eval("this.db" + str + " =  " + '`' + Object.values(data)[0] + '`')
            } else {
                eval("this.db" + str + " = " + Object.values(data)[0])
            }
        }
        else if (typeof data == "string") {
            eval("this.db" + str + " = `" + data + "`")
        }
        this.write()
    }
    get(path) {
        this.getall(1)
        let paths = path.split("/")
        let str = ""
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] != '') {
                str += "[`" + paths[i] + "`]"
            }
        }
        let result
        eval("result = this.db" + str)
        return result
    }
    push(path, data) {
        this.getall(1)
        let paths = path.split("/")
        let str = ""
        let dataa = data
        if (typeof data == "string") {
            dataa = "`" + data + "`"
        }
        for (let i = 0; i < paths.length; i++) {
            str += "[`" + paths[i] + "`]"
            eval("if(!this.db" + str + "){this.db" + str + " = {}}")
        }
        eval("this.db" + str + ".push(" + dataa + ")")
        this.write()
    }
    delete(path) {
        let str = this.init(path)
        eval("delete this.db" + str)
        this.write()
        return true
    }
    add(path, number) {
        if (typeof number != "number") return
        let str = this.init(path)
        let paths = path.split("/")
        let key = path[paths.length - 1]
        if (paths.length > 0) {
            paths.pop()
            key = path
        }
        paths = paths.join("/")
        eval("if(typeof this.db" + str + "== 'object' ){this.set(`" + paths + "`, { " + key + " : " + number + "} )}else{ this.db" + str + "+= " + number + "}")
        this.write()
    }
    has(path) {
        this.getall(1)
        let paths = path.split("/")
        let str = ""
        let result = true
        for (let i = 0; i < paths.length; i++) {
            str += "[`" + paths[i] + "`]"
            eval('if(!this.db' + str + '){result = false}')
        }
        return result
    }
    substract(path, number) {
        this.add(path, -number)
    }
    all() {
        this.getall(1)
        return this.db
    }
}

