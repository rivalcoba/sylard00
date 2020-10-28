import Genre from '@models/Genre'

// Genre Controllers

// Genre API
// CREATE - POST
const api_postGenres = async (req, res) => {
  // Destructuring genere
  let { genere } = req

  // Create Validates genere
  try {
    const genreDoc = await Genre.create(genere)
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
	// TODO: Not implemented
	// // Destructuring genere
  // let { genere } = req

  // // Create Validates genere
  // try {
  //   const genreDoc = await Genre.create(genere)
  //   res.status(200).json(genreDoc)
  // } catch (error) {
  //   res.status(500).json(error)
  // }
	// 
  res.status(200).json({ result: 'Not implemented'})
}

// DELETE - DELETE
const api_deleteGenres = (req, res) => {
	// TODO: Not implemented
	const {genre_id} = req.params
  res.status(200).json({ result: 'Not implemented', genre_id})
}

export default {
  api_postGenres,
  api_getGenres,
  api_putGenres,
  api_deleteGenres,
}
