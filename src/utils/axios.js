import humps from 'humps';
import { is } from 'ramda';
import axiosDefaults from 'axios/lib/defaults';

export const camelizeOptions = {
    transformResponse: [
        ...axiosDefaults.transformResponse,
        data => (is(Object, data) && humps.camelizeKeys(data)) || data,
    ],
};

export const getAuthHeaders = token => ({
    Authorization: `OAuth ${token}`,
});
