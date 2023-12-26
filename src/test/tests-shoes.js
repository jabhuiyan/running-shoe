var assert = require("assert");
const request = require("request");

describe("Shoes app Testing", function () {
  describe("Shoe", async function () {
    var myurl = "http://localhost:3000/api/";
    it("Success 1. POST - Valid shoe", function () {
      let data = {
        brand: "Asics",
        model: "Gel Cumulus 24",
        type: "Running"
      };

      request.post(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/",
          body: JSON.stringify(data),
        },
        function (error, response, body) {
          assert.strictEqual(
            body, '{"message":"Shoe added successfully in the database."}'
          );
        }
      );
    });

    it("Failure 1. POST - Invalid shoe", function () {
      let data = {
        model: "Gel Cumulus 24",
        type: "Running"
      };

      request.post(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/",
          body: JSON.stringify(data),
        },
        function (error, response, body) {
          assert.strictEqual(
            body, '{"message":"There was an error ValidationError: brand: Path `brand` is required."}'
          );
        }
      );
    });

    it("Success 2. Get - Valid shoe", function () {
      request.get(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/search?query=Nike"
        },
        function (error, response, body) {
          const data = JSON.parse(body);
          assert(data.shoes.length > 0);
        }
      );
    });

    it("Failure 2. Get - Invalid shoe", function () {
      request.get(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/search?query=as;ldfkja;lsdf"
        },
        function (error, response, body) {
          const data = JSON.parse(body);
          assert(data.shoes.length == 0);
        }
      );
    });

    it("Success 3. POST - Update shoe", function () {
      request.get(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/"
        },
        function (error, response, body) {
          let data = JSON.parse(body);
          let updatedShoe = data.shoes[0];
          updatedShoe["brand"] = "New Brand";
          
          request.put(
            {
              headers: { "content-type": "application/json" },
              url: myurl + "shoes/" + updatedShoe._id
            },
            function (error, response, body) {
              assert.strictEqual(body, '{"message":"Shoe updated."}')
            }
          );
        }
      );


    });

    it("Success 4. Delete - Valid shoe", function () {
      request.get(
        {
          headers: { "content-type": "application/json" },
          url: myurl + "shoes/"
        },
        function (error, response, body) {
          const data = JSON.parse(body);
          const shoe = data.shoes[2];
          
          request.delete(
            {
              headers: { "content-type": "application/json" },
              url: myurl + "shoes/" + shoe._id
            },
            function (error, response, body) {
              assert.strictEqual(body, '{"message":"Shoe deleted successfully."}')
            }
          );
        }
      );
    });

  it("Failure 4. Delete - Invalid shoe", function () {
    request.delete(
      {
        headers: { "content-type": "application/json" },
        url: myurl + "shoes/alsdkfn;laskndfs" 
      },
      function (error, response, body) {
        assert.strictEqual(body, '{"message":"Shoe does not exist!"}')
      }
    );
    });
  });
});
