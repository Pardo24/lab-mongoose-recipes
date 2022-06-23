const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((response) => {
    console.log("agregando recetas")
    response.forEach(e => {
      console.log(e.title)
    });
   

    return Recipe.create({title: "Ou dur", level: "Easy Peasy", ingredients: ["Ou", "Aigua"], cuisine:"Suso"
  }) })
  .then((response)=> {
 console.log(response.title)
 return Recipe.findOneAndUpdate(
  {name: "Rigatoni alla Genovese"},
  {duration: 100},
  {new: true}
  )
  })

  .then((response)=>{
    console.log(response.duration);
return Recipe.deleteOne({  name:  "Carrot Cake"  })
  })

  .then(()=>{
    console.log("success");
    return mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
