import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const LocationSchema = new Schema({
  Mapa:{ type: String },
  Cve_Ent:  { type: String, default: 'no data' },
  Nom_Ent:  { type: String, default: 'no data' },
  Nom_Abr:  { type: String, default: 'no data' },
  Cve_Mun:  { type: String, default: 'no data' },
  Nom_Mun:  { type: String, default: 'no data' },
  Cve_Loc:  { type: String, default: 'no data' },
  Nom_Loc:  { type: String, default: 'no data' },
  Ambito:  { type: String, default: 'no data' },
  Latitud:  { type: String, default: 'no data' },
  Longitud:  { type: String, default: 'no data' },
  Lat_Decimal:  { type: Number, default: 1 },
  Lon_Decimal:  { type: Number, default: 1 },
  Altitud: { type: Number, default: 1 },
  Cve_Carta:  { type: String, default: 'no data' },
  Pob_Total:  { type: Number, default: 1 },
  Pob_Masculina:  { type: Number, default: 1 },
  Pob_Femenina:  { type: Number, default: 1 },
  'Total De Viviendas Habitadas':  { type: Number, default: 1 },
})

// LocationSchema.path('Nom_Loc').index({text : true});

// Exporting User Schema
export default mongoose.model('Locations', LocationSchema)
