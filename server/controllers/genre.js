import Genre from '@models/Genre'

// Genre Controllers
const genresindex = (req, res) => {
  res.render('genres/index', {
      title: 'Editor de Campos',
      content: 'Aquí están los generos y locaciones añadidos a SYLARD',
      advice:'¡Recuerde revisar y tener cuidado al editar!'
  })
}

// Genre API
// CREATE - POST
const api_postGenres = async (req, res) => {

  // Destructuring genre
  let { genre } = req
  
  // Create Validates genre
  try {
    const genreDoc = await Genre.create(genre)
    res.status(200).json(genreDoc)
  } catch (error) {
    res.status(500).json(error)
  }
}
// READ - GET
const api_getGenres = async (req, res) => {
  const genreDocs = await Genre.find().exec()
  res.status(200).json(genreDocs)
}

// UPDATE - PUT
const api_putGenres = async(req, res) => {
  // Extracting data to update
  let {genreDoc} = req
  
  // Saving Document
  let savedDoc = {} 
  try {
    console.log(genreDoc);
    savedDoc = await genreDoc.save()
    res.status(200).json(savedDoc)
  } catch (error) {
    error.reason = `Error when saving document`
    res.status(500).json(error)
  }
  
}

// DELETE - DELETE
const api_deleteGenres = async (req, res) => {
  const {genre_id} = req.params
  try {
    let result = await Genre.deleteOne({_id : genre_id})
    res.status(200).json(result)
  } catch (error) {
    error.reason = `Document with id ${genre_id} not deleted because it was not found`
    res.status(404).json(error)
  }
}

export default {
  api_postGenres,
  api_getGenres,
  api_putGenres,
  api_deleteGenres,
  genresindex,
}
