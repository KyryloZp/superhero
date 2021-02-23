const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    nickname: {type: String, required: true, unique: true},
    realName: {type: String, required: true},
    originDescription: {type: String, required: true},
    superpowers: {type: String, required: true},
    catchPhrase: {type: String, required: true},
    image: {type: Array, required: true}
})

module.exports = model('Hero', schema)