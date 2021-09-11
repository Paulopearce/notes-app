const router = require('express').Router()
const { join } = require('path')
let notes = require('../db/db.json')

router.get('/notes', (req,res) => {
  res.sendFile(join(__dirname, '../public/notes.html'))
})

router.get('/api/notes', (req, res) => {
  res.json(notes)
})
//Add API
router.post('/api/notes', (req, res) => {
  notes.push(req.body)
  res.sendStatus(200)
})
//Add api
router.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id
  notes = notes.filter(note => note.text !== id)
  res.sendStatus(200)
})
//backup url
router.get('*', (req,res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router