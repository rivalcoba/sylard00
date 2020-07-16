// Importando los estilos
import './styles/main.css';

// Script Test
const root = document.createElement("div")
root.innerHTML = `<p>Hello Webpack.</p>`
document.body.appendChild(root)

window.foo = function(){alert("hola")}