// Import Model
import Locations from '@models/Location'
// Helpers
import regexhelp from '@helpers/regexhelp'

const index = async (req, res) => {
  // Getting the Entities list
  const entities = await Locations.distinct('Nom_Ent')
  // Render page
  res.render('locations/index',{
    entities: entities
  })
}

const indexNomLoc = async (req, res) => {
  // Getting the query parameter
  let { nom_loc } = req.params
  let limit = 0
  // Limiting the values delivered
  switch (nom_loc.length) {
    case 0:
      return res
        .status(200)
        .json({ error: 'Necesita ingresar mas de un caracter' })
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      limit = nom_loc.length * 10
      break
    default:
      limit = 0
      break
  }
  console.log(`limte de query>${limit}`)
  nom_loc = regexhelp.diacriticSensitiveRegex(nom_loc)
  console.log(`> nom_loc: ${nom_loc}`)

  var regex = new RegExp(nom_loc, 'i')
  console.log(`> regex: ${regex}`)

  //Working
  const locations = await Locations.find({
    Nom_Loc: {
      $regex: regex,
    },
  })
    .limit(limit)
    .exec()

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

const getEntities = async (req, res)=>{
  try {
    const entities = await Locations.distinct('Nom_Ent')
    return res.status(200).json(entities)
  } catch (error) {
    return res.status(404).json({error:"no se encontraron entidades"})
  }  
}

const getMunicipalities = async (req, res)=>{
  // Getting the fielName
  const { nom_ent } = req.params
  const fields = await Locations.distinct('Nom_Mun',{
    'Nom_Ent': nom_ent
  })
  return res.status(200).json(fields)
}

const getLocalities = async (req, res)=>{
  // Getting the fielName
  const { nom_ent, nom_mun } = req.params
  const fields = await Locations.distinct('Nom_Loc',{
    'Nom_Ent': nom_ent,
    'Nom_Mun': nom_mun,
  })
  return res.status(200).json(fields)
}

const findLocality = async (req,res)=>{
  // Getting the fielName
  const { nom_ent, nom_mun, nom_loc } = req.params
  const locality = await Locations.findOne({
    Nom_Ent: nom_ent,
    Nom_Mun: nom_mun,
    Nom_Loc: nom_loc
  }, 'Nom_Ent Nom_Mun Nom_Loc Lat_Decimal Lon_Decimal').exec()

  if(locality){
    res.status(200).json(locality)
  }
  else{
    res.status(404).send('Not Found')
  }
}

export default {
  indexNomLoc,
  index,
  getMunicipalities,
  getLocalities,
  findLocality,
  getEntities
}
