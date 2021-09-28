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
        gid: { type: String, required: true },
        family_id: { type: String, required: true },
        parent_id: { type: String, required: true },
        name: { type: String, required: true },
        level: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        iso639P3code: { type: String, required: true },
        child_family_count: { type: Number, required: true },
        child_language_count: { type: Number, required: true },
        child_dialect_count: { type: Number, required: true },
        country_ids: { type: String, required: true },
      },
      LanguageGroup : {
        gid: { type: String, required: true },
        family_id: { type: String, required: true },
        parent_id: { type: String, required: true },
        name: { type: String, required: true },
        level: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        iso639P3code: { type: String, required: true },
        child_family_count: { type: Number, required: true },
        child_language_count: { type: Number, required: true },
        child_dialect_count: { type: Number, required: true },
        country_ids: { type: String, required: true },
      }
    }
  ],
  localities: [
    {
      Cve_Ent: { type: String, required: true },
      Nom_Ent: { type: String, required: true },
      Nom_Abr: { type: String, required: true },
      Cve_Mun: { type: String, required: true },
      Nom_Mun: { type: String, required: true },
      Cve_Loc: { type: String, required: true },
      Nom_Loc: { type: String, required: true },
      Lat_Decimal: { type: Number, required: true },
      Lon_Decimal: { type: Number, required: true },
      Altitud: { type: Number, required: true },
    }
  ],
  license: { type: String, required: true },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
})

// Hooks
CollectionSchema.pre('deleteOne',{ query: false , document : true }, async function(){
  console.log(">> COLLECTION PRE DELETE ONE");
  
  let query = {
    collection_id : this._id
  }
  // return console.log("Delleted collection > collection_id: " + this._id)
  try {
    let audioAnnotDocs = await AudioAnnotations.find(query).exec()
    console.log(">> Lengh audioAnnotDocs: " + audioAnnotDocs.length);
    console.log(">> Type audioAnnotDocs: " + typeof (audioAnnotDocs));
    let deletionResults = await Promise.all(audioAnnotDocs.map(async audioAnnot => {
      let deleteResult = await audioAnnot.deleteOne()
      return deleteResult
    }))
    console.log(`>-> deletionResults: ${deletionResults}`)
  } catch (error) {
    console.log(">> No AudioAnnot detected: " + error.message);
  }    
})

CollectionSchema.methods.updateCollection= async function(data){
  return await this.updateOne(data).exec()
}
CollectionSchema.plugin(mongoosePaginate); //second step
export default mongoose.model('Collection', CollectionSchema)
