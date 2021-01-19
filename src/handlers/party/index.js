import { ipcMain } from 'electron';
import fg from 'fast-glob';
import path from 'path';
import { randomItem } from '../../utils/list';

export const getPartyHandler = async () => {
    // eslint-disable-next-line no-undef
    const result = await fg(path.join(__static, '**/*.gif'), { cwd: __dirname });
    const randomParrot = randomItem(result || []);

    if (!randomParrot) {
        return null;
    }

    // eslint-disable-next-line no-undef
    return randomParrot.replace(__static, '');
};

export const setup = () => {
    ipcMain.handle('party/getParty', getPartyHandler);
};
