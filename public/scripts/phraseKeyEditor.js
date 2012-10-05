function phraseKeyEditor(keyId, onsuccess) {
  var form = document.forms.phraseKeyEditor;

  clearFields();
  showEditor();
  setupCancelEvent();
  setupFormSubmit();
  
  function setupCancelEvent() {
    $("#cancelKeyEditorButton").click(function() {
      $("#keyEditorDialog").hide();
    });

    $(form).keyup(function(e) {
      if (e.keyCode == 27) { $("#cancelKeyEditorButton").click(); }
    });

  }

  function clearFields() {
    $("#keyEditorDialog :input").prop("disabled", false);    
    $("#keyEditorDialog").find(":input").val("");  
    $(form).unbind();  
  }

  function showEditor() {
    if(keyId) {
      $.post("/phraseKeyDetails", {keyId: keyId}, function(details) {
        form.keyId.value = keyId;
        form.name.value = details.name;
        form.maxLength.value = details.maxLength;
        $("#keyEditorDialog").show();
        form.name.focus();
      });
    } else {
      $("#keyEditorDialog").show();
      form.name.focus();
    }
  }

  function setupFormSubmit() {
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