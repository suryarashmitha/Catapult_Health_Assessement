const request = require("request");

const config = require('./config.json');

describe("Create or update key value pair for a given dictionary", function() {
    describe("Create a new key value pair for a given dictionary", function() {
        var dictionaryId;
        beforeAll(function(done){
            const options = {
            url: config.baseUrl + "dictionary",
            form: {},
            headers: {
                'Content-Type': config.contentType,
                'Authorization': config.authorization
            }
            };
            request.post(options, function(error, response, body) {   
                dictionaryId = JSON.parse(body).id;
                done();
            })
        });


        it("returns status code 200 and creates a new key value pair", function(done) {
            const key = "tx";
            const options = {
                url: config.baseUrl + "dictionary/" + dictionaryId + "/keys/" + key,
                form: JSON.stringify({value: "Texas"}),
                headers: {
                    'Content-Type': config.contentType,
                    'Authorization': config.authorization
                }
            };
            request.post(options, function(error, response, body) {
                expect(response.statusCode).toBe(200);

                const getOptions = {
                    url: config.baseUrl + "dictionary/" + dictionaryId + "/keys",
                    headers: {
                        'Content-Type': config.contentType,
                        'Authorization': config.authorization
                    }
                };
                request.get(getOptions, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(JSON.parse(body).tx).toBe("Texas");
                    done();
                })
            })
        });
    });

    describe("Updates an existing key value pair for a given dictionary", function() {
        var dictionaryId;
        beforeAll(function(done){
            const options = {
                url: config.baseUrl + "dictionary",
                form: {},
                headers: {
                    'Content-Type': config.contentType,
                    'Authorization': config.authorization
                }
            };
            request.post(options, function(error, response, body) {
                dictionaryId = JSON.parse(body).id;
                const key = "tx";
                const options = {
                    url: config.baseUrl + "dictionary/" + dictionaryId + "/keys/" + key,
                    form: JSON.stringify({value: "Texas"}),
                    headers: {
                        'Content-Type': config.contentType,
                        'Authorization': config.authorization
                    }
                };
                request.post(options, function(error, response, body) {
                    done();
                })
            })
        });


        it("returns status code 200 and updates existing key value pair", function(done) {
            const key = "tx";
            const options = {
                url: config.baseUrl + "dictionary/" + dictionaryId + "/keys/" + key,
                form: JSON.stringify({value: "California"}),
                headers: {
                    'Content-Type': config.contentType,
                    'Authorization': config.authorization
                }
            };
            request.post(options, function(error, response, body) {
                expect(response.statusCode).toBe(200);

                const getOptions = {
                    url: config.baseUrl + "dictionary/" + dictionaryId + "/keys",
                    headers: {
                        'Content-Type': config.contentType,
                        'Authorization': config.authorization
                    }
                };
                request.get(getOptions, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(JSON.parse(body).tx).toBe("California");
                    done();
                })
            })
        });
    });
});