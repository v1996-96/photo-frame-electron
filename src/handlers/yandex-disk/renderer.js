export const getResources = ({ params, token }) => {
    return window.ipcRenderer.invoke('yandex-disk/getResources', { params, token });
};
