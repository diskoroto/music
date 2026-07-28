// Obtener el nombre del álbum desde la URL

const params = new URLSearchParams(window.location.search);

const albumId = params.get("album");

if(!albumId){

    document.body.innerHTML="<h2>No se indicó ningún álbum.</h2>";

    throw new Error("Sin parámetro album");

}

// Leer el JSON del álbum

fetch("albums/" + albumId + ".json")

.then(response=>{

    if(!response.ok){

        throw new Error("Álbum no encontrado.");

    }

    return response.json();

})

.then(album=>{

    document.getElementById("title").textContent=album.title;

    document.getElementById("artist").textContent=album.artist;

    document.getElementById("cover").src=album.cover;
    document.getElementById("background").style.backgroundImage =
`url(${album.cover})`;

    const status=document.getElementById("status");
    
    const bar=document.getElementById("bar");

    const button=document.getElementById("open");

    button.href=album.spotify;

    let userClicked=false;

    button.addEventListener("click",()=>{

        userClicked=true;

    });

    // Intentar abrir Spotify

    setTimeout(()=>{
    
        bar.style.width="30%";
    
        location.href=album.uri;
    
    },3000);

    // Mostrar botón

    setTimeout(()=>{
    
        bar.style.width="70%";
    
        status.textContent="Si Spotify no se abrió automáticamente, pulsa el botón.";
    
        button.style.display="inline-block";
    
    },5000);

    // Redirigir a Spotify Web

    setTimeout(()=>{
    
        if(!userClicked){
    
            bar.style.width="100%";
    
            location.href=album.spotify;
    
        }
    
    },7000);

})

.catch(error=>{

    document.body.innerHTML="<h2>"+error.message+"</h2>";

});
