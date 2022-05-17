// Import Model
import Locations from '@models/Location'
// Helpers
import regexhelp from '@helpers/regexhelp'
import winston from '@config/winston'

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
  winston.info(` limte de query>${limit} `);
  nom_loc = regexhelp.diacriticSensitiveRegex(nom_loc)
  winston.info(` > nom_loc: ${nom_loc} `);

  var regex = new RegExp(nom_loc, 'i')
  winston.info(` > regex: ${regex} `);

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

const getAllEntities = async (req, res)=>{
  const { nom_ent } = req.params
  var divide=nom_ent.split("+");
  try {  
    const entities = await Locations.find({Nom_Ent:divide[0],Nom_Mun:divide[1]}).exec()
    winston.info(` "consulta exitosa"${+divide[0]+divide[1]} `);
    return res.status(200).json(entities)
  } catch (error) {
    return res.status(404).json({error:"no se encontraron entidades"})
  }  
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
// CREATE - POST
const api_postLoc= async (req, res) => {
  let { location } = req.body;
  // console.log(JSON.stringify(location, null, '\t'));
  // return res.status(200).json(location);
  // Create Validates location
  try { 
    const locationDoc = await Locations.create(location)
    winston.info(locationDoc);
    res.status(200).json(locationDoc)
  } catch (error) {
    winston.error(`> ERROR Actualizar Location: ${error.message}`); 
    res.status(500).json(error);
  }
}
const api_deleteLocations = async (req, res) => {
  const {loc_id} = req.params
  try {
    let result = await Locations.deleteOne({_id : loc_id})
    res.status(200).json(result)
  } catch (error) {
    error.reason = `Document with id ${genre_id} not deleted because it was not found`
    res.status(404).json(error)
  }
}

//update
const api_putLocations = async(req, res) => {
 // let { location } = req.body;
let id_locat=req.params.loc_id
 let { 
  Mapa,
  Cve_Ent,
  Nom_Ent,
  Nom_Abr,
  Cve_Mun,
  Nom_Mun,
  Cve_Loc ,
  Nom_Loc,
  Latitud,
  Longitud,
  Lat_Decimal,
  Lon_Decimal,
  Altitud,
  Cve_Carta,
  Pob_Total,
  Pob_Masculina,
  Pob_Femenina,
  'Total De Viviendas Habitadas': Total_De_Viviendas_Habitadas,
} = req.body;
let location = {
  _id:id_locat,
  Mapa,
  Cve_Ent,
  Nom_Ent,
  Nom_Abr,
  Cve_Mun,
  Nom_Mun,
  Cve_Loc ,
  Nom_Loc,
  Ambito:"no data",
  Latitud,
  Longitud,
  Lat_Decimal,
  Lon_Decimal,
  Altitud,
  Cve_Carta,
  Pob_Total,
  Pob_Masculina,
  Pob_Femenina,
  'Total De Viviendas Habitadas' : Total_De_Viviendas_Habitadas
};
  
  try {
    //savedDoc = await location.save()
    let result = await Locations.deleteOne({_id : id_locat});
    
    const locationDoc = await Locations.create(location);
    //console.log(locationDoc);
    res.status(200).json(locationDoc);
    }catch(err){
      es.status(500).json(err)
    }

 
}




export default {
  indexNomLoc,
  index,
  getMunicipalities,
  getLocalities,
  findLocality,
  getEntities,
  getAllEntities,
  api_postLoc,
  api_deleteLocations,
  api_putLocations
}
