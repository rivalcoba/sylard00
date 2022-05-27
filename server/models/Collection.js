import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate-v2'); //first step
import AudioAnnotations from '@models/AudioAnnotations'
import winston from '@config/winston'

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  languages: [
    {
      language : {
        gid: { type: String, required: true },
        family_id: { type: String },
        parent_id: { type: String },
        name: { type: String, required: true },
        level: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number },
        iso639P3code: { type: String },
        child_family_count: { type: Number },
        child_language_count: { type: Number },
        child_dialect_count: { type: Number },
        country_ids: { type: String },
      },
      LanguageGroup : {
        gid: { type: String, required: true },
        family_id: { type: String },
        parent_id: { type: String },
        name: { type: String, required: true },
        level: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number },
        iso639P3code: { type: String },
        child_family_count: { type: Number },
        child_language_count: { type: Number },
        child_dialect_count: { type: Number },
        country_ids: { type: String },
      }
    }
  ],
  localities: [
    {
      Cve_Ent: { type: String },
      Nom_Ent: { type: String },
      Nom_Abr: { type: String },
      Cve_Mun: { type: String },
      Nom_Mun: { type: String },
      Cve_Loc: { type: String },
      Nom_Loc: { type: String },
      Lat_Decimal: { type: Number },
      Lon_Decimal: { type: Number },
      Altitud: { type: Number },
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
  winston.info(` ----------------------------------------------------------- `);
  winston.info(` >> COLECCION BORRADA `);   
  
  let query = {
    collection_id : this._id
  }
  // return console.log("Delleted collection > collection_id: " + this._id)
  try {  
    let audioAnnotDocs = await AudioAnnotations.find(query).exec()
    winston.info(`coleccion contenia ${+ audioAnnotDocs.length} Audio Anotaciones `);  
    winston.info(`>> Tipo De Audio Anotaciones: ${typeof (audioAnnotDocs)} `);
    let deletionResults = await Promise.all(audioAnnotDocs.map(async audioAnnot => {
      let deleteResult = await audioAnnot.deleteOne()
      return deleteResult
    }))
    winston.info(` -------------------------------------- `); 
     
    winston.info(`Contenido De Coleccion Borrada: ${deletionResults}  `);
    winston.info(` ----------------------------------------------------------- `);  
  } catch (error) {
    winston.info(` Coleccion sin audio detectado `); 
  }    
})

CollectionSchema.methods.updateCollection= async function(data){
  return await this.updateOne(data).exec()
}
CollectionSchema.plugin(mongoosePaginate); //second step
export default mongoose.model('Collection', CollectionSchema)
