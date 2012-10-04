function phraseKeyEditor(keyId) {
  var form = document.forms.phraseKeyEditor;

  clearFields();
  showEditor();
  $("#cancelPhraseEditorButton").click(function() {
    $("#phraseEditor").hide();
  });

  function clearFields() {
    $("#keyEditor").find(":input").val("");    
  }

  function showEditor() {
    if(keyId) {
      $.post("/phraseKeyDetails", {keyId: keyId}, function(details) {
        form.keyId.value = details.phrase_key_id;
        $("#keyEditor").show();
      });
    } else {
      $("#keyEditor").show();
    }

    $(form).submit(function() {
      $.ajax({
        url: '/savePhraseKey',
        type: 'POST',
        data: (new FormData(form)),
        contentType: false,
        processData: false,
        success: function(response) {
          
        } 
      });

      return false;
    });

  }


}