const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".container .seat");
const notOccupiedSeats = document.querySelector(".container .seat:not(.occupied)");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const movieSelectBox = document.getElementById("movie");

//önce localstorage sonra slectbox
//initial value == movieSelectBox.value
//sayfa yukleneince en guncel movie seat price

let currentTicketPrice = localStorage.getItem("selectedMoviePrice") ? localStorage.getItem("selectedMoviePrice") : movieSelectBox.value;

//movieIndex(en guncel mvie index)
let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ? localStorage.getItem ("selectedMovieIndex") : movieSelectBox.selectedIndex;
//varsa localstorage dan getir yoksa selectedindex
window.onload = () => {
   
    displaySeats();
    updateMovieInfo();
}
//change film and localstorage
movieSelectBox.addEventListener("change" ,(e) => {
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    console.log(movieIndex);
    updateMovieInfo();
    setMovieDataToLocalSttorage(ticketPrice,movieIndex);
});
//add to storage
const setMovieDataToLocalSttorage = (ticketPrice, movieIndex) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice);

}
//capturing
container.addEventListener("click", (e) => {
    console.log(e.target.classList);
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        console.log(e.target.classList);
    }
    // else{
    //     alert("Please select unreserved seats..")

    // }
    updateMovieInfo();
    //en alt paragrafi guncelliyor
});
// update paragraph and calculation
const updateMovieInfo = () => {
    let selectedSeats = document.querySelectorAll(".row .seat.selected");
    //sectigimiz koltuklarin indexini alip arraya attik
    //selectedlist node list arraye cevirdik
    let selectedSeatsIndexArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));//for each + map
    //console.log(selectedSeatsIndexArray);
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndexArray));

    count.innerText = selectedSeatsIndexArray.length;
    total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];

}
//after refresh get selectedseats and add class "selected"
const displaySeats = () => {
    movieSelectBox.selectedIndex = currentMovieIndex;
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeatsFromStorage);
    if(selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0 ){
        allSeats.forEach((seat, index)=>{
            if(selectedSeatsFromStorage.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }
}
