
const fs = require('fs')
const path = require('path')

const  addNewPosterToDB = async (poster) => {
  try {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), "utf-8")

    const posters = JSON.parse(data())
    posters.push(poster)

     fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters), "utf-8", (err) => {
      if (err) throw err
    })
    // console.log(posters)
  } catch (error) {
    
  }
}
const getAllPosters = async () => {
  const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), "utf-8")

  const posters = JSON.parse(data());
  return posters
}


const getPosterById = async (id) => {
  const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), "utf-8")

  const posters = JSON.parse(data());
  const poster = posters.find(p => p.id == id)
  return poster
}

const editPosterById = async (id, editedPoster) => {
  try {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), "utf-8")

    let posters = JSON.parse(data());
  
    const index = await posters.findIndex(p => p.id == id)
     posters[index] = {
      id: posters[index.id],
      title: editedPoster.title,
      image: editedPoster.image,
      region: editedPoster.region,
      description: editedPoster.description,
      amount: editedPoster.amount
    }
  
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters), "utf-8", (err) => {
      if (err) throw err
    })
    console.log('edited');
  } catch (error) {
    console.log(error);
  }
}

const deletePosterById = async (id) => {
 try {
  const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), "utf-8")

  let posters = JSON.parse(data());

  posters = posters.filter(p => p.id !== id)
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters), "utf-8", (err) => {
    if (err) throw err
  })
 } catch (error) {
  console.log(error)
 }

}

module.exports = {
  addNewPosterToDB,
  getAllPosters,
  getPosterById,
  editPosterById,
  deletePosterById
}