import { ipcMain } from 'electron';
import axios from 'axios';
import qs from 'qs';
import { SCOPE_STRING, YANDEX_OAUTH_HOST } from '../../config/api';
import { camelizeOptions } from '../../utils/axios';

const client = axios.create({
    baseURL: YANDEX_OAUTH_HOST,
});

export const getCodeHandler = async (_, { clientId, deviceId, deviceName }) => {
    const { data } = await client.post(
        '/device/code',
        qs.stringify({
            client_id: clientId,
            device_id: deviceId,
            device_name: deviceName,
            scope: SCOPE_STRING,
        }),
        camelizeOptions,
    );

    return data;
};

export const getTokenHandler = async (_, { deviceCode, clientId, clientSecret }) => {
    const { data } = await client.post(
        '/token',
        qs.stringify({
            grant_type: 'device_code',
            code: deviceCode,
            client_id: clientId,
            client_secret: clientSecret,
        }),
        camelizeOptions,
    );

    return data;
};

export const setup = () => {
    ipcMain.handle('yandex-auth/getCode', getCodeHandler);
    ipcMain.handle('yandex-auth/getToken', getTokenHandler);
};
