import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const AudioAnnotationsSchema = new Schema({
  name: String,
 // a_id:String,
  eaf:String,
  titulo:String,
  description: { type: String },
  genero:String,
  duracion:String,
  mp3_url:String,
  location: { type: Schema.ObjectId, ref:"Locations" },
  colection: { type: Schema.ObjectId, ref:"Collection" },
  glottolog:{type:Schema.ObjectId,ref:"Glottologs"},
  siglas:String,
    user:{ type: Schema.Types.ObjectId,ref: 'Users'},
  TIER: [
    {
        TIER_ID: String,
        type:String,
        participant:String, 
        Display:String,
        color: String,
    }
    ] } )


//AudioAnnotationsSchema.methods.updateCollection= async function(data){
 // return await this.updateOne(data).exec()
//}
// Compile model from schema
export default mongoose.model('AudioAnnotations', AudioAnnotationsSchema)
