function capitalizeFirstLetter(inputString) {
  return inputString.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

export default function (str) {
  /**
   * str es el contenido de la caja de texto
   * del formulario donde cada lenguaje esta separado
   * por '\r\n'
   */

  let spokenLanguages = [];
  // if no str provided we return an empty string
  if (!str) return spokenLanguages
  let LineBreak = str.split('\r\n \r\n');
  spokenLanguages = LineBreak.map(lang => capitalizeFirstLetter(lang));
  
  return spokenLanguages;
}