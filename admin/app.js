const cover=document.getElementById("cover");

const preview=document.getElementById("preview");

cover.addEventListener("change",()=>{

    const file=cover.files[0];

    if(!file) return;

    preview.src=URL.createObjectURL(file);

    preview.style.display="block";

});
