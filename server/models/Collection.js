// import '@babel/polyfill'
import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  languages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Glottologs',
    },
  ],
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Locations',
    },
  ],
  license: String,
})

export default mongoose.model('Collections', CollectionSchema)
