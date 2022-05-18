/*JS for the projects section*/



/* JS for the contact thank you page*/

let timer
let deleteFirstPhotoDelay

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json() /*here we aretaking the response 
    from the fetch request and extracting the json data, which will
    then be parsed, and allocating it to the variable data*/
    createBreedList(data.message)/*data.message is extrtactin the info we want from the returned data*/
    } catch (e) {
        console.log("There was a problem fetching the list")
    }

}/*fetch returns a promise and the await word in the 
above function will stop JS from completing any other 
code until the the promis is returned*/

start();/*you have to call the function for it to appear on the webpage*/


function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(function (breed) {
                return `<option>${breed}</option>`
            }).join('')}
        </select>
    `/*inside the backwards ticks(``) we can place dynamic code
    above we are taking the drop down list created in index html and inserting the 
    fetched information of dog breeds.*/
}

async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }  
}

function createSlideShow(images) {

    let currentPosition = 0

    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style='background-image: url("${images[0]}")'></div>
    <div class="slide" style='background-image: url("${images[1]}")'></div>
    `

    currentPosition += 2
    if (images.length == 2) currentPosition = 0

    timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style='background-image: url("${images[0]}")'></div>
        <div class="slide"></div>
        `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style='background-image: url("${images[currentPosition]}")'></div>`)
        deleteFirstPhotoDelay =  setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
}
}