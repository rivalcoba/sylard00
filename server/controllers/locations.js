// Import Model
import Locations from '@models/Location'
// Helpers
import regexhelp from '@helpers/regexhelp'

const index = (req, res)=>{
    res.render("locations/index")
}

const indexNomLoc = async (req, res) => {
  console.log(`> Nomloc: ${req.params.nom_loc}`)
  let { nom_loc } = req.params

  //nom_loc = regexhelp.diacriticSensitiveRegex(nom_loc)
  
  console.log(`> nom_loc: ${nom_loc}`)
  
  var regex = new RegExp(nom_loc, 'i')
  
  console.log(`> regex: ${regex}`)
  
  // Working
  // const locations = await Locations.find( { $text: { $search: nom_loc } } ).exec()

  //Working
  const locations = await Locations.find({
    Nom_Loc: {
      $regex: regex
    }
  }).exec()
  
  // Working
  // const locations = await Locations.find({
  //   Nom_Loc: {
  //     $regex: regex
  //   }
  // }).exec()
  
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
