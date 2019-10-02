function validacionDeFormulario(){
$('#localStorageForm')
  .formValidation({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      question: {
        validators: {
          notEmpty: {
            message: 'La pregunta no puede ser vacía'
          }
        }
      },
      'option[]': {
        validators: {
          notEmpty: {
            message: 'La respuesta no puede ser vacía'
          },
          stringLength: {
            max: 100,
            message: 'La respuesta debe tener menos de 100 caracteres'
          }
        }
      }
    }
  })
  .on('click', '.botonAgregarRespuesta', function() {
    var $template = $('#optionTemplate'),
      $clone = $template
      .clone()
      .removeClass('hide')
      .attr('id', "respuesta" + this.cantRespuestas)
      .insertBefore($template),
      $option = $clone.find('[name="option[]"]');

    $('#localStorageForm').formValidation('addField', $option);
  })
  .on('click', '.botonBorrarRespuesta', function() {
    var $row = $(this).parents('.form-group'),
      $option = $row.find('[name="option[]"]');

    $row.remove();
    $('#localStorageForm').formValidation('removeField', $option);
  })

  .on('added.field.fv', function(e, data) {

    if (data.field === 'option[]') {
      if ($('#localStorageForm').find(':visible[name="option[]"]').length >= 5) {
        $('#localStorageForm').find('.botonAgregarRespuesta').attr('disabled', 'disabled');
      }
    }
  })

  .on('removed.field.fv', function(e, data) {
    if (data.field === 'option[]') {
      if ($('#localStorageForm').find(':visible[name="option[]"]').length < 5) {
        $('#localStorageForm').find('.botonAgregarRespuesta').removeAttr('disabled');
      }
    }
  });
}