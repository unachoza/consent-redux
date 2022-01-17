
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
        
  },
      // setAllTrue

      //SetAllFalse

      }
      
      
export const collectCookies = () => {
    
  const storageType = cookieStorage;
  const consentPropertyName = 'Ariannaoptions';
  const shouldShowPopup = () => !localStorage.getItem(consentPropertyName);
  const saveToStorage = () => localStorage.setItem(consentPropertyName, true);

  window.onload = () => { 
      
    // ReactDOM.findDOMNode(<component/>).getElementsByClassName('snap')
    // const ui = document.getElementById('consent-ui-container')
    // console.log({component})
    if (shouldShowPopup()) {
      const consent = confirm('Are you sure you want to')
      if (consent) {
        saveToStorage()
      }
      
    }
  }
}