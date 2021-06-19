"use strict"

const express = require('express')
const { Op } = require('sequelize')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
  let filter = {}

  const { q } = req.query
  if (q) {
    filter = {
      where: {
        [Op.or]: {
          user_nom: {
            [Op.like]: `${q}%`
          },
          user_prenom: {
            [Op.like]: `${q}%`
          }
        }
      }
    }
  }

  const users = await User.findAll(filter)
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id)
  res.json(user)
})

router.post('/', async (req, res) => {
  const { nom, prenom } = req.body

  const userData = await User.build({
    user_nom: nom,
    user_prenom: prenom
  })

  const user = await userData.save()

  if (user) {
    res.json({
      message: "Utilisateur enregistré",
      data: user
    })
  } else {
    res.status(500)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.destroy({
    where: {
      user_id: id
    }
  })

  return res.json(user)
})

module.exports = router