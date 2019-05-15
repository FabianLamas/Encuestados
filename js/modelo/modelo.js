/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.votoSumado = new Evento(this);
  this.preguntaEditar = new Evento(this);
  this.borrarTodasLasPreguntas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length > 0) {
      for (var i=0; i < this.preguntas.length; i++) {
        if (this.ultimoId < this.preguntas[i].id) {
          this.ultimoId = this.preguntas[i].id;
        }
      }
    }
    return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    let index;
    this.preguntas.forEach(function(pregunta, i) {
      if (pregunta.id == id) {
        index = i;
      }
    });
    this.preguntas.splice(index, 1);
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  sumarUnVoto: function(nombrePregunta, respuesta) {
    let index;
    this.preguntas.forEach(function(pregunta, i) {
      if (pregunta.textoPregunta == nombrePregunta) {
        index = i;
      }
    });
    this.preguntas[index].cantidadPorRespuesta.map(function(opciones) {
      if (opciones.textoRespuesta == respuesta) {
        opciones.cantidadPorRespuesta++;
      }
    });
    this.guardar();
    this.votoSumado.notificar();
  },

  editarPregunta: function(id, content) {
    let index;
    this.preguntas.forEach(function(pregunta, i) {
      if (pregunta.id == id) {
        index = i;
      }
    });
    this.preguntas[index].textoPregunta = content;
    this.guardar();
    this.preguntaEditar.notificar();
  },

  borrarTodas: function() {
    this.preguntas = [];
    this.guardar();
    this.borrarTodasLasPreguntas.notificar();
  },

  cargarPreguntas: function() {
    if (localStorage.getItem("misPreguntas") != null) {
      return JSON.parse(localStorage.getItem("misPreguntas"));
    } else {
      return [];
    }
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("misPreguntas", JSON.stringify(this.preguntas));
  },

  
};
