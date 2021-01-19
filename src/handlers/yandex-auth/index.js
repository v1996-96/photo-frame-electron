import { ipcMain } from 'electron';
import axios from 'axios';
import qs from 'qs';
import { SCOPE_STRING, YANDEX_OAUTH_HOST } from '../../config/api';
import { camelizeOptions } from '../../utils/axios';

const { YA_CLIENT_ID, YA_CLIENT_SECRET, YA_DEVICE_ID, YA_DEVICE_NAME } = process.env;

const client = axios.create({
    baseURL: YANDEX_OAUTH_HOST,
});

export const getCodeHandler = async () => {
    const { data } = await client.post(
        '/device/code',
        qs.stringify({
            client_id: YA_CLIENT_ID,
            device_id: YA_DEVICE_ID,
            device_name: YA_DEVICE_NAME,
            scope: SCOPE_STRING,
        }),
        camelizeOptions,
    );

    return data;
};

export const getTokenHandler = async (_, deviceCode) => {
    const { data } = await client.post(
        '/token',
        qs.stringify({
            grant_type: 'device_code',
            code: deviceCode,
            client_id: YA_CLIENT_ID,
            client_secret: YA_CLIENT_SECRET,
        }),
        camelizeOptions,
    );

    return data;
};

export const setup = () => {
    ipcMain.handle('yandex-auth/getCode', getCodeHandler);
    ipcMain.handle('yandex-auth/getToken', getTokenHandler);
};
