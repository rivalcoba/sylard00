// Importando los estilos
import './styles/main.css';
// Importando Scripts
//import greeting from '@chelpers/greeting'
import flashLib from '@chelpers/flashLib'
// Setting language helper
import myI18n from '@chelpers/myI18n'
// Admin the register form
import formsManager from '@chelpers/formsManager'
// Admin for view
import locations from '@client/pages/locations'
// Collections Create Scripts
import collectionsCreate from '@client/pages/collections/create'

// Loading function to the global variable
//window.greeting = greeting
window.myI18n = myI18n
window.formsManager = formsManager
window.locations = locations

if(window.location.pathname == `/collections/create`){
    window.pageScripts = collectionsCreate
}

// Flashea mensaje si lo hay
flashLib.flashManager()