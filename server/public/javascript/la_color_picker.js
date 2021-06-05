
var checker_mouse =false;
var colorInput = document.getElementById("colorPicker");
var colorPalette = document.getElementById("colorPalette");
function color_pickerstart(id_color,id_paleta){
  //this.colorInput=document.getElementById(id_color);
 // this.colorPalette=document.getElementById(id_paleta);
  console.log(id_color);
  console.log(id_paleta);
  //showColorPalette();
}
//colorInput.addEventListener("click", showColorPalette);
//colorInput.addEventListener("focusout", hideColorPalette);
function color_picker_out(id_color,id_paleta){
  this.colorInput=document.getElementById(id_color);
  this.colorPalette=document.getElementById(id_paleta);
 if(checker_mouse == false) {
  colorPalette.style.display = 'none';
 }
}
//colorPalette.mouseIsOver = false;
//colorInput.style.borderRight =  `10px solid ${colorInput.value}`;


colorPalette.onmouseover = () => {
  colorPalette.mouseIsOver = true;
};
colorPalette.onmouseout = () => {
  colorPalette.mouseIsOver = false;
}

function hideColorPalette() {
      
        colorPalette.style.display = 'none';
      
    

}

function chooseColor(e,speaker,tierID) {
  let color = rgbToHex(e.target.style.backgroundColor);
  colorInput.value = color;
  colorInput.style.borderRight =  `2rem solid ${color}`;
  colorPalette.style.display = 'none';
  var searcher="color-"+tierID;
  var color2= document.getElementById(searcher).value;
  var keyID = "key-" + tierID;
  var selColor = color2;
  document.getElementById(keyID).style.color = selColor;
  var clean_color= color2.replace("#","");

  //console.log(clean_color);
  tierArr[speaker].tiers[tierID].color = clean_color;
  
  setData();
      restartPlayer();
      setTranscriptionBox();
      setPlayer();
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  arr = color.replace('rgb', '').replace('(', '').replace(')', '').split(',');
  return "#" + componentToHex(Number(arr[0])) + componentToHex(Number(arr[1])) + componentToHex(Number(arr[2]));
}

function showColorPalette() {
  colorPalette.style.display = 'block';

}

function check_in_palette(){
 checker_mouse=true;
//console.log("in")
}
function check_out_palette(){
  checker_mouse=false;
//console.log("out");
}