package xyz.acproject.danmuji.service.impl;

import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.Player;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import xyz.acproject.danmuji.service.SoundService;

/**
 * @author : luzhou
 * @Description sound service implementation
 * @date : 2021-01-23
 **/
@Service
public class SoundServiceImpl implements SoundService {
    private Logger LOGGER = LogManager.getLogger(SetServiceImpl.class);
    @Value("${file.cat}")
    private String soundFile;

    @Override
    public void play() throws JavaLayerException {
        //利用了java运行时的系统属性来得到jar文件位置，也是/xxx/xxx.jar这种形式。
        ClassLoader classLoader = getClass().getClassLoader();
        Player player = new Player(classLoader.getResourceAsStream(soundFile));
        player.play();
    }
}
