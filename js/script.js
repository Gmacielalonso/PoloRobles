window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) { // Cambia 100 por el número de píxeles que deseas
        header.classList.add('sticky', 'active');
    } else {
        header.classList.remove('sticky', 'active');
    }
});
