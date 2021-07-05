"use strict"

const express = require('express')
const {Op} = require('sequelize')
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes');
const {status} = require('../config/constant')
const {checkToken} = require('../config/middleware')

const router = express.Router()

router.get('/', checkToken, async (req, res) => {
  let filter = {}

  const { q } = req.query
  if (q) {
    filter = {
      ...filter,
      where: {
        [Op.or]: {
          user_lastname: {
            [Op.like]: `${q}%`
          },
          user_firstname: {
            [Op.like]: `${q}%`
          }
        }
      }
    }
  }

  const users = await User.findAll({
    ...filter,
    attributes: {
      exclude: ['user_password']
    }
  })
  res.json({
    message: `Liste des utilisateurs.`,
    data: users,
    status: StatusCodes.OK
  })
})

router.get('/:id', checkToken, async (req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id)
  let data = user.toJSON()
  delete data.user_password
  res.json({
    message: `Utilisateur id: ${id}.`,
    data,
    status: StatusCodes.OK
  })
})

router.post('/', checkToken, async (req, res) => {
  const { user_lastname, user_firstname, user_email, user_group, user_login, user_password } = req.body

  const hashPassword = bcrypt.hashSync(user_password, 10)

  const userData = await User.build({
    user_lastname,
    user_firstname,
    user_group,
    user_email,
    user_login,
    user_status: status.ACTIVE,
    user_password: hashPassword
  })

  const user = await userData.save()

  if (user) {
    let data = user.toJSON()
    data.user_password = undefined;
    delete data.user_password
    res.status(StatusCodes.CREATED).json({
      message: `Utilisateur ${user_lastname} ${user_firstname} enregistré`,
      data,
      status: StatusCodes.CREATED
    })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.patch('/:id', checkToken, async (req, res) => {
  const { id } = req.params
  const cols = [ 'user_lastname', 'user_firstname', 'user_email', 'user_password', 'user_group', 'user_login', 'user_status' ]
  let values = {}
  cols.map(col => {
    if (req.body[col]) {
      if (col === 'user_password') {
        values[col] = bcrypt.hashSync(req.body[col], 10)
      } else {
        values[col] = req.body[col]
      }
    }
  })

  const user = await User.update(values, {
    where: {
      user_id: id
    }
  })

  if (user) {
    res.json({
      data: user,
      message: `Modification réussi`,
      status: StatusCodes.OK
    })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.delete('/:id', checkToken, async (req, res) => {
  const { id } = req.params
  const user = await User.destroy({
    where: {
      user_id: id
    }
  })
  if (user) {
    res.json({
      data: user,
      message: `Utilisateur (ID: ${id}) supprimé`,
      status: StatusCodes.OK
    })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router
