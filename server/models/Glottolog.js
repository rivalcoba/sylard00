import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlottologSchema = new Schema({
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
})

GlottologSchema.virtual('parentTree',{
  ref: 'Glottologs',
  localField: 'parent_id',
  foreignField: 'gid',
  justOne: true,
})

// GlottologSchema.pre('find', async function(){
//   await this.populate('parentTree')
// })
// GlottologSchema.pre('findOne', async function(){
//   await this.populate('parentTree')
// })

GlottologSchema.methods.getParent = async function(){
  const doc = await mongoose.model('Glottologs').findOne({
    gid: this.parent_id
  }).exec()
  return doc
}

GlottologSchema.methods.getParentBranch = async function(ascendants){
  const parent = await this.getParent()
  //console.log(`Parent: ${parent}`)
  if(parent){
    ascendants.push(parent)
    return parent.getParentBranch(ascendants)
  }
  else{
    return ascendants
  }
}


// Exporting User Schema
export default mongoose.model('Glottologs', GlottologSchema)
