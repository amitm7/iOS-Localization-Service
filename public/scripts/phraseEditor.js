function phraseEditor(keyId, languageId, onsuccess) {
  var form = document.forms.phraseEditor;

  resetDialog();
  showEditor();
  showScreenshot();
  setupCancelEvent();
  setupFormSubmit();

  function setupCancelEvent() {
    $("#cancelPhraseEditorButton").click(function() {
      $("#phraseEditorDialog").hide();
    });

    $(form).keyup(function(e) {
      if (e.keyCode == 27) { $("#cancelPhraseEditorButton").click(); }
    });
  }

  function resetDialog() {
    $("#screenshotBox").show();
    $("#maxLengthMessage").hide();
    $("#phraseEditorDialog :input").prop("disabled", false);
    $("#phraseEditorDialog").find(":input").val("");
    $(form).unbind();
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
        
      }
    });
  }

  function showScreenshot() {
    var screenshotImg = document.getElementById("phraseEditorScreenshot");
    screenshotImg.onerror = function() {
      $("#screenshotBox").hide();
    }

    screenshotImg.src = "/imageForPhraseKey/"+keyId;
  }

  function setupFormSubmit() {
    $(form).submit(function() {
      var data = {keyId: keyId, languageId: languageId, content: form.content.value};
      $.post("/savePhrase", data, function() {
        $("#phraseEditorDialog").hide();
        onsuccess();
      });

      $("#phraseEditorDialog :input").prop("disabled", true);
      return false;
    });
  }

}