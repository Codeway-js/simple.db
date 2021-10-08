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
        if (Array.isArray(data)) {
            let str = this.init(path)
            eval("this.db" + str + " = [" + data + "]")
        }
        else if (typeof data == "object") {
            Object.keys(data).forEach((el, i) => {
                let str = this.init(path)
                str += "[" + el + "]"
                if (typeof data[el] == "object") {
                    let data2 = Object.values(data)[i]
                    let str = this.init(path)
                    str += "[`" + el + "`]"
                    eval("this.db" + str + " = "+da)
                    Object.keys(data2).forEach((el2, f) => {
                        let str = this.init(path)
                        str+="[`"+el+"`]"
                        if (Array.isArray(Object.values(data2)[f])) {
                            let str2 = Object.values(data2)[f].join(",")
                            str += "[`" + el2 + "`]"
                            if(Object.values(data2)[f].length == 0) {
                                eval("this.db" + str + " = []")
                                return
                            }
                            eval("this.db" + str + " = [" + str2 + "]")
                        }
                        else if (typeof Object.values(data2)[f] == "string") {
                            str += "[`" + el2 + "`]"
                            eval("this.db" + str + " =  " + '`' + Object.values(data2)[f] + '`')
                        }
                        else if (typeof Object.values(data2)[f] == "boolean") {
                            str += "[`" + el2 + "`]"
                            eval("this.db" + str + " =  " + Object.values(data2)[f])
                        }
                        else {
                            str += "[`" + el2 + "`]"
                            eval("this.db" + str + " = " + Object.values(data2)[f])
                        }
                    })
                }
                else if (Array.isArray(Object.values(data)[i])) {
                    let str = this.init(path)
                    let str2 = Object.values(data)[i].join(",")
                    if(Object.values(data)[i].length == 0) {
                        eval("this.db" + str + " = []")
                        return
                    }
                    eval("this.db" + str + " = [" + str2 + "]")
                }
                else if (typeof Object.values(data)[i] == "string") {
                    let str = this.init(path)
                    str += "[`" + el + "`]"
                    eval("this.db" + str + " =  " + '`' + Object.values(data)[i] + '`')
                }
                else if (typeof Object.values(data)[i] == "boolean") {
                    let str = this.init(path)
                    str += "[`" + el + "`]"
                    eval("this.db" + str + " =  " + Object.values(data)[i])
                }
                else {
                    let str = this.init(path)
                    str += "[`" + el + "`]"
                    eval("this.db" + str + " = " + Object.values(data)[i])
                }
            })
        }
        else if (typeof data == "string") {
            eval("this.db" + str + " = `" + data + "`")
        }
        this.write()
        return data
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
        eval("if(!this.db" + str + ")throw `the path doesnt exist`")
        eval("this.db" + str + ".push(" + dataa + ")")
        this.write()
    }
    delete(path) {
        let str = this.init(path)
        eval("if(!this.db" + str + ")throw `the path doesnt exist`")
        eval("delete this.db" + str)
        this.write()
        return true
    }
    add(path, number) {
        if (typeof number != "number") return false
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
        return true
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

