
// scrollBar and imageSlider

document.addEventListener("DOMContentLoaded", () => {
    let scrollContainer = document.querySelector(".slider");
    let backBtn = document.getElementById("backbtn");
    let nextBtn = document.getElementById("nextbtn");

    scrollContainer.addEventListener("wheel", (event) => {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
    })

    backBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth"
        scrollContainer.scrollLeft -= 390;
    });

    nextBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth"
        scrollContainer.scrollLeft += 390;
    });
});


document.addEventListener("DOMContentLoaded", () => {

    // NAVBAR


    let navToggler = document.querySelector(".nav-toggler");
    let navMenu = document.querySelector(".site-navbar ul");

    if (navToggler && navMenu) {
        allEventListner();
    }

    function allEventListner() {
        navToggler.addEventListener("click", togglerClick);
    }

    function togglerClick() {
        navToggler.classList.toggle("toggle-open");
        navMenu.classList.toggle("open");
    }


    // SEARCH DATA

    let container = document.getElementById("main-container");
    let input = document.querySelector("input");
    let btn = document.getElementById("search-btn")

    let section_1 = document.getElementById("section-1")
    let section_2 = document.getElementById("section-2")

    // movie page 
    let movieDetails = document.getElementById("movie-details")
    let downloadMovie = document.getElementById("download-movie")


 

    let url = "https://www.omdbapi.com/?i=tt3896198&apikey=9ae4a40b&";

    // throttling - to reduce unnecessary fetch calls


    btn.addEventListener("click", function (event) {
        event.preventDefault();
        if (!input.value.trim()) {
            displayData();
        } else {
            throttling(getData, 1000);
        }
        section_1.style.display = "none";
        section_2.style.display = "none";
        movieDetails.style.display = "none"
        downloadMovie.style.display = "none"
        
    });


    let flag = false;

    function throttling(fun, delay) {
        if (flag) {
            return
        }
        else {
            fun();
            flag = true;
            setTimeout(() => {
                flag = false
            }, delay)
        }

    }


    // Debouncing - when you type something the data will be automatically get after specific time that we have provided

    input.addEventListener("input", function (event) {
        event.preventDefault();
        if (!input.value.trim()) {
            displayData();
        } else {
            Debouncing(getData, 1000);
        }
        section_1.style.display = "none";
        section_2.style.display = "none";
        movieDetails.style.display = "none"
        downloadMovie.style.display = "none"
    });


    let id;

    function Debouncing(fun, delay) {
        if (id) {
            clearTimeout(id);
        }

        id = setTimeout(() => {
            fun()
        }, delay)
    }



    // fetching the data from the url

    let getData = async function () {
        try {
            let inputVal = input.value;
            let res = await fetch(`${url}s=${inputVal}`);
            let data = await res.json();
            console.log(data.Search)
            displayData(data.Search)

        } catch (error) {
            console.log(error)
        }
    }


    // displaying the fetched data


    function displayData(movieData) {

        container.innerHTML = ""

        movieData.forEach((ele) => {
            let card = document.createElement("div");
            card.classList.add("card")

            let image = document.createElement("img");
            image.src = ele.Poster;
            image.classList.add("img")

            let title = document.createElement("h3");
            title.innerText = ele.Title;
            title.classList.add("title")

            let type = document.createElement("p");
            type.innerText = `type: ${ele.Type}`;
            type.classList.add("type")

            let year = document.createElement("p");
            year.innerText = ele.Year;
            year.classList.add("card-year-1")

            let para = document.createElement("p");
            para.innerText = "Full HD";
            para.classList.add("poster-text-1")

            card.append(image, title, type, year, para);
            container.append(card)
        })
    }



    // popup-open



    const playButton = document.getElementById('play-btn');
    const closeButton = document.getElementById('close-btn');
    const playDiv = document.getElementById('play');
    const video = document.getElementById('m-video');

    playButton.addEventListener('click', function (event) {
        event.preventDefault();  
        console.log('Play button clicked');  
        playDiv.style.display = 'flex'; 
        video.play(); 
    });

  
    closeButton.addEventListener('click', function () {
        console.log('Close button clicked');  
        playDiv.style.display = 'none'; 
        video.pause(); 
        video.currentTime = 0; 
    });

});





