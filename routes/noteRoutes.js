const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
let notes = require('../db/db.json')
const { json } = require('express')

router.get('/notes', (req,res) => {
  res.sendFile(join(__dirname, '../public/notes.html'))
})

router.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', (err,data) =>{
  	if(err){console.log(err)}
  	res.json(JSON.parse(data))
	})
})

router.post('/api/notes', (req, res) => {
  notes.push(req.body)
  fs.writeFile('db/db.json', JSON.stringify(notes), err =>{
  	if(err){console.log(err)}
	})
  res.sendStatus(200)
})

router.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  fs.readFile('db/db.json',  (err,data) =>{
    if(err){console.log(err)}
    console.log()
    data = JSON.parse(data).filter(note => note.text !== id)
    fs.writeFile('db/db.json', JSON.stringify(data), err =>{
  	  if(err){console.log(err)}
	  })

	})

  
  res.sendStatus(200)
})
//backup url
router.get('*', (req,res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router