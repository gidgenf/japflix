document.addEventListener('DOMContentLoaded', () => {
    const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
    const listabusqueda = [];
    let listafiltrado = [];
    let boton = document.getElementById('btnBuscar');
    let inputText = document.getElementById('inputBuscar'); // Mover la declaración aquí
    let boxMovie = document.getElementById('lista')
    fetch(URL)
        .then(response => response.json())
        .then(responseData => {
            let data = responseData;
            listabusqueda.push(...data);
        })
        .catch(error => console.log('Error:', error));

    function buscarPorAtributos(elemento) {
        const terminoBusqueda = inputText.value.toLowerCase(); // Mover la declaración aquí
        return (
            ( elemento.title.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            ( elemento.tagline.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            ( elemento.overview.toLowerCase().includes(terminoBusqueda.toLowerCase()))
            );
    }

    boton.addEventListener('click', () => {
        if(inputText.value){
        listafiltrado = listabusqueda.filter(buscarPorAtributos);
        showCards()
        console.log(listafiltrado);
        }
    });

    function stars(rating) {
        let starsHTML = ``;
    
        for (let i = 0; i < 5; i++) {
            if (i < Math.trunc(rating / 2)) {
                starsHTML += `<span class="fa fa-star checked"></span>`;
            } else {
                starsHTML += `<span class="fa fa-star"></span>`;
            }
        }
    
        return starsHTML;
    }
    
    function showCards() {
        boxMovie.innerHTML = ``;
        listafiltrado.forEach(element => {
            boxMovie.innerHTML += `<li> 
                <div class="card bg-dark">
                    <div class="card-header box-title leters">
                    <h4> ${element.title} ${stars(element.vote_average)}</h4>
                      <div class="dropdown">
                        <button class="btn btn-dark left dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                         more...
                         </button>
                      <ul class="bg-dark  dropdown-menu">
                       <li><a class="dropdown-item leters">Popularidad: ${element.popularity}</a></li>
                        <li><a class="dropdown-item leters" >Estreno: ${element.release_date}</a></li>
                        <li><a class="dropdown-item leters" >Duracion: ${element.runtime}</a></li>
                      </ul>
                </div>
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote leters mb-0">
                            <p>${element.overview}</p>
                            <footer class="blockquote-footer">${element.tagline} <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </div></li>`;
        });
    }
});
