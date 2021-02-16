package xyz.acproject.danmuji.service;

import javazoom.jl.decoder.JavaLayerException;

import java.io.FileNotFoundException;

public interface SoundService {
    void play() throws FileNotFoundException, JavaLayerException;
}
