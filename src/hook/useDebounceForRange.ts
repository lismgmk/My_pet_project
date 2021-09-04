import { useState, useEffect} from 'react';

export default function useDebounceForRange (value: any, delay: any) {

   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(
       () => {
          // Обновить отклоненное значение после задержки
          const handler = setTimeout(() => {
             setDebouncedValue(value);
          }, delay);

          // Отменяем тайм-аут при изменении значения (также при изменении задержки или отключении)
          // Вот как мы предотвращаем обновление отклоненного значения при изменении значения ...
          // .. в период задержки. Тайм-аут очищается и перезапускается.
          return () => {
             clearTimeout(handler);
          };
       },
       [value, delay] // Эффект повторного вызова только при изменении значения или задержки
   );

   return debouncedValue;
}