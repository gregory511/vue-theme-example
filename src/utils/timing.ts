// code extrait de https://tech.reverse.hr/articles/debounce-function-in-typescript

export const throttle = <T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number,
) => {
    let isWaiting = false;

    return (...args: T) => {
        if (isWaiting) {
            return;
        }

        callback(...args);
        isWaiting = true;

        setTimeout(() => {
            isWaiting = false;
        }, delay);
    };
};


export const debounce = <T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number,
) => {
    let timeoutTimer: ReturnType<typeof setTimeout>;

    return (...args: T) => {
        clearTimeout(timeoutTimer);

        timeoutTimer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};
