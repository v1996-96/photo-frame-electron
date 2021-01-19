// https://forismatic.com/ru/api/
export const FORISMATIC_HOST = 'https://api.forismatic.com/api/1.0/';

export const YANDEX_OAUTH_HOST = 'https://oauth.yandex.ru';
export const YANDEX_LOGIN_HOST = 'https://login.yandex.ru';
export const YANDEX_CLOUD_HOST = 'https://cloud-api.yandex.net/v1';

// https://oauth.yandex.ru/client/client_id/info
export const SCOPE = [
    'fotki:delete',
    'login:avatar',
    'fotki:read',
    'fotki:update',
    'fotki:write',
    'login:birthday',
    'cloud_api:disk.app_folder',
    'cloud_api:disk.read',
    'cloud_api:disk.write',
    'login:info',
    'cloud_api:disk.info',
];

export const SCOPE_STRING = SCOPE.concat(' ');
