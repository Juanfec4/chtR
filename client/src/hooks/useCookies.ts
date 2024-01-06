const useCookies = () => {
  //Save new cookie
  const saveCookie = (key: string, value: string, expires: Date) => {
    const expiresString = expires.toUTCString();
    document.cookie = `${key}=${value}; expires=${expiresString}; path=/`;
  };

  //Get a cookie by key
  const getCookie = (key: string): string | null => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey === key) {
        return cookieValue;
      }
    }
    return null;
  };

  //Clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
  };

  return { saveCookie, getCookie, clearAllCookies };
};
export default useCookies;
