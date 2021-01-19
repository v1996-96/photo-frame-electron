import { ipcMain } from 'electron';

export const toggleFullscreenHandler = win => () => {
    win.setFullScreen(!win.isFullScreen());
};

export const setup = win => {
    ipcMain.handle('fullscreen/toggleFullscreen', toggleFullscreenHandler(win));
};

export const destroy = () => {
    ipcMain.removeHandler('fullscreen/toggleFullscreen');
};
