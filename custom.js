const siteLetters = document.querySelector('.side-right');
const sideLeft = document.querySelector('.side-left');
const searchLetters = document.querySelector(".search-letters");

const artista = document.querySelector(".artist");
const cancion = document.querySelector(".song");


searchLetters.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log(artista.value);
    console.log(cancion.value);

    if(artista.value === "" || cancion.value ===""){
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    callApiSong(artista.value, cancion.value);
})

function callApiSong(artista, cancion){
    fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if (data.lyrics) {
            const {lyrics} = data
            mostrarLetra(lyrics);
        }else{
            mostrarError("La letra de la canción no existe");
        }
    })
    .catch(error => {console.log(error)});
}

const mostrarLetra = (lyrics) => {
    siteLetters.innerHTML = ""
    const title = document.createElement("h3");
    title.innerHTML = `${cancion.value} de ${artista.value}`
    siteLetters.appendChild(title)

    const letra = document.createElement("p");
    letra.innerText = lyrics;
    siteLetters.append(letra);
}

const mostrarError=(mensaje)=>{
    const error = document.createElement("p");
    error.classList.add("error-mensaje");
    error.innerText = mensaje

    sideLeft.appendChild(error);

    setTimeout(()=>{
        error.remove();
    }, 2000)
}




