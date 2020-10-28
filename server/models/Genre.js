import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GenreSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: 'Description not assigned' },
})

export default mongoose.model('Genre', GenreSchema)
