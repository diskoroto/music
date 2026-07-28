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

    const status=document.getElementById("status");

    const button=document.getElementById("open");

    button.href=album.spotify;

    let userClicked=false;

    button.addEventListener("click",()=>{

        userClicked=true;

    });

    // Intentar abrir Spotify

    setTimeout(()=>{

        location.href=album.uri;

    },300);

    // Mostrar botón

    setTimeout(()=>{

        status.textContent="Si Spotify no se abrió automáticamente, pulsa el botón.";

        button.style.display="inline-block";

    },2000);

    // Redirigir a Spotify Web

    setTimeout(()=>{

        if(!userClicked){

            location.href=album.spotify;

        }

    },5000);

})

.catch(error=>{

    document.body.innerHTML="<h2>"+error.message+"</h2>";

});
