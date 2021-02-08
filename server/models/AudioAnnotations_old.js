import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const AudioAnnotationsSchema = new Schema({
  //name: String,
  // a_id:String,
  eaf: String,
  title: String,
  description: String,
  genre: {
    name: { type: String, required: true },
    description: { type: String, default: 'Description not assigned' },
  },
  duration: String,
  mp3_url: String,
  //location: { type: Schema.ObjectId, ref:"Locations" },
  location: {},
  //location:String,
  collection_id: { type: Schema.Types.ObjectId, ref: 'Collection' },
  //glottolog:{type:Schema.ObjectId,ref:"Glottologs"},
  //gid:String,//cambiar por L_gid
  gid: {},
  siglas: String,
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  header: [String],
  TIER: [
    {
      PARTICIPANT: String,
      Visible : String,
      value: String,
      color: String,
      LINGUISTIC_TYPE_REF: String,
      TIER_ID: String,
    },
  ],
})

//AudioAnnotationsSchema.methods.updateCollection= async function(data){
// return await this.updateOne(data).exec()
//}
// Compile model from schema
export default mongoose.model('AudioAnnotations', AudioAnnotationsSchema)
