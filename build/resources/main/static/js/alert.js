$(document).ready(function(){
		var a = "ws://localhost:23333/danmu/sub";
		if(!$(this).attr("disabled")){
		openSocket(null, a, 0);
		$(this).attr("disabled",true);
		hideGifImage();
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
			var followSound = '../audio/follow.mp3';
			var danmuSound = '../audio/danmu.mp3';
			var giftSound = '../audio/gift.mp3';
			var enterSound = '../audio/enter.mp3'

			var giftGif = '../img/gift.gif';
			var followGif = '../img/follow.gif'
			var enterGif = '../img/enter.gif'

			var data = JSON.parse(msg.data);
            if(data.cmd==="gift"){
                var audio = new Audio(giftSound);
                audio.volume = 0.005;
                audio.play();
                var str = '谢谢' + data.result.uname + '送的' + data.result.giftName + '~';
                document.getElementById("message").innerHTML = str;
                document.getElementById("gif").src = giftGif;
                showGifImage();
                setTimeout(hideGifImage, 1500)
            } else if (data.cmd === 'enter') {
                var audio = new Audio(enterSound);
                audio.volume = 0.1;
                audio.play();
                var str = data.result.uname + '进来一起来嗨了!';
                document.getElementById("message").innerHTML = str;
                document.getElementById("gif").src = enterGif;
                showGifImage();
                setTimeout(hideGifImage, 1500)
            } else if (data.cmd === 'follow') {
                var audio = new Audio(followSound);
                audio.volume = 0.1;
                audio.play();
                var str = data.result.uname + '的眼光真不错，关注了SnoringBoy~';
                document.getElementById("message").innerHTML = str;
                document.getElementById("gif").src = followGif;
                showGifImage();
                setTimeout(hideGifImage, 1500)
            } else if (data.cmd === 'danmu') {
                var audio = new Audio(danmuSound);
                audio.volume = 0.1;
                audio.play();
            } else {
                console.log('invalid cmd' + data.cmd);
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

function hideGifImage() {
    document.getElementById("giftThank").style.display="none";
}

function showGifImage() {
    document.getElementById("giftThank").style.display="block";
}