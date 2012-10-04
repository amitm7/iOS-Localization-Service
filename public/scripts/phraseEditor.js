function phraseEditor(keyId, languageId, onsuccess) {
  clearFields();
  showEditor();
  showScreenshot();

  $("#cancelPhraseEditorButton").click(function() {
    $("#phraseEditorDialog").hide();
  });

  function clearFields() {
    $("#phraseEditorDialog").find(":input").val("");
  }

  function showEditor() {
    $.post("/phraseDetails", {keyId: keyId, languageId: languageId}, function(details) {
      document.forms.phraseEditor.content.value = details.content;
      $("#keyForPhraseBeingEditted").text(details.key)
      $("#phraseEditorDialog").show();

      if(details.maxLength) {
        $("#maxLengthMessage").show();
        $("#maxLengthNumber").text(details.maxLength);
      } else {
        $("#maxLengthMessage").hide();
      }
    });
  }

  function showScreenshot() {
    $("#screenshotBox").show();

    var screenshotImg = document.getElementById("phraseEditorScreenshot");
    screenshotImg.onerror = function() {
      $("#screenshotBox").hide();
    }

    screenshotImg.src = "/imageForPhraseKey/"+keyId;
  }
}