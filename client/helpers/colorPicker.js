/* eslint-disable no-undef */

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  let arr = color.replace('rgb', '').replace('(', '').replace(')', '').split(',');
  return "#" + componentToHex(Number(arr[0])) + componentToHex(Number(arr[1])) + componentToHex(Number(arr[2]));
}

function chooseColor(e, participant) {

  const picker = e.target.getAttribute('data-picker')
  const palette = e.target.getAttribute('data-palette')

  let colorInput = document.getElementById(picker) || document.querySelector(`input[data-did='${picker}']`)
  let colorPalette = document.getElementById(palette) || document.querySelector(`div[data-did='${palette}']`)
  
  let color = rgbToHex(e.target.style.backgroundColor);
  let tierIndex = Number(picker.substring(1).split('-')[0])-1;
  console.log(`<CpickerJS > Picker: ${tierIndex}`);
  console.log(`<CpickerJS > participant: ${participant}`);
  if(vm.$children[0].$children[0]){
    vm.$children[0].$children[0].audioannotations[tierIndex].color = color;
  }else{
    // Modifica el valor del color directamente en el
    // Componente de Vue solo si el index no es mayor
    // al tamaño de tiers, en caso de ser mayo, entonces
    // se trata del componente virtual
    if(tierIndex > vm.$children[0].tier_acomodado.length){
      colorInput.value = color;
      // Actualiza todos los tiers del participante
      for (var indice in vm.$children[0].tier_acomodado) {
        if (vm.$children[0].tier_acomodado[indice].PARTICIPANT == participant) {
          vm.$children[0].tier_acomodado[indice].color = color;
        }
      }
    }else{
      vm.$children[0].tier_acomodado[tierIndex].color = color;
    }
  }
  colorInput.style.borderRight = `2rem solid ${color}`;
  colorPalette.style.display = 'none';
}

function showColorPalette(colorPickerId, colorPaletteId, participant) {    
  let colorInput = document.getElementById(colorPickerId) || document.querySelector(`input[data-did='${colorPickerId}']`)
  let colorPalette = document.getElementById(colorPaletteId) || document.querySelector(`div[data-did='${colorPaletteId}']`)

  colorPalette.onmouseover = () => {
    colorPalette.mouseIsOver = true;
  };
  colorPalette.onmouseout = () => {
    colorPalette.mouseIsOver = false;
  }

  colorPalette.mouseIsOver = false;
  colorInput.style.borderRight =  `2rem solid ${colorInput.value}`;

  window.chooseColor = chooseColor
  colorPalette.style.display = 'block';
  var newDiv = `<div class="color-option" style="background-color:#000000" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#666666" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#999999" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option_more_margin" style="background-color:#1B227E" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#123EB7" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#0086CC" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#166404" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#00861F" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#75C30C" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option_more_margin" style="background-color:#810707" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#C60000" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#F74E4E" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#624504" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#AC7802" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#DDB200" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option_more_margin" style="background-color:#540F72" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#782FA5" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#A458BF" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#A33E19" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#DD6600" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#FF9300" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option_more_margin" style="background-color:#135C6E" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#15C1D1" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div><div class="color-option" style="background-color:#7ECEDE" onclick="chooseColor(event,'${participant}')" data-picker="${colorPickerId}" data-palette="${colorPaletteId}"></div>`;
  colorPalette.innerHTML = newDiv;
}

function hideColorPalette(colorPickerId, colorPaletteId) {
  let colorInput = document.getElementById(colorPickerId) || document.querySelector(`input[data-did='${colorPickerId}']`)
  let colorPalette = document.getElementById(colorPaletteId) || document.querySelector(`div[data-did='${colorPaletteId}']`)
  if(colorPalette.mouseIsOver === false) {
    colorPalette.style.display = 'none';
    colorInput.style.borderRight =  `2rem solid ${colorInput.value}`;
  }
}

export default{
  showColorPalette,
  hideColorPalette,
}
