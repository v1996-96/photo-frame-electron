export const toggleFullscreen = () => {
    return window.ipcRenderer.invoke('fullscreen/toggleFullscreen');
};
