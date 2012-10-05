function phraseKeyEditor(keyId, onsuccess) {
  var form = document.forms.phraseKeyEditor;

  clearFields();
  showEditor();
  $("#keyEditorDialog :input").prop("disabled", false);
  
  $("#cancelKeyEditorButton").click(function() {
    $("#keyEditorDialog").hide();
  });

  function clearFields() {
    $("#keyEditorDialog").find(":input").val("");    
  }

  function showEditor() {
    if(keyId) {
      $.post("/phraseKeyDetails", {keyId: keyId}, function(details) {
        form.keyId.value = details.phrase_key_id;
        form.name.value = details.name;
        form.maxLength.value = details.maxLength;
        $("#keyEditorDialog").show();
      });
    } else {
      $("#keyEditorDialog").show();
    }

    $(form).submit(function() {
      $.ajax({
        url: '/savePhraseKey',
        type: 'POST',
        data: (new FormData(form)),
        contentType: false,
        processData: false,
        success: function(response) {
          $("#keyEditorDialog").hide();
          onsuccess();
        } 
      });

      $("#keyEditorDialog :input").prop("disabled", true);
      return false;
    });

  }


}