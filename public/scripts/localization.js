$(document).ready(localization);

function localization() {
  var phraseKeys = [];
  var currentLanguage;
  var defaultLanguage = 1;
  var highlightedIndex = 0;
  var rowHeight = 0;
  var isDeveloper = $("body.developer").length > 0

  setLanguage(defaultLanguage);
  $(document).keyup(function(e) {
    if(isDialogVisible()) return;
    if (e.keyCode == 65) $("#addKeyButton").click();
    if (e.keyCode == 13 && highlightedIndex != 0) editPhraseAtIndex(highlightedIndex);
    if (e.keyCode == 69 && highlightedIndex != 0 && isDeveloper) editPhraseKeyAtIndex(highlightedIndex);
    if (e.keyCode == 68 && highlightedIndex != 0 && isDeveloper) deletePhraseKeyAtIndex(highlightedIndex);
  });

  $(document).keydown(function(e) {
    if(isDialogVisible()) return;
    if(e.keyCode == 38) { upPressed(); return false; }
    if(e.keyCode == 40) { downPressed(); return false; }
  });

  function upPressed() {
    highlightedIndex--;
    if(highlightedIndex < 1) highlightedIndex = phraseKeys.length;
    highlightSelectedIndex();
    scrollToSelectedIndex();
  }

  function downPressed() {
    highlightedIndex++;
    if(highlightedIndex > phraseKeys.length) highlightedIndex = 1;
    highlightSelectedIndex();
    scrollToSelectedIndex();
  }

  function editPhraseAtIndex(index) {
    var phraseKey = $("#phraseTable")[0].rows[index].phraseKey;
    phraseEditor(phraseKey.id, currentLanguage, function() { refreshPhraseKeys(); });
  }

  function editPhraseKeyAtIndex(index) {
    var phraseKey = $("#phraseTable")[0].rows[index].phraseKey;
    phraseKeyEditor(phraseKey.id, function() { refreshPhraseKeys(); });
  }

  function deletePhraseKeyAtIndex(index) {
    var phraseKey = $("#phraseTable")[0].rows[index].phraseKey;
    deletePhraseKey(phraseKey.id, phraseKey.key);
  }

  function highlightSelectedIndex() {
    $("#phraseTable tr").removeClass("highlight")
    $(document.getElementById("phraseTable").rows[highlightedIndex]).addClass("highlight");
  }

  function scrollToSelectedIndex() {
    if(rowHeight == 0) {
      rowHeight = $("#phraseTable .row").outerHeight(true);
    }
    var height = $(window).height();
    document.body.scrollTop = highlightedIndex * rowHeight - 90;
  }

  function isDialogVisible() {
    return $(".dialog:not(:hidden)").length > 0;
  }

  $("#addKeyButton").click(function() {
    phraseKeyEditor(null, refreshPhraseKeys);
    return false;
  });

  $("#languageSelector").dropkick({
    change: function (value, label) {
      setLanguage(value);
    }
  });
  

  function setLanguage(languageId) {
    currentLanguage = languageId;
    setupCancelButtons();
    refreshPhraseKeys();
  }

  function setupCancelButtons() {
    $("#cancelKeyEditorButton").click(function() {
      $("#keyEditor").hide();
    });
  }

  function refreshPhraseKeys() {
    $.get("/phraseKeys", null, function(data) {
      phraseKeys = data;
      showPhrasesForLanguage(currentLanguage);
    });
  }

  function showPhrasesForLanguage(language) {
    var yoffset = window.pageYOffset
    var xoffset = window.pageXOffset

    $.get("/phrases", {language_id: language}, function(phrases) {
      buildLanguageGrid(phrases);
      window.scrollTo(xoffset, yoffset);
      highlightSelectedIndex();
    });
  }

  function buildLanguageGrid(phrases) {
    var rows = keysWithPhrases(phrases);
    $("#phraseTable .row").remove();

    for(var rowIndex in rows) {
      createRow(rows[rowIndex])
    }
  }

  function keysWithPhrases(phrases) {
    var maxPhraseLength = 80;
    var maxKeyLength = 28;
    var output = [];
    var phraseDictionary = buildPhraseDictionary(phrases);

    for(var phraseKeyIndex in phraseKeys) {
      var phraseKey = phraseKeys[phraseKeyIndex];
      var phrase = phraseDictionary[phraseKey.id];
      var phraseContent = truncate(phrase ? phrase.content : null, maxPhraseLength)

      output.push({
        id: phraseKey.id,
        key: truncate(phraseKey.name, maxKeyLength),
        phrase: phraseContent,
        hasPhoto: phraseKey.hasPhoto,
        hasPhrase: phrase && phrase.content ? true : false
      });
    }

    return output.sort(function(a,b) {
      if(a.hasPhrase == b.hasPhrase) {
        return (a.key < b.key) ? -1 : 1;
      } else {
        return (a.hasPhrase < b.hasPhrase) ? -1 : 1;
      }
    });

    function truncate(s, max) {
      if(!s) return s;
      if(s.length < max) return s;
      return s.substring(0,max) + "...";
    }
  }

  function buildPhraseDictionary(phrases) {
    var dictionary = [];
    for(var phraseIndex in phrases) {
      var phrase = phrases[phraseIndex];
      dictionary[phrase.phrase_key_id] = phrase;
    }

    return dictionary;
  }

  function createRow(row) {
    var tr = $("#phraseTable .template").clone().removeClass("template")
      .addClass("row").addClass(row.hasPhrase ? "" : "nophrase")
      .attr("id", "phraseKey"+row.id)
      .find(".key").text(row.key).end()
      .find(".phrase")
        .text(row.hasPhrase ? row.phrase : "<NO PHRASE SET>")
        .click(function() { 
          phraseEditor(row.id, currentLanguage, function() { refreshPhraseKeys(); });
          return false; 
        }).end()
      .find(".hasPhoto div").each(function() { 
        if(row.hasPhoto) $(this).show();
        else $(this).hide();
      }).end()        
      .find(".editKeyButton").click(function() { 
        phraseKeyEditor(row.id, function() { refreshPhraseKeys(); }); 
        return false; 
      }).end()
      .find(".deleteKeyButton").click(function() { deletePhraseKey(row.id, row.key); return false; }).end()
      .appendTo("#phraseTable")[0];
      tr.phraseKey = row;
  }

  function deletePhraseKey(keyId, keyName) {
    var warning = ["Are you sure you want to delete ", keyName].join("");
    if(confirm(warning)) {
      $.post("/deletePhraseKey", {keyId: keyId}, function() { refreshPhraseKeys(); });
      $("#phraseKey"+keyId).remove();
    }
  }

}