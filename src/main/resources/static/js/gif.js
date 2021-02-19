$(document).ready(function(){
		var a = "ws://localhost:23333/danmu/sub";
		if(!$(this).attr("disabled")){
		openSocket(null, a, 0);
		$(this).attr("disabled",true);
		hideGiftThank();
	}
});

function openSocket(socket,ip,sliceh) {
	if (typeof (WebSocket) == "undefined") {
		alert("您的浏览器不支持WebSocket，显示弹幕功能异常，请升级你的浏览器版本，推荐谷歌，网页显示弹幕失败 但不影响其他功能使用");
	} else {
		console.log("弹幕服务器正在连接");
		var socketUrl = ip;
		if (socket != null) {
			socket.close();
			socket = null;
		}
		try {
		socket = new WebSocket(socketUrl);
		} catch(err) {
			console.log(err);
		}
		// 打开事件
		socket.onopen = function() {
			console.log("连接已打开");
		};
		// 获得消息事件
		socket.onmessage = function(msg) {
			// 发现消息进入 开始处理前端触发逻辑
			var data = JSON.parse(msg.data);
            if(data.cmd==="gift"){
                showGiftThank();
                var str = '谢谢' + data.result.uname + '送的' + data.result.giftName + '~';
                document.getElementById("message").innerHTML = str;
                setTimeout(hideGiftThank, 1500)
            }

		};
		// 关闭事件
		socket.onclose = function() {
			console.log("连接已关闭，网页显示弹幕失败 但不影响其他功能使用");
		};
		// 发生了错误事件
		socket.onerror = function() {
			console.log("连接到弹幕服务器发生了错误，网页显示弹幕失败 但不影响其他功能使用");
		}
	}
}

function hideGiftThank() {
    document.getElementById("giftThank").style.display="none";
}

function showGiftThank() {
    document.getElementById("giftThank").style.display="block";
}