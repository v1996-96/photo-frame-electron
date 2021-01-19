export const getQuote = () => {
    return window.ipcRenderer.invoke('forismatic/getQuote');
};
