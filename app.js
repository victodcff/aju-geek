const menuMobile =
    document.getElementById("menu-mobile");

const nav =
    document.querySelector("nav");

if (menuMobile) {

    menuMobile.addEventListener("click", () => {

        nav.classList.toggle("ativo");

    });

}