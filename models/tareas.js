const Tarea = require('./tarea.js')
const colors = require('colors')

class Tareas {
  _listado = {}

  constructor() {
    this._listado = {}
  }

  get getListadoArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArray(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto() {
    this.getListadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green
      const { desc, completadoEn } = tarea
      const estado = completadoEn ? 'completado'.green : 'pendiente'.red

      console.log(`${idx} ${desc} :: ${estado}`)
    })
  }

  listarPendientesCompletadas(completadas = true){
    let contador = 0
    this.getListadoArr.forEach((tarea, i)=>{
        const {desc, completadoEn} = tarea
        const estado = completadoEn ? 'completada'.green : 'pendiente'.red

        if(completadas && estado === 'completada'.green){
            contador++
            console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`)
        }

        if(!completadas && estado === 'pendiente'.red){
            contador++
            console.log(`${(contador+'.').green } ${desc} :: ${estado}`)
        }
    })
  }

  borrarTarea(id = ''){
    if(this._listado[id]){
        delete this._listado[id]
    }
  }

  toggleCompletadas(ids = []){
    ids.forEach((id)=>{
        const tarea = this._listado[id]
        if(!tarea.completadoEn){
            tarea.completadoEn= new Date().toISOString()
        }
    })
    this.getListadoArr.forEach((tarea)=>{
        if(!ids.includes(tarea.id)){
            this._listado[tarea.id].completadoEn = null
        }
    })
  }
}

module.exports = Tareas
