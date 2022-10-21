(function() {


// menu

const adaptiveMenu = document.querySelector(".menu--adaptive");
const gamburger = document.querySelector(".gamburger");
const close = document.querySelector(".close");

gamburger.addEventListener("click", e => {
    adaptiveMenu.style.display = "block";
});

close.addEventListener("click", e => {
    adaptiveMenu.style.display = "none";
});


$(".menu__link").on("click", e => {
    adaptiveMenu.style.display = "none";
});




// command

const peopleName = $(".people__name");
const people = $(".people");

peopleName.on("click", e => {
    let thisPeople = $(e.currentTarget).closest(people);

    thisPeople.toggleClass("people--active").siblings().removeClass("people--active");
});



// reviews

$(".reviews__switcher-link").on("click", e => {
    e.preventDefault();

    const link = $(e.currentTarget);
    const item = link.closest(".reviews__switcher-item");
    const ndx = item.index();
    const display = $(".reviews__display-inner");

    item.addClass("reviews__switcher-item--active").siblings().removeClass("reviews__switcher-item--active");

    display.eq(ndx).addClass("reviews__display-inner--active").siblings().removeClass("reviews__display-inner--active");
    
});


// slider

const slider = $('.products__list').bxSlider({
    pager: false,
    controls: false
});

$(".left-buttun").click(e => {
    slider.goToPrevSlide();
})

$(".right-buttun").click(e => {
    slider.goToNextSlide();
})


// modal

const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach(field => {
        field.removeClass("input--error");

        if (field.val().trim() === "") {
            field.addClass("input--error");
        }
    });

    const errorField = form.find(".input--error");
    
    return errorField.length === 0;
}

$(".form").submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find(".modal__text");

    $(".modal__container").removeClass("modal-text--error");

    const isValid = validateFields(form, [name, phone, comment, to]);

    if(isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },

            success: (data) => {
                content.text(data.message);
                Fancybox.show([{ 
                    src: "#modal", 
                    type: "inline" 
                }]);
            },
            
            error: (error) => {
                content.text(error.message || "Ошибка на стороне сервера");
                $(".modal__container").addClass("modal-text--error");

                Fancybox.show([{ 
                    src: "#modal", 
                    type: "inline" 
                }]);
            }
        });
    }
});

$(".js-button").click(e => {
    e.preventDefault();
    Fancybox.close();
});


// colors-menu

const title = $(".colors__title");
const content = $(".colors__content");
const items = $(".colors__item");
const mobileScreen = window.matchMedia('(max-width: 768px)').matches;

title.on("click", e => {
    e.preventDefault();
    
    const thisContent = $(e.currentTarget).next(content);
    const thisItem = $(e.currentTarget).closest(".colors__item");
    const otherItems = items.not(thisItem);
    
    content.css("width", "0");

    if(mobileScreen) {
        otherItems.css("display", "none");
    }

    if(thisContent.hasClass("colors__content--active")) {
        content.removeClass("colors__content--active");
        otherItems.css("display", "flex");
    } else {
        thisContent.css("width", mesureWidth);
        thisContent.addClass("colors__content--active");
    }

});

const mesureWidth = (item) => {
    const widthWindow = $(window).width();
    const container = title.closest(".colors");
    const titleBlocks = container.find(".colors__title");
    const widthTitles = title.width() * titleBlocks.length;
    const titleOne = title.first().width();

    if(mobileScreen) {
        return widthWindow - titleOne;
    } else {
        return widthWindow - widthTitles;
    }    
}

// const closeItem = container => {
//     const items = container.find(".colors__item");
//     const content = container.find(".colors__content");

//     content.width(0);
// }

// const openItem = item => {
//     const openContent = item.find(".colors__content");
//     const reqWidth = mesureWidth;
    
//     item.addClass("colors__content--active");
//     openContent.width(reqWidth);
// }

// $(".colors__title").click(e => {
//     e.preventDefault();

//     const $this = $(e.currentTarget);
//     const item = $this.closest(".colors__item");

//     openItem(item);
// });


// player

let vid = document.getElementById("player__video");
const playerContainer = $(".player");

$(".player__sp, .player-play, .player__splash, #player__video").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      vid.pause();
      playerContainer.removeClass("player--active");
    } else {
      playerContainer.addClass("paused");
      vid.play();
      playerContainer.addClass("player--active");
    }

});


$(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (vid.duration / 100) * newButtonPositionPercent;
    
    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });
    
    vid.currentTime = newPlaybackPositionSec;
});

   
const onPlayerReady = () => {
 let interval;
 const durationSec = vid.duration;
  
if (typeof interval !== "undefined") {
   clearInterval(interval);
}
 
const completedSec = () => {
    vid.currentTime;
}


interval = setInterval(() => {
  const completedSec = vid.currentTime;
  const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
        left: `${completedPercent}%`
    });

    $(".playback__width").css({
        width: `${completedPercent}%`
    });

}, 1000);
};

onPlayerReady();

const allVolume = $(".allVolume");
allVolume.click(e => {
    e.preventDefault();
  
    if (allVolume.hasClass("volumeOff")) {
        allVolume.removeClass("volumeOff");
      vid.muted = false;
    } else {
        allVolume.addClass("volumeOff");
      vid.muted = true;
    }
});


$(".volume__bar").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;

    vid.volume = newButtonPositionPercent/100;

    $(".volume__button").css({
        left: `${newButtonPositionPercent}%`
    });

    $(".volume__width").css({
        width: `${newButtonPositionPercent}%`
    });

    if (newButtonPositionPercent === 0) {
        allVolume.addClass("volumeOff");
    } else {
        allVolume.removeClass("volumeOff");
    }
});



// OPS

const section = $("section");
const display = $(".maincontent");
const fixNav = $(".fix-nav");
const menuItems = fixNav.find(".fix-nav__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.first().addClass("active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if(isNaN(position)) {
        console.log("передано неверное значение в countSectionPosition")
        return 0;
    }

    return position;
}

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-fixNav-theme");
    const activeClass = "fix-nav--white";

    if (menuTheme === "white") {
        fixNav.addClass(activeClass);
    } else {
        fixNav.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemsEq, activeClass) => {
    items.eq(itemsEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

    if(inScroll) return;

        const transitionOver = 1000;
        const mouseInertionOver = 300;

        inScroll = true;
        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });
    
        resetActiveClassForItem(section, sectionEq, "active");

        setTimeout(() => {
            inScroll = false;
            
            resetActiveClassForItem(menuItems, sectionEq, "fix-nav__item--active");
            
        }, transitionOver + mouseInertionOver);
    
}

const viewportScroller = () => {
    const activeSection = section.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if(nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if(prevSection.length) {
                performTransition(prevSection.index());
            }
        }
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if(deltaY > 0) {
        scroller.next();
    }
    
    if(deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e =>{

    const tagName = e.target.tagName.toLowerCase();
    const userTypeingInInputs = tagName === "input" || tagName === "textarea";
    const scroller = viewportScroller();

    if (userTypeingInInputs) return;

    switch (e.keyCode) {
        case 38:
            viewportScroller("prev");
            break;

        case 40:
            viewportScroller("next");
            break;
    }

});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});

if(isMobile) {
    $("body").swipe({
        swipe: function(event, direction) {
                const scroller = viewportScroller();
                let scrollDirection = "";
    
                if(direction === "up") scrollDirection = "next";
                if(direction === "down") scrollDirection = "prev";
    
                scroller[scrollDirection]();
            }
    });    
}



// map

let myMap;
 
const init = () => {
 myMap = new ymaps.Map("map", {
            center: [55.749771, 37.600128],
            zoom: 14,
            controls: [],
        });
     
    const coords = [
        [55.742863, 37.581273],
        [55.758417, 37.583148],
        [55.750153, 37.604501],
        [55.755447, 37.617683]
    ];

const myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/content/marker.svg',
        iconImageSize: [58, 73],
        iconImageOffset: [-3, -42],
        draggable: false
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
      })
      
      myMap.geoObjects.add(myCollection);

      myMap.behaviors.disable('scrollZoom');

     };


ymaps.ready(init);




})()