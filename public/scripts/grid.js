function languageGrid(rows) {
  for(rowIndex in rows) {
    createRow(rows[rowIndex]);
  }

  function createRow(row) {
    $("#phraseTable .template").clone().removeClass("template")
      .addClass("data")
      .find(".balance").text(balance).addClass(balance > 0 ? "" : "red").end()
      .find(".color .colorPicker").colorPicker(row.color).end()
      .find(".description").text(row.description).end()
      .find(".amount").text(row.amount.toFixed(2)).end()
      .appendTo("#table .sortable");
  }

}