const inputTags = document.querySelectorAll(".input-data")

inputTags.forEach(inputElement => {
    const dropzoneElement = inputElement.closest(".drop-zone");
 
    dropzoneElement.addEventListener('click', e=>{
        inputElement.click(); 
    });

    inputElement.addEventListener('change', e=>{
        if(inputElement.files.length)
        {
            updateThumbnail(dropzoneElement, inputElement.files[0]);
        }
    })
 
 
    dropzoneElement.addEventListener("dragover", e =>{
        e.preventDefault();
        dropzoneElement.classList.add("solid");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropzoneElement.addEventListener(type, e=>{
            dropzoneElement.classList.remove("solid");
        });
    });

    dropzoneElement.addEventListener('drop', e=>{
        e.preventDefault();
        
        if(e.dataTransfer.files.length)
        {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropzoneElement, e.dataTransfer.files[0]);
        }

        dropzoneElement.classList.remove("solid");

    })

});

function updateThumbnail(dropzoneElement , file){
    let thumbnailElement = dropzoneElement.querySelector(".thumbnail");


    // First time Removes the text inside the drop zone
    if(dropzoneElement.querySelector(".drop-zone-text"))
    {
        dropzoneElement.querySelector(".drop-zone-text").remove();
    }

    // first time no thumbnail element exists.

    if(!thumbnailElement)
    {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("thumbnail");
        dropzoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;


    // For the thumbnail to show for videos.

    if(file.type.startsWith("video/")){
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log(reader.result)
            thumbnailElement.style.backgroundImage = `url('${ reader.result }')`; 
        };
    }
    else{
        thumbnailElement.style.backgroundImage = null;
    }
}