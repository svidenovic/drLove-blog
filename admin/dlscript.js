// <!--
var selectedPIid = 0;
var months = ["01 January",   "02 February",
              "03 March",     "04 April",
              "05 May",       "06 June",
              "07 July",      "08 August",
              "09 September", "10 October",
              "11 November",  "12 December"];
var PostItemID = "postI-";

$(document).ready(function(){
    testLogSta2s(function(){ makePostManager(); });
});

function testLogSta2s( func2do ){
    $.post("dltestLogSta2s.php", function(resp){
        if(resp=="0"){ makeLogin(); }
        else if(resp=="1"){ func2do(); }
        else{ alert(resp); }
    });
}

function makeLogin(){
    $("body").html("");
    var maindiv = document.createElement("div");
    $(maindiv).attr("class","indexMainDiv");
    $(maindiv).attr("id","idxMainDiv");
    var label = document.createElement("span");
    $(label).attr("class","indexlabel1");
    $(label).html(" dr.Love - Login ");
    var input = document.createElement("input");
    $(input).attr("class","indexPassInput");
    $(input).attr("type","password");
    $(input).attr("id","passwdInput");
    var logBtn = document.createElement("button");
    $(logBtn).attr("class","indexLogInBtn");
    $(logBtn).text(" LOG IN ");
    $(maindiv).append(label);
    $(maindiv).append(input);
    $(maindiv).append(logBtn);
    $("body").append(maindiv);
    $(input).focus();
    $(logBtn).click(function(){ logIn(); });
    $(input).bind("keypress",function(e){
        var ev = (e.keyCode)?e.keyCode:e.which;
        if(ev==13){ logIn(); }
    });
}

function logIn(){
    function shakeit(){
        $("#passwdInput").val("");
        $("#passwdInput").fadeOut(250).fadeIn(250);
    }
    var passwd = $("#passwdInput").val();
    if(passwd=="" || passwd.length>64){ shakeit(); }else{
        $.post("dlLogIn.php", {"password":passwd}, function(resp){
            if(resp=="0"){ shakeit(); }
            else if(resp=="1"){ makePostManager(); }
            else{ alert(resp); }
        });
    }
}

function logOut(){
    LoadBar(true);
    $.post("dlLogOut.php", function(resp){
        LoadBar(false);
        if(resp=="logout_success"){ makeLogin(); }
        else{ alert(resp); }
    });
}

function IDgen(){
    LoadBar(true);
    $.post("dlgenID.php", function(r){
        if(r==nodbcon){ alert(r); }
        else{
            var r_valid = str_is_num(r);
            if(r_valid){
                $("#postHolder").attr("pid",parseInt(r));
                saveeditBtn("s");
            }else{ alert(r); }
        }
        LoadBar(false);
    });
}

function makePostManager(){
    $("body").html("");
    selectedPIid = 0;
    var mainDiv = document.createElement("div");
    $(mainDiv).attr("class","pmMainDiv");
    var logBtn = document.createElement("button");
    $(logBtn).attr("class","pmLogOutBtn");
    $(logBtn).text(" LOG OUT ");
    var pmlabel1 = document.createElement("span");
    $(pmlabel1).attr("class","pmlabel1");
    $(pmlabel1).html("dr.Love - Post Manager");
    var loadbarImg = document.createElement("img");
    $(loadbarImg).attr("class","loadbarImg");
    $(loadbarImg).attr("id","LoadbarImg");
    $(loadbarImg).attr("src","../deps/no-loader.png");
    // left div:
    var leftDiv = document.createElement("div");
    $(leftDiv).attr("class","pmLRdiv");
    $(leftDiv).attr("id","postHolder");
    IDgen();
    var spnlabel = document.createElement("span");
    $(spnlabel).attr("class","spnlabelndt");
    $(spnlabel).html("name: ");
    var namein = document.createElement("input");
    $(namein).attr("type","text");
    $(namein).attr("class","namein");
    $(namein).attr("id","pmNameIn");
    var spnlabel2 = document.createElement("span");
    $(spnlabel2).attr("class","spnlabelndt");
    $(spnlabel2).html("date: ");
    var dateinDay = document.createElement("input");
    $(dateinDay).attr("type","text");
    $(dateinDay).attr("class","dateinDay");
    $(dateinDay).attr("id","pmDayIn");
    var dateselMonth = document.createElement("select");
    $(dateselMonth).attr("class","dateselMonth");
    $(dateselMonth).attr("id","pmMonthSel");
    var opt = undefined;
    for(i in months){
        opt = document.createElement("option");
        $(opt).html(months[i]);
        $(dateselMonth).append(opt);
    }
    var dateinYear = document.createElement("input");
    $(dateinYear).attr("type","text");
    $(dateinYear).attr("class","dateinYear");
    $(dateinYear).attr("id","pmYearIn");
    var date2day = document.createElement("button");
    $(date2day).attr("class","date2day");
    $(date2day).text("TODAY");
    var spnlabel3 = document.createElement("span");
    $(spnlabel3).attr("class","spnlabelndt");
    $(spnlabel3).html("text: ");
    var dltxta = document.createElement("textarea");
    $(dltxta).attr("class","dltxta");
    $(dltxta).attr("id","pmTxtTa");
    var clearBtn = document.createElement("button");
    $(clearBtn).attr("class","clsvBtn");
    $(clearBtn).text("CLEAR");
    var saveBtn = document.createElement("button");
    $(saveBtn).attr("class","clsvBtn");
    $(saveBtn).attr("id","postSaveBtn");
    $(saveBtn).text("SAVE");
    var terminalBtn = document.createElement("button");
    $(terminalBtn).attr("class","termBtn");
    $(terminalBtn).text("DO>");
    $(leftDiv).append(spnlabel);
    $(leftDiv).append(namein);
    $(leftDiv).append(spnlabel2);
    $(leftDiv).append(dateinDay);
    $(leftDiv).append(dateselMonth);
    $(leftDiv).append(dateinYear);
    $(leftDiv).append(date2day);
    $(leftDiv).append(spnlabel3);
    $(leftDiv).append(dltxta);
    $(leftDiv).append(clearBtn);
    $(leftDiv).append(saveBtn);
    $(leftDiv).append(terminalBtn);
    // right div:
    var rightDiv = document.createElement("div");
    $(rightDiv).attr("class","pmLRdiv");
    var pmtb = document.createElement("div");
    $(pmtb).attr("class","pmtoolbar");
    var pmtbNew = document.createElement("button");
    $(pmtbNew).attr("class","pmtbBtns");
    $(pmtbNew).attr("id","pmNewBtn");
    $(pmtbNew).text("NEW");
    var pmtbEdit = document.createElement("button");
    $(pmtbEdit).attr("class","pmtbBtns");
    $(pmtbEdit).text("EDIT");
    var pmtbDelete = document.createElement("button");
    $(pmtbDelete).attr("class","pmtbBtns");
    $(pmtbDelete).text("DELETE");
    var pmtbMU = document.createElement("button");
    $(pmtbMU).attr("class","pmtbBtns");
    $(pmtbMU).text("MOVE ▲");
    var pmtbMD = document.createElement("button");
    $(pmtbMD).attr("class","pmtbBtns");
    $(pmtbMD).text("MOVE ▼");
    var pmtbRLDl = document.createElement("button");
    $(pmtbRLDl).attr("class","pmtbBtns");
    $(pmtbRLDl).attr("title","reload posts");
    $(pmtbRLDl).text("R");
    $(pmtb).append(pmtbNew);
    $(pmtb).append(pmtbEdit);
    $(pmtb).append(pmtbDelete);
    $(pmtb).append(pmtbMU);
    $(pmtb).append(pmtbMD);
    $(pmtb).append(pmtbRLDl);
    var listholder = document.createElement("div");
    $(listholder).attr("class","postlistHolder");
    $(listholder).attr("id","postlistholder");
    $(rightDiv).append(pmtb);
    $(rightDiv).append(listholder);
    // main append:
    $(mainDiv).append(logBtn);
    $(mainDiv).append(pmlabel1);
    $(mainDiv).append(loadbarImg);
    $(mainDiv).append(leftDiv);
    $(mainDiv).append(rightDiv);
    $("body").append(mainDiv);
    // event handlers:
    $(logBtn).click(function(){ logOut(); });
    makePostList(function(){});
    $(namein).focus();
    function gen2day(){
        var d = new Date();
        $(dateinDay).val( d.getDate() );
        $("#pmMonthSel :nth-child("+(d.getMonth()+1)+")").prop('selected', true);
        $(dateinYear).val( d.getFullYear() );
    }
    gen2day();
    $(date2day).click(function(){ gen2day(); });
    $(dateinDay).change(function(){
        var dval = $(this).val();
        var dval_valid = str_is_num(dval);
        if(dval_valid){
            var ndval = parseInt(dval);
            dval_valid = (ndval>0 && ndval<32)?true:false;
            if(!dval_valid){ $(this).val(""); }
        }else{ $(this).val(""); }
    });
    $(dateinYear).change(function(){
        var dval = $(this).val();
        var dval_valid = str_is_num(dval);
        if(dval_valid){
            var ndval = parseInt(dval);
            dval_valid = (ndval>0)?true:false;
            if(!dval_valid){ $(this).val(""); }
        }else{ $(this).val(""); }
    });
    function clearPform(){
        $(namein).val("");
        gen2day();
        $(dltxta).val("");
    }
    $(clearBtn).click(function(){
        clearPform();
    });
    $(saveBtn).click(function(){
        savePost(namein, dateinDay, dateselMonth, dateinYear, dltxta);
    });
    $(pmtbNew).click(function(){
        clearPform();
        IDgen();
        saveeditBtn("s");
        $("#postHolder").fadeOut(250).fadeIn(250);
    });
    $(pmtbEdit).click(function(){
        postEdit(selectedPIid);
    });
    $(pmtbDelete).click(function(){
        postDelete(selectedPIid);
    });
    $(pmtbMU).click(function(){
        postMoveUD("U");
    });
    $(pmtbMD).click(function(){
        postMoveUD("D");
    });
    $(pmtbRLDl).click(function(){
        makePostList(function(){});
    });
    $(terminalBtn).click(function(){
        testLogSta2s(function(){ runTerminal(); });
    });
}

function LoadBar(boolTF){
    if(boolTF){ $("#LoadbarImg").attr("src","../deps/on-loader.gif"); }
    else{ $("#LoadbarImg").attr("src","../deps/no-loader.png"); }
}

function saveeditBtn(SorE){
    var seTxt="";
    if(SorE=="s"){ seTxt="SAVE"; }
    else if(SorE=="e"){ seTxt="EDIT"; }
    $("#postSaveBtn").text(seTxt);
}

function savePost(nameO, dayO, monthO, yearO, txtO){
    testLogSta2s(function(){
        var pname = $(nameO).val();
        var pday = $(dayO).val();
        var pmonth = $(monthO).val().slice(3);
        var pyear = $(yearO).val();
        var ptext = $(txtO).val();
        var pname_ok = (pname!="" && pname!=" " && pname.length<=64)?true:false;
        var pday_ok = (pday!="")?true:false;
        var pyear_ok = (pyear!="")?true:false;
        var ptext_ok = (ptext!="" && ptext!=" ")?true:false;
        if(pname_ok && pday_ok && pyear_ok && ptext_ok){
            var pdate = pday+"."+pmonth+" "+pyear+".";
            var pid = $("#postHolder").attr("pid");
            LoadBar(true);
            $.post("dlsavePost.php", {"pid":pid, "pname":pname, "pdate":pdate, "ptext":ptext}, function(r){
                LoadBar(false);
                if(r=="saved"||r=="edited"){
                    $("#pmNewBtn").click();
                    makePostList(function(){});
                }else{ alert(r); }
            });
        }else{
            if(!pname_ok){ $(nameO).fadeOut(250).fadeIn(250); }
            if(!pday_ok){ $(dayO).fadeOut(250).fadeIn(250); }
            if(!pyear_ok){ $(yearO).fadeOut(250).fadeIn(250); }
            if(!ptext_ok){ $(txtO).fadeOut(250).fadeIn(250); }
        }
    });
}

function makePostList(funcOnEnd){
    LoadBar(true);
    $.post("dlgetPosts.php", function(resp){
        if(resp==nodbcon)
        { LoadBar(false); alert(resp); }
        else{
            $("#postlistholder").fadeOut(125, function(){
                selectedPIid = 0;
                var posts = JSON && JSON.parse(resp) || $.parseJSON(resp);
                $("#postlistholder").html("");
                var postLI=undefined, postShow=undefined;
                for(p in posts){
                    postShow = document.createElement("button");
                    $(postShow).attr("class","postShowBtn");
                    var psID = "pShowBtn-"+posts[p][0];
                    $(postShow).attr("id",psID);
                    $(postShow).attr("piid",posts[p][0]);
                    $(postShow).attr("showpi",posts[p][3]);
                    $(postShow).attr("title","");
                    $(postShow).html("");
                    postLI = document.createElement("button");
                    $(postLI).attr("class","postListItem");
                    $(postLI).attr("id",PostItemID+posts[p][0]);
                    $(postLI).html(posts[p][1]+"<br/>"+posts[p][2]);
                    var hrDiv = document.createElement("div");
                    $(hrDiv).attr("class","PLHhrDiv");
                    $("#postlistholder").append(postShow);
                    $("#postlistholder").append(postLI);
                    $("#postlistholder").append(hrDiv);
                    pisCSS(psID,((posts[p][3]=="0")?false:true));
                    $(postShow).click(function(){ postIShow(this.id, true); });
                    $(postLI).click(function(){ mkSeldPI(this.id, true, true); });
                }
                funcOnEnd();
                $(this).fadeIn(125);
            });
            LoadBar(false);
        }
    });
}

function postIShow(PSbtnID, toggleT_noshowF){
    testLogSta2s(function(){
        var piid = $("#"+PSbtnID).attr("piid");
        var shset = "0"; // value to be entered in `show`
        if(toggleT_noshowF){ /* true = toggle */
            var showpi = $("#"+PSbtnID).attr("showpi");
            shset = (showpi=="0")?"1":"0";
        }/* else: false = absolute no-show */
        LoadBar(true);
        $.post("dlshowPost.php", {"show_set":shset,"piid":piid}, function(r){
            LoadBar(false);
            if(r=="1"||r=="0"){
                pisCSS(PSbtnID,((r=="0")?false:true));
            }else{ alert(r); }
        });
    });
}
// pisCSS = postIShow() CSS part changing
function pisCSS(PSbtnID, boolTF) {
    if(boolTF){
        $("#"+PSbtnID).attr("showpi","1");
        $("#"+PSbtnID).attr("title","Hide post");
        $("#"+PSbtnID).css({"background-color":"#63C5FF"});
    }else{
        $("#"+PSbtnID).attr("showpi","0");
        $("#"+PSbtnID).attr("title","Show post");
        $("#"+PSbtnID).css({"background-color":"#D6D6D6"});
    }
}

function mkSeldPI( PIid, boolTF, enable_deselect ){
    var csspropF={"background-color":"transparent"};
    var csspropT={"background-color":"#EAEAEA"};
    if(boolTF){
        var uid = parseInt(PIid.slice(PostItemID.length));
        $("button.postListItem").css(csspropF);
        if(selectedPIid==uid){
            if(enable_deselect){
                selectedPIid = 0;
                $("button.postListItem").css(csspropF); 
            }
        }else{
            selectedPIid = uid;
            $("#"+PIid).css(csspropT);
        }
    }else{
        selectedPIid = 0;
        $("button.postListItem").css(csspropF);
    }
}

function postEdit(uid){
    testLogSta2s(function(){
        if(uid>0){
            $.post("dleditPost.php", {"pid":uid}, function(resp){
                if(resp==nodbcon){ alert(resp); }
                else{
                    var arr = JSON && JSON.parse(resp) || $.parseJSON(resp);
                    var pdate = arr[0];
                    var pname = arr[1];
                    var ptext = arr[2];
                    $("#postHolder").attr("pid",uid);
                    $("#pmNameIn").val(pname);
                    var tmp = pdate.split(".");
                    var dtDMY = [tmp[0], tmp[1].split(" ")[0], tmp[1].split(" ")[1]];
                    $("#pmDayIn").val(dtDMY[0]);
                    var selidx = 0;
                    for(m in months){
                        if(!!months[m].match(dtDMY[1]))
                        { selidx=parseInt(m)+1; break; }
                    }
                    $("#pmMonthSel :nth-child("+selidx+")").prop('selected', true);
                    $("#pmYearIn").val(dtDMY[2]);
                    $("#pmTxtTa").val(ptext);
                    saveeditBtn("e");
                }
            });
        }
    });
}

function postDelete(uid){
    testLogSta2s(function(){
        if(uid>0){
            LoadBar(true);
            $.post("dldeletePost.php", {"pid":uid}, function(resp){
                LoadBar(false);
                if(resp=="1"){ makePostList(function(){}); saveeditBtn("s"); }
                else{ alert(resp); }
            });
        }
    });
}

function postMoveUD(strUD){
    testLogSta2s(function(){
        var pid = selectedPIid;
        if(pid>0){
            LoadBar(true);
            $.post("dlmovePost.php", {"pid":pid, "strUD":strUD}, function(resp){
                LoadBar(false);
                if(resp=="1"){ makePostList(function(){ mkSeldPI((PostItemID+pid),true,false); }); }
                else if(resp=="0"){}
                else{ alert(resp); }
            });
        }
    });
}

function runTerminal(){
    var cominp = prompt("Enter command: \n","");
    var parts = cominp.split(" ");
    var com = parts[0];
    switch(com){
        // help:
        case "help":
            var harr=["Commands: ",
                      " • Change password:\n >>> passwd <new_passwd> <old_passwd>",
                      ""];
            var hstr = "";
            for (h in harr){ hstr += harr[h]+"\n"; }
            alert(hstr);
            break;
        // password changer:
        case "passwd":
            if(parts.length==3) {
                var pnew = parts[1];
                var pold = parts[2];
                if (pnew!="" && pold!=""){
                    $.post("dlpasswd.php", {"pnew":pnew,"pold":pold}, function(r){
                        if(r=="1"){ alert("Password changed."); }
                        else if(r=="0"){ alert("Wrong input"); }
                        else{ alert(r); }
                    });
                }
            }
            break;
        default:
            alert("Unknown command.");
            runTerminal();
            break;
    }
}
// -->

