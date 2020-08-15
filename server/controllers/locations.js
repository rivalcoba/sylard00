// Import Model
import Locations from '@models/Location'
// Helpers
import regexhelp from '@helpers/regexhelp'

const index = (req, res)=>{
    res.render("locations/index")
}

const indexNomLoc = async (req, res) => {
  // Getting the query parameter
  let { nom_loc } = req.params
  let limit = 0
  // Limiting the values delivered
  switch (nom_loc.length) {
    case 0:
      return res.status(200).json({ error: "Necesita ingresar mas de un caracter" });
    case 1:
    case 2:
    case 4:
    case 5: 
      limit = nom_loc.length * 10
      break
    default:
      limit = 0
      break;
  }
  console.log(`limte de query>${limit}`)
  nom_loc = regexhelp.diacriticSensitiveRegex(nom_loc)  
  console.log(`> nom_loc: ${nom_loc}`)
  
  var regex = new RegExp(nom_loc, 'i')  
  console.log(`> regex: ${regex}`)

  //Working
  const locations = await Locations.find({
    Nom_Loc: {
      $regex: regex
    }
  }).limit(limit).exec()
  
  let locs = locations.map((location) => location.toJSON())
  
  return res.json(locs)

  // List all the collections
//   res.json({
//     'Mapa': '010010144',
//     'Cve_Ent': '01',
//     'Nom_Ent': 'Aguascalientes',
//     'Nom_Abr': 'Ags.',
//     'Cve_Mun': '001',
//     'Nom_Mun': 'Aguascalientes',
//     'Cve_Loc': '0144',
//     'Nom_Loc': 'El Colorado (El Soyatal)',
//     'Latitud': '21°54´15.960 N',
//     'Longitud': '102°10´05.610 W',
//     'Lat_Decimal': 21.904433,
//     'Lon_Decimal': -102.168225,
//     'Altitud': 2023,
//   })
}

export default {
  indexNomLoc,
  index
}
