import { useEffect, useRef } from "react";

const useIdleTimer = (logoutCallback: () => void, timeout: number) => {
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(logoutCallback, timeout);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "scroll"];
        const handleEvent = () => resetTimer();

        events.forEach((event) => window.addEventListener(event, handleEvent));

        resetTimer();

        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            events.forEach((event) => window.removeEventListener(event, handleEvent));
        };
    }, [logoutCallback, timeout]);

    return resetTimer;
};

export default useIdleTimer;
