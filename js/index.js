document.addEventListener('DOMContentLoaded', () => {

    const URL = "https://japceibal.github.io/japflix_api/movies-data.json" //url de json de peliculas
    const listabusqueda = []

    fetch(URL)
        .then(response => response.json())
        .then(responseData => {
            let data = responseData;
            listabusqueda.push(data);
            console.log(listabusqueda)
        })
        .catch(error => console.log('Error:', error));

    const btnsearch = document.getElementById('btnBuscar')

    btnsearch.addEventListener('click', () => {

        const inputsearch = document.getElementById("inputBuscar").value;
        const lista = document.getElementById("lista");
        lista.innerHTML = '';

        let busquedafiltrada = filtradobusqueda(listabusqueda, inputsearch)
        console.log(busquedafiltrada)
    });
});

function filtradobusqueda(lista, busqueda) {
    return lista.filter(movies => {
        return movies.some(movie => movie.genres[0].toLowerCase().includes(busqueda) || movie.tagline.toLowerCase().includes(busqueda) ||
            movie.title.toLowerCase().includes(busqueda) || movie.overview.toLowerCase().includes(busqueda));
    });

}

busqueda.addEventListener('input', () => { // Evento input para búsqueda
    let inputtext = busqueda.value.trim().toLowerCase(); // Tomamos el valor de la búsqueda, lo convertimos a minúsculas y eliminamos espacios en blanco al principio y al final
    if (inputtext === '') {
        contenedor.innerHTML = ``;
    } else {
        let busquedafiltrada = filtradobusqueda(listabusqueda, inputtext); // Pasamos como argumentos la lista que tiene los datos de las categorías y también el valor del input de búsqueda
        console.log(busquedafiltrada); // Mostramos en la consola todas las categorías que contienen productos filtrados
        hojaBusqueda(busquedafiltrada);
    }
});