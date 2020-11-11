const express = require("express");
const router = express.Router();
const Person = require('../models/Person')

//@route:  localhost:5000/people/test
router.get('/test', (req, res) =>{
    res.send("this is a test")
})

// add person
//@route : localhost:5000/people/addPerson
router.post("/addPerson", (req, res) =>{
const {name, age, favoriteFoods} = req.body
const newPerson = new Person({
    name,
    age,
    favoriteFoods
})
newPerson.save()
.then(person => res.send(person))
.catch(err => console.log(err))
})

//get all person
//@route : localhost:5000/people/allPerson
router.get("/allPerson", (req,res) =>{
    Person.find()
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

//get one Person by his favoriteFoods 
//@route : localhost:5000/people/favoriteFoods
router.get("/favoriteFoods", (req,res) =>{
    const {favoriteFoods} = req.body
    Person.findOne({favoriteFoods : {$all: [favoriteFoods]}})
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

//get one Person by id
//@route : localhost:5000/people/:id
router.get("/:id", (req,res) =>{
    const {id} = req.params
    Person.findOne({_id : id})
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

// Update a person and add a new food 
//@route : localhost:5000/people/addfood/:id
   router.get("/addfood/:id", (req,res) =>{
   const {id} = req.params
   const foodToAdd = 'hamburger';
    
   Person.findById({_id : id},(err, person) => {
        if (err) return console.log(err);
        person.favoriteFoods.push(foodToAdd);
        person.save((err, data) => {
         if (err) return console.log(err);
         person=> res.send(person)
        });
      })
      .then(person=> res.send(person))
      .catch(err => console.log(err))
})

//edit person by name and set the person's age to 20
//@route : localhost:5000/people/updateOne/:id
router.put("/updateOne/:name", (req, res) => {
    const {name} = req.params
    const ageToSet = 20;
    Person.findOneAndUpdate({name}, { $set: {age: ageToSet}} )
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

//delete person
//@route : localhost:5000/people/deleteOne/:id
router.delete("/deleteOne/:id", (req, res) => {
    const {id} = req.params
    Person.deleteOne({_id : id})
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

//delete all
//@route : localhost:5000/people/deleteAll
router.delete("/deleteAll", (req, res) => {
   Person.remove()
   .then(person=> res.send(person))
   .catch(err => console.log(err))
})

//Chain Search Query 
//@route : localhost:5000/people/favoriteFoods/burrito

router.get("/favoriteFoods/burrito", (req,res) =>{
    const foodToSearch = "burrito";
    Person.find({favoriteFoods: {$all: [foodToSearch]}})
    .sort({name : 'asc'})
    .limit(2)
    .select('-age')
    .then(person=> res.send(person))
    .catch(err => console.log(err))
})

module.exports = router;