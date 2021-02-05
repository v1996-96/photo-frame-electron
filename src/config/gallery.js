import shuffle from 'lodash.shuffle';

export const VIEW_ORDER = {
    default: 'default',
    random: 'random',
};

export const VIEW_ORDER_LIST = [
    { label: 'По умолчанию', value: VIEW_ORDER.default },
    { label: 'Рандомно', value: VIEW_ORDER.random },
];

export const VIEW_ORDER_HANDLERS = {
    [VIEW_ORDER.default]: images => images,
    [VIEW_ORDER.random]: images => shuffle(images),
};
