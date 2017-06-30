$(".button-collapse").sideNav();

var $tableBody = $("#tableBody");

var cartedItem = {
  itemName: "",
  price: 0
}

bCartEmpty = true;

var priceSubtotal = 0;
var priceTotal = 0;
var priceTax = 0;

//event handler for image cards
$cardGrid = $(".addToCart");
$cardGrid.on("click", cbCardGrid);

//event handler for form submit button
var elmForm = document.getElementById("form");
console.log(elmForm);
elmForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log("form submit")  // do entire form validation here
});

function cbForm() {
  console.log("form submit")
}

//populate global variables and update table
function cbCardGrid(event) {
  $elm = $(event.target);

  cartedItem.itemName = $elm.parent().parent().find(".getItemName").text();
  cartedItem.price = $elm.parent().parent().find(".getItemPrice").text();

  updateTableBody();
  updateTableFoot();
}

//updates table when items added to cart
function updateTableBody() {
  //if no items have been placed yet (bCartEmpty === true) then remove placeholder row.
  if(bCartEmpty) {
    bCartEmpty=false;
    $tableBody.empty();
  }

  //populate table with data in cart
  var $tr = $("<tr>");
  $tr.append( $("<td>").text(cartedItem.itemName) );
  $tr.append( $("<td>").text(cartedItem.price) );

  var price = parseFloat(cartedItem.price.substring(1,cartedItem.price.length));
  priceSubtotal+= parseFloat(price.toFixed(2));
  priceTax+= parseFloat((price*0.1).toFixed(2));
  priceTotal = priceSubtotal+priceTax;

  $tableBody.append($tr);
}

function updateTableFoot() {
  $("#tfootSubtotal").text(priceSubtotal.toFixed(2));
  $("#tfootTax").text(priceTax.toFixed(2));
  $("#tfootTotal").text(priceTotal.toFixed(2));
}

$("#form").on("submit", function(event){
  if(priceTotal === 0) {
    alert("Your cart is empty.")
  } else {
    alert("Success!")
  }
});
