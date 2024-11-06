const menu = document.querySelector('.menu');
const menuDesplegable = document.querySelector('.menu_desplegable');
menu.addEventListener('click', ()=>{
    menu.classList.toggle("active");
    menuDesplegable.classList.toggle("click");
})


