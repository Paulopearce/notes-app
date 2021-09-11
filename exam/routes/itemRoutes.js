const router = require('express').Router()
const { items } = require('../db')

router.get('/items', (req, res) => {
  res.json(items)
})

router.post('/items', (req, res) => {
  items.push(req.body)
  res.sendStatus(200)
})

router.put('/items/:text', (req, res) => {
  const text = req.params.text
  items.forEach(item => {
    if (item.text === text) {
      item.isDone = !item.isDone
    }
  })
  res.sendStatus(200)
})

router.delete('/items/:text', (req, res) => {
  const text = req.params.text
  items = items.filter(item => item.text !== text)
  res.sendStatus(200)
})

module.exports = router
