const cover = document.getElementById("cover");
const preview = document.getElementById("preview");

const artist = document.getElementById("artist");
const album = document.getElementById("album");
const spotify = document.getElementById("spotify");

const generate = document.getElementById("generate");

const filename = document.getElementById("filename");
const url = document.getElementById("url");
const json = document.getElementById("json");

// Vista previa de la imagen
cover.addEventListener("change", () => {

    const file = cover.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";

});

// Convierte texto en un identificador
function slug(text){

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");

}

generate.addEventListener("click",()=>{

    if(
        !artist.value ||
        !album.value ||
        !spotify.value ||
        !cover.files.length
    ){

        alert("Completa todos los campos.");

        return;

    }

    const id = slug(artist.value) + "-" + slug(album.value);

    const spotifyId = spotify.value
        .split("/album/")[1]
        .split("?")[0];

    const albumData = {

        title: album.value,

        artist: artist.value,

        cover: "covers/" + cover.files[0].name,

        spotify: spotify.value,

        uri: "spotify:album:" + spotifyId

    };

    filename.textContent = id + ".json";

    url.textContent =
        "https://diskoroto.github.io/music/?album=" + id;

    json.textContent =
        JSON.stringify(albumData, null, 4);

});

// Copiar JSON
document.getElementById("copyJson").addEventListener("click", async () => {

    const text = document.getElementById("json").textContent;

    if (!text) {
        alert("Primero genera un álbum.");
        return;
    }

    await navigator.clipboard.writeText(text);

    alert("JSON copiado.");

});

// Copiar URL
document.getElementById("copyUrl").addEventListener("click", async () => {

    const text = document.getElementById("url").textContent;

    if (!text) {
        alert("Primero genera un álbum.");
        return;
    }

    await navigator.clipboard.writeText(text);

    alert("URL copiada.");

});
