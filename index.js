const express = require('express');
const server = express();
const fs = require('fs');
const port = 3000;
var hits = 0;

server.use(express.static('public'))

function updateHitCounter(){
    const filePath = "hits.txt";
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}
function getRandWord(){
    const filePath = "allwords.txt";
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        const [word, part, definition] = randomLine.split('\t');
        return {
            "word": word, 
            "part": part, 
            "definition": definition
        }
    }
}

server.get('/hits', function(req, res){
    const hits = updateHitCounter();
    res.json({hitCount:hits});
});
server.get('/word', function(req, res){
    const wordData = getRandWord();
    res.json(wordData);

});
server.listen(port, function (){
    console.log(`Listening on ${port}`)
});