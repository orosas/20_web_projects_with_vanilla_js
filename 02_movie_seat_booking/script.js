const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");

populateUI();

// Nota: Al agregar + se convierte en number. Es lo mismo que usar parseInt()
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Nota: Función para actualizar el precio a pagar por los asientos seleccionados
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seat int Array
  // Map through array
  // return a new array indexes
  // Nota: Convierte selectedSeats Node List en Array usando [...selectedSeats]
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // Nota: Se guardan en localStorage el índice de los asientos seleccionados
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Nota: Número de asientos seleccionados
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  console.log(selectedSeats);
  // Check if it is anything in selectedSeats, para agregar class selected a seat y que se muestre de azul
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // Nota: Si no está el elemento index, dará -1
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Nota: selectedMovieIndex es el índice del item del menu select (dropdown menu)
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  // Nota: Al agregar + se convierte en number. Es lo mismo que usar parseInt()
  ticketPrice = +e.target.value;
  // Nota: e.target.selectedIndex mostrará el índice de la película seleccionada en el dropdown menu
  // e.target.value mostrará el precio de la película, en éste caso el value de option dentro del dropdown menu
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
// Nota: Al hacer click en cualquier elemento dentro de container, e.target devuelve dicho elemento.
// Al hacer click sobre un asiento se le agrega/quita la class selected con toggle()
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");

    // Nota: Función para actualizar el precio a pagar por los asientos seleccionados
    updateSelectedCount();
  }
});

// initial count and total set
updateSelectedCount();
