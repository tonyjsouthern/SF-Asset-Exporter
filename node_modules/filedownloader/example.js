var Downloader = require("./");


var Dl = new Downloader({
    url: "http://quotesofboss.com/boss/b5ul8tby0s8-seth-doyle.jpg",
    saveto: "Downloads",
    deleteIfExists: true
}).on("start", function (){
    console.log("Download Started");
}).on("error", function(err){
    console.log(err)
}).on("progress", function(data){
    console.log(data)
}).on("end", function(){
    console.log("Download Finished");
});

setTimeout(() => {
    Dl.pause()
}, 5000);

setTimeout(() => {
    Dl.resume()
}, 8000);