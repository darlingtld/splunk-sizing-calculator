import {random} from 'lodash';

export const isPositiveNumber = (value) => {
    const number = parseInt(value);
    return !Number.isNaN(number) && number > 0;
};

export const isPositiveZeroNumber = (value) => {
    const number = parseInt(value);
    return !Number.isNaN(number) && number >= 0;
};

export const getRandomTransitionAnimation = () => {
    const animation = [
        'scale',
        'fade',
        'fade up',
        'fade down',
        'fade left',
        'fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right', 'fly up', 'fly down',
        'swing left', 'swing right', 'swing up', 'swing down', 'browse', 'browse right', 'slide down', 'slide up', 'slide right', 'jiggle',
        'flash', 'shake', 'pulse', 'tada', 'bounce'];
    // return animation[random(animation.length - 1)];
    return 'fade up';
}