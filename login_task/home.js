const showImage = (event)=>{
    const img = event.target.files[0];
    const preview_image = document.getElementById("preview-image");

    if(img){
        preview_image.src = URL.createObjectURL(img)
        preview_image.style.display = "block"
    }
}