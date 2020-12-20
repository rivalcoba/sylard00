export default function (){
  var colorInput = document.getElementById('colorPicker');
  var colorPalette = document.getElementById('colorPalette');
  colorInput.addEventListener("click", showColorPalette);
  colorInput.addEventListener("focusout", hideColorPalette);
  colorPalette.mouseIsOver = false;
  colorInput.style.borderRight =  `2rem solid ${colorInput.value}`;
  
  colorPalette.onmouseover = () => {
    colorPalette.mouseIsOver = true;
  };
  colorPalette.onmouseout = () => {
    colorPalette.mouseIsOver = false;
  }
  
  function hideColorPalette() {
    if(colorPalette.mouseIsOver === false) {
      colorPalette.style.display = 'none';
      colorInput.style.borderRight =  `2rem solid ${colorInput.value}`;
    }
  }
  
  function chooseColor(e) {
    let color = rgbToHex(e.target.style.backgroundColor);
    colorInput.value = color;
    colorInput.style.borderRight =  `2rem solid ${color}`;
    colorPalette.style.display = 'none';
  }
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(color) {
    let arr = color.replace('rgb', '').replace('(', '').replace(')', '').split(',');
    return "#" + componentToHex(Number(arr[0])) + componentToHex(Number(arr[1])) + componentToHex(Number(arr[2]));
  }
  
  function showColorPalette() {
    colorPalette.style.display = 'block';
    var newDiv = '<div class="color-option" style="background-color:#000000" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#666666" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#999999" onclick="chooseColor(event)"></div><div class="color-option_more_margin" style="background-color:#1B227E" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#123EB7" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#0086CC" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#166404" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#00861F" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#75C30C" onclick="chooseColor(event)"></div><div class="color-option_more_margin" style="background-color:#810707" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#C60000" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#F74E4E" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#624504" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#AC7802" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#DDB200" onclick="chooseColor(event)"></div><div class="color-option_more_margin" style="background-color:#540F72" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#782FA5" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#A458BF" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#A33E19" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#DD6600" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#FF9300" onclick="chooseColor(event)"></div><div class="color-option_more_margin" style="background-color:#135C6E" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#15C1D1" onclick="chooseColor(event)"></div><div class="color-option" style="background-color:#7ECEDE" onclick="chooseColor(event)"></div>';
    colorPalette.innerHTML = newDiv;
  }
} 