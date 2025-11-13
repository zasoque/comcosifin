export async function load() {
  const KEY = "AIzaSyBSaX_PbqIgynBFq7csvxenj3BXro05xo4";
  const SPREADSHEET_ID = "1QSqIbmShJiUiJWNB0x8dQzGbb6W1dqEz_LBlP363e_E";
  let header, dictionary;
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/자소크어!A:L?key=${KEY}`)
    .then(response => response.json())
    .then(data => {
      header = data.values.splice(0, 1)[0];
      dictionary = data.values;
    });

  return { header, dictionary };
}
