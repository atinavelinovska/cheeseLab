document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;

    let currentIndex = 3;

    //da se slike pokazejo naprej da ni samo do 5 in prazno
    for (let i = 0; i < 3; i++) {
        const cloneFirst = carouselItems[i].cloneNode(true);
        const cloneLast = carouselItems[totalItems - 1 - i].cloneNode(true);
        carouselContainer.appendChild(cloneFirst);
        carouselContainer.insertBefore(cloneLast, carouselItems[0]);
    }

    // navezuje se na to drugo
    const updatedTotalItems = totalItems + 6;

    
    carouselContainer.style.transform = `translateX(-${100 * (currentIndex - 1) / 3}%)`;

    function showNextItem() {
        currentIndex++;
        updateCarousel();
    }

    function showPrevItem() {
        currentIndex--;
        updateCarousel();
    }

    function updateCarousel() {
        carouselContainer.style.transition = 'transform 0.5s ease';
        const transformValue = -currentIndex * (100 / 3); // 33.33% za vsako
        carouselContainer.style.transform = `translateX(${transformValue}%)`;

        //neprekidni loop, da ne gre nazaj
        carouselContainer.addEventListener('transitionend', handleTransitionEnd);
    }

    function handleTransitionEnd() {
        if (currentIndex >= updatedTotalItems - 3) {
            carouselContainer.style.transition = 'none';
            currentIndex = 3; // Jump to the first real item
            const transformValue = -currentIndex * (100 / 3);
            carouselContainer.style.transform = `translateX(${transformValue}%)`;
        } else if (currentIndex <= 2) {
            carouselContainer.style.transition = 'none';
            currentIndex = totalItems + 2; // Jump to the last real item
            const transformValue = -currentIndex * (100 / 3);
            carouselContainer.style.transform = `translateX(${transformValue}%)`;
        }
        
        carouselContainer.removeEventListener('transitionend', handleTransitionEnd);
    }

    setInterval(showNextItem, 3000);
});
