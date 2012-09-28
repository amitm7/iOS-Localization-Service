$(document).ready(localization);

function localization() {
  init();
  var phraseKeys = [];
  var currentLanguage = 1;

  function init() {
    $("#languageSelector").ddslick();
    refreshPhraseKeys();
  }

  function refreshPhraseKeys() {
    $.get("/phraseKeys", null, function(data) {
      phraseKeys = data;
      showPhrasesForLanguage(currentLanguage);
    });
  }

  function showPhrasesForLanguage(language) {
    $.get("/phrases", {language_id: language}, function(phrases) {
      for(var i=0;i<phrases;i++) {
        phrases[i].name
      }
    });    
  }

}