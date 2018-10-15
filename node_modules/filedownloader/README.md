# filedownloader

![npm](https://img.shields.io/npm/v/filedownloader.svg) ![license](https://img.shields.io/npm/l/filedownloader.svg) ![github-issues](https://img.shields.io/github/issues/oussama1598/node-filedownloader.svg)

a small module for easy downloading using the power of curl combined with node js

![nodei.co](https://nodei.co/npm/filedownloader.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/oussama1598/node-filedownloader.svg)
![stars](https://img.shields.io/github/stars/oussama1598/node-filedownloader.svg)
![forks](https://img.shields.io/github/forks/oussama1598/node-filedownloader.svg)

![](https://david-dm.org/oussama1598/node-filedownloader/status.svg)

## Note
this module requires curl to be present in your system path. if not please check those links 

[Linux](http://askubuntu.com/questions/259681/the-program-curl-is-currently-not-installed)
[Windows](http://callejoabel.blogspot.com/2013/09/making-curl-work-on-windows-7.html)
[Mac Os](http://macappstore.org/curl/)


## Quick start
```sh
    npm install filedownloader
```
Then:
```javascript
    var Downloader = require("filedownloader");
    
    var Dl = new Downloader({
        url: "FILEURL"
    }).on("progress", function (progress){
        console.log(progress); 
    });
```
The Downloader function accepts an object that can take:

* `url` url to Download from
* `saveas` Filename to be saved as ex( audio.mp3)
* `saveto` Folder to be saved in
* `deleteIfExists` Delete file if it does exist (default: false)
* `resume` Resume file if it's not completed, if false will delete the file and start it again (default: true)

The progress event will return :
```js
    { progress: '1.3', dataWritten: 376072, filesize: '29828970', speed: 'byte/s'} //just an example of the ouput
```

### Controlling The Download
you can pause the downloading by :
```js
    Dl.pause();
```
and you can resume it by:
```js
    Dl.resume();
```
### Setting event handlers
#### 'start': download started
The `start` event is emitted just after the download starts
    
```js
    Dl.on("start", function(){
       console.log("Download started") 
    });
```
#### 'progress': progress information

The `progress` Event is emitted with an object argument with the following keys:
    
* `dataWritten`: size of downloaded data in bytes
* `filesize`: size of the target file in bytes
* `progress`: an estimation of the progress percentage
* `speed`: an estimation of the download speed

```js
    Dl.on("progress", function(progress){
       console.log('Downloaded: ' + progress.pregress + '%'); 
    });
```
#### 'error': error occurred
The `error` event is emitted when an error occurs

```js
    Dl.on("error", function(err){
       console.log('Some error occurred:' + err); 
    });
```
#### 'end': Downloading finished
The `end` event is emitted when Downloading has finished.
    
```js
    Dl.on("end", function(){
       console.log('Download finished'); 
    });
```    
#### What's new
error event when status code is different than 200

## Tests

```sh
npm test
```

## Dependencies

- [content-disposition](https://github.com/jshttp/content-disposition): Create and parse Content-Disposition header
- [del](https://github.com/sindresorhus/del): Delete files and folders
- [file-exists](https://github.com/scottcorgan/file-exists): Check if filepath exists and is a file
- [mkdirp](https://github.com/substack/node-mkdirp): Recursively mkdir, like `mkdir -p`
- [q](https://github.com/kriskowal/q): A library for promises (CommonJS/Promises/A,B,D)
- [request](https://github.com/request/request): Simplified HTTP request client.
- [underscore](https://github.com/jashkenas/underscore): JavaScript&#39;s functional programming helper library.
- [urlencode](https://github.com/node-modules/urlencode): encodeURIComponent with charset
- [valid-url](https://github.com/ogt/valid-url): URI validation functions


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

Oussama Barkouki

## License

 - **GPL-3.0** : [http://opensource.org/licenses/GPL-3.0](http://opensource.org/licenses/GPL-3.0)