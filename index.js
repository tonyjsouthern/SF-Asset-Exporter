const fs = require('fs-extra')
const download = require('download');
var axios = require('axios');
var btoa = require('btoa');
var inquirer = require('inquirer');
require('dotenv').config()

var username = process.env.USER_NAME;
var password = process.env.PASSWORD;
var domain;

var totalAssets;
var assetArray = [];
var pageNumber = 1;
var url = process.env.APIURL;
var recursiveNum = 0;

//init();
fs.remove(process.cwd() + '/dump', err => {
  if (err) return console.error(err)
})

fs.remove(process.cwd() + '/error-log.txt', err => {
  if (err) return console.error(err)
})

var questions = [
  {
     type: 'input',
     name: 'domain',
     message: "What's your domain name?"
   },

];

var prompt = inquirer.createPromptModule();

console.log(process.cwd())

promptUser()

function promptUser() {
  prompt(questions).then( (answers) => {
    if (answers.domain.includes('.com')) {
          domain = answers.domain;
      init();
    }else {
      console.log("Please enter a valid domain")
      promptUser()
    }
  });
}

function init() {
  console.log("Gathering Page " + pageNumber + " of Results.")
  new Promise(function(resolve, reject) {
    var assetPromise = getAssets();
    resolve(assetPromise);
  }).then(() => {
    if (assetArray.length < totalAssets) {
      pageNumber++
      init();
    }
  }).then(function() {
    if (assetArray.length == totalAssets) {
      console.log("Running Download Process")
      downloadFile();
    }
  })
}


function downloadFile() {
  console.log(assetArray[recursiveNum])
  var currentObj = assetArray[recursiveNum];
  if (recursiveNum < totalAssets) {
    console.log("Downloading file " + recursiveNum + " out of " + totalAssets)
    download(currentObj.asset_url, process.cwd() + '/Dump/' + currentObj.folder_name, {
      // change this to group folders differently
        filename: currentObj.file_name
      }).then(() => {
        recursiveNum++
        downloadFile();
      })
      .catch(function(error) {
        console.log(error);
        fs.appendFile('error-log.txt', error + "\n", function(err) {
          if (err) throw err;
          console.log('Error Logged!');
        });
        recursiveNum++
        downloadFile();
      });
  } else {
    console.log("Done saving files")
  }
}

function getAssets() {
  return axios.get(url + pageNumber, {
    headers: {
      'Authorization': "Basic " + btoa(username + "@" + domain + ":" + password)
    }
  }).then((response) => {
    totalAssets = response.data.count;
    for (var i = 0; i < response.data.results.length; i++) {
      assetArray.push(response.data.results[i])
    }
  })
}
