import { useCallback, useEffect, useRef } from "react";

const useIdleTimer = (logoutCallback: () => void, timeout: number) => {
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = useCallback(() => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(logoutCallback, timeout);
    }, [logoutCallback, timeout]);

    useEffect(() => {
        const events: Array<keyof WindowEventMap> = ["mousemove", "keydown", "scroll"];
        const handleEvent = () => resetTimer();

        events.forEach((event) => window.addEventListener(event, handleEvent));

        resetTimer();

        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            events.forEach((event) => window.removeEventListener(event, handleEvent));
        };
    }, [resetTimer]);

    return resetTimer;
};

export default useIdleTimer;
