(function() {
    const toggleMenuButton = document.querySelector('.burger');

    toggleMenuButton.addEventListener('click', () => {
        const menu = document.querySelector('.navigation');
        const burgerToggle = document.querySelector('.burger__toggle');
        console.log('ss')

        menu.classList.toggle('navigation--toggle');
        burgerToggle.classList.toggle('burger__toggle--hide')
    });
})();