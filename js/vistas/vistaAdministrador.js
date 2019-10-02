
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditar.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.borrarTodasLasPreguntas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem  = $(document.createElement("li")).attr({
      class: "list-group-item",
      id: pregunta.id,
      texto: pregunta.textoPregunta
    });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        respuestas.push({textoRespuesta: $(this).val(),cantidadPorRespuesta: 0});
      });
      respuestas.splice(respuestas.length - 1);
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    e.botonBorrarPregunta.click(function() {
      const id = parseInt($(".list-group-item.active").attr("id"));
      contexto.controlador.borrarPregunta(id);
    });
    e.botonEditarPregunta.click(function() {
      const text = prompt("Ingrese una nueva pregunta: ");
      const id = parseInt($(".list-group-item.active").attr("id"));
      contexto.controlador.editarPregunta(id,text);
    });
    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

