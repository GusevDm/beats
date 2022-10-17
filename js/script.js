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

    modal.removeClass("modal--error");

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
                console.log(data);
                content.text(data.message);
                Fancybox.show([{ 
                    src: "#modal", 
                    type: "inline" 
                }]);
            },
            
            error: (data) => {
                console.log(error.message);
                content.text(error.message);
                modal.addClass("modal--error");

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


