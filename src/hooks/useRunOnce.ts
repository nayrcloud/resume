import { useRef, useEffect, useLayoutEffect } from 'react';

/**
 * Ensures the function passed as an argument is only executed once during the callers lifetime.
 */
export function useRunOnce<T>(fn: () => T, layoutEffect = false) {
    const hasRun = useRef(false);

    const effect = layoutEffect ? useLayoutEffect : useEffect;

    effect(() => {
        if (!hasRun.current) {
            fn();
            hasRun.current = true;
        }
    }, []);
}
