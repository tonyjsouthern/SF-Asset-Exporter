'use strict';
const fs = require("fs")
const util = require('util')
const EventEmitter = require('events')
const utils = require('./lib/util')
const path = require("path")

let Downloader = function(options) {
    EventEmitter.call(this);
    var self = this,
        defaultOpt = {
            url: null,
            saveas: null,
            saveto: null,
            deleteIfExists: false,
            resume: true
        };
    self.options = utils.xtend(defaultOpt, options);

    if (!self.options.url) {
        setImmediate(function() {
            self.emit('error', 'No url specified');
        });
        return this;
    }

    if (!utils.ValidUrl(options.url)) {
        setImmediate(function() {
            self.emit('error', 'Not a valid Url!');
        });
        return this;
    }


    self.options.saveto = (!self.options.saveto) ? process.cwd() : utils.checkDir.call(self, self.options.saveto);

    utils.getonlineInfo(self.options.url).then(res => {
        if(res.statusCode !== 200) return this.emit("error", `Http error code ${res.statusCode}`);
        self.fileinfo = utils.getinfo(self.options.saveas, res);
        self.options.saveas = self.fileinfo.saveas;
        self.filePath = path.join(self.options.saveto, self.fileinfo.saveas);

        utils.checkBeforeDownload(self, self.options).then(rn => {
            if (!rn) {
                utils.download(self);
            } else { utils.download(self, rn); }
        }).catch(err => {
            if (err) self.emit("error", err);
        });
    });
}


Downloader.prototype.pause = function() {
    if (this.curl) {
        this.curl.kill();
    }
};

Downloader.prototype.resume = function() {
    if (this.curl) {
        utils.download(this, utils.getFilesize(this.filePath), true)
    }
};

util.inherits(Downloader, EventEmitter);

module.exports = Downloader;
