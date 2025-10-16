const express = require('express');
const server = express();
const fs = require('fs');
const port = 3000;
var hits = 0;

server.use(express.static('public'))

function updateHitCounter(){
    const filePath = "hits.txt";
    if(fs.existsSync(filePath))
        hits = parseInt(fs.readFileSync(filePath, 'utf-8'));
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}

function getRandWord(){
    const filePath = "allwords.txt";
    if(fs.existsSync(filePath)) {
        const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
        const [word, part, definition] = lines[Math.floor(Math.random() * lines.length)].split('\t');
        return {
            "word": word, 
            "part": part, 
            "definition": definition
        }
    }
}

server.get('/hits', function(req, res){
    res.json({
        "hitCount": updateHitCounter()
    });
});

server.get('/word', function(req, res){
    res.json(getRandWord());

});

server.listen(port, function (){
    console.log(`Listening on ${port}`)
});