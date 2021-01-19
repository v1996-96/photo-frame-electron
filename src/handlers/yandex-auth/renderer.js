export const getCode = () => {
    return window.ipcRenderer.invoke('yandex-auth/getCode');
};

export const getToken = deviceCode => {
    return window.ipcRenderer.invoke('yandex-auth/getToken', deviceCode);
};
