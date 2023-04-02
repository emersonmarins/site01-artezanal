
(async() => {

    const slide_list = document.querySelector('[data-slide="slide-list"]');
    
    console.log('hello')

    for (let index = 0; index < 10; index++) {
    
    
        let slide_item = document.createElement('div');
        let slide_content = document.createElement('div');
        let slide_img = document.createElement('img');
        let slide_description = document.createElement('div');
        let slide_title = document.createElement('h3');
        let slide_text = document.createElement('p');
        
        
        slide_item.setAttribute('class', 'slide-item');
        slide_item.setAttribute('data-slide', 'slide-item');
        slide_content.setAttribute('class', 'slide-content');
        slide_content.setAttribute('data-slide', 'slide-content');
    
        slide_img.setAttribute('class', 'slide-img');
        slide_img.setAttribute('data-slide', 'slide-img');
        slide_img.setAttribute('src', `../img/products/sabonete0${index}.webp`);
        slide_img.setAttribute('alt', 'imagem-sabonete');
    
        slide_description.setAttribute('class', 'slide-description');
        slide_description.setAttribute('data-slide', 'slide-description');
    
    
        slide_list.appendChild(slide_item);
        slide_item.appendChild(slide_content);
        slide_content.appendChild(slide_img);
        slide_content.appendChild(slide_description);
        slide_description.appendChild(slide_title);
        slide_description.appendChild(slide_text);
    
    };

})();



