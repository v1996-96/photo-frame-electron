import { ipcMain } from 'electron';
import axios from 'axios';
import { YANDEX_LOGIN_HOST } from '../../config/api';
import { camelizeOptions, getAuthHeaders } from '../../utils/axios';

export const getAccountHandler = async (_, token) => {
    const { data } = await axios.get(`${YANDEX_LOGIN_HOST}/info`, {
        ...camelizeOptions,
        params: { format: 'json' },
        headers: getAuthHeaders(token),
    });

    return data;
};

export const setup = () => {
    ipcMain.handle('yandex-login/getAccount', getAccountHandler);
};
