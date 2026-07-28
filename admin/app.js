function slug(text){

    return text

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .replace(/[^a-z0-9]+/g,"-")

        .replace(/^-|-$/g,"");

}

document.getElementById("generate").onclick=()=>{

    const artist=document.getElementById("artist").value;

    const album=document.getElementById("album").value;

    const spotify=document.getElementById("spotify").value;

    const image=document.getElementById("image").value;

    const id=

        slug(artist)+"-"+slug(album);

    const spotifyId=

        spotify.split("/album/")[1].split("?")[0];

    const json={

        title:album,

        artist:artist,

        cover:"covers/"+image,

        spotify:spotify,

        uri:"spotify:album:"+spotifyId

    };

    document.getElementById("filename").textContent=

        id+".json";

    document.getElementById("json").textContent=

        JSON.stringify(json,null,4);

    document.getElementById("url").textContent=

        "https://tillithh.github.io/music/?album="+id;

}
