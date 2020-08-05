function setLang (lang) {
  switch (lang) {
    case 'en':
      document.cookie = 'langbisquet=en'
      break
    case 'es':
      document.cookie = 'langbisquet=es'
      break
  }
  location.reload()
}


export default {
  setLang
} 
