import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  languages: [
    {
      gid: String,
      family_id: String,
      parent_id: String,
      name: String,
      level: String,
      latitude: Number,
      longitude: Number,
      iso639P3code: String,
      child_family_count: Number,
      child_language_count: Number,
      child_dialect_count: Number,
      country_ids: String,
    }
  ],
  localities: [
    {
      Cve_Ent: String,
      Nom_Ent: String,
      Nom_Abr: String,
      Cve_Mun: String,
      Nom_Mun: String,
      Cve_Loc: String,
      Nom_Loc: String,
      Lat_Decimal: Number,
      Lon_Decimal: Number,
      Altitud: Number,
    }
  ],
  license: String,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
})

CollectionSchema.methods.updateCollection= async function(data){
  await this.updateOne(data).exec()
}

export default mongoose.model('Collection', CollectionSchema)
