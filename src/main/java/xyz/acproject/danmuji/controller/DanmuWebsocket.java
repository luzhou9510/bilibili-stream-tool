package xyz.acproject.danmuji.controller;


import java.io.IOException;
import java.nio.charset.Charset;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.alibaba.fastjson.JSONObject;
import javazoom.jl.decoder.JavaLayerException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import xyz.acproject.danmuji.service.SoundService;
import xyz.acproject.danmuji.utils.FastJsonUtils;

/**
 * @ClassName DanmuWebsocket
 * @Description TODO
 * @author BanqiJane
 * @date 2020年8月10日 下午12:21:44
 *
 * @Copyright:2020 blogs.acproject.xyz Inc. All rights reserved.
 */
@Controller
@ServerEndpoint("/danmu/sub")
public class DanmuWebsocket {
	private Logger LOGGER = LogManager.getLogger(DanmuWebsocket.class);
	private static CopyOnWriteArraySet<DanmuWebsocket> webSocketServers = new CopyOnWriteArraySet<>();
	private Session session;
	@Autowired
	private SoundService soundService;
	@Value("${my.name}")
	private String myName;
	
	@OnOpen
	public void onOpen(Session session) {
		this.session=session;
		webSocketServers.add(this);
	}
	
	@OnClose
	public void onClose() {
		webSocketServers.remove(this);
	}
	
	@OnMessage
	public void onMessage(String message) throws IOException {
		for(DanmuWebsocket danmuWebsocket:webSocketServers) {
			danmuWebsocket.session.getBasicRemote().sendText(message);
		}
	}
	
	
	@OnError
	public void onError(Session session,Throwable error) {
		LOGGER.error(error);
	}

	public void sendMessage(String message) throws IOException, JavaLayerException {
		for(DanmuWebsocket danmuWebsocket:webSocketServers) {
			synchronized (danmuWebsocket.session) {
				danmuWebsocket.session.getBasicRemote().sendText(message);
				JSONObject temp = FastJsonUtils.getAsJSONObjectFromObject(message, "result");
				if (!myName.equals(temp.get("uname"))) {
					soundService.play();
				}
			}
		}
	}
	
	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}
	
	
}
