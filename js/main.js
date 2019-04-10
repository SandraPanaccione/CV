// ROTATING TEXT IN PRESENTATION 
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 100 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("words-wrapper");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // Inject CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".words-wrapper > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



// CALCULATE MY AGE

function getAge() {
  var birthDate = new Date("1989/1/26");
  var today = new Date();

  return (age = ((today.getTime() - birthDate.getTime()) / 31536000000).toFixed(
    0
  ));
}

document.getElementById("myAge").textContent = " " + getAge() + " ans,";

// ACTIVE LINKS IN MAIN NAV ON CLICK

// function switchColor() {
//   document.querySelectorAll("a.main-menu__item__link, a.profile__link").forEach(activeLink => {
//     activeLink.classList.remove("main-menu__item__link_selected");
//   });

//   this.classList.add("main-menu__item__link_selected");
// }

// document.querySelectorAll("a.main-menu__item__link, a.profile__link").forEach(activeLink => {
//   activeLink.addEventListener('click', switchColor);
// });


// ACTIVE LINKS IN MAIN NAV ON SCROLL

let mainNavLinks = document.querySelectorAll("a.main-menu__item__link, a.profile__link");

window.addEventListener("scroll", event =>{
  let fromTop = window.scrollY;
  
  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
  

    if(
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ){
      link.classList.add("current")
    } else {
      link.classList.remove("current");
    }
  });
});
