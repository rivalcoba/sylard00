import flashLib from '@chelpers/flashLib'
import Swal from 'sweetalert2'

// Es usado en register.hbs para
// agregar lenguas
function clearLastSelection() {
  // Adding the separator
  let separator = '\n'
  let selectedLanguages = document.getElementById('spokenLanguages').value
  let indices = []
  // Se obtienen los indices de todos los separadores
  let idx = selectedLanguages.indexOf(separator)
  while (idx != -1) {
    indices.push(idx)
    idx = selectedLanguages.indexOf(separator, idx + 1)
  }
  // Check if is only one element selected
  if (indices.length == 0) {
    document.getElementById('spokenLanguages').value = ''
  } else {
    document.getElementById('spokenLanguages').value = selectedLanguages.slice(
      0,
      indices[indices.length - 1]
    )
  }
  flashLib.showFlashMesage('success', `Se ha removido con éxito`)
}
function addSelection() {
  // Adding the separator
  let separator = '\n'
  // Getting some references
  let langSearchBox = document.getElementById('langSearch')
  let selectedLanguagesBox = document.getElementById('spokenLanguages')

  // Getting values
  let language = langSearchBox.value
  langSearchBox.value = ''

  // Extracting the language name
  //language = language.split(' | ')[0]
  selectedLanguagesBox.value = selectedLanguagesBox.value.trim()
  // Check if added prevously
  if (selectedLanguagesBox.value.indexOf(language) >= 0) {
    return flashLib.showFlashMesage('error', `Lenguaje ya seleccionado`)
  }

  // Adding the separator
  if (selectedLanguagesBox.value.length == 0) separator = ''

  selectedLanguagesBox.value = selectedLanguagesBox.value.concat(
    separator,
    language
  )
  flashLib.showFlashMesage('success', `Se ha agregado ${language} con éxito`)
}
async function showTerms() {
  let result = await Swal.fire({
    backdrop: 'true',
    // title: 'Términos y condiciones',
    icon: 'warning',
    html:
      '<h2 class="llamada sa_title">Terminos y condiciones</h2>' +
      '<h4>Antes de continuar debes aceptar nuestras politicas:</h4>' +
      '<div class="sa_div_scroll_text"><h3 class="sa_titulo_h3">Mesolex: SYLARD es un portal de acceso libre con dos objetivos principales:</h3><p>Proporcionar a los Colaboradores la herramienta SYLARD, qué a partir de un archivo ELAN genere una página HTML con reproducción de audio línea por línea y cualquier anotación codificada por tiempo y ofrecer acceso libre a grabaciones de audio y transcripciones codificadas por tiempo, de narrativas y conversaciones en lenguas amenazadas.</p><p>Proporcionar a Visitantes un portal a través del cual puedan acceder a éste material, que de otro modo sería difícil ya que requeriría la descarga de archivos de audio y ELAN, la instalación local de ELAN y vincular el archivo ELAN al audio. Este proceso no es amigable con el público potencialmente interesado pero no especializado.</p><h3 class="sa_titulo_h3">Registro</h3><p>Al registrarse, el Visitante o Colaborador certifica que ha leído y aceptado los Términos y Condiciones listados abajo. Se requiere que Visitantes y Colaboradores proporcionen con veracidad su nombre y apellidos, su correo electrónico y su país de origen. Los primeros tres elementos se utilizan sólo para administrar la cuenta. El último elemento es para apoyar a la administración de SYLARD a comprender la distribución geográfica de las personas registradas, datos que serán de utilidad para futuras solicitudes de financiamiento. Ninguno de estos datos se compartirán de ninguna manera y todas las estadísticas (por ejemplo distribución geográfica) se mantendrán en el anonimato.</p><p>Durante el registro, Mesolex: SYLARD también ofrece a los Visitantes y Colaboradores la opción de proporcionar tres conjuntos adicionales de información: (1) una declaración personal, (2) idiomas hablados, (3) lengua(s) de interés (por ejemplo para investigación o una lengua que era de sus antepasados). Esta información sólo se utilizara internamente para comprender mejor la naturaleza del público al que llega este portal y planificar mejor los futuros desarrollos. Todos los usuarios pueden escribir directamente a Mesolex en cualquier momento (mesolex.director@gmail.com). Todos los intercambios son confidenciales.</p><h3 class="sa_titulo_h3">Licencia de uso</h3><p>Mesolex: SYLARD no adquiere los derechos de autor de ningún material disponible a través de su portal. De manera predeterminada, los derechos de las grabaciones permanecen con el Colaborador u otra persona a quien designa. Al hacer disponible el material a través de Mesolex: SYLARD, los Colaboradores reconocen que el material se obtuvo de manera ética y que se respetaron los derechos de propiedad intelectual de los hablantes y de las comunidades. De forma predeterminada, todos los materiales disponibles a través de Mesolex: SYLARD están cubiertos por la licencia Creative Commons BY-NC-SA    , la cual requiere atribución (ver Formato de cita con cada colección), prohíbe su uso comercial, y obliga a que cualquier mejora o transformación del material sea compartido bajo la misma licencia tal como el original.</p><p>El Uso Legítimo incluye lo siguiente:</p><p>Las grabaciones y anotaciones se pueden utilizar con fines académicos, educativos o de enseñanza, siempre que dicho uso se ofrezca sin costo o remuneración.</p><p>Las grabaciones y anotaciones pueden ser analizadas para su inclusión en estudios académicos citando adecuadamente la fuente original (en este caso, una colección y grabación/texto específico de Mesolex: SYLARD).</p><p>Cuando su uso no afecte negativamente la propiedad intelectual o los derechos morales del material del idioma o de los hablantes.</p><h3 class="sa_titulo_h3">Al registrarme como Visitante certifico qué:</h3><p>Soy la persona nombrada en el formulario, el nombre registrado es mi verdadero nombre y soy legalmente capaz de aceptar estos términos;</p><p>Usaré los materiales sólo para investigación privada o educativa no comercial y seguiré la licencia de Creative Commons como se indicó anteriormente.</p><p>No transferiré este material a otras partes interesadas, les pediré que se registren en Mesolex: SYLARD para documentar su aceptación de los términos aquí presentados;</p><p>Si los materiales se utilizan en alguna publicación, los citaré como se establece en cada colección. Si se citan o utilizan materiales de Mesolex: SYLARD, agradeceríamos que nos notificaran para poder documentar el impacto de este portal.</p><p>No utilizare el material de Mesolex: SYLARD de ninguna manera que pueda considerarse irrespetuosa o dañina.</p><p>He leído y acepto estas condiciones.</p><p>Mediante el acto de registro, certifico que he leído y acepto los términos y condiciones para los Visitantes.</p><h3 class="sa_titulo_h3">Al registrarme como Colaborador certifico qué:</h3><p>Soy la persona nombrada en el formulario, el nombre registrado es mi verdadero nombre y soy legalmente capaz de aceptar estos términos;</p><p>Tengo los derechos y permisos para difundir el audio, la transcripción, la traducción o cualquier anotación a través del portal Mesolex: SYLARD;</p><p>No cedo a Mesolex: SYLARD los derechos para transferir cualquier parte de la colección a otro archivo o institución.</p><p>No cedo a Mesolex: SYLARD ningún derecho de autor sobre la colección</p><p>No hare responsable a Mesolex: SYLARD por el uso indebido de los materiales en la colección por parte de un Visitante;</p><p>Proporcionaré a Mesolex: SYLARD un formato de cita para las grabaciones y transcripciones incluidas en la colección en el cual se mencionara a Mesolex: SYLARD como sede;</p><p>Actualizaré cualquier cambio en la información de contacto y responderé a cualquier consulta que pueda surgir con respecto a la colección.</p><p>Asumo toda la responsabilidad de haber procedido de manera ética, incluida la obtención de cualquier aprobación requerida por IRB en la institución de origen y los permisos adecuados de los hablantes y, si es necesario, de las Comunidades involucradas para difundir el material cargado a través de Mesolex: SYLARD.</p><p>Mediante el acto de registro, certifico que he leído y acepto los términos y condiciones para los Colaboradores.</p><h3 class="sa_titulo_h3">Ubicación de audios</h3><p>Ubicación de archivos mp3: Para hacer uso del programa y portal de Mesolex: SYLARD, un Colaborador debe tener un audio en fomato mp3 en un servidor seguro (https). Si esto no es posible, comuníquese con el director de Mesolex: SYLARD para posibles alternativas.</p><h3 class="sa_titulo_h3">Proceso de registro</h3><p>Una vez que un Colaborador se haya registrado, Mesolex: SYLARD se pondrá en contacto con él para planificar el proceso de su material.</p><h3 class="sa_titulo_h3">Responsabilidades de Mesolex: SYLARD</h3><p>Mesolex: SYLARD es una unidad dentro de Mesolex: Recursos Lexicosemánticos para Lenguas Mesoamericanas, una iniciativa apoyada por el National Endowment for the humanities, Oficina de Humanidades Digitales para difundir léxicos, gramáticas y corpora de lenguas Mesoamericanas a una amplia gama de posibles interesados: Comunidades e investigadores indígenas, estudiantes y hablantes; académicos occidentales; y el público en general. Los acuerdos éticos con los hablantes y comunidades son responsabilidad del Colaborador quien, al aceptar los Términos y Condiciones para Colaboradores, asume la responsabilidad de trabajar de manera ética y obtener el consentimiento informado adecuado.</p><h3 class="sa_titulo_h3">Ayude a documentar la utilidad de Mesolex: SYLARD</h3><p>Mesolex: SYLARD es un programa para difundir recursos de documentación lingüística, en este caso grabaciones de audio anotadas en ELAN. Los desarrolladores de esta herramienta, que forma parte del portal de datos y la iniciativa Mesolex, agradecerían enormemente los comentarios, sugerencias e informes sobre errores, así como información acerca de cómo se ha utilizado SYLARD en beneficio de la documentación, la descripción y la educación en lenguas amenazadas. Por favor, envíe todos sus comentarios a mesolex.director@gmail.com.<p></div>',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: true,
    buttonsStyling: false,
    confirmButtonText: 'Aceptar',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText: 'Salir',
    cancelButtonAriaLabel: 'Thumbs down',
    footer:
      '<p class="secundario"><strong>*Al darle click en aceptar, estas de acuerdo con los terminos antes expuestos</strong></p>',
    customClass: {
      container: '',
      popup: 'sa-popup',
      header: 'sa_header',
      title: 'sa_title',
      // closeButton: '...',
      icon: 'sa_icon',
      // image: '...',
      // content: '...',
      //htmlContainer: 'sa_popup',
      // input: '...',
      // inputLabel: '...',
      // validationMessage: '...',
      // actions: '...',
      confirmButton: 'btn btn-primario sa_btn_confirm',
      // denyButton: '...',
      cancelButton: 'btn btn-secundario sa_btn',
      // loader: '...',
      footer: 'secundario ',
    },
  })

  return result.isConfirmed;
}
function init() {
  const form = document.getElementById('register-form');
  form.addEventListener("submit", processForm);
}

async function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  let result = await showTerms();
  if(result){
    const form = document.getElementById('register-form');
    form.submit();
  }
  return false;
}

export default {
  init,
  addSelection,
  clearLastSelection,
}
