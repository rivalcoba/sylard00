// Import Model
import Locations from '@models/Location'

const index = (req, res)=>{
    res.render("locations/index")
}

const indexNomLoc = async (req, res) => {
  console.log(`Nomloc: ${req.params.nom_loc}`)
  const { nom_loc } = req.params
  var regex = new RegExp(nom_loc, 'i')

  const locations = await Locations.find({ Nom_Loc: regex }).exec()

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
