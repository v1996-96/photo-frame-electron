import { session, ipcMain } from 'electron';
import axios from 'axios';
import { YANDEX_CLOUD_HOST } from '../../config/api';
import { getAuthHeaders, camelizeOptions } from '../../utils/axios';

const PREVIEW_URL = 'https://downloader.disk.yandex.ru/preview/*';

export const getResourcesHandler = async (_, { params, token }) => {
    const { data } = await axios.get(`${YANDEX_CLOUD_HOST}/disk/resources`, {
        ...camelizeOptions,
        params,
        headers: getAuthHeaders(token),
    });

    return data;
};

export const setup = () => {
    ipcMain.handle('yandex-disk/getResources', getResourcesHandler);

    session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: [PREVIEW_URL] },
        (details, callback) => {
            const url = new URL(details.url);

            const requestHeaders = {
                ...details.requestHeaders,
                ...getAuthHeaders(url.searchParams.get('token')),
            };

            // TODO удалить token из url запроса
            callback({ requestHeaders });
        },
    );
};
