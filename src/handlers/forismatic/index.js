import { ipcMain } from 'electron';
import axios from 'axios';
import qs from 'qs';
import { FORISMATIC_HOST } from '../../config/api';

export const getQuoteHandler = async () => {
    const { data } = await axios.post(
        FORISMATIC_HOST,
        qs.stringify({ method: 'getQuote', format: 'json', lang: 'ru' }),
    );

    return data;
};

export const setup = () => {
    ipcMain.handle('forismatic/getQuote', getQuoteHandler);
};
