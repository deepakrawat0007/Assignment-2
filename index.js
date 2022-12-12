const mongoose = require('mongoose')
const app = require('./app')
const port = 3000

function main() {
    mongoose.connect("mongodb://localhost/Smedia")
    app.listen(port, () => console.log(`Server is Running at Port => ${port}`))
}

main()