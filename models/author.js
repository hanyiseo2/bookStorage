const mongoose = require('mongoose')
const book = require('./book')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) { //코드 리뷰
    Book.find({author: this.id}, (err, books)=>{
        if(err){
            next(err)
        } else if(books.length >0){
            next(new Error('This author has books still'))
        } else{
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)