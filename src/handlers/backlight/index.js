import { ipcMain } from 'electron';
// import isPi from 'detect-rpi';
import { clamp } from '../../utils/number';

// const isGPIOAvailable = process.env.NODE_ENV === 'production' && isPi();
const isGPIOAvailable = false;
const { Gpio } = isGPIOAvailable ? require('pigpio') : require('./mock');
const RANGE = 1000;
const backlight = new Gpio(18, { mode: Gpio.OUTPUT });

// Set defaults
backlight.pwmFrequency(1000);
backlight.pwmRange(RANGE);

export const setBacklightHandler = (_, value) => {
    backlight.pwmWrite(clamp(value, 0, RANGE));
};

export const setup = () => {
    ipcMain.handle('backlight/setBacklight', setBacklightHandler);
};
