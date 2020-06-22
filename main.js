// Listen for calculate button

document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results

function calculateResults() {
  console.log("working...");

  // Decalring variables
  // const --> is used to decalare variables without changing the variables in future
  // let --> is used to declare variables with the chance to change it in future

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  // principal ( loan amount)
  const principal = parseFloat(amount.value);
  // Calculated Interest
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // months
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show Results
    document.getElementById("results").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers!");
  }
}

// show error
function showError(error) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Hide Loader
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  // insert error message above the heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
  // create the clear function
  function clearError() {
    document.querySelector(".alert").remove();
  }
}
