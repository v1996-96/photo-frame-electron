import { ipcMain } from 'electron';
import ipcNode from 'node-ipc';

const ELECTRON_PROCESS_ID = 'photo-frame-electron';
const RPI_PROCESS_ID = 'photo-frame-rpi';

export const setup = () => {
    ipcNode.config.id = ELECTRON_PROCESS_ID;
    ipcNode.config.retry = 1500;

    ipcNode.connectTo(RPI_PROCESS_ID);

    ipcMain.handle('backlight/setBacklight', (_, value) => {
        ipcNode.of[RPI_PROCESS_ID].emit('message', { type: 'setBacklight', payload: value });
    });
};
