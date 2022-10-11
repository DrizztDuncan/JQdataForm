$(document).ready(function () {
  // alert('abc');
  var url = "ajax/ajaxCard";
  var ajaxobj = new AjaxObject(url, "json");
  ajaxobj.getall();

  // 新增按鈕
  $("#add-ppl").click(function (e) {
    var url = "ajax/ajaxCard";
    var cnname = $("#addcnname").val();
    var enname = $("#addenname").val();
    var sex = $('input:radio:checked[name="addsex"]').val();
    var ajaxobj = new AjaxObject(url, "json");
    ajaxobj.cnname = cnname;
    ajaxobj.enname = enname;
    ajaxobj.sex = sex;
    ajaxobj.add();

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });
  // $("#addbutton").click(function () {
  //   $("#dialog-addconfirm").dialog({
  //     resizable: true,
  //     height: $(window).height() * 0.4, // dialog視窗度
  //     width: $(window).width() * 0.4,
  //     modal: true,
  //     buttons: {
  //       // 自訂button名稱
  //       Add: function (e) {
  //         var url = "ajax/ajaxCard";
  //         var cnname = $("#addcnname").val();
  //         var enname = $("#addenname").val();
  //         var sex = $('input:radio:checked[name="addsex"]').val();
  //         var ajaxobj = new AjaxObject(url, "json");
  //         ajaxobj.cnname = cnname;
  //         ajaxobj.enname = enname;
  //         ajaxobj.sex = sex;
  //         ajaxobj.add();

  //         e.preventDefault(); // avoid to execute the actual submit of the form.
  //       },
  //       ReFill: function () {
  //         $("#addform")[0].reset();
  //       },
  //       Cancel: function () {
  //         $(this).dialog("close");
  //       },
  //     },
  //   });
  // });

  // 搜尋按鈕
  $("#search-ppl").click(function (e) {
    var url = "ajax/ajaxCard";
    // var data = $("#searchform").serialize();
    var cnname = $("#secnname").val();
    var enname = $("#seenname").val();
    var sex = $('input:radio:checked[name="sesex"]').val();
    var ajaxobj = new AjaxObject(url, "json");
    ajaxobj.cnname = cnname;
    ajaxobj.enname = enname;
    ajaxobj.sex = sex;
    ajaxobj.search();

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });
  // $("#searchbutton").click(function () {
  //   $("#dialog-searchconfirm").dialog({
  //     resizable: true,
  //     height: $(window).height() * 0.4, // dialog視窗度
  //     width: $(window).width() * 0.4,
  //     modal: true,
  //     buttons: {
  //       // 自訂button名稱
  //       搜尋: function (e) {
  //         var url = "ajax/ajaxCard";
  //         // var data = $("#searchform").serialize();
  //         var cnname = $("#secnname").val();
  //         var enname = $("#seenname").val();
  //         var sex = $('input:radio:checked[name="sesex"]').val();
  //         var ajaxobj = new AjaxObject(url, "json");
  //         ajaxobj.cnname = cnname;
  //         ajaxobj.enname = enname;
  //         ajaxobj.sex = sex;
  //         ajaxobj.search();

  //         e.preventDefault(); // avoid to execute the actual submit of the form.
  //       },
  //       重新填寫: function () {
  //         $("#searchform")[0].reset();
  //       },
  //       取消: function () {
  //         $(this).dialog("close");
  //       },
  //     },
  //   });
  // });
  // 修改鈕
  $("#cardtable").on("click", ".modifybutton", function () {
    var ajaxobj = new AjaxObject(url, "json");
    ajaxobj.modify_get();
  });
  $("#cardtable").on("click", ".deletebutton", function () {
    var deleteid = $(this).attr("id").substring(12);
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, "json");
    ajaxobj.id = deleteid;
    ajaxobj.delete();
  });

  $("#modBtn").click(function (e) {
    var url = "ajax/ajaxCard";
    var cnname = $("#mocnname").val();
    var enname = $("#moenname").val();
    var sex = $('input:radio:checked[name="mosex"]').val();
    var phone = $("#moenname").val(); //phone
    var email = $("#moenname").val(); //email
    var ajaxobj = new AjaxObject(url, "json");
    ajaxobj.cnname = cnname;
    ajaxobj.enname = enname;
    ajaxobj.sex = sex;
    ajaxobj.id = modifyid;
    ajaxobj.phone = phone; //phone
    ajaxobj.email = email; //email
    ajaxobj.modify();

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });

  // 自適應視窗
  // $(window).resize(function () {
  //   var wWidth = $(window).width();
  //   var dWidth = wWidth * 0.4;
  //   var wHeight = $(window).height();
  //   var dHeight = wHeight * 0.4;
  //   $("#dialog-confirm").dialog("option", "width", dWidth);
  //   $("#dialog-confirm").dialog("option", "height", dHeight);
  // });
});
function refreshTable(data) {
  // var HTML = '';
  $("#cardtable tbody > tr").remove();
  $.each(data, function (key, item) {
    var strsex = "";
    if (item.sex == 0) strsex = "Male";
    else strsex = "Female";
    var row = $("<tr></tr>");
    row.append($("<td></td>").html(item.cnname));
    row.append($("<td></td>").html(item.enname));
    row.append($("<td></td>").html(strsex));
    row.append($("<td></td>").html(item.phone)); //phone
    row.append($("<td></td>").html(item.email)); //email
    row.append(
      $("<td></td>").html(
        '<i id="modBtn' +
          item.s_sn +
          '" class="modBtn btn btnBorder bi bi-pencil-fill" data-bs-toggle="modal" data-bs-target="#modBtn"></i>'
      )
    );
    row.append(
      $("<td></td>").html(
        '<i id="deletebutton' +
          item.s_sn +
          '" class="deletebutton btn btnBorder bi bi-trash3-fill"></i>'
      )
    );
    $("#cardtable").append(row);
  });
}

// function initEdit(response) {
//   var modifyid = $("#cardtable").attr("id").substring(12);
//   $("#mocnname").val(response[0].cnname);
//   $("#moenname").val(response[0].enname);
//   $("#mophone").val(response[0].phone);
//   $("#moemail").val(response[0].email);
//   if (response[0].sex == 0) {
//     $("#modifyman").prop("checked", true);
//     $("#modifywoman").prop("checked", false);
//   } else {
//     $("#modifyman").prop("checked", false);
//     $("#modifywoman").prop("checked", true);
//   }
//   $("#modifysid").val(modifyid);
//   $("#dialog-modifyconfirm").dialog({
//     resizable: true,
//     height: $(window).height() * 0.4, // dialog視窗度
//     width: $(window).width() * 0.4,
//     modal: true,
//     buttons: {
//       // 自訂button名稱
//       Modify: function (e) {
//         // $("#modifyform").submit();
//         var url = "ajax/ajaxCard";
//         var cnname = $("#mocnname").val();
//         var enname = $("#moenname").val();
//         var sex = $('input:radio:checked[name="mosex"]').val();
//         var phone = $("#moenname").val(); //phone
//         var email = $("#moenname").val(); //email
//         var ajaxobj = new AjaxObject(url, "json");
//         ajaxobj.cnname = cnname;
//         ajaxobj.enname = enname;
//         ajaxobj.sex = sex;
//         ajaxobj.id = modifyid;
//         ajaxobj.phone = phone; //phone
//         ajaxobj.email = email; //email
//         ajaxobj.modify();

//         e.preventDefault(); // avoid to execute the actual submit of the form.
//       },
//       ReFill: function () {
//         $("#modifyform")[0].reset();
//       },
//       Cancel: function () {
//         $(this).dialog("close");
//       },
//     },
//     error: function (exception) {
//       alert("Exeption:" + exception);
//     },
//   });
// }

/**
 *
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
  this.url = url;
  this.datatype = datatype;
}
AjaxObject.prototype.cnname = "";
AjaxObject.prototype.enname = "";
AjaxObject.prototype.sex = "";
AjaxObject.prototype.id = 0;
AjaxObject.prototype.phone = ""; //phone
AjaxObject.prototype.email = ""; //email
AjaxObject.prototype.alertt = function () {
  alert("Alert:");
};
AjaxObject.prototype.getall = function () {
  response =
    '[{"s_sn":"35","cnname":"Qiu Xiaogan","enname":"Peter","sex":"0","phone":"0900","email":"Peter@mail.com"},{"s_sn":"49","cnname":"Cai Fanxin","enname":"Allen","sex":"0","phone":"0901","email":"allen@mail.com"},{"s_sn":"50","cnname":"Zhao Xueyu","enname":"Sharon","sex":"0","phone":"0902","email":"sharon@mail.com"},{"s_sn":"51","cnname":"Lai Jiarong","enname":"Yoki","sex":"1","phone":"0903","email":"yoki@mail.com"}]';
  refreshTable(JSON.parse(response));
};
AjaxObject.prototype.add = function () {
  response =
    '[{"s_sn":"35","cnname":"Qiu Xiaogan","enname":"Peter","sex":"0","phone":"0900","email":"Peter@mail.com"},{"s_sn":"49","cnname":"Cai Fanxin","enname":"Allen","sex":"0","phone":"0901","email":"allen@mail.com"},{"s_sn":"50","cnname":"Zhao Xueyu","enname":"Sharon","sex":"0","phone":"0902","email":"sharon@mail.com"},{"s_sn":"51","cnname":"Lai Jiarong","enname":"Yoki","sex":"1","phone":"0903","email":"yoki@mail.com"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1","phone":"0900","email":"Peter@mail.com"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-addconfirm").dialog("close");
};
AjaxObject.prototype.modify = function () {
  response =
    '[{"s_sn":"49","cnname":"Cai Fanxin","enname":"Allen","sex":"0","phone":"0901"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-modifyconfirm").dialog("close");
};
AjaxObject.prototype.modify_get = function () {
  response =
    '[{"s_sn":"35","cnname":"Qiu Xiaogan","enname":"Peter","sex":"0","phone":"0900","email":"Peter@mail.com"},{"s_sn":"49","cnname":"Cai Fanxin","enname":"Allen","sex":"0","phone":"0901","email":"allen@mail.com"},{"s_sn":"50","cnname":"Zhao Xueyu","enname":"Sharon","sex":"0","phone":"0902","email":"sharon@mail.com"},{"s_sn":"51","cnname":"Lai Jiarong","enname":"Yoki","sex":"1","phone":"0903","email":"yoki@mail.com"}]';
  initEdit(JSON.parse(response));
};
AjaxObject.prototype.search = function () {
  response =
    '[{"s_sn":"35","cnname":"Qiu Xiaogan","enname":"Peter","sex":"0","phone":"0900","email":"Peter@mail.com"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-searchconfirm").dialog("close");
};
AjaxObject.prototype.delete = function () {
  response =
    '[{"s_sn":"35","cnname":"Qiu Xiaogan","enname":"Peter","sex":"0","phone":"0900","email":"Peter@mail.com"},{"s_sn":"49","cnname":"Cai Fanxin","enname":"Allen","sex":"0","phone":"0901","email":"allen@mail.com"}]';
  refreshTable(JSON.parse(response));
};
