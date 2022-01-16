
const cookieStorage = {
    getItem: (item) => {
          const cookies = document.cookie
              .split(';')
              .map(cookie => cookie.split('='))
              .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
          return cookies[item];
      },
      setItem: (item, value) => {
            document.cookie = `${item}=${value};`
        }
      }
      
      
      
      export const words = 'these workds '
      
export const collectCookies = () => {
    
  const storageType = cookieStorage;
  const consentPropertyName = 'Ariannaoptions';
  const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
  const saveToStorage = () => storageType.setItem(consentPropertyName, true);

  window.onload = () => { 
    console.log({words})
    if (shouldShowPopup()) {
      const consent = confirm('Are you sure you want to')
      if (consent) {
        saveToStorage()
      }
      
    }
  }
}