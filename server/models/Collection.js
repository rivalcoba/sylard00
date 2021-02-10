import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate-v2'); //first step
import AudioAnnotations from '@models/AudioAnnotations'

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  languages: [
    {
      language : {
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
      },
      LanguageGroup : {
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

// Hooks
CollectionSchema.pre('remove', async function(){
  let query = {
    collection_id : this._id
  }
  try {
    let result = await AudioAnnotations.find(query).remove().exec()
    console.log(`>>> REMOVING Audio Annotations result: ${result}`)
  } catch (error) {
    console.log(`>>> Error when deleting Audio Annotations: ${error.message}`);
    throw error
  }
})

CollectionSchema.methods.updateCollection= async function(data){
  return await this.updateOne(data).exec()
}
CollectionSchema.plugin(mongoosePaginate); //second step
export default mongoose.model('Collection', CollectionSchema)
