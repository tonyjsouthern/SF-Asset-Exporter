const fs = require('fs');
const download = require('download');
var axios = require('axios');
var btoa = require('btoa');
require('dotenv').config()

var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var domain   = process.env.DOMAIN;

var totalAssets;
var assetArray = [];
var pageNumber = 1
var url = 'https://app.salesfusion.com/api/assets/library/?page=';
var recursiveNum = 0

init();

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
    download(currentObj.asset_url, './Dump/' + currentObj.folder_name, {
      filename: currentObj.file_name
    }).then(() => {
      recursiveNum++
      downloadFile();
    })
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
