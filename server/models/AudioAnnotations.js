import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import fs from 'fs'
//import { promises as fs } from 'fs'
import path from 'path'

const mongoosePaginate = require('mongoose-paginate-v2'); //first step

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

// Hooks
AudioAnnotationsSchema.pre('deleteOne',{ query: false , document : true }, function(){
  // Deleting eaf file
  let fileName = this.eaf
  // ref: https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
  let eafPath = path.join(__dirname, '..', 'public', 'eaf')
  let jsonPath = path.join(__dirname, '..', 'public', 'eaf', 'tmp')
  console.log(`$>> Deleting file: ${fileName}`);

  fs.unlink(path.join(eafPath, fileName),err=>{
    if (err) {
      console.log(`$>> error: ${err.message}`);
      throw err
    }
    console.log(`$>> File deleted: ${fileName} OK!`);
    fs.unlink(path.join(jsonPath, `${fileName}.json`), err=>{
      if(err) throw err
      console.log(`$>> File deleted: ${fileName}.json OK!`);
    })
  })
})

//AudioAnnotationsSchema.methods.updateCollection= async function(data){
// return await this.updateOne(data).exec()
//}
// Compile model from schema
AudioAnnotationsSchema.plugin(mongoosePaginate); //second step
export default mongoose.model('AudioAnnotations', AudioAnnotationsSchema)
