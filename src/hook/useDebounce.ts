import {useCallback, useRef} from "react";


export function useDebounce<F extends ((...args: any) => any)>(
   callback: F, delay: number
) {
   const timer = useRef<any>();

   return useCallback((...args) => {
      if (timer.current) {
         clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
         callback(...args)
      }, delay)
   }, [callback, delay]);
}