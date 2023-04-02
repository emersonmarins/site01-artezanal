const slide_list = document.querySelector('[data-slide="slide-list"]');
const slide_item_array = document.querySelectorAll('[data-slide="slide-item"]');
const slide_btn_previous = document.querySelector('[data-slide="nav-previous-button"]');
const slide_btn_next = document.querySelector('[data-slide="nav-next-button"]');
const controls_wrapper = document.querySelectorAll('[data-slide="controls-wrapper"]');

const state = {
    starting_point: 0,
    current_point: 0,
    movement_point:0,
    salved_position: 0,
    current_slide_index: 0
}
function mouseDown(event, index) {
    const slide_item = event.currentTarget;
    state.starting_point = event.clientX;
    state.current_slide_index = index;
    slide_item.addEventListener("mousemove", mouseMove)
    // console.log("Slide de número: "+index);


}

function mouseMove(event) {
    state.movement_point = event.clientX - state.starting_point;
    state.current_point = event.clientX - state.starting_point;
    state.current_point += state.salved_position;

    slide_list.style.transform = `translateX(${state.current_point}px)`;

}

function mouseUp(event) {
    state.salved_position = state.current_point;
    const slide_item = event.currentTarget;
    slide_item.removeEventListener("mousemove", mouseMove)
    const slide_width = (event.target.width * 0.15);
    console.log(slide_width + " comparação " + state.current_point)
   
    if (state.movement_point < -slide_width) {
        state.current_slide_index++;
        let slide_next = (event.target.width * state.current_slide_index) + (20 * state.current_slide_index);
        slide_list.style.transform = `translateX(${-(slide_next)}px)`;
        state.salved_position = -slide_next;
        
        // console.log("novimentou: "+state.current_point)
    } else if (state.movement_point > -slide_width) {
        console.log("voltou olha olha")
        // state.current_slide_index-1;
        state.current_slide_index--;
        let slide_next = (event.target.width * state.current_slide_index) + (20 * state.current_slide_index);
        slide_list.style.transform = `translateX(${-(slide_next)}px)`;
        state.salved_position = -slide_next;
        
        
    }

}

slide_item_array.forEach((slide_item, index) => {
    slide_item.addEventListener("dragstart", e => e.preventDefault());
    slide_item.addEventListener("mousedown", event => mouseDown(event, index));
    slide_item.addEventListener("mouseup", mouseUp);
})





  // console.log(event)
    // if (current_point >= 60) current_point = -((event.target.width * slide_item_array.length) * 0.955);
    // if (current_point <= -8470) current_point = 0;