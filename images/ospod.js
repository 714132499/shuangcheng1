//==========================Common End====================
//放在此文件最前面
try{
OspodLanguage.languageCheck();
}catch(err){};

function doZoom(num){
	var obj = document.getElementById("zoom");
	obj.style.fontSize=num + "px";
	obj.style.lineHeight=num*2 + "px";
}

function closeMe(){
	window.close(); 
}

/**
* 获得浏览器类型


*/
function Browser() {

  var ua, s, i;
  this.isIE    = false;  // Internet Explorer
  this.isIE7 = false;
  this.isOP    = false;  // Opera
  this.isNS    = false;  // Netscape
  this.version = null;
  ua = navigator.userAgent;

  s = "Opera";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isOP = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = 6.1;
    return;
  }

  s = "MSIE";
  if ((i = ua.indexOf(s))) {
    this.version = parseFloat(ua.substr(i + s.length));
    if(this.version == 7){
      this.isIE7 = true;
    }
    this.isIE = true;

    return;
  }

}

var browser = new Browser();

function doPagePrint(obj) {
	window.print();
}

function $N(name){
	return document.getElementsByName(name);
}


function getWindowEvent(){
	if(browser.isIE){
		return window.event;
	}else{
		var o = arguments.callee.caller; 
		var e; 
		while(o != null){ 
			e = o.arguments[0]; 
			if(e && (e.constructor == Event || e.constructor == MouseEvent)) {return e;} 
				o = o.caller; 
			} 
		return null;
	}
}

function getEventSrcElement(){
	var event = getWindowEvent();
	if(event != null){
		var e = event.target || event.srcElement;
		return e;
	}
	return null;
}

function getRequestCookie(name){
   return getCookie(name);
}

function setCookie(name,value,duration)//两个参数，一个是cookie的名子，一个是值,一个是期限,单位为天，默认30天

{
    var Days = duration ? duration : 30; //此 cookie 将被保存 30 天

    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

var __keyDown = false;
function keyLimit(event){
	if(!event){
		event = getWindowEvent();
	}
	var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
	if((keyCode==116)||                                   //F5   
              (event.ctrlKey   &&   keyCode==82)){   //Ctrl+R 
		var l=getCookie("_cmsf5");
		if(cookieEnable() && !l && !__keyDown && !_forbidF5){
			__keyDown = true;
		    //setCookie("_cmsf5","anything",3);
			var exp  = new Date();
			exp.setTime(exp.getTime() + 3 * 1000);
			document.cookie = "_cmsf5=anything;expires=" + exp.toGMTString();
		}else{
			//forbid
			__keyDown = true;
			if(document.addEventListener){
				event.preventDefault();
			}else{
				event.keyCode=0; 
			}
		    event.returnValue=false;
		}  
	} 
}   

function keyRelease(event){
  __keyDown = false;
}

function cookieEnable() 
{ 
	var result=false; 
	if(navigator.cookiesEnabled) 
	  return true; 
	var cookieStr = "testcookie=yes";
	document.cookie = cookieStr; 
	var cookieSet = document.cookie; 
	if (cookieSet.indexOf(cookieStr) > -1) 
	  result=true; 
	//document.cookie = ""; 
	var date = new Date();   
	date.setTime(date.getTime() - 1000);   
	document.cookie = cookieStr + "; expires=" + date.toGMTString();
	return result; 
} 
/*
function forbidF5(){
	if(window.addEventListener){ 
	   document.addEventListener("keydown",keyLimit,false);
	   document.addEventListener("keyup",keyRelease,false);
	}else{
	   document.attachEvent("onkeydown",keyLimit);
	   document.attachEvent("onkeyup",keyRelease);
	}
}

forbidF5();
*/
if   (window.event)     
      document.captureEvents(Event.MOUSEUP);     

function forbidContextMenu(event){

	if(document.addEventListener){
		if(event.button   ==   2   ||   event.button   ==   3){
			event.preventDefault();
			event.returnValue   =   false;   
		}
	}else{
		if(event.button   ==   2   ||   event.button   ==   3){
			event.keyCode=0;
			event.button = 0;
			event.cancelBubble   =   true  
			event.returnValue   =   false; 
		}
	}
}

function forbidCopy(event){
	if(document.addEventListener){
			event.preventDefault();
			event.returnValue   =   false;  
	}else{
			event.keyCode=0;
			event.cancelBubble   =   true  
			event.returnValue   =   false; 
	}
	return false;
}

//var _forbidContextMenu = true;
function forbid(){
	if(window.addEventListener){
	   document.addEventListener("keydown",keyLimit,false);
	   document.addEventListener("keyup",keyRelease,false);
	   if(_forbidContextMenu){
		  //document.addEventListener("contextmenu",function(){return false;},false);
	      document.addEventListener("contextmenu",forbidContextMenu,false);
	   }
	   if(_forbidCopy){
		   //-moz-user-select='none' need to be set for forbid firefox selection.
		  document.addEventListener("selectstart",forbidCopy,false);
		  document.addEventListener("copy",forbidCopy,false);
	   }
	}else{
	   document.attachEvent("onkeydown",keyLimit);
	   document.attachEvent("onkeyup",keyRelease);
	   if(_forbidContextMenu){
		  document.attachEvent("oncontextmenu",function(){return false;});
	   }
	   if(_forbidCopy){
		  document.attachEvent("onselectstart",function(){return false;});
		  document.attachEvent("oncopy",forbidCopy);
	   }
	}
}

try{
forbid();
}catch(e){}
//==========================Common End====================

//==============评论JS开始======================
function doCommentSubmit(id) {
	var content = $N("comment.content")[0].value;
	if( content == null || content == "") {
		alert(I18n.commentContentEmpty);
		return;
	}
	var title = $N("comment.title")[0];
	if( title.value == null  || title.value == "" ) {
		title.value = I18n.commentDefaultTitle;
	}
	var url = _contextPath + "/cfn?cmsfn=0101&ID=" + id;
	new Ajax.Request(url, {
		method: 'post',
		parameters: $('commentForm').serialize(false),
		onSuccess: function(transport) {
			var xmldoc = transport.responseXML;
			var root = xmldoc.getElementsByTagName('root')[0];
			var root_node = root.getElementsByTagName('status')[0];
			var status = root_node.firstChild.data;	
			var msg_node = root.getElementsByTagName('message')[0];
			var msg = msg_node.firstChild.data;	

			if(status == "0"){
				if( msg=="NULL" ) 
						msg=I18n.commentSuccess;
				else 
						msg=I18n.commentSuccess + "<br><br>" +msg; 
					_error_msg_show(msg,"window.location=window.location",5,"");
			} else {
				if( msg=="NULL" ) 
					msg=I18n.commentFailure ;
				else
					msg=I18n.commentFailure + "<br><br>" + msg;
				_error_msg_show(msg,"",3,"");   
			}
		}
	});
 
}


function doSupport(id){
	doCommentValueSubmit("0102" , id);
}

function doDisagree(id) {
	doCommentValueSubmit("0103" , id);
}

function doNoCare(id) {
	doCommentValueSubmit("0104" , id);
}

function doCommentValueSubmit(fn, id){
	var url = _contextPath + "/cfn?cmsfn="+fn +"&umID="+id ;
	new Ajax.Request(url, {
		method: 'get',
		onSuccess: function(transport) {
			var xmldoc = transport.responseXML;
			var root = xmldoc.getElementsByTagName('root')[0];
			var root_node = root.getElementsByTagName('status')[0];
			var status = root_node.firstChild.data;	
			if(status == "0"){
				_error_msg_show(I18n.commentValueSuccess,"windowReload()",5,"");
			} else {
				_error_msg_show(I18n.commentValueFailure,"",3,"");
			}
		}
	 });
}


function windowReload() {
	  window.location =  window.location;
}

//==============全文检索JS开始 ======================
//全文检索 
function doSearchSubmit(id){
	if(!id){
		id = "searchForm";
	}
	var form = document.forms[id];
	//var keyword = $N("search.keyword")[0].value;
	var keyword = $(form)["search.keyword"].value;
	if( keyword == null || keyword.replace(/(^\s*)|(\s*$)/g, "")==""){
		alert(I18n.searchKeywordEmpty);
		return;
	}
	form.action = _contextPath + "/cc?url=_search";
	form.method = "post";
	
	var e = getEventSrcElement();
	if(e.tagName.toLowerCase() == "input" && (e.type=="image" || e.type=="submit")){
		//do nothing
	}else{
		form.submit();
	}
}

function doAdvancedSearchSubmit(id){
	if(!id){
		id = "searchForm";
	}
	var form = document.forms[id];
	//var keyword = $N("search.keyword")[0].value;
	var keyword = $(form)["search.keyword"].value;
	if( keyword == null || keyword.replace(/(^\s*)|(\s*$)/g, "")==""){
		alert(I18n.searchKeywordEmpty);
		return;
	}

	form.action = _contextPath + "/cc?url=_advSearch";
	form.method = "post";
	
	var e = getEventSrcElement();
	if(e.tagName.toLowerCase() == "input" && (e.type=="image" || e.type=="submit")){
		//do nothing
	}else{
		form.submit();
	}
}

//==============留言板JS开始 ======================
function doBoardSubmit(id) {
	if( isNullValue( "board.content" , I18n.boardContentEmpty )) return ; 
	if( isNullValue( "board.title" , I18n.boardTitleEmpty)) return ; 

	var formValueStr ="boardID=" + id;
	var url =_contextPath + "/cfn?cmsfn=0201&" + formValueStr;
	new Ajax.Request(url,{
		method: 'post',
		parameters: $($N('commentForm')[0]).serialize(false),
		onSuccess: function(transport){			
			var xmldoc = transport.responseXML;
			var root = xmldoc.getElementsByTagName('root')[0];
			var status_node = root.getElementsByTagName('status')[0];
			var status = status_node.firstChild.data;
			var msg_node = root.getElementsByTagName('message')[0];
			var msg = msg_node.firstChild.data;	

			if(status == "0"){
				if( msg=="NULL" )
					   msg=I18n.boardCommitSuccess;
				else 
					msg=I18n.boardCommitSuccess + "<br><br>" + msg;
					_error_msg_show(msg,"window.location=window.location",5,"");
			} else {
				if( msg=="NULL" ) 
					msg=I18n.boardCommitFailure ;
				else
					msg=I18n.boardCommitFailure + "<br><br>" + msg;
					_error_msg_show(msg,"",3,"");
				}
			}
	});
   
}

//==============公用JS开始 ======================

function getHttpRequestObject() {
	
	var http_request = false ; 

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		  if (http_request.overrideMimeType) {
			   http_request.overrideMimeType('text/xml');
      }
   } else if (window.ActiveXObject) { // IE
     try {
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
         try {
             http_request = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {}
     }
   }
	 if (!http_request) {
      alert(I18n.unsupportedHttpProtocol);
      return false;
   }
	return http_request; 
}

function getAjaxSubmitStr(name , firstFlag ) {
	if($N(name).length==0){
		return "";
	}
	var value = $N(name)[0].value;
	if( !value  || value ==null || value == "" ) {
		return "";	
	}
	if(firstFlag )  
		return name + "=" + value;
	else 
		return "&"+name + "=" + value;
}

function isNullValue(name , chineseName) {
	if($N(name).length==0){
		_error_msg_show( chineseName + I18n.nullValueTipSuffix,"",3,"");
		return true;
	}
	var value = $N(name)[0].value;
	if ( !value || value==null || value=="")  	{
		_error_msg_show( chineseName + I18n.nullValueTipSuffix,"",3,"");
		return true;
	}
	return false;
}

function openWindow( link , width , height , windowParam){
	var widthvalue = (window.screen.width-width)/2;
	var heightvalue = (window.screen.height-height)/2;
	var PopWindow;
	PopWindow = window.open(link,"","width="+ width + ",height=" + height+ "," + windowParam   +",left="+widthvalue+",top="+heightvalue,true);
	PopWindow.focus();
}

//======================= votebox start ==================
function doVote(xId){
	var cs = $N("vote." + xId);
	if(!cs || cs == null || cs == "" || cs.length == 0 ){
		_error_msg_show( I18n.voteItemNotExist,"",3,"");
		return true;
	}
	var ps = "";
	var count = 0;
	for(var i=0;i<cs.length;i++){
		if(cs[i].checked){
			if(count>0){
				ps = ps + "&";
			}
			ps =ps + "vote." + xId + "=" + cs[i].value;
			count++;
		}
	}
	if(count==0){
		_error_msg_show( I18n.voteItemNotSelected,"",3,"");
		return true;
	}

	var url =_contextPath + "/cfn?cmsfn=0301" ;

	ps += "&vote.vbox_id=" + xId;

	var nextUrl = _contextPath + "/cc?url=_voteResult&vote.vbox_id=" + xId;
	//url = _contextPath + "/cc?url=_checkNum&type=vote&id="+xId+"&checknum.forward=" + encodeURIComponent(nextUrl) + "&checknum.action=" + encodeURIComponent(url + "&" + ps);
	url = _contextPath + "/cfn?cmsfn=0301&"+ps+"&forward=" + encodeURIComponent(nextUrl) +"&action=" + encodeURIComponent(url + "&" + ps);
	
	openWindow(url,400,400,"resizable=yes");

}

function doViewVote(xId){
	openWindow(_contextPath + "/cc?url=_voteResult&vote.vbox_id=" + xId,400,400,"resizable=yes");
}
//======================= votebox end  ===================

//======================= check Num start ================

function chgAuthImg(){
	var authImg = $('auth_img');
	authImg.src = _contextPath + "/cfn?cmsfn=0401" + '&' + Math.random() ;
	var cNum = $('checkNum.inputNum');
	cNum.value = "";
}

function doCheckNum(){
	var url =_contextPath + "/cfn?cmsfn=0402" ;
	var inputNum = document.getElementById("checkNum.inputNum");
	url += "&checkNum.inputNum=" + inputNum.value;

	new Ajax.Request(url,{
		method: 'get',
		onSuccess: function(transport){
			 var xmldoc = transport.responseXML;
			 var root = xmldoc.getElementsByTagName('root')[0];
			 var status_node = root.getElementsByTagName('status')[0];
			 var status = status_node.firstChild.data;
			 var msg_node = root.getElementsByTagName('message')[0];
			 var msg = msg_node.firstChild.data;	

			if(status == "0"){
				var sa = $("successAction");
				var forward = $("forward");
				if(sa.value != ""){
					new Ajax.Request(sa.value,{
						method: 'get',
						onSuccess: function(transport){
							window.location=forward.value;
						}
					});
				}else{
					window.location=forward.value;
				}
			} else {
				chgAuthImg();
				inputNum = $("checkNum.inputNum");
				inputNum.value="";
				inputNum.focus();
				_error_msg_show(msg,"",3,"");
			}

		}
	});
}
//======================= check Num end   ================

//======================= user register start ============
function getFormParams(formName,isEncodeURI){
	var formE = document.getElementById(formName);
	//var formE = document.getElementsByName(formName)[0];
	if(!formE || !formE.tagName || formE.tagName.toLowerCase() != "form") {
		throw new Error(I18n.formBindFailure);
	} 
	var params = "";
	var inputs = formE.getElementsByTagName("input");
	var count = 0;
	if(isEncodeURI==null){
		isEncodeURI=false;
	}
	if(inputs){
		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			var tagType = input.type.toLowerCase();
			if( tagType == "image" || tagType == "button" 
				|| tagType == "file" || tagType == "reset" || tagType == "submit") {
				continue;
			}
			if(count > 0){
				params += "&";
			}
			if((tagType == "radio" || tagType == "checkbox")){
				if(input.checked){
					params += input.name + "=" + (isEncodeURI?encodeURIComponent(input.value):input.value);
				}
			}else{
				params += input.name + "=" + (isEncodeURI?encodeURIComponent(input.value):input.value);
			}
			count++;
		}
	}

	var selects = formE.getElementsByTagName("select");
	if(selects){
		for(var i=0; i<selects.length; i++){
			var select = selects[i];
			if(count > 0){
				params += "&";
			}
			params += select.name + "=" + (isEncodeURI?encodeURIComponent(select.options[select.selectedIndex].value):select.options[select.selectedIndex].value);
		}
	}
	var areas = formE.getElementsByTagName("textarea");
	if(areas){
		for(var i=0; i<areas.length; i++){
			var area = areas[i];
			if(count > 0){
				params += "&";
			}
			params += area.name + "=" + (isEncodeURI?encodeURIComponent(area.value):area.value);
		}
	}

	//alert(params);

	return params;
}

function doUserReg(successUrl){
	var e = getEventSrcElement();
	if(e!= null){
		e.disabled = true;
	}
	var url = _contextPath + "/cfn?cmsfn=0501";
	new Ajax.Request(url,{
		method: 'post',
		parameters: $('userRegForm').serialize(true),
		onSuccess: function(transport){
			if( e != null ) {
			  e.disabled=false;
			}
			userInfoResponse(transport,successUrl);
		}
	});
}

function userInfoResponse(transport,successUrl){
	var xmldoc = transport.responseXML;
	var root = xmldoc.getElementsByTagName('root')[0];
	var status_node = root.getElementsByTagName('status')[0];
	var status = status_node.firstChild.data;
	if(!successUrl){
		successUrl = window.location;
	}
	if(status == "0"){
		var msg_node = root.getElementsByTagName('message')[0];
		var msg = msg_node.firstChild.data;	
		_error_msg_show(msg,"window.location='"+successUrl+"';",3,"");
	} else {
		var errorInfos = $N("_error");
		if(errorInfos.length != undefined && errorInfos.length > 0){
			var eiLength = errorInfos.length;
			for(var h=0; h<eiLength;h++){
				errorInfos.item(0).removeNode(true);
			}
		}
		var msgNodes = root.getElementsByTagName('message');
		if(msgNodes.length == 1 && msgNodes.item(0).getElementsByTagName('key').length == 0){
			var msg = msgNodes.item(0).firstChild.data;	
			_error_msg_show(msg,"window.location=window.location",3,"");
			return;
		}
		var info = "";
		if(msgNodes.length > 0){
			var count = 0;
			for(var i=0; i<msgNodes.length; i++){
				var msg = msgNodes.item(i);
				if(count > 0){
					info += "\n";
				}
				var mKey = msg.getElementsByTagName('key')[0].firstChild.data;
				var mValue = msg.getElementsByTagName('value')[0].firstChild.data;
				info += mKey + mValue;
				var errorE = $N(mKey)[0];
				if(errorE){
					var parentE = errorE.parentNode;
					var	errorInfoE;
					if(browser.isIE){
						errorInfoE = document.createElement("<b class=\"user_error_info\" id=\"_error\" name=\"_error\"></b>");
					}else{
						errorInfoE = document.createElement("b");
						errorInfoE.setAttribute("class","user_error_info");
						errorInfoE.setAttribute("id","_error");
						errorInfoE.setAttribute("name","_error");
					}
					parentE.appendChild(errorInfoE);
					errorInfoE.innerHTML = mValue;
				}else{
					alert(I18n.userNotFoundItem + mKey);
				}

			}
		}
	}
}

function doUserUpdate(successUrl){
	var url = _contextPath + "/cfn?cmsfn=0504";
	new Ajax.Request(url,{
		method: 'post',
		parameters: $('userUpdateForm').serialize(true),
		onSuccess: function(transport){
			userInfoResponse(transport,successUrl);
		}
	});
}

function doUserDuplicateCheck(){
	var url = _contextPath + "/cfn?cmsfn=0503";
	var uId = $("user_id");
	if(uId.value == "" || uId.value == null){
		_error_msg_show(I18n.userIdEmpty,"window.location=window.location",5,"");
		uId.focus();
		return;
	}
	var ps = "uId=" + uId.value;

	new Ajax.Request(url,{
		method: 'get',
		parameters: ps,
		onSuccess: function(transport){
			 var xmldoc = transport.responseXML;
			 var root = xmldoc.getElementsByTagName('root')[0];
			 var status_node = root.getElementsByTagName('status')[0];
			 var status = status_node.firstChild.data;
			 var msg_node = root.getElementsByTagName('message')[0];
			 var msg = msg_node.firstChild.data;

			if(status == "0"){
				if( msg=="NULL" ){
					   msg=I18n.userNotUsed;
				}
				_error_msg_show(msg,"",3,"");
			} else {
				if( msg=="NULL" ) {
					msg=I18n.userAlreadyExist ;
				}
				_error_msg_show(msg,"",5,"");
			}			
		}
	});
}

function doUserLogin(successUrl){
	var url = _contextPath + "/cfn?cmsfn=0505";
	var uId = $("user_id");
	if(!successUrl){
		successUrl = window.location;
	}
	if(uId.value == "" || uId.value == null){
		_error_msg_show(I18n.userIdEmpty,"",5,"");
		uId.focus();
		return;
	}
	var uPasswd = $("user_passwd");
	if(uPasswd.value == "" || uPasswd.value == null){
		_error_msg_show(I18n.userPasswordEmpty,"",5,"");
		uPasswd.focus();
		return;
	}
	var cNum = $("checkNum.inputNum");
	var ps = "user_id=" + uId.value + "&user_passwd=" + uPasswd.value + "&checkNum.inputNum=" + cNum.value;

	new Ajax.Request(url,{
		method: 'get',
		parameters: ps,		
		onSuccess: function(transport){
			 var xmldoc = transport.responseXML;
			 var root = xmldoc.getElementsByTagName('root')[0];
			 var status_node = root.getElementsByTagName('status')[0];
			 var status = status_node.firstChild.data;
			 var msg_node = root.getElementsByTagName('message')[0];
			 var msg = msg_node.firstChild.data;
			if(status == "0"){
				//window.location.reload();
				window.location=successUrl;
			} else {
				_error_msg_show(msg,"",5,"");
				chgAuthImg();
			}			
		}
	});
}

function doUserInfoEdit(){
	window.location =  _contextPath + '/cc?url=_userEdit';
}

function doRegisterUser(){
	window.location = _contextPath + '/cc?url=_userReg';
}

function doPasswdRetrieve(){
	window.location = _contextPath + '/cc?url=_forgetPassword';
}

function doUserLogout(){
	var url = _contextPath + '/cfn?cmsfn=0506';

	var nowLocation = window.location;

	new Ajax.Request(url,{
		method: 'get',
		onSuccess: function(transport){
			window.location=nowLocation;
			return;
		}
	});
	return;
}

function doRetrievePasswd(){
	var  url = _contextPath + '/cfn?cmsfn=0507';

	var uId = $N("user_id")[0];
	var uEmail = $N("user_email")[0];
	var uQuestion = $N("user_question")[0];
	var uanswer = $N("user_answer")[0];
	var cNum = $("checkNum.inputNum");

	var ps = "user_id=" + uId.value + "&user_email=" + uEmail.value 
		+ "&user_question=" + uQuestion.value + "&user_answer=" + uanswer.value
		+ "&checkNum.inputNum=" + cNum.value;

	new Ajax.Request(url,{
		method: 'post',
		parameters: ps,
		onSuccess: function(transport){
			 var xmldoc = transport.responseXML;
			 var root = xmldoc.getElementsByTagName('root')[0];
			 var status_node = root.getElementsByTagName('status')[0];
			 var status = status_node.firstChild.data;
			 var msg_node = root.getElementsByTagName('message')[0];
			 var msg = msg_node.firstChild.data;

			if(status == "0"){
				_error_msg_show(I18n.userRetrievePasswordSuccess,"",3,"");
			} else {
				if( msg=="NULL" ) {
					msg=I18n.userRetrievePasswordFailure ;
				}
				_error_msg_show(msg,"",5,"");
			}			
		}
	});
}
//======================= user register end ==============

function changeErrorStackStatus(){
	var e = $("errorStackInfo");
	if(e.style.display=="none"){
		e.style.display="block";
	}else{
		e.style.display="none";
	}
}

function cmsDownload(cmsId,fld,flag){
	if(!cmsId || !fld){
		alert(I18n.downloadFileNotExist);
		return false;
	}
	var url = _contextPath + "/down?ID=" + cmsId + "&fld=" + fld;
	new Ajax.Request(url,{
		method: 'get',
		onSuccess: function(transport){
			var status = transport.responseText;
			if(status && status=="true"){
				return true;
			}else{
				alert(I18n.downloadInfoUpdateFailure);
				return false;
			}
		}
	});
}

function changeLocale(locale){
	var e = getEventSrcElement();
	setCookie("_cmsLocale",locale);
	window.location.reload();
}

function showLocaleSelector(){
	var e = getEventSrcElement();
	var menu = $("localeSelect");
	menu.style.position = "absolute";
	menu.style.display="block";
	var ePos = getElementPosition(e);
	menu.style.left = ePos.left +  menu.offsetWidth < document.body.offsetWidth ? ePos.left + "px" : 
		((window.screen.width - document.body.offsetWidth)/2 +document.body.offsetWidth-menu.offsetWidth-11)+"px";
	menu.style.top = ePos.top + e.offsetHeight;

}

function hiddenLocaleSelector(event){    
    var label = $("changeLocale");
	var menu = $("localeSelect"); 
	var ePos = getElementPosition(menu);
	var eventX = event.x ? event.x : event.pageX;
	eventX += document.documentElement.scrollLeft;
	var eventY = event.y ? event.y : event.pageY;
	eventY += document.documentElement.scrollTop;
	if(eventX   >   0   &&   eventX   <  ePos.left + menu.offsetWidth  && eventX > ePos.left   
	&&   eventY   >   0   &&   eventY   <  ePos.top + menu.offsetHeight && eventY > ePos.top)   return;

	menu.style.display="none";
	menu.scrollLeft=0;
	menu.scrollTop=0;
}

function getElementPosition(obj) {
    var left_offset = obj.offsetLeft;
    var top_offset = obj.offsetTop;
    
    while((obj = obj.offsetParent) != null) {
      left_offset += obj.offsetLeft;
      top_offset += obj.offsetTop;
    }
    return { 'left' : left_offset, 'top' : top_offset };
}

function includeJs(file){
	new Ajax.Request(file, {
		asynchronous: false,
		method: 'get',
		onSuccess: function(transport){
			document.write("<script language=\"javascript\" type=\"text/javascript\">" 
				+ transport.responseText + "</script>");
		}
	});
}

function includeCss(file){
	new Ajax.Request(file,{
		asynchronous: false,
		method: 'get',
		onSuccess: function(transport){
			document.write("<style>" + transport.responseText + "</style>");
		}
	});
}

function OspodSlide(pic,width,height,link,text,itv,spd){
  //
//alert(arguments.callee.length);
  if(arguments.length<1){//判断形参和实参数是否相等
    alert(I18n.slideIllegalParameter);
    return false;
  }

  var interval = itv ? itv : 3000;//图片变换间隔
  var duration = spd ? spd : 50;//默认值//滤镜效果的速度
  var xsImgWidth = width ? width : 100 ;//保存图片长和宽

  var xsImgHeight = height ? height : 100 ;
  var link = link ? link : '';
  var texts = text ? text : '';
  texts = texts.replace("\"\"","&quot;");

  var xsTextBar = 1;
  var dNum = 4;
  var pics = pic;
  var textHgt = 25;
  var textBgc = '#000000';
  var slideType = 1;
  var slideBgc = '#000000';
  
  this.setSlideType = function(type){//设置附加参数
    slideType = type;
  }
  
  this.setTextBgc = function(tbgc){
    textBgc = tbgc;
  }

  this.setTextHgt = function(thgt){
    textHgt = thgt;
  }

  this.setdNum = function(dnum){
    dNum = dnum;
  }
  this.setSlideBgc = function(bgColor){
	slideBgc = bgColor;
  }

  var xsImgs = new Array();//图片路径
  var xsImgLinks = new Array();//图片链接
  var xsImgTexts = new Array();//图片说明
  var xsTempImgs = new Array();//缓存图片
  var xsTempImg =new Array();
  var offsetIndex = 0;
  //

  var transitions = new Array;//滤镜
  transitions[0] = "progid:DXImageTransform.Microsoft.Fade(duration="+duration/50+")";
  transitions[1] = "progid:DXImageTransform.Microsoft.GradientWipe(duration="+duration/50+")";
  transitions[2] = "progid:DXImageTransform.Microsoft.Pixelate(maxSquare=10,duration="+duration/50+")";
  transitions[3] = "progid:DXImageTransform.Microsoft.Barn(function=15, duration="+duration/50+")";
  var transition_count = transitions.length;

  var timerId = -1;
  var curImg = 0;//初始图片为curImg+1的图片


  this.initSize =  function(){//图片宽度及缩略图比例计算
    var tHeight =  Math.floor(xsImgHeight*0.75);
    if(browser.isIE7){
      var bImgWidth = (xsImgWidth-18)/dNum;
      var bImgHeight = xsImgHeight>350?xsImgHeight*0.225:xsImgHeight*0.21-1;
    }else if(browser.isIE){
      var bImgWidth = (xsImgWidth-18)/dNum;
      var bImgHeight = xsImgHeight>350?xsImgHeight*0.225:xsImgHeight*0.21-1;
    }else{
      var bImgWidth = (xsImgWidth-18)/dNum;
      var bImgHeight = xsImgHeight>350?xsImgHeight*0.225:xsImgHeight*0.20;
    }
    var bWidth = xsImgWidth;//图片宽度和高度


    var bHeight = Math.floor(xsImgHeight*0.25);
    //xsImgHeight += 4;
    return {'tHeight':tHeight,'bWidth':bWidth,'bImgHeight':bImgHeight,'bImgWidth':bImgWidth,"bHeight":bHeight};
  }

  var bSize;

  this.init = function(){
    bSize = this.initSize();//获得各元素的尺寸

      xsImgs = pics.split("|");
      
      if(link.length == 0){
        for(var i = 0;i<xsImgs.length;i++){
          xsImgLinks[i] = '';
        }
      }else{
        xsImgLinks = link.split("|");
      }
      
      if(texts.length == 0){
        for(var i = 0;i<xsImgs.length;i++){
          xsImgTexts[i] = '';
        }
      }else{
         xsImgTexts = texts.split("|");
      }


      if(slideType){
        document.write("<style type=\"text/css\">");
        document.write("#slidearea{background-color:"+slideBgc+";border:1px solid #959595;width:"+xsImgWidth+"px;height:"+xsImgHeight+"px;}");
        document.write("#slidearea #slidebody{ width:100%; height:" + bSize['tHeight'] + "px; overflow: hidden; margin: 0 auto; text-align: center;vertical-align:middle;} ");

        document.write("#slidearea #slidebody .img{*margin-top:expression((parentElement.parentElement.offsetHeight-this.offsetHeight)/2);}");

        document.write("#slidearea #slidefooter{overflow:hidden;height:" + bSize['bHeight'] + "px;width:100%;}");

        document.write("#slidearea  img{border:0px}");

        document.write("#slidearea #slidefooter img.img1{border:1px solid #959595;padding:1px;}");

        document.write("#slidearea #slidefooter img.img2{border:1px solid #FF0000;padding:1px;}");
        
        document.write("#slidearea #slidefooter img.img3{border:1px solid #33FF00;padding:1px;}");

        document.write("#slidearea #slidefooter table{vertical-align:middle;border-collapse:collapse; margin:1px auto;width:100%;}");

        document.write("#slidearea #slidefooter table td{vertical-align:middle;text-align:center;width:"+bSize['bImgWidth']+"px;}");

        document.write("#slidearea #slidetext {overflow:hidden;word-break:break-all;text-align:center;width:100%;background-color: "+textBgc+"; filter:alpha(opacity=80);border-bottom:1px solid #959595;margin-top:-"+textHgt+"px;line-height:"+textHgt+"px;height:"+textHgt+"px;opacity: 0.80;font-family: 黑体; font-size:16px;color:#ffffff;}");

        document.write("</style>");

        document.write("<div id=\"slidearea\">");
        document.write("<div id=\"slidebody\">" );

        if (xsImgs.length != 0) {
          document.write("<a id=\"imglink\" href=\"" + xsImgLinks[0] + "\" target=\"_blank\"><img id=\"xsimgV\" title=\"" + xsImgTexts[0] + "\" src=\"" + xsImgs[0] + "\" width=" + bSize['bWidth'] + " height=" + bSize['tHeight'] + "\" onload=\"imgZoomer(this," + bSize['bWidth'] + "," + bSize['tHeight'] + ");\" /><\/a>");
        }

        var xsTempV =  document.getElementById('xsimgV');//缓存图片
        for(var i=0;i<xsImgs.length;i++){
          xsTempImg[i] = xsTempV.cloneNode(true);
          xsTempImg[i].src = xsImgs[i];
        }

        document.write("<\/div>");
        document.write("<div id=\"slidetext\">"+xsImgTexts[0]+"<\/div>");//+ xsImgTexts[0] +"<\/span>");
        if (xsTextBar != 0) {
          document.write("<div id=\"slidefooter\">");
          document.write("<table cellpadding=0 cellspacing=0 style=\"table-layout:fixed;\" ><tr><td style=\"width:9px;\" align=\"left\" nowrap><a href=\"#\" onclick=\"OspodSlide.prototype.forward(-1);return false\"><img src=\"img/focus_back1.gif\" onmouseout=\"this.src='img/focus_back1.gif';\" onmouseover=\"javascript:this.src='img/focus_back2.gif';\" onload=\"imgZoomer(this,9," + bSize['bImgHeight'] + ")\"></a></td><td style=\"width:"+(bSize['bWidth']-18)+"px;height:"+(bSize['bImgHeight'])+"px;\"><table  style=\"width:"+(bSize['bWidth']-18)+"px;height:"+(bSize['bImgHeight'])+"px;\"><tr>");
          dNum = xsImgs.length > dNum ? dNum : xsImgs.length;

          for(var i=0;i<dNum;i++){
            document.write("<td><a href=\"#\" id=\"imgtd"+i+"\" onclick=\"OspodSlide.prototype.selectImg("+i+");return false\"><img class=\"img1\" id=\"xs"+i+"\" src=\""+xsImgs[i]+"\" width=\""+bSize['bImgWidth']+"\" height=\""+bSize['bImgHeight']+"\" onload=\"imgZoomer(this,"+bSize['bImgWidth']+","+bSize['bImgHeight']+");OspodSlide.prototype.mouseSelect(this,"+i+");\"></a></td>");
          }
          var xsTemp = document.getElementById('xs0');
          for(var i=0;i<xsImgs.length;i++){//缓存缩略图

            xsTempImgs[i] = xsTemp.cloneNode(true);
            xsTempImgs[i].src = xsImgs[i];
            xsTempImgs[i].id = 'xs'+i;
          }
          document.write("</tr></table></td><td style=\"width:9px;\" align=\"right\" nowrap ><a href=\"#\" onclick=\"OspodSlide.prototype.forward(1,1);return false\"><img style=\"text-align:right;\" src=\"img/focus_forward1.gif\" onmouseout=\"this.src='img/focus_forward1.gif';\" onmouseover=\"javascript:this.src='img/focus_forward2.gif';\" onload=\"imgZoomer(this,9," + bSize['bImgHeight'] + ")\"></a></td><\/tr><\/table>");
          document.write("<\/div>");
        }
        document.write("<\/div>");
      }else{
        document.write("<style type=\"text/css\">#slidebody {background-color:"+slideBgc+";border:1px solid #959595; width:" + xsImgWidth + "px; height:" + xsImgHeight + "px; overflow: hidden; margin: 0 auto; text-align: center; vertical-align:middle;display: table-cell;} #slidearea img {*margin-top:expression((parentElement.parentElement.offsetHeight-this.offsetHeight)/2);}</style>");
        document.write("<div id=\"slidebody\">");
        if (xsImgs.length != 0) {
          document.write("<a id=\"imglink\" href=\"" + xsImgLinks[0] + "\" target=\"_blank\"><img id=\"xsimgV\" title=\"" + xsImgTexts[0] + "\" src=\"" + xsImgs[0] + "\" width=" + xsImgWidth + " height=" + xsImgHeight + "\" onload=\"imgZoomer(this," + xsImgWidth + "," + xsImgHeight + ");\" /><\/a>");
		  
			var xsTempV =  document.getElementById('xsimgV');//缓存图片
			for(var i=0;i<xsImgs.length;i++){
			  xsTempImg[i] = xsTempV.cloneNode(true);
			  xsTempImg[i].src = xsImgs[i];
			}
        }
        document.write("<\/div>")
      }
      window.setTimeout("OspodSlide.prototype.play()", interval);//刷新页面后变换图片的时间
  }


  OspodSlide.prototype.mouseSelect =  function(obj,i){
    obj.onmouseover = OspodSlide.prototype.slideOver.bind(obj,i);
    obj.onmouseout = OspodSlide.prototype.slideOut.bind(obj,i);
    if(obj.id == 'xs0'){
      document.getElementById('xs0').style.border = "1px solid #33FF00";
      document.getElementById('xs0').style.padding = "1px";
      var Oimg = document.createElement('img');
      Oimg.src = obj.src;
      imgZoomer(Oimg,bSize['bImgWidth'],bSize['bImgHeight']);
      document.getElementById('xs0').style.height = Oimg.height;
      document.getElementById('xs0').style.width =Oimg.width;
    }
  }
  
  OspodSlide.prototype.slideOver = function(img,i){
    img.style.border = "1px solid #FF0000";
    img.style.padding = "1px";
  }

  OspodSlide.prototype.slideOut = function(img,i){
    var Oimg = document.createElement('img');
    Oimg.src = xsTempImgs[i].src;
    imgZoomer(Oimg,bSize['bImgWidth'],bSize['bImgHeight']);
    img.height = Oimg.height;
    img.width = Oimg.width;
    img.style.border = "1px solid #959595";
    img.style.padding = "1px";
    if(i == curImg){
      OspodSlide.prototype.selectedImg(curImg,0);
    }
  }


  OspodSlide.prototype.changeSlide = function(){
    if (document.all){//如果是firefox浏览器 不使用滤镜，单纯替换图片
      var do_transition = Math.floor(Math.random() * transition_count);//取随机滤镜

      document.getElementById('slidebody').style.filter=transitions[do_transition];
      document.getElementById('slidebody').filters[0].Apply();
    }
	if (xsImgs.length !=0){
		document.getElementById('imglink').href = xsImgLinks[curImg];
		document.getElementById('imglink').innerHTML= "";
		document.getElementById('imglink').appendChild(xsTempImg[curImg]);
		document.getElementById('xsimgV').title= xsImgTexts[curImg];
		if(slideType){
			var slideText = xsImgTexts[curImg];
			document.getElementById('slidetext').innerHTML = slideText;
		}
		if (document.all) {
			document.getElementById('slidebody').filters[0].Play();
		}
	}
}

  OspodSlide.prototype.forward = function(j,type){
    if(j){
      curImg = j;
    }else{
      curImg++;
    }
    if (dNum) {
      if(curImg==1){//正常滚动
        for(var i=0;i<xsImgs.length;i++){
          if(i==0){
            var xsImges = xsTempImgs[i];
            var xsImg =  xsTempImg[i];
            var xsText = xsImgTexts[i];
            var xsLink = xsImgLinks[i];
            xsTempImgs[i] = xsTempImgs[i+1];
            xsTempImg[i] = xsTempImg[i+1];
            xsImgTexts[i] = xsImgTexts[i+1];
            xsImgLinks[i] = xsImgLinks[i+1];
          }else if(i == (xsImgs.length-1)){
            xsTempImgs[i] = xsImges;
            xsTempImg[i] = xsImg;
            xsImgTexts[i] = xsText;
            xsImgLinks[i] = xsLink;
          }else{
            xsTempImgs[i] = xsTempImgs[i+1];
            xsTempImg[i] = xsTempImg[i+1];
            xsImgTexts[i] = xsImgTexts[i+1];
            xsImgLinks[i] = xsImgLinks[i+1]
          }
        }
        OspodSlide.prototype.selectedImg(curImg-1,0);
        if(type){
          window.clearInterval(timerId);
     
          timerId = window.setInterval('OspodSlide.prototype.forward();', interval);
        }
      }else{//从点击的地方开始移动

        var mPs = new Array();
        var mP = new Array();
        var mT = new Array();
        var mL = new Array();
        for(var i=0;i<xsImgs.length;i++){//复制图片信息
         mPs[i] = xsTempImgs[i];
         mP[i] = xsTempImg[i];
         mT[i] = xsImgTexts[i];
         mL[i] = xsImgLinks[i];
        }
        if(j==-1){
          curImg = xsImgs.length+j;
        }

        for(var i=0;i<xsImgs.length;i++){
          var m = i-curImg;
          if(m < 0){
            m = xsImgs.length - curImg+i;
          }
          xsTempImgs[m] = mPs[i];
          xsTempImg[m] = mP[i];
          xsImgTexts[m] = mT[i];
          xsImgLinks[m] = mL[i];
        }
          OspodSlide.prototype.selectedImg(xsImgs.length - curImg-1,0);

          window.clearInterval(timerId);
          timerId = window.setInterval('OspodSlide.prototype.forward();', interval);
      }
        curImg = 0;
        var imgfooter="";

        dNum = (xsImgs.length) > dNum ? dNum : xsImgs.length;

        for(var i=0;i<dNum;i++){
          var Oimg =new  Image();
          Oimg.src = xsTempImgs[i].src;
          imgZoomer(Oimg,bSize['bImgWidth'],bSize['bImgHeight']);
          document.getElementById('imgtd'+i).innerHTML= "";
          document.getElementById('imgtd'+i).appendChild(xsTempImgs[i]);

          document.getElementById(xsTempImgs[i].id).style.width =  Oimg.width;
          document.getElementById(xsTempImgs[i].id).style.height =  Oimg.height;
        }
      }else if(curImg >= dNum){
        curImg = 0;
      }
      OspodSlide.prototype.changeSlide();
  }

  OspodSlide.prototype.forward_e = function(){
    curImg++;
    if (curImg >= xsImgs.length) {
      curImg = 0;
    }
    OspodSlide.prototype.changeSlide();
  }


  OspodSlide.prototype.rewind = function(){
    curImg--;
    if (curImg < 0)
    {
      curImg = xsImgs.length-1;
    }
    OspodSlide.prototype.changeSlide();
  }

  OspodSlide.prototype.play = function(){
    if (timerId == -1){
      if(slideType){
        timerId = window.setInterval('OspodSlide.prototype.forward();', interval);
      }else{
        timerId = window.setInterval('OspodSlide.prototype.forward_e();', interval);
      }
    }
  }

  OspodSlide.prototype.selectImg = function(i){//选择性变换图片

    OspodSlide.prototype.selectedImg(i,1);
  }

  OspodSlide.prototype.selectedImg = function(j,type){//点击缩略图,type
   var img = document.createElement('img');//获得缩略图大小

   dNum = xsImgs.length > dNum ? dNum : xsImgs.length;
   for(var i=0;i<dNum;i++){
     if(i == j){
        xsTempImgs[j].style.border = "1px solid #33FF00";
        xsTempImgs[j].style.padding = "1px";
        if(document.getElementById('xs'+j)){
          document.getElementById('xs'+j).style.border = "1px solid #33FF00"; 
          document.getElementById('xs'+j).style.padding = "1px";
        }
        img.src = xsTempImgs[j].src;
        imgZoomer(img,bSize['bImgWidth'],bSize['bImgHeight']);

        xsTempImgs[j].height = img.height;
        xsTempImgs[j].width = img.width;

        if(type){
         if(j==0){
          img.src = xsTempImgs[dNum-1].src;
          imgZoomer(img,bSize['bImgWidth'],bSize['bImgHeight']);

          xsTempImgs[dNum-1].className = "img1";
          xsTempImgs[dNum-1].height = img.height;
          xsTempImgs[dNum-1].width = img.width;
         }else{
          img.src = xsTempImgs[j-1].src;
          imgZoomer(img,bSize['bImgWidth'],bSize['bImgHeight']);

           xsTempImgs[j-1].style.border = "1px solid #959595";
           xsTempImgs[j-1].style.padding = "1px";

           xsTempImgs[j-1].height = img.height;
           xsTempImgs[j-1].width = img.width;
         }
         OspodSlide.prototype.forward(j);
        }
     }else{
       xsTempImgs[i].style.border = "1px solid #959595";
       xsTempImgs[i].style.padding = "1px";
       img.src = xsTempImgs[i].src;
       imgZoomer(img,bSize['bImgWidth'],bSize['bImgHeight']);

       xsTempImgs[i].height = img.height;
       xsTempImgs[i].width = img.width;
     }
   }
 }
}



//不失真加载图片

function imgZoomer(imgObj,canvas_width,canvas_height){
    var obj = imgObj;
    var src_width = GetImageWidth(obj);
    var src_height =GetImageHeight(obj);
    var widthScale =  src_width / canvas_width;
	  var heightScale = src_height / canvas_height;
  
    if (widthScale >= 1 || heightScale >= 1) {
      //哪边差的小，以哪边为基准放大
      if (widthScale < heightScale) {
        obj.width = src_width / heightScale;
        obj.height = canvas_height;
      } else {
        obj.width = canvas_width;
        obj.height = src_height / widthScale;
      }
    }else {
        obj.width = src_width;
        obj.height = src_height;
    }
}

var OriginImage=new Image();
function GetImageWidth(oImage){
  if(OriginImage.src!=oImage.src)OriginImage.src=oImage.src;
  return OriginImage.width;
}

function GetImageHeight(oImage){
  if(OriginImage.src!=oImage.src)OriginImage.src=oImage.src;
  return OriginImage.height;
}

//dir可为空

function ImageViewer(obj,dir){

  var IMGDIR= (dir!=null) ? dir: "img";//图标路径

  var zoomobj =new Array();
  
  var zoomimglayer_bg = document.getElementById('zoomimglayer_bg');//背景层

  var zoomimglayer = document.getElementById('zoomimglayer'); //图片层



  this.zoom = function(obj){
    var append_parent = document.getElementById('append_parent');
  
    if(!append_parent){//创建外层DIV容器
      append_parent  = document.createElement('div');
      append_parent.id = 'append_parent';
        
      document.body.appendChild(append_parent);
    }

    zimg = obj.src;
    if(!zoomimglayer_bg){//创建半透明的图片背景

      zoomimglayer_bg = document.createElement('div');
      zoomimglayer_bg.id = 'zoomimglayer_bg';
      zoomimglayer_bg.style.position = 'absolute';
      zoomimglayer_bg.style.top = '0px';
      zoomimglayer_bg.style.left = '0px';
	  zoomimglayer_bg.style.width = document.documentElement.clientWidth > document.body.clientWidth ? document.documentElement.clientWidth + 'px' : document.body.clientWidth + 'px';
      zoomimglayer_bg.style.height = document.body.scrollHeight +'px';
      zoomimglayer_bg.style.backgroundColor = '#000';
      zoomimglayer_bg.style.display = 'none';
      zoomimglayer_bg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=80,finishOpacity=100,style=0)';
      zoomimglayer_bg.style.opacity = 0.8;
      append_parent.appendChild(zoomimglayer_bg);
      
      zoomimglayer = document.createElement('div');//点击图片时出现的动画层

      zoomimglayer.id = 'zoomimglayer';
      zoomimglayer.style.position = 'absolute';
      zoomimglayer.style.padding = 0;
      append_parent.appendChild(zoomimglayer);
    }
    zoomobj['srcinfo'] = this.fetchOffset(obj);//取得页面上的图片位置
    zoomobj['srcobj'] = obj;
    zoomobj['zimg'] = zimg;


    zoomimglayer.style.display = '';
    
    zoomimglayer.style.left = zoomobj['srcinfo']['left'] + 'px';
    zoomimglayer.style.top = zoomobj['srcinfo']['top'] + 'px';
    zoomimglayer.style.width = zoomobj['srcobj'].width + 'px';
    zoomimglayer.style.height = zoomobj['srcobj'].height + 'px';
    zoomimglayer.style.border = "0px solid #FF0000";
    zoomimglayer.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=40,finishOpacity=100,style=0)';
    zoomimglayer.style.opacity = 0.4;
    zoomimglayer.style.zIndex = 999;
    zoomimglayer.innerHTML = '<table width="100%" height="100%" cellspacing="0" cellpadding="0" style="border:1px solid #FF0000;"><tr><td align="center" valign="middle"><img src="' + IMGDIR + '/loading.gif"></td></tr></table><div style="position:absolute;top:-100000px;visibility:hidden"><img src="'+zoomobj['zimg']+'" onload="javascript:ImageViewer.prototype.zoomimgresize(this);"></div>';
   
  }

this.fetchOffset = function(obj) {//取得图片在屏幕上的相对位置，居中显示
    var left_offset = obj.offsetLeft;
    var top_offset = obj.offsetTop;
    
    while((obj = obj.offsetParent) != null) {
      left_offset += obj.offsetLeft;
      top_offset += obj.offsetTop;
    }

    return { 'left' : left_offset, 'top' : top_offset };
  }
    
  var zoomdragstart = new Array();
  var zoomclick = 0;

  ImageViewer.prototype.zoomdrag = function(e, op) {//拖动
    if(op == 1) {
      zoomclick = 1;
      zoomdragstart = browser.isIE ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
      zoomdragstart[2] = parseInt(zoomimglayer.style.left);
      zoomdragstart[3] = parseInt(zoomimglayer.style.top);
      ImageViewer.prototype.doane(e);
    } else if(op == 2 && zoomdragstart[0]) {
      zoomclick = 0;
      var zoomdragnow = browser.isIE ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
      zoomimglayer.style.left = (zoomdragstart[2] + zoomdragnow[0] - zoomdragstart[0]) + 'px';
      zoomimglayer.style.top = (zoomdragstart[3] + zoomdragnow[1] - zoomdragstart[1]) + 'px';
      ImageViewer.prototype.doane(e);
    } else if(op == 3) {
      if(zoomclick){
        ImageViewer.prototype.zoomclose();
      }
      zoomdragstart = [];
        ImageViewer.prototype.doane(e);
    }
  }

  ImageViewer.prototype.doane = function(event) {//静态方法

    e = event ? event : window.event;
    if(browser.isIE) {
      e.returnValue = false;
      e.cancelBubble = true;
    } else if(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
	
  ImageViewer.prototype.setImageDir = function(dir) {
	IMGDIR = dir;
  }

  ImageViewer.prototype.zoomST = function(c) {
    if(zoomimglayer.style.display == '') {
      zoomimglayer.style.left = (parseInt(zoomimglayer.style.left) + zoomobj['x']) + 'px';
      zoomimglayer.style.top = (parseInt(zoomimglayer.style.top) + zoomobj['y']) + 'px';
      zoomimglayer.style.width = (parseInt(zoomimglayer.style.width) + zoomobj['w']) + 'px';
      zoomimglayer.style.height = (parseInt(zoomimglayer.style.height) + zoomobj['h']) + 'px';
      var opacity = c * 20;
      zoomimglayer.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ',finishOpacity=100,style=0)';
      zoomimglayer.style.opacity = opacity / 100;
      c++;
      if(c <= 5) {
        setTimeout('ImageViewer.prototype.zoomST(' + c + ')', 5);
      } else {

        zoomimglayer.style.filter = '';
        zoomimglayer_bg.style.display = '';
        zoomimglayer.innerHTML = '<table cellspacing="0" cellpadding="2"><tr><td style="text-align: right;color:white;" nowrap>'+I18n.imageViewerZoomTip+'<a href="' + zoomobj['zimg'] + '" target="_blank"><img src="' + IMGDIR + '/newwindow.gif" border="0" style="vertical-align: middle" title="'+I18n.imageViewerOpenTip+'" /></a> <a href="javascript:return false;" onclick="ImageViewer.prototype.zoomimgadjust(event, 1)"><img src="' + IMGDIR + '/resize.gif" border="0" style="vertical-align: middle" title="'+I18n.imageViewerNormalSizeTip+'" /></a> <a href="javascript:ImageViewer.prototype.zoomclose();"><img style="vertical-align: middle" src="' + IMGDIR +'/close.gif" title="'+I18n.imageViewerCloseTip+'" /></a>&nbsp;</td></tr><tr><td align="center" id="zoomimgbox"><img id="zoomimg"  style="cursor: move; margin: 5px;" src="' + zoomobj['zimg'] + '" width="' + zoomimglayer.style.width + '" height="' + zoomimglayer.style.height + '"></td></tr></table>';
        zoomimglayer.style.overflow = 'visible';
        zoomimglayer.style.width = zoomimglayer.style.height = 'auto';

        if(browser.isIE){
          zoomimglayer.onmousewheel = ImageViewer.prototype.zoomimgadjust;
          document.getElementById('zoomimgbox').onmousedown = ImageViewer.prototype.zoomdrag.bind(event,1);
          document.getElementById('zoomimgbox').onmousemove = ImageViewer.prototype.zoomdrag.bind(event,2);
          document.getElementById('zoomimgbox').onmouseup = ImageViewer.prototype.zoomdrag.bind(event,3);
        } else {
          zoomimglayer.addEventListener("DOMMouseScroll", ImageViewer.prototype.zoomimgadjust, false);
        }
      }
    }
  }

  ImageViewer.prototype.zoomimgresize = function(obj) {//生成大图片的缩略图

    zoomobj['zimginfo'] = [obj.width, obj.height];
    var r = obj.width / obj.height;
    var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    w =  w*0.95;
    w = obj.width > w ? w : obj.width;//控制图片的宽度不超过浏览器窗口宽度的95%
    var h = w / r;
    var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;

    var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;//页面滚动高度

    if(h > clientHeight) {
      h = clientHeight;
      w = h * r;
    }

    var l = ((document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth) - w) / 2;//按照浏览器窗口宽度计算，而非按照body宽度计算
    var t = h < clientHeight ? (clientHeight - h) / 2 : 0;
    t += + scrollTop;
   
    zoomobj['x'] = (l - zoomobj['srcinfo']['left']) / 5;
    zoomobj['y'] = (t - zoomobj['srcinfo']['top']) / 5;
    zoomobj['w'] = (w - zoomobj['srcobj'].width) / 5;
    zoomobj['h'] = (h - zoomobj['srcobj'].height) / 5;

    zoomimglayer.style.filter = '';
    zoomimglayer.innerHTML = '';
    setTimeout('ImageViewer.prototype.zoomST(1)', 5);//图片放大效果
  }

  ImageViewer.prototype.zoomimgadjust = function(e, a) {
     var zoomimg = document.getElementById('zoomimg'); 
    if(!a) {
      if(!e) e = window.event;
      if(e.altKey || e.shiftKey || e.ctrlKey) return;
      var l = parseInt(zoomimglayer.style.left);
      var t = parseInt(zoomimglayer.style.top);
      var img = GetImageSize(zoomobj['srcobj']);//获得图片的原始大小

	  var scale = img.width/img.height;
      if(e.wheelDelta <= 0 || e.detail > 0) {

        if(zoomimg.width <= 100 || zoomimg.height <= 100) {//当图片的宽度或者高度小于原大小时不缩放
          ImageViewer.prototype.doane(e);return;
        }
        zoomimg.width -= zoomobj['zimginfo'][0] / 10;
        zoomimg.height -= (zoomobj['zimginfo'][1] / 10)*scale;
      } else {
        zoomimg.width += zoomobj['zimginfo'][0] / 10;
        zoomimg.height += (zoomobj['zimginfo'][1] / 10)*scale;
      }
	  
    } else {
      zoomimg.width = zoomobj['zimginfo'][0];zoomimg.height = zoomobj['zimginfo'][1];
    }
	  var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	  var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
	  var clientWidth =  document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	  var l = (clientWidth - zoomimg.clientWidth) / 2;l = l > 0 ? l : 0;
	  var t = (clientHeight - zoomimg.clientHeight) / 2 + scrollTop;t = t > 0 ? t : 0;

    zoomimglayer.style.left = l + 'px';
    zoomimglayer.style.top = t + 'px';
    zoomimglayer_bg.style.height = t + zoomimglayer.clientHeight > zoomimglayer_bg.clientHeight ? (t + zoomimglayer.clientHeight) + 'px' : zoomimglayer_bg.style.height;
    ImageViewer.prototype.doane(e);
  }

  ImageViewer.prototype.zoomclose = function() {
    zoomimglayer.innerHTML = '';
    zoomimglayer.style.display = 'none';
    zoomimglayer_bg.style.display = 'none';
  }
  this.zoom(obj);
}

//element用于滚动的容器ID；spd 滚动速度1-50；type滚动方式1：向上；2：向下；3：向左；4：向右；
function Marquee(elm,width,height,spd,type,wspace){
  if(arguments.length<1){//判断形参和实参数是否相等
    alert(I18n.marqueeIdEmpty);
    return false;
  }
  var element = elm;//滚动区域div
  var scrollwidth = width ? width : 800;//默认值

  var scrollheight = height ? height : 200;
  scrollwidth = parseInt(scrollwidth);
  scrollheight = parseInt(scrollheight);
  var scrollwspace = wspace ? wspace : 5;
  var scrolltype = type ? type :3;
  var speed = spd ? spd : 30;
  var scrolltext = new Array();  
  var obj1 = document.getElementById(element);//滚动区域，定义滚动区域宽高

  if(!obj1){
    alert(I18n.marqueeIllegalParameter);
    return false;
  }
  obj1.style.height = scrollheight+'px';
  obj1.style.width = scrollwidth+'px';
  obj1.style.border = '0px solid #000';
  var obj2 = document.createElement("div");
  obj2.id = element + 'obj2';
  var obj3 = document.createElement("div");//创建滚动容器
  obj3.id = element + "obj3";
  obj2.style.border = '0px solid #000';
  var objtab = document.createElement('table');
  var objtr = document.createElement('tr');
  var objtd = document.createElement('td');
  
  objtd.innerHTML = obj1.innerHTML;
  obj1.innerHTML = "";
  objtab.style.display = "inline";
  objtab.cellpadding = "0";
  objtab.cellspacing = "0";
  objtab.id = element +'tab';
  objtab.style.border = "0px solid #FF0000";

  objtd.style.whiteSpace = "nowrap";
  objtr.appendChild(objtd);
  objtab.appendChild(objtr);
  obj2.innerHTML = objtab.outerHTML;
  obj1.appendChild(obj2);
  obj1.appendChild(obj3);
  obj3.style.width = obj2.style.width =scrollwidth+'px';

  if(scrolltype == 1 || scrolltype == 2){
    if(obj2.offsetHeight < scrollheight){
	  var tabheight = scrollheight - obj2.offsetHeight;
     var  tabmarginleft =(obj2.offsetWidth>scrollwidth) ? scrollwidth : (obj2.offsetWidth+scrollwidth)/2;
	  if(tabheight<0){
		tabheight=0;
	  }else{
		obj2.innerHTML += "<table border=0 style='border:0px solid #ff0000;margin-left:"+tabmarginleft+"px;' cellpadding='0' cellspacing='0'><tr><td style='height:"+tabheight+"px;' nowrap></td></tr></table>";
	  }
    }
  }
  document.write("<style type=\"text/css\">#"+element+"{overflow:hidden;width:"+scrollwidth+"px;} #"+element+" #"+obj2.id+",#"+element+" #"+obj3.id+"{padding:0px !important;padding:0px;margin:0px !important;margin:0px;float:none;} #"+obj2.id+" img,#"+obj3.id+" img{margin-right:"+scrollwspace+"px;}</style>");

  if(scrolltype == 3 || scrolltype == 4){//计算出图片不换行的实际宽度

     obj1.style.whiteSpace = "nowrap";
     obj2.style.display = "inline";
    
     var tabwidth = scrollwidth - obj2.offsetWidth;
     var  tabmargintop =(obj2.offsetHeight>scrollheight) ? scrollheight : (obj2.offsetHeight+scrollheight)/2;

     if(tabwidth<0){
        tabwidth = 0;
     }else{//当使用w3c标准时，使用table撑出空白区域
        obj2.innerHTML += "<table border=0 style='display:inline;margin-top:"+tabmargintop+"px;' cellpadding='0' cellspacing='0'><tr><td style='width:"+tabwidth+"px;' nowrap></td></tr></table>";
     }
  }
  
  obj3.innerHTML=obj2.innerHTML;//将图片复制到滚动区域

  Marquee.prototype.marqueeScrollTop = function(element,scrolltype,scrollwidth,scrollheight,speed){//1循环向上滚动
    var obj1 = document.getElementById(element);
	var obj2 = document.getElementById(element+"obj2");
	var obj3 = document.getElementById(element+"obj3");
	if(obj2.offsetHeight > scrollheight)
      if(obj3.offsetTop-obj1.scrollTop<=0){
        obj1.scrollTop -= obj3.offsetTop;
      }else{
        var oldScrollTop = obj1.scrollTop;
		obj1.scrollTop++;
		if(oldScrollTop == obj1.scrollTop){
			obj1.scrollTop = 0;
		}
      }
    else{
      if(scrollheight-obj1.scrollTop<=0){
        obj1.scrollTop -= scrollheight;
      }else{
        obj1.scrollTop++;
      }
    }
  }
  
  Marquee.prototype.marqueeScrollDown = function(element,scrolltype,scrollwidth,scrollheight,speed){//2循环向下滚动
   var obj1 = document.getElementById(element);
	var obj2 = document.getElementById(element+"obj2");
	var obj3 = document.getElementById(element+"obj3");
	if(document.all){
    if(obj2.offsetTop-obj1.scrollTop>=0){
      obj1.scrollTop+=obj3.offsetHeight;
    }else{
      obj1.scrollTop--;
    }
   }else{
    if(obj2.offsetTop-obj1.scrollTop-obj2.offsetTop>=0){
      obj1.scrollTop+=obj3.offsetHeight;
    }else{
      obj1.scrollTop--;
    }
   }
  }

  Marquee.prototype.marqueeScrollLeft = function(element,scrolltype,scrollwidth,scrollheight,speed){//3循环向左滚动
    var obj1 = document.getElementById(element);
	var obj2 = document.getElementById(element+"obj2");
	var obj3 = document.getElementById(element+"obj3");
    if(obj3.offsetWidth-obj1.scrollLeft<=0){
      obj1.scrollLeft-=obj2.offsetWidth;
    }else{
      obj1.scrollLeft++;
    }
  }

  Marquee.prototype.marqueeScrollRight = function(element,scrolltype,scrollwidth,scrollheight,speed){//4循环向右滚动
    var obj1 = document.getElementById(element);
	var obj2 = document.getElementById(element+"obj2");
	var obj3 = document.getElementById(element+"obj3");
     if(obj1.scrollLeft<=0){
      obj1.scrollLeft+=obj3.offsetWidth;
     }else{
      obj1.scrollLeft--;
     }
  }
  
  var count;
  Marquee.prototype.marqueeStart = function(element,scrolltype,scrollwidth,scrollheight,speed){//开始滚动 并判断滚动方向

     switch(scrolltype){
       case 1://向上滚动
         if(Marquee.prototype.scrollTopOrDown(element,scrolltype,scrollwidth,scrollheight,speed)){
			Marquee.prototype.clearInterval(element);
          count =  window.setInterval(Marquee.prototype.marqueeScrollTop.bind(this,element,scrolltype,scrollwidth,scrollheight,speed),speed);
		  MarqueeInterval[element]=count;
         }break;
       case 2://向下滚动
         if(Marquee.prototype.scrollTopOrDown(element,scrolltype,scrollwidth,scrollheight,speed)){
			Marquee.prototype.clearInterval(element);
          count = window.setInterval(Marquee.prototype.marqueeScrollDown.bind(this,element,scrolltype,scrollwidth,scrollheight,speed),speed);
		  MarqueeInterval[element]=count;
         }break;
       case 3://向左滚动
          Marquee.prototype.scrollLeftOrRight(element,scrolltype,scrollwidth,scrollheight,speed);
		  Marquee.prototype.clearInterval(element);
          count = window.setInterval(Marquee.prototype.marqueeScrollLeft.bind(this,element,scrolltype,scrollwidth,scrollheight,speed),speed);
		  MarqueeInterval[element]=count;
		  break;
       case 4://向右滚动
          Marquee.prototype.scrollLeftOrRight(element,scrolltype,scrollwidth,scrollheight,speed);
		  Marquee.prototype.clearInterval(element);
          count =  window.setInterval(Marquee.prototype.marqueeScrollRight.bind(this,element,scrolltype,scrollwidth,scrollheight,speed),speed);
		  MarqueeInterval[element]=count;
		  break;
     }
  }

  Marquee.prototype.scrollLeftOrRight = function(element,scrolltype,scrollwidth,scrollheight,speed){//横向滚动时的条件
	var obj3 = document.getElementById(element+"obj3");
     obj3.style.display = "inline";
  }

  Marquee.prototype.scrollTopOrDown = function(element,scrolltype,scrollwidth,scrollheight,speed){//纵向滚动时，判断图片宽度是否超出滚动区域宽度
     var obj2 = document.getElementById(element+"obj2");
     if(scrollwidth-obj2.offsetWidth<0){
        //alert(I18n.marqueeWidthNotEnough);
        return true;
     }else{
       obj2.style.display = "block";
       return true;
     }
  }

  Marquee.prototype.clearInterval = function(element){
		var interval;
		for ( var key in MarqueeInterval ) {
			if(key == element){
			interval = MarqueeInterval[key];
			break;
			}
		}
		window.clearInterval(interval);
  }
  
  obj1.onmouseover=function() {Marquee.prototype.clearInterval(element);}
  obj1.onmouseout=function() {Marquee.prototype.marqueeStart(element,scrolltype,scrollwidth,scrollheight,speed);};
  Marquee.prototype.marqueeStart(element,scrolltype,scrollwidth,scrollheight,speed);
}

var MarqueeInterval = new Object();

//firefox 支持outerHTML
if(typeof(HTMLElement)!="undefined" && !window.opera) 
{ 
    HTMLElement.prototype.__defineGetter__("outerHTML",function() 
    { 
        var a=this.attributes, str="<"+this.tagName, i=0;for(;i<a.length;i++) 
        if(a[i].specified) 
            str+=" "+a[i].name+'="'+a[i].value+'"'; 
        if(!this.canHaveChildren) 
            return str+" />"; 
        return str+">"+this.innerHTML+"</"+this.tagName+">"; 
    }); 
    HTMLElement.prototype.__defineSetter__("outerHTML",function(s) 
    { 
        var r = this.ownerDocument.createRange(); 
        r.setStartBefore(this); 
        var df = r.createContextualFragment(s); 
        this.parentNode.replaceChild(df, this); 
        return s; 
    }); 
    HTMLElement.prototype.__defineGetter__("canHaveChildren",function() 
    { 
        return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase()); 
    }); 
} 

function GetImageSize(oImage){//获得图片的原始大小

  var OriginImage=new Image();
  if(OriginImage.src!=oImage.src)OriginImage.src=oImage.src;
  return {"width":OriginImage.width, "height":OriginImage.height};
}

//var imageViewer = new ImageViewer();//dir图标的保存路径；name实例化的对象名

function checksearch()  //验证表单元素是否为空
	{
		
		if (document.myform11.keywordsname.value == "") {
			alert("关键字不能为空！");
			document.myform11.keywordsname.focus();
			return false;
			}
		return true 
}
	
function freset(obj){
   obj.reset();
    }

	function checkorder111()  //验证表单元素是否为空
	{
		
		if (document.myform.zaixianname.value == "") {
			alert("请您填写姓名！");
			document.myform.zaixianname.focus();
			return false;
			}
		if (document.myform.zaixianname4.value == "") {
			alert("请您填写电话！");
			document.myform.zaixianname4.focus();
			return false;
			}
if(document.myform.MemberMail.value.length!=0)
  		{
   	 if (document.myform.MemberMail.value.charAt(0)=="." ||        
         document.myform.MemberMail.value.charAt(0)=="@"||       
         document.myform.MemberMail.value.indexOf('@', 0) == -1 || 
         document.myform.MemberMail.value.indexOf('.', 0) == -1 || 
         document.myform.MemberMail.value.lastIndexOf("@")==document.myform.MemberMail.value.length-1 || 
         document.myform.MemberMail.value.lastIndexOf(".")==document.myform.MemberMail.value.length-1)
     {
      alert("邮件地址不正确");
      document.myform.MemberMail.focus();
      return false;
      }
   }
 else
  {
   alert("请输入邮件地址");
   document.myform.MemberMail.focus();
   return false;
   }
		if (document.myform.verifycode.value == "") {
			alert("请输入验证码！");
			document.myform.verifycode.focus();
			return false;
			}
		return true 
	}
	
//注册验证	
function CheckReg()
 {
	if (document.register.MemberName.value =="" || !document.register.MemberName.value.match( /^.+@.+$/ )) 
	{
		alert("用户名请使用正确的邮箱地址！");
		document.register.MemberName.focus();
		return false;
	}
  	if (document.register.MemberPass.value=="" || document.register.MemberPass.value.length<6 || document.register.MemberPass.value.length>12)
     {
	  alert("请输入6-12字母或者数字作为输入会员密码！");
      document.register.MemberPass.focus();	
	  return false;
     }
	if (document.register.MemberPass.value != document.register.MemberRePass.value)
	{
		alert("您两次输入的新密码不一样！请重新输入。");
		document.register.MemberRePass.focus();
		return false;
	}
	if (document.register.MemberRegCode.value=="")
	{
		alert("验证码不能为空！请输入。");
		document.register.MemberRegCode.focus();
		return false;
	}
 }
 
 function Check_Reg()  //验证表单元素是否为空
	{
	if (document.register.MemberCompany.value == "") {
		alert("请您填写公司名称！");
		document.register.MemberCompany.focus();
        return false;
	}
	if (document.register.MemberRname.value == "") {
		alert("请您填写联系人！");
		document.register.MemberRname.focus();
        return false;
	}
	if (document.register.MemberPhone.value == "" || document.register.MemberPhone.value.length != 11  ) {
		alert("请您填写正确的手机号码！");
		document.register.MemberPhone.focus();
        return false;
	}
	if (document.register.MemberMail.value =="" || !document.register.MemberMail.value.match( /^.+@.+$/ )) 
	{
		alert("请输入正确的邮箱地址");
		document.register.MemberMail.focus();
		return false;
	}
	if (document.register.MemberName.value =="" || !document.register.MemberName.value.match( /^.+@.+$/ )) 
	{
		alert("用户名请使用正确的邮箱地址");
		document.register.MemberName.focus();
		return false;
	}
  	if (document.register.MemberPass.value=="" || document.register.MemberPass.value.length<6 || document.register.MemberPass.value.length>12)
     {
	  alert("请输入6-12字母或者数字作为输入会员密码！");
      document.register.MemberPass.focus();	
	  return false;
     }
	if (document.register.MemberPass.value != document.register.MemberRePass.value)
	{
		alert("您两次输入的新密码不一样！请重新输入。");
		document.register.MemberRePass.focus();
		return false;
	}

	if (document.register.MemberRegCode.value == "") {
		alert("验证码不能为空！请输入。");
		document.register.MemberRegCode.focus();
		return false;
		}
	return true 
}
	
//tab切换
function tabShow(m,c,n,t){
	//m导航前缀名，c内容前缀名，n当前序号,t总数（比如这个切换效果有三块内容则为3）,cur为当前样式名称
	for(i=1;i<=t;i++){
		document.getElementById(m+i).className = "";
		document.getElementById(c+i).style.display = "none";
	}
	document.getElementById(m+n).className = "cur";
	document.getElementById(c+n).style.display = "block";
}

//个人会员登录检测
function CheckLog()
 {
	if ( document.form1.MemberName.value=="")
	{
		alert("用户名不能为空！请输入。");
		document.form1.MemberName.focus();
		return false;
	}
	if ( document.form1.MemberPass.value=="")
	{
		alert("密码不能为空！请输入。");
		document.form1.MemberPass.focus();
		return false;
	}
 }

//企业会员登录检测
function CheckLog2()
 {
	if ( document.form2.MemberName.value=="")
	{
		alert("用户名不能为空！请输入。");
		document.form2.MemberName.focus();
		return false;
	}
	if ( document.form2.MemberPass.value=="")
	{
		alert("密码不能为空！请输入。");
		document.form2.MemberPass.focus();
		return false;
	}
 }
//修改密码
function CheckPassword()
 {
	if ( document.Modify.MemberoldPass.value == "" )
	{
		alert("旧密码不能为空！");
		document.Modify.MemberoldPass.focus();
		return false;
	}
	if ( document.Modify.MemberPass.value == ""  )
	{
		alert("新密码不能为空！");
		document.Modify.MemberPass.focus();
		return false;
	}
	if ( document.Modify.MemberRPass.value == "" )
	{
		alert("确认新密码不能为空！");
		document.Modify.MemberRPass.focus();
		return false;
	}
	if ( document.Modify.MemberPass.value != document.Modify.MemberRPass.value)
	{
		alert("新密码和确认新密码不一致！");
		document.Modify.MemberPass.focus();
		return false;
	}
 }
 /*TAG切换*/
 function setTab03Syn ( i )
	{
		selectTab03Syn(i);
	}
	
	function selectTab03Syn ( i )
	{
		switch(i){
			case 1:
			document.getElementById("TabTab03Con1").style.display="block";
			document.getElementById("TabTab03Con2").style.display="none";
			document.getElementById("font1").style.color="#ffffff";
			document.getElementById("font2").style.color="#ffffff";
			break;
			case 2:
			document.getElementById("TabTab03Con1").style.display="none";
			document.getElementById("TabTab03Con2").style.display="block";
			document.getElementById("font1").style.color="#ffffff";
			document.getElementById("font2").style.color="#ffffff";
			break;
					}
	}
	
	
//设置page中的值
function SetValue(type,objName,ovalue)
{   type=type.toLowerCase()
    if(type=="group")
    {
        var objList=document.getElementsByName(objName);
        var len=objList.length;
        for(var i=0;i<len;i++)
        {
            if(ovalue.indexOf(objList[i].value)>-1)
                objList[i].checked=true;
        }
    }
    else if(type=="single")
    {
        var objList=document.getElementsByName(objName);
        var len=objList.length;
        for(var i=0;i<len;i++)
        {
            if(objList[i].value==ovalue)
               {
                    objList[i].checked=true;
                    break;
                }
        }
    }
    else if(type=="selectchild")
    {
        var objList=document.getElementById(objName);
        var len=objList.length;
        for(var i=0;i<len;i++)
        {
            if(objList.options[i].value==ovalue)
            {
                objList.options[i].selected = true;
                break;
            }
        }
    }
    else if(type=="all")
    {
        var objList=document.getElementsByName(objName);
        var len=objList.length;
        for(var i=0;i<len;i++)
        {            
           objList[i].checked=true;
        }        
    }
    else if(type=="escall")
    {
       var objList=document.getElementsByName(objName);
        var len=objList.length;
        for(var i=0;i<len;i++)
        {            
           objList[i].checked=false;
        }          
    }
    return false;
}

//企业简历发布检测
function CheckAddjob()
 {
	if ( document.form1.bookname.value == "" )
	{
		alert("招聘职位不能为空！");
		document.form1.bookname.focus();
		return false;
	}
	if ( document.form1.bookname2.value == ""  )
	{
		alert("招聘人数不能为空！");
		document.form1.bookname2.focus();
		return false;
	}
	if ( document.form1.bookcontent.value == "" )
	{
		alert("工作职责不能为空！");
		document.form1.bookcontent.focus();
		return false;
	}
	if ( document.form1.bookcontent1.value == "" )
	{
		alert("要求与待遇不能为空！");
		document.form1.bookcontent1.focus();
		return false;
	}
	return true 
 }
       
function copyurl()      
       {      
               strHref = window.location.href;      
               strUrl = strHref.split("?");      
               //clipBoardContent = strUrl[0];     
			   clipBoardContent = strHref; 
               if (window.clipboardData){      
                  if(window.clipboardData.setData("Text",clipBoardContent)){      
                      alert ('复制成功，请粘贴到QQ\\MSN\\电邮发送给好友');      
                  }      
               }      
               else{      
                     alert ( '您使用的浏览器不支持此功能，请到地址栏复制链接');      
               }      
      
       } 