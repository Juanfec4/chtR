const useCookies = () => {
  //Save new cookie
  const saveCookie = (key: string, value: string) => {
    document.cookie.concat(`${key}=${value};`);
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
  const clearCookies = () => {
    document.cookie = "";
  };

  return { saveCookie, getCookie, clearCookies };
};
export default useCookies;
