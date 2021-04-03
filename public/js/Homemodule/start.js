window.addEventListener('load', () => {
    const collage = document.getElementById('collagediv');
    const collageScrollWidth = collage.offsetWidth;
    console.log(collageScrollWidth);

    self.setInterval(() => {
        if (collage.scrollLeft < Math.floor(collageScrollWidth)) {
            collage.scrollBy(10,0);
        }else{
            collage.scrollTo(0,0);
        }
    }, 220);
});