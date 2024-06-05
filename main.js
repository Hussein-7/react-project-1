// check loacalStorge color
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--mainColor", mainColor);

    // check for active class
    // remove active
    document.querySelectorAll(".color-list li").forEach(e => {
        e.classList.remove("active");

            // add active to li
    if (e.dataset.color === mainColor) {
        e.classList.add("active");
    }
    });


}

// background option
let backgroundOption = true;

// variable to control interval
let backgroundInterval;

// Check local Storage background
let backgroundItem = localStorage.getItem("background_option");

if (backgroundItem !== null) {

    if (backgroundItem === 'true') {
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    // remove active
    document.querySelectorAll(".randomBackground span").forEach(e => {
        e.classList.remove("active");

        // add active
        if (backgroundItem === 'true') {
            document.querySelector(".yes").classList.add("active");
        }else{
            document.querySelector(".no").classList.add("active");
        }
    })

}





// setting open
let settingBox = document.querySelector(".setting-box");
document.querySelector(".fa-gear").addEventListener("click" , function(){
    this.classList.toggle("fa-spin")
    settingBox.classList.toggle("open");
});



// switch color
let colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach(li => {
    li.addEventListener("click" , function(e){
        // console.log(e.target.dataset.color);

        // change root
        document.documentElement.style.setProperty("--mainColor", e.target.dataset.color);

        // set in local storge 
        localStorage.setItem("color_option" , e.target.dataset.color);

        // remove active
        e.target.parentElement.querySelectorAll(".active").forEach(e => {
            e.classList.remove("active");
        });

        // add active to li
        e.target.classList.add("active");
    })
})


// switch background
let randomBackgroundEl = document.querySelectorAll(".randomBackground span");
randomBackgroundEl.forEach(span => {
    span.addEventListener("click" , function(e){

        // remove active
        e.target.parentElement.querySelectorAll(".active").forEach(e => {
            e.classList.remove("active");
        });

        // add active to li
        e.target.classList.add("active");

        if (e.target.dataset.state === 'yes') {
            backgroundOption = true;
            randomImg();
            localStorage.setItem("background_option" , true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);
        }

    });
})



let page = document.querySelector(".page");

// get Array img
let imgArray = ['../img/img3.jpg' , '../img/img1.jpg' , '../img/img2.jpg' , '../img/img4.jpg' , '../img/img5.jpg'];



function randomImg(){
    if (backgroundOption === true) {
        backgroundInterval  =  setInterval(() => {
            // Get random number
            let randomNum = Math.floor(Math.random() * imgArray.length);
            // change img
            page.style.backgroundImage = `url("../img/img${randomNum}.jpg")`;
        
        } , 10000);
    }
}

randomImg();


// select Skills
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", function() {
    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;
 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight - 100 ) ) {

        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.getAttribute("data-progress");
        });

    }

})



// PoP Up

let ourGallery = document.querySelectorAll(".image-box img");
ourGallery.forEach(img => {

img.addEventListener("click" , function(e){

    // create overlay Element
    let overlay  = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // create pop up
    let popUp = document.createElement("div");
    popUp.className = "popUp";

    if (img.alt !== null) {
        let imgHeading = document.createElement("h3");
        imgHeading.innerHTML = img.alt;
        popUp.appendChild(imgHeading);



    }

    // create img 
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    
    popUp.appendChild(popupImg);
    document.body.appendChild(popUp);


    // create close span
    let closeSpan = document.createElement("span");
    closeSpan.innerHTML = "X";
    closeSpan.className = 'close-popUp';
    popUp.appendChild(closeSpan);
});


});

// close PopUp
document.addEventListener("click" , function(e){
if (e.target.className === 'close-popUp') {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
}
})



// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullets");
allBullets.forEach(bullet => {
bullet.addEventListener("click" , function (e) {
document.querySelector(e.target.dataset.section).scrollIntoView({
    behavior: 'smooth'
})
});
});


// Select All Links
let allLinks = document.querySelectorAll(".list a");
allLinks.forEach(a => {
a.addEventListener("click" , function (e) {
    e.preventDefault();
document.querySelector(e.target.dataset.section).scrollIntoView({
    behavior: 'smooth'
})
});
});


let bulletSpan = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
let localBullet = localStorage.getItem("bullets_option");

if (localBullet !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove(".active");
    });

    if (localBullet === 'block') {

        navBullets.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
        
    }else{
        navBullets.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletSpan.forEach(span => {
    span.addEventListener("click" , function (e) {
        if (span.dataset.state === 'yes') {
            navBullets.style.display = 'block';
            localStorage.setItem("bullets_option" , 'block');
        }else{
            navBullets.style.display = 'none';
            localStorage.setItem("bullets_option" , 'none');
        }

                // remove active
                e.target.parentElement.querySelectorAll(".active").forEach(e => {
                    e.classList.remove("active");
                });
        
                // add active to li
                e.target.classList.add("active");


    });
})

// Reset button
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();
    
    window.location.reload();


}


// fixed nav
let navBar = document.getElementById("nav");
window.addEventListener("scroll" , function () {
if (scrollY > 72) {
    navBar.style.backgroundColor = '#333';
    navBar.style.position = 'fixed';

}else{
    navBar.style.backgroundColor = 'transparent';
    navBar.style.position = 'relative';

}

});


// menu
let toggleMenu = document.querySelector(".toggle-menu");
let linkMenu = document.querySelector(".list");

toggleMenu.onclick = () => {

    linkMenu.classList.toggle("open");

}


// load

let pageContent = document.querySelector(".page-content");
window.addEventListener("load" , () => {
setTimeout(function () {
pageContent.style.display = 'block';
document.querySelector(".load").style.display = 'none';
}, 3000)

});