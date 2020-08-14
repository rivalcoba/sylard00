import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const LocationSchema = new Schema({
  Mapa: String,
  Cve_Ent: String,
  Nom_Ent: String,
  Nom_Abr: String,
  Cve_Mun: String,
  Nom_Mun: String,
  Cve_Loc: String,
  Nom_Loc: {type: String, text : true },
  Ambito: String,
  Latitud: String,
  Longitud: String,
  Lat_Decimal: Number,
  Lon_Decimal: Number,
  Altitud: Number,
  Cve_Carta: String,
  Pob_Total: Number,
  Pob_Masculina: Number,
  Pob_Femenina: Number,
  'Total De Viviendas Habitadas': Number,
})

LocationSchema.path('Nom_Loc').index({text : true});

// Exporting User Schema
export default mongoose.model('Locations', LocationSchema)
