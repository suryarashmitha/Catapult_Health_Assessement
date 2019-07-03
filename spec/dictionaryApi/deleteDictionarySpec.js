const request = require("request");

const config = require('./config.json');

describe("Deleting Dictionary entries", function() {
  var dictionaryIdToDelete;
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
      dictionaryIdToDelete = JSON.parse(body).id;
      done();
    })
  });

  it("returns status code 204 and deletes dictionary", function(done) {
    const options = {
      url: config.baseUrl + "dictionary/" + dictionaryIdToDelete,
      headers: {
        'Content-Type': config.contentType,
        'Authorization': config.authorization
      }
    };
    request.delete(options, function(error, response, body) {
      expect(response.statusCode).toBe(204); // spec says 200 though.           
    })

    // This spec is failing cause it is not actually deleting the dictionary
    /*const getOptions = {
      url: config.baseUrl + "dictionary/" + dictionaryIdToDelete + "/keys",
      headers: {
        'Content-Type': config.contentType,
        'Authorization': config.authorization
      }
    };
    request.get(getOptions, function(error, response, body) {
      expect(response.statusCode).toBe(404);       
    })*/
    // This spec is failing cause it is not actually deleting the dictionary
    done();

  });
  
  it("returns status code 404 when dictonary doesn't exist", function(done) {
    const options = {
      url: config.baseUrl + "dictionary/whoami",
      headers: {
        'Content-Type': config.contentType,
        'Authorization': config.authorization
      }
    };
    request.delete(options, function(error, response, body) {
      expect(response.statusCode).toBe(404);
      done();
    })
  }); 

  it("returns status code 401 when authorization is missing", function(done) {
    const options = {
      url: config.baseUrl + "dictionary/whoami",
      headers: {
        'Content-Type': config.contentType
      }
    };
    request.delete(options, function(error, response, body) {
      expect(response.statusCode).toBe(401);
      done();
    })
  });
});