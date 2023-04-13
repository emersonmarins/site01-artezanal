"use strict"
const slide_wrapper = document.querySelector('[data-slide="slide-wrapper"]');
const slide_list = document.querySelector('[data-slide="slide-list"]');
const slide_btn_previous = document.querySelector('[data-slide="nav-previous-button"]');
const slide_btn_next = document.querySelector('[data-slide="nav-next-button"]');
const controls_wrapper = document.querySelector('[data-slide="controls-wrapper"]');
let slide_item_array = document.querySelectorAll('[data-slide="slide-item"]');
console.log(slide_item_array)
let controls_buttons;
let setSlideInterval;

const state = {
    starting_point: 0,
    current_point: 0,
    movement_point: 0,
    saved_position: 0,
    current_slide_index: 0,
    position: 0,
    timeInterval: 0,
    autoPlay: true,
    width_view_port: 1200
}

function createButtons() {
    console.log(slide_item_array.length);
    slide_item_array.forEach((element, index) => {

        let btn = document.createElement("button");
        btn.setAttribute("class", "slide-control-button fa-sharp fa-solid fa-circle");
        btn.dataset.slide = "control-button";
        btn.dataset.index = index;

        controls_wrapper.append(btn);

    });

    controls_buttons = document.querySelectorAll('[data-slide="control-button"]');

};

function createClones() {
    let firstSlide = slide_item_array[0].cloneNode(true);
    firstSlide.classList.add("slide-cloned");
    firstSlide.dataset.index = "-1";
    let secondSlide = slide_item_array[1].cloneNode(true);
    secondSlide.classList.add("slide-cloned");
    secondSlide.dataset.index = "-2";
    let thirdSlide = slide_item_array[2].cloneNode(true);
    thirdSlide.classList.add("slide-cloned");
    thirdSlide.dataset.index = "-3";

    let lastSlide = slide_item_array[slide_item_array.length - 1].cloneNode(true);
    lastSlide.classList.add("slide-cloned");
    lastSlide.dataset.index = `${slide_item_array.length - 1}`;
    let penultimateSlide = slide_item_array[slide_item_array.length - 2].cloneNode(true);
    penultimateSlide.classList.add("slide-cloned");
    penultimateSlide.dataset.index = `${slide_item_array.length - 2}`;
    let antepenultimate = slide_item_array[slide_item_array.length - 3].cloneNode(true);
    antepenultimate.classList.add("slide-cloned");
    antepenultimate.dataset.index = `${slide_item_array.length - 3}`;

    slide_list.append(firstSlide);
    slide_list.append(secondSlide);
    slide_list.append(thirdSlide);

    slide_list.prepend(lastSlide);
    slide_list.prepend(penultimateSlide);
    slide_list.prepend(antepenultimate)

    slide_item_array = document.querySelectorAll('[data-slide="slide-item"]');

}

function adaptingViewPort() {
    state.width_view_port = slide_item_array[1].offsetWidth;
    translateX(-(slide_item_array[1].offsetWidth * state.current_slide_index));
}

function setSlideVisible({ index, animate }) {

    console.log(index)
    if (index == slide_item_array.length - 1 || index == slide_item_array.length - 2 || index == slide_item_array.length - 3 ) {
        index = slide_item_array.length - 4;
    } else if (index == 0 || index == 1) {
        index = 1;

    }

    slide_list.style.transition = animate ? `transform 0.5s` : `none`;
    translateX(-(slide_item_array[1].offsetWidth * index));
    state.current_slide_index = index;
    slide_item_array[1].offsetWidth * index;
    setModifier();



}

function translateX(position) {
   
    slide_list.style.transform = `translateX(${position}px)`;
    state.saved_position = position;
}

function nextSlide() {
    setSlideVisible({ index: state.current_slide_index + 1, animate: true });

}

function previousSlide() {
    setSlideVisible({ index: state.current_slide_index - 1, animate: true });

}

function mouseDown(event, index) {
    if(state.current_slide_index + 1 == index){
        console.log("opa tome cuidado");
    }
    slide_list.style.transition = `none`;
    const slide_item = event.currentTarget;
    state.starting_point = event.clientX;
    state.current_point = state.starting_point - state.saved_position;
    state.current_slide_index = index;
    slide_item.addEventListener("mousemove", mouseMove);
    slide_item.addEventListener("touchmove", touchMove);

}

function mouseMove(event) {

    state.movement_point = event.clientX - state.starting_point;
    state.position = event.clientX - state.current_point;
    translateX(state.position);

}

function removeMoviment(event) {
    const slide_item = event.currentTarget;
    slide_item.removeEventListener("mousemove", mouseMove);
    slide_item.removeEventListener("touchmove", touchMove);
    slide_item_array.forEach(element => {
        element.removeEventListener("mousemove", mouseMove);
        element.removeEventListener("touchmove", touchMove);
    });
}

function mouseUp(event) {
    removeMoviment(event);
    let pointsToMove = event.type.includes('touch') ? 50 : 150;

    if (state.movement_point < -pointsToMove) {
        console.log(state.width_view_port)
        if (state.width_view_port < 481) {
            nextSlide();
        }else {
            setSlideVisible({ index: state.current_slide_index, animate: true });
        }

    } else if (state.movement_point > pointsToMove) {
        if (state.width_view_port < 481) {
            previousSlide();
        } else {
            setSlideVisible({ index: state.current_slide_index -2, animate: true });
        }
    } else {

        setSlideVisible({ index: state.current_slide_index, animate: true });

    }

}

function touchStart(event, index) {
    event.clientX = event.touches[0].clientX;
    mouseDown(event, index)
}

function touchMove(event) {
    event.clientX = event.touches[0].clientX;
    mouseMove(event);
}

function touchEnd(event) {
    mouseUp(event);
}

function setModifier() {

    controls_buttons.forEach((element, index) => {

        if ((index + 2) == state.current_slide_index) {
            element.classList.add("select");
        } else {
            element.classList.remove("select");
        }
    })
};

function slideTransitionEnd() {

    if (state.current_slide_index === slide_item_array.length - 4) {
        setSlideVisible({ index: 2, animate: false });
    } else if (state.current_slide_index === 1) {
        setSlideVisible({ index: slide_item_array.length - 5, animate: false });
    }
}

function setAutoPlay() {
    if (state.autoPlay) {
        setSlideInterval = setInterval(function () {
            setSlideVisible({index: state.current_slide_index + 1, animate: true});
        },state.timeInterval);
    }
}

function setListeners() {

    controls_buttons.forEach((element, index) => {
        element.addEventListener("click", event => {
            setSlideVisible({ index: (index + 2), animate: true });
            setModifier();
        });

    });

    slide_item_array.forEach((slide_item, index) => {
        slide_item.addEventListener("dragstart", e => e.preventDefault());
        slide_item.addEventListener("mousedown", event => mouseDown(event, index));
        slide_item.addEventListener("mouseup", event => mouseUp(event));

        // function testMove() {
        //     state.movement_point = (event.clientX - state.starting_point);
        //     console.log(state.movement_point)
        //     state.saved_position = state.movement_point;
        //     slide_list.style.transform = `translateX(${state.movement_point}px)`;   
        // }

        // slide_item.addEventListener("mousedown", event => {
        //     state.current_slide_index = event.currentTarget.dataset.index;
        //     state.starting_point = event.clientX;
        //     let slideMove = event.currentTarget;
        //     slideMove.addEventListener('mousemove', testMove)
        // });

        // slide_item.addEventListener("mouseup", event => {
        //     state.starting_point = event.clientX;
        //     let slideMove = event.currentTarget;
        //     slideMove.removeEventListener('mousemove', testMove);
        // });

        slide_item.addEventListener("touchstart", event => touchStart(event, index));
        slide_item.addEventListener("touchend", event => touchEnd(event));
    })

    slide_btn_previous.addEventListener("click", previousSlide);
    slide_btn_next.addEventListener("click", nextSlide);
    slide_list.addEventListener("transitionend", slideTransitionEnd);
    window.addEventListener("resize", adaptingViewPort);
    slide_wrapper.addEventListener("mouseenter", () => {clearInterval(setSlideInterval)});
    slide_wrapper.addEventListener("mouseleave", function () {setAutoPlay()});

}

function callFunctions({startSlideIndex = 0, autoPlay = true, timeInterval = 3000}) {
    state.timeInterval = timeInterval;
    state.autoPlay = autoPlay;
    createButtons();
    createClones();
    setListeners();
    setSlideVisible({ index: startSlideIndex + 4, animate: true });
    setAutoPlay();
}
