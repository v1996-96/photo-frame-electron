export const getCode = ({ clientId, deviceId, deviceName }) => {
    return window.ipcRenderer.invoke('yandex-auth/getCode', { clientId, deviceId, deviceName });
};

export const getToken = ({ deviceCode, clientId, clientSecret }) => {
    return window.ipcRenderer.invoke('yandex-auth/getToken', {
        deviceCode,
        clientId,
        clientSecret,
    });
};
