const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, "db.json");
const MAX_TRY_COUNT = 5;

let readTryCount = 0;
let writeTryCount = 0;

const hash = {};

const get = index => typeof hash[index] !== undefined ? hash[index] : null;

const set = (index, data) => {
  if(typeof hash[index] === undefined){
    hash[index] = [];
  }
  hash[index].push(data);
  commitDB();
}

const pop = (index, value) => {
  if(typeof hash[index] === "undefined"){
    return true;
  }
  const valueIndex = hash[index].indexOf(value);
  if(valueIndex) {
    hash[index].splice(valueIndex, 1);
    commitDB();
  }
  return true;
}

const remove = index => {
  if(typeof hash[index] !== undefined) {
    delete hash[index];
    commitDB();
  }
  return true;
}

const readDB = () => {
  fs.readFile(dbFilePath, (err,data) => {
    if(err){
      if(readTryCount < MAX_TRY_COUNT){
        readTryCount++;
        setTimeout(readDB, 1000);
      } else {
        throw err;
      }
    }
    try {
      data = JSON.parse(data);
      for(key in data){
        hash[key] = data[key];
      }
      readTryCount = 0;
    } catch(e) {
      throw e;
    }
  });
}

const commitDB = () => {
  const data = JSON.stringify(hash);
  const options = {
    encoding: 'utf8'
  };
  fs.writeFile(dbFilePath, data, options, (err) =>{
    if(err) {
      if(writeTryCount < MAX_TRY_COUNT) {
        writeTryCount++;
        setTimeout(commitDB, 1000);
      } else {
        throw err;
      }
    }
    writeTryCount = 0;
  });
}

readDB();

exports.get = get;
exports.pop = pop;
exports.remove = remove;
exports.set = set;