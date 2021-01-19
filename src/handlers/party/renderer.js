export const getParty = () => {
    return window.ipcRenderer.invoke('party/getParty');
};
