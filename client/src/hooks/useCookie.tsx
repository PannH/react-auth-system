import Cookie from 'js-cookie'

interface ISetCookie {
   (value: string, expires: number): string;
}

interface IRemoveCookie {
   (): void;
}

function useCookie(key: string): { value: string, set: ISetCookie, remove: IRemoveCookie } {

   return {
      get value() {
         return Cookie.get(key);
      },
      set(val, expires) {
         return Cookie.set(key, val, { expires });
      },
      remove() {
         return Cookie.remove(key);
      }
   }

}

export default useCookie;