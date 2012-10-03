function phraseKeyEditor(var keyId) {
  
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
        $("#keyEditor").show();
      });
    } else {
      $("#keyEditor").show();
    }
  }


}