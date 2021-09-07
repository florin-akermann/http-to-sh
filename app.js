const express = require('express')
const morgan = require('morgan');
const shell = require('shelljs')
const app = express()
const fs = require('fs');
const port = 8080

app.use(morgan('combined'))

function getScripts(path) {
    return (fs.existsSync(path) ? fs.readdirSync(path) : [])
        .map(name => name.replace(/\.[^/.]+$/, ""));
}

app.get('/', (req, res) => {
    const mountedScripts = getScripts('/scripts')
    const provisionedScripts = getScripts('./provisioned')
    const body = {"available endpoints:": mountedScripts.concat(provisionedScripts)};
    res.send(body)
})

app.get('/:script', (req, res) => {
    let mounted = '/scripts/' + req.params.script + '.sh';
    let provisioned = './provisioned/' + req.params.script + '.sh';
    if (fs.existsSync(mounted)){
        res.send(shell.exec('sh ' + mounted).replace(/['"]+/g, ''))
    }else{
        res.send(shell.exec('sh ' +  provisioned).replace(/['"]+/g, ''))
    }

})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})