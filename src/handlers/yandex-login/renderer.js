export const getAccount = token => {
    return window.ipcRenderer.invoke('yandex-login/getAccount', token);
};
