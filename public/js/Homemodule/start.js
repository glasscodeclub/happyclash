let i = 0;

window.addEventListener('load', () => {
    const collage = document.getElementById('collagediv');
    const collageScrollWidth = collage.scrollWidth;

    self.setInterval(() => {
        if (collage.scrollLeft !== collageScrollWidth) {
            collage.scrollBy(10,0);
            i++;
        }else{
            collage.scrollTo(0,collage.offsetTop);
        }
        console.log(collage.scrollLeft);
    }, 15);
});