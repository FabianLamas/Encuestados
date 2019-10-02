
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },

  editarPregunta: function(id, text) {
    if (typeof id == "number" && typeof text == "string") {
      this.modelo.editarPregunta(id, text);
    }
  },

  borrarTodas: function() {
    this.modelo.borrarTodas();
  },

  sumarUnVoto: function(pregunta, respuesta) {
    if (typeof pregunta == "string" && typeof respuesta == "string") {
      modelo.sumarUnVoto(pregunta, respuesta);
    }
  }
};
