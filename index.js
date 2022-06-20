const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')

const axios = require('axios');

app.use(cors())


const FetchData = async () => {
    var arg = process.argv.slice(2);

    let data = await axios({
        method: "GET",
        url: "https://codequiz.azurewebsites.net/",
        headers: {
            'cookie': "hasCookie=true"
        }
    })

    const body = await data.data
    let array = body.split('<tr>')

    let findWord = '';

    for (let i in array) {
        if (array[i].search(arg[0]) != -1) {

            findWord = array[i]

        }
    }

    let splitWord = findWord.split("<td>")
    let Nav = splitWord[2].split("</td>")
    let answer = Nav[0]
    console.log(answer)

}

FetchData()

app.listen(port, () => {
    console.log("This app listening on port :", port);
})