const request = require("request");

const config = require('./config.json');

describe("Creating new Dictionary entries", function() {    
  it("returns status code 201 and created dictionary id", function(done) {
      const options = {
          url: config.baseUrl + "dictionary",
          form: {},
          headers: {
            'Content-Type': config.contentType,
            'Authorization': config.authorization
          }
        };
        request.post(options, function(error, response, body) {
          expect(response.statusCode).toBe(201);
          expect(response.body).toContain("id");
          expect(response.body.id).not.toBeNull();
          done();
        })
  }); 
  
  it("returns status code 401 when authorization is missing", function(done) {
      const options = {
          url: config.baseUrl + "dictionary",
          form: {},
          headers: {
            'Content-Type': config.contentType
          }
        };
        request.post(options, function(error, response, body) {
          expect(response.statusCode).toBe(401);
          done();
        })
  });

  it("returns status code 404 when endpoint url is incorrect", function(done) {
      const options = {
          url: config.baseUrl + "whoami",
          form: {},
          headers: {
            'Content-Type': config.contentType,
            'Authorization': config.authorization
          }
        };
        request.post(options, function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
        })
  });
});