const fs = require ('fs');

function readJsonSchema(schemaName){
    const schemaFolder = "resource/schema/"
    return JSON.parse(fs.readFileSync(`${schemaFolder}/${schemaName}`, 'utf8'));
}

module.exports = readJsonSchema;