// Products functions ===============================================
// ==================================================================

// Button Handlers =================================

// Delete a product
function deleteShoeHandler(e, id) {
  e.preventDefault();

  // delete request
  $.ajax({
    type: "delete",
    url: "/api/shoes/" + id,
    dataType: "json",
    success: function (response) {
      console.log(response);

      // Show success message
      $(".success").text("Shoe succesfully deleted");
      $(".error").text("");

      // Reload page
      location.reload();
    },
    error: function (error) {
      // print error message to console
      console.log("An error has occured");
      console.error(error.responseText);

      // Show error message in dom
      $(".error").text("An error has occurerd");
      $(".success").text("");
    },
  });
}

// Get Requests =============================

// Get all product filter
function getAllShoes() {
  getShoes("/api/shoes");
}

function searchShoe(e) {
  e.preventDefault();
  let query = $("#search-shoe").val();
  getShoes("/api/shoes/search?query=" + query);
}

// get products helper functions to avoid duplicates
function getShoes(url) {
  // get request
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (response) {
      console.log(response);
      let data = response.shoes;
      let html = "";

      // Update DOM
      for (let i = 0; i < data.length; i++) {
        html += `
              <tr>
                  <td><a href="/ui/shoes/show?id=${data[i]._id}">${data[i].brand} ${data[i].model}</a></td>
                  <td>${data[i].gender}</td>
                  <td>${data[i].material}</td>
                  <td>${data[i].price}</td>
                  <td>${data[i].rating?.toFixed(1)}</td>
                  <td class="admin-visible">
                    <a href="#" 
                    onclick="deleteShoeHandler(event, '${data[i]._id}')" 
                    class="btn btn-danger btn-sm">
                        Delete
                    </a>
                  </td>
            </tr>
            `;
      }

      // Place the html to DOM
      $("#list-products .content").html(html);

      // Final message
      $(".success").html("Products successfully retrived.");
      $(".error").html("");
      getAuthenticatedUser();
    },
    error: function (error) {
      // Print error message to console
      console.log("An error has occured");
      console.error(error.responseText);

      // Show error message in DOM
      $(".error").html("An error has occured." + error.responseText);
      $(".success").html("");
    },
  });
}

// POST Requests ============================================
function postNewShoe(e) {
  e.preventDefault();

  // Serialize form data
  let data = $("#save-product-container form").serialize();

  // print data for debugging purpose
  console.log(data);

  $.ajax({
    type: "post",
    url: "/api/shoes",
    data: data,
    dataType: "json",
    success: function (response) {
      // print response to console
      console.log(response);

      // Show success message
      $("#save-product-container .success").text(response.message);
      $("#save-product-container .error").text("");
    },
    error: function (error) {
      // print error message to console
      console.error("An error has occured");
      console.error(error.responseText);

      // show error message to dom
      $("#save-product-container .error").text("An error has occured");
      $("#save-product-container .success").text("");
    },
  });
}

function showShoe() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");


  // Get request
  $.ajax({
    type: "get",
    url: "/api/shoes/" + id,
    dataType: "json",
    success: function (response) {
      console.log(response);
      const shoe = response.shoe;

      // Fill up the form with the information retrieved
      $("#name").text(shoe.brand + " " + shoe.model);
      $("#gender").append("Gender: " + shoe.gender);
      $("#size").append("Size: " + shoe.size);
      $("#color").append("Color: " + shoe.color);
      $("#material").append("Material: " + shoe.material);
      $("#price").append("Price: " + shoe.price);
      $("#rating").append("Rating: " + shoe.rating?.toFixed(1));

      // Show success message
      $("#list-shoes .success").html(response.msg);
      $("#list-shoes .error").html("");
    },
    error: function (error) {
      // Display error message if any error occurs
      console.log("An error has occured");
      console.error(error.responseText);
      $("#list-shoes .error").html(error.responseText);
      $("#list-shoes .success").html("");
    },
  });
}