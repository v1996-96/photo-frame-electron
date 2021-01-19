export const setBacklight = value => {
    return window.ipcRenderer.invoke('backlight/setBacklight', value);
};
