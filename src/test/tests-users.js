var assert = require("assert");
const request = require("request");


describe("Webscrapper Tests with Mocha", function () {
  describe("Test users", function () {
    describe("User auth", async function () {
      var myurl = "http://localhost:3000/api";
      it("Fail 1. POST - Test invalid password - failed login", function () {
        let data = {
          name: "user1",
          email: "user1@gmail.com",
          password: "pass123_#",
        };
        request.post(
          {
            headers: { "content-type": "application/json" },
            url: myurl + "/users/login",
            body: JSON.stringify(data),
          },
          function (error, response, body) {
            assert.strictEqual(body, '{"message":"Invalid credentials"}');
          }
        );
      });
      it("Fail 2. GET - Test invalid email (failed getOne)", function () {
        let email = "user1#gmail@com";

        request.get(
          {
            headers: { "content-type": "application/json" },
            url: myurl + "/users/" + email,
          },
          function (error, response, body) {
            assert.strictEqual(body, '{"message":"User not found!"}');
          }
        );
      });

      it("Success 1. GET - All User", function () {
        request.get(
          {
            headers: { "content-type": "application/json" },
            url: myurl + "/users",
          },
          function (error, response, body) {
            data = JSON.parse(body);
            assert(data.users.length > 0)
          }
        );
      });
      it("Success 2. POST - Valid User - LogIn", function () {
        let data = {
          email: "admin@test.com",
          password: "admin",
        };
        request.post(
          {
            headers: { "content-type": "application/json" },
            url: myurl + "/users/login",
            body: JSON.stringify(data),
          },
          function (error, response, body) {
            assert.notEqual(body, "");
          }
        );
      });
      it("Success 3. GET - User found (valid getOne)", function () {
        let email = "admin@test.com";

        request.get(
          {
            headers: { "content-type": "application/json" },
            url: myurl + "/users/" + email,
          },
          function (error, response, body) {
            data = JSON.parse(body);
            assert.strictEqual(data.email, email);
          }
        );
      });
      it('Success 4. PUT - Update Valid User(updateOne),', function(){
        const email = "admin@test.com";
        let up_data = {
            email: 'admin@test.com', 
            name: "Admin Update",
            password: "admin"
        };

        request.put({
            headers: {'content-type': 'application/json'},
            url:     myurl+'/users/'+email,
            body:    JSON.stringify(up_data)
        }, function(error, response, body){
            assert.strictEqual(body,'{"message":"User updated!"}');
        });
      });

      it('Success 4. POST - Registration,', function(){
        let up_data = {
            email: 'adminnew1@test.com', 
            name: "Admin Update",
            password: "admin"
        };

        request.post({
            headers: {'content-type': 'application/json'},
            url:     myurl+'/users/signup',
            body:    JSON.stringify(up_data)
        }, function(error, response, body){
            assert.strictEqual(body,'{"message":"Signup complete."}');

            request.delete({
              headers: {'content-type': 'application/json'},
              url:     myurl+'/users/adminnew1@test.com'
            }, function(error, response, body) {
              assert.strictEqual(body, '{"message":"User deleted"}')
            });
        });
      });

      it('Fail 3. POST - Registration,', function(){
        let up_data = {
            email: 'admin@test.com', 
            name: "Admin Update",
            password: "admin"
        };

        request.post({
            headers: {'content-type': 'application/json'},
            url:     myurl+'/users/signup',
            body:    JSON.stringify(up_data)
        }, function(error, response, body){
            assert.strictEqual(body,'{"message":"Email not unique"}');
        });
      });

    });
  });
});
