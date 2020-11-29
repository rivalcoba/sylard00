function setLang (lang) {
  switch (lang) {
    case 'en':
      document.cookie = 'langbisquet=en;path=/'
      break
    case 'es':
      document.cookie = 'langbisquet=es;path=/'
      break
  }
  location.reload()
}


export default {
  setLang
} 
