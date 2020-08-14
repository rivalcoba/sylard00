// import '@babel/polyfill'
import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlottologSchema = new Schema({
  id: String,
  family_id: {
    type: Schema.Types.ObjectId,
    ref: 'Glottologs',
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Glottologs',
  },
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

// Exporting User Schema
export default mongoose.model('Glottologs', GlottologSchema)
