const { v4: uuid4 } = require('uuid')

class Tarea {
    id = ''
    desc = ''
    completadoEn = null

    constructor(desc){
        this.id = uuid4()
        this.desc = desc 
        this.completadoEn = null //Redundar
    }
}

module.exports = Tarea