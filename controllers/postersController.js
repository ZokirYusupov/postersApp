const Poster = require('../models/posterModel')
const filtering = require('../utils/filtering')
// @route     /posters
// @desc    Get posters page

const { addNewPosterToDB, getAllPosters, getPosterById, editPosterById, deletePosterById } = require("../db/posters")
const User = require('../models/userModel')

// @access   public
const getPostersPage = async (req, res) => {
  try {

    const pageLimit = 10;
    const limit = +req.query.limit
    const page = +req.query.page
    const total = await Poster.countDocuments()

    // redirect
    if(req.url == '/') {
      res.redirect(`?page=1&limit=${pageLimit}`)
    }

    if(req.query.search) {
      const { search } = req.query
      const posters = await Poster.searchPartial(search, (err, data) => {
        if(err) throw new Error

      }).lean()
      return res.status(200).render('poster/searchResualts', {
        title: "Search resualts",
        url: process.env.URL,
        posters: posters.reverse(),
        user: req. session.user,
        querySearch: req.query.search
      })
    }

    if(!req.query.page || !req.query.limit) {
      const {category, from, to, region} = req.query;
      const filterings =  filtering(category, from, to, region)
      const posters = await Poster.find(filterings).lean()
      // console.log(posters)
      return res.render('poster/searchResualts', {
        title: "Filter resualts",
        url: process.env.URL,
        posters: posters.reverse(),
        user: req. session.user,
        querySearch: req.query.search
      })
      // console.log(posters);
    }
    // const posters = aw ait getAllPosters()
    // console.log(posters);
    const posters = await Poster
    .find()
    // .sort({createdAt: -1})
    .skip((page * limit) - limit)
    .limit(limit)
    .lean()
    return res.render('poster/posters', {
      title: "Posters",
      url: process.env.URL,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit)
      },
      posters: posters.reverse(),
      user: req. session.user
    })
  } catch (error) {
    console.log(error)
  }
}

// @route    GET /posters/add
// @desc    Add new Poster Page
// @access   private
const addNewPosterPage = (req, res) => {
  res.render('poster/addPoster', {
    title: "Yangi elon", 
    url: process.env.URL,
    user: req.session.user
  })
}

// @route    POST /posters/add
// @desc    Add new Poster Page
// @access   private
const addNewPoster = async (req, res) => {
  try {
    // console.log(req.file);
    // const poster = {
    //   title: req.body.title,
    //   amount: req.body.amount,
    //   region: req.body.region,
    //   description: req.body.description,
    //   image: 'uploads/' + req.file.filename,
    // }
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      description: req.body.description,
      category: req.body.category,
      image: 'uploads/' + req.file.filename,
      author: req.session.user._id
    })
    await User.findByIdAndUpdate(req.session.user._id, {
      $push: {posters: newPoster._id}
    },
    {new: true, upsert: true}
    );
    await newPoster.save((err, posterSaved) => {
      if(err) throw err;
      const posterId = posterSaved._id
      res.redirect('/posters/' + posterId)
    })
    // await addNewPosterToDB(poster)
    // res.redirect('/posters')
  } catch (error) {
    console.log(error);
  }
}

// @route    POST /posters/add
// @desc    Add new Poster Page
// @access   private
const getOnePoster = async (req, res) => {
try {
  const user = req.session.user
  // const poster = await getPosterById(req.params.id)
  const poster = await Poster
  .findByIdAndUpdate(req.params.id, 
    {$inc: {visits: 1}},
    {new: true}
    )
    .populate('author').lean();
  
    const users = await User.findOne(user._id)

    let finded = users.posters.map( v => v.toString())
    
    // console.log(users.posters);
    // console.log(req.params.id);
    // console.log(users);
  return res.render('poster/one', {
    title: poster.title, 
    url: process.env.URL,
    user,
    poster,
    author: poster.author,
    isAuthor: finded.includes(req.params.id)
  })
} catch (error) {
  console.log(error)
}
}

// @route    GET /posters/:id/edit
// @desc    Edit page
// @access   private (own)
const getEditPosterPage = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean();

    // const poster = await getPosterById(req.params.id)
    res.render('poster/edit-poster', {
      title: 'Edit page',
      url: process.env.URL,
      poster,
      user: req.session.user
    })
  } catch (error) {
    console.log(error);
  }
}

// @route    GET /posters/:id/edit
// @desc    Edit page
// @access   private (own)
const updatePoster = async (req, res) => {
  const idP = req.params.id
  try {
    const editedPoster = {
      title: req.body.title,
      // image: req.body.image,
      region: req.body.region,
      category: req.body.category,
      description: req.body.description,
      amount: +req.body.amount,
      image: 'uploads/' + req.file.filename,
    }
    await Poster.findByIdAndUpdate(req.params.id, editedPoster)
    // await editPosterById(req.params.id, editedPoster)
    res.redirect(`/posters/${idP}`)
  } catch (error) {
    console.log(error)
  }
}

// @route    POST /posters/:id/edit
// @desc   Delete page
// @access   private (own)
const deletePoster = async (req, res) => {
  try {
    // await deletePosterById(req.params.id)
    await Poster.findByIdAndRemove(req.params.id)
    res.redirect('/posters')
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPostersPage,
  addNewPoster,
  addNewPosterPage,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster
}