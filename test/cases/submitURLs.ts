import fetch from 'node-fetch';
import {db} from '../../src/databases/databases';
import {Done, getbaseURL} from '../utils';

describe('submitURLs', () => {
    
    it('Should be able to submit valid url', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: ["https://mediafire.com/example"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 200) {
                let row = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://mediafire.com/example"]);
                if (row != undefined) {
                    done();
                } else {
                    done("Submission did not succeed");
                }
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should be able to submit duplicate valid url', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: ["https://mediafire.com/example"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 200) {
                let row = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://mediafire.com/example"]);
                if (row != undefined) {
                    done();
                } else {
                    done("Submission did not succeed");
                }
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should be able to submit multiple valid urls', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: ["https://mediafire.com/example2", "https://mediafire.com/example3"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 200) {
                let row = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://mediafire.com/example2"]);
                let row2 = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://mediafire.com/example3"]);
                if (row != undefined && row2 != undefined) {
                    done();
                } else {
                    done("Submission did not succeed");
                }
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should be able to submit valid url with www', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: ["https://www.mediafire.com/example"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 200) {
                let row = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://mediafire.com/example"]);
                if (row != undefined) {
                    done();
                } else {
                    done("Submission did not succeed");
                }
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should not be able to submit invalid url', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: ["https://ajay.app"]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 400) {
                let row = db.prepare('get', "SELECT url FROM urls WHERE url = ?", ["https://ajay.app"]);
                if (row == undefined) {
                    done();
                } else {
                    done("Submission succeeded " + JSON.stringify(row));
                }
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should not be able to submit empty list', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: []
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 400) {
                done();
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });

    it('Should not be able to submit garbage', (done: Done) => {
        fetch(getbaseURL()
            + "/api/submitURLs", {
                method: 'POST',
                body: JSON.stringify({
                    urls: [null, undefined, [1, 3]]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => {
            if (res.status === 400) {
                done();
            } else {
                done("Status code was " + res.status);
            }
        })
        .catch(err => done(err));
    });
});
