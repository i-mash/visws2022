function makeForm() {
  // 目的のフォルダID
  //  FOLDER_IDの値は「プロジェクトのプロパティ」＞「スクリプトのプロパティ」で設定する
  //  プロジェクトのプロパティは旧エディターから設定するのが簡単なので行き来するのがよい
  //  スクリプトから設定できるようですが、これだと見せたくない設定までgithubに保存されてよろしくないよね
  //     https://qiita.com/iron-samurai/items/76c9837e398922d79a69
  const folder_id = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');

  Logger.log(folder_id);
  //Logger.log("てすと");

  const form = FormApp.create("優秀ポスター投票フォーム"); // マイドライブ直下にできる
  Submission(form);


  // フォルダへ移動
  const formFile = DriveApp.getFileById(form.getId());
  DriveApp.getFolderById(folder_id).addFile(formFile);
  DriveApp.getRootFolder().removeFile(formFile);
}


function Submission(form) {
  form.setDescription('優秀ポスター投票フォーム：3件以内の投票をお願いします。');
  //form.addTextItem().setTitle('氏名').setRequired(true);
  //form.addTextItem().setTitle('所属').setRequired(true);

  let checkBoxItem = form.addCheckboxItem();
  checkBoxItem.setTitle('優秀ポスターの選択');

  // 申し込みフォーム（のコピー）からタイトルと著者名のリストを生成
  let spreadSheet    = SpreadsheetApp.openById("URLに書かれているIDを入れる");
  Logger.log(spreadSheet.getName());
  let list_sheet = spreadSheet.getSheetByName('フォームの回答 1');
  Logger.log(list_sheet.getName());  

  let title_author_list = [];
  for(let i = 2; i<list_sheet.getLastRow(); i++) {
      let title = list_sheet.getRange(i,3).getValue();
      let authors = list_sheet.getRange(i,4).getValue();
      Logger.log(title + '／' + authors);
      title_author_list.push(title + '／' + authors);
  }
 
  // 選択肢の追加
  //checkBoxItem.setChoiceValues(["選択肢１", "選択肢２", "選択肢３","選択肢４"]);
  checkBoxItem.setChoiceValues(title_author_list);

  // 投票件数の制限設定
  let CheckBoxValidationBuild = FormApp.createCheckboxValidation();
  CheckBoxValidationBuild = CheckBoxValidationBuild.setHelpText("投票は3件までです。");
  CheckBoxValidationBuild = CheckBoxValidationBuild.requireSelectAtMost(3);

  let CheckBoxValidation = CheckBoxValidationBuild.build();
  checkBoxItem.setValidation(CheckBoxValidation);
}