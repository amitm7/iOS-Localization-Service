$(document).ready(localization);

function localization() {
  init();
  var phraseKeys = [];
  var currentLanguage = 1;

  function init() {
    $("#languageSelector").ddslick({onSelected: refreshPhraseKeys});
    refreshPhraseKeys();
  }

  function refreshPhraseKeys() {
    $.get("/phraseKeys", null, function(data) {
      buildPhraseKeysDictionary(data)
      showPhrasesForLanguage(currentLanguage);
    });
  }

  function buildPhraseKeysDictionary(data) {
    phraseKeys = [];
    for(var i=0;i<data.length;i++) {
      phraseKeys[data[i].id] = data[i];
    }
  }

  function showPhrasesForLanguage(language) {
    $.get("/phrases", {language_id: language}, function(phrases) {
      buildLanguageGrid(phrases)
    });    
  }

  function buildLanguageGrid(phrases) {
    var rows = [];

    for(phraseIndex in phrases) {
      rows.push(phraseWithKey(phrases[phraseIndex]));
    }

    rows.sort(function(a,b) {
      return (a.key < b.key) ? -1 : 1;
    });

    for(var rowIndex in rows) {
      createRow(rows[rowIndex])
    }
  }

  function phraseWithKey(p) {
    var maxPhraseLength = 80;
    var maxKeyLength = 32;

    var phraseKey = phraseKeys[p.phrase_key_id].name;
    var phrase = p.content;

    if(phraseKey.length > maxKeyLength) {
      phraseKey = phraseKey.substring(0,maxKeyLength) + "...";
    }

    if(phrase.length > maxPhraseLength) {
      phrase = phrase.substring(0,maxPhraseLength) + "...";
    }

    return {
      id: p.id,
      key: phraseKey,
      phrase: phrase
    }
  }

  function createRow(row) {
    $("#phraseTable .template").clone().removeClass("template").addClass("phrase")
      .find(".key").text(row.key).end()
      .find(".phrase").text(row.phrase).end()
      .appendTo("#phraseTable");
  }
}