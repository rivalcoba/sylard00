// Es usado en register.hbs para 
// agregar lenguas
function addSelection(){
    // Getting some references
    let langSearchBox = document.getElementById('langSearch')
    let selectedLanguagesBox = document.getElementById('spokenLanguages')
    // Getting values
    let language = langSearchBox.value
    
    let separator = ','
    if(selectedLanguagesBox.value.length == 0)
    separator = ''    
    selectedLanguagesBox.value = selectedLanguagesBox.value.concat(separator, language)    
  }
export default {
    addSelection
}