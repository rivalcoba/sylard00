// Importando los estilos
import './styles/main.css';
// Importando Scripts
//import greeting from '@chelpers/greeting'
import flashmsg from '@chelpers/flashMessage'
// Setting language helper
import myI18n from '@chelpers/myI18n'
//
import formsManager from '@chelpers/formsManager'

// Loading function to the global variable
//window.greeting = greeting
window.myI18n = myI18n
window.formsManager = formsManager

// Flashea mensaje si lo hay
flashmsg()