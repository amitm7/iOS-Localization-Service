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
    $("#englishPhraseBox").hide();
    $("#phraseEditorDialog :input").prop("disabled", false);
    $("#phraseEditorDialog").find(":input").val("");
    $(form).unbind();
  }

  function showEditor() {
    $.post("/phraseDetails", {keyId: keyId, languageId: languageId}, function(details) {
      $("#phraseEditorDialog").show();
      $("#keyForPhraseBeingEditted").text(details.key)
      form.content.value = details.content;      
      form.content.focus();

      if(details.maxLength) {
        $("#maxLengthMessage").show();
        $("#maxLengthNumber").text(details.maxLength);
      }

      if(details.englishContent && languageId != 1) {
        $("#englishPhraseBox").show();
        $("#englishPhrase").text(details.englishContent);
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