$(document).ready(localization);

function localization() {
  init();
  var phraseKeys = [];
  var currentLanguage = 1;

  function init() {
    $("#languageSelector").ddslick({onSelected: function(item) {
      currentLanguage = item.selectedData.value;
      refreshPhraseKeys();
    }});

  }

  function refreshPhraseKeys() {
    $.get("/phraseKeys", null, function(data) {
      phraseKeys = data;
      showPhrasesForLanguage(currentLanguage);
    });
  }

  function showPhrasesForLanguage(language) {
    $.get("/phrases", {language_id: language}, function(phrases) {
      buildLanguageGrid(phrases);
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
    var maxKeyLength = 32;
    var output = [];
    var phraseDictionary = buildPhraseDictionary(phrases);

    for(var phraseKeyIndex in phraseKeys) {
      var phraseKey = phraseKeys[phraseKeyIndex];
      var phrase = phraseDictionary[phraseKey.id];
      var phraseContent = null;
      if(phrase) {
        phraseContent = phrase.content.length > maxPhraseLength ? phrase.content.substring(0,maxPhraseLength) + "..." : phrase.content
      } else {
        phraseContent = "<NO PHRASE SET>"
      }

      output.push({
        id: phraseKey.id,
        key: phraseKey.name.length > maxKeyLength ? phraseKey.name.substring(0,maxKeyLength) + "..." : phraseKey.name,
        phrase: phraseContent
      });
    }

    return output.sort(function(a,b) {
      return (a.key < b.key) ? -1 : 1;
    });
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
    $("#phraseTable .template").clone().removeClass("template").addClass("row")
      .find(".key").text(row.key).end()
      .find(".phrase")
        .text(row.phrase)
        .attr("href", "#"+row.id)
      .end()
      .appendTo("#phraseTable");
  }
}