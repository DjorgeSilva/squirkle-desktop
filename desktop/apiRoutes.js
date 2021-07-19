// @flow

import Datastore from 'nedb'
import express from 'express'
import { getAppPath } from '@atomos/atomizer-desktop/utils'
import _ from 'lodash'

const router = express.Router()

// ==================================================================================
// Setting up database
// ==================================================================================
const path = `${getAppPath()}/database/squirkle.db`
console.log(path)

const db = new Datastore({ filename: `${getAppPath()}/database/squirkle.db`, autoload: true })
// ==================================================================================


router.post('/add/todo', (req, res) => {

  const { name, content, priority, dueDate, status, tapeDecorator } = req.body

  const todo = {
    name,
    content,
    priority,
    dueDate,
    status,
    tapeDecorator
  }

  db.insert(todo, function(err: any, doc: any): void {
    if (err) {
      console.log('error')
      res.status(400)
      res.send({ response: err })
      res.end()
    }

    res.status(201)
    res.send({ response: 'Todo successfully created.'})
    res.end()
  })
})

router.get('/list/todo', (req, res) => {
  res.status(200)
  res.end()
})

router.post('/remove/todo', (req, res) => {
  res.status(202)
  res.end()
})

router.post('/update/todo', (req, res) => {
  res.status(203)
  res.end()
})

router.post('/find/todo', (req, res) => {
  res.status(204)
  res.end()
})

module.exports = router

