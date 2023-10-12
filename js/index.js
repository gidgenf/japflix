document.addEventListener('DOMContentLoaded', () => {
    const URL = "https://japceibal.github.io/japflix_api/movies-data.json"; //url de json de datos de peliculas

    const listabusqueda = [];
    let listafiltrado = [];
    let boton = document.getElementById('btnBuscar');
    let inputText = document.getElementById('inputBuscar');
    let boxMovie = document.getElementById('lista')

    fetch(URL)
        .then(response => response.json())
        .then(responseData => {
            let data = responseData;
            listabusqueda.push(...data);
        })
        .catch(error => console.log('Error:', error));

    function buscarPorAtributos(elemento) {  //se busca por medio de atributos titles tagline overview
        const terminoBusqueda = inputText.value.toLowerCase();
        return (
            ( elemento.title.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            ( elemento.tagline.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            ( elemento.overview.toLowerCase().includes(terminoBusqueda.toLowerCase()))
            );
    }

    boton.addEventListener('click', () => {  //evento click para boton
        if(inputText.value){
        listafiltrado = listabusqueda.filter(buscarPorAtributos);  //se iguala listafiltrado a la busqueda filtrada por atributos para usar luego
        console.log(listabusqueda)
        showCards()  //se muestran las tarjetas
        }else{
            boxMovie.innerHTML = ``  //en caso de no haber nada se limpia el contenido del html boxmovie
        }
    });

    function stars(rating) {  //funcion para las estrellas
        let starsHTML = ``;
    
        for (let i = 0; i < 5; i++) {
            if (i < Math.trunc(rating / 2)) {
                starsHTML += `<span class="fa fa-star checked"></span>`;
            } else {
                starsHTML += `<span class="fa fa-star"></span>`;
            }
        }
    
        return starsHTML;  //retorna un elemento html para representar las estrellas
    }

    function showCards() {  //funcion para mostrar las tarjetas
        boxMovie.innerHTML = ``;  //se vacia el contenedor del html

        if(listafiltrado<9){

        listafiltrado.forEach(element => {  //por cada una de las peliculas filtradas crea una tarjeta
            boxMovie.innerHTML += `<li> 
                <div class="card bg-dark">
                    <div class="card-header leters">
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
    }else{
        for (let index = 0; index < 8 ; index++) {
            const element = listafiltrado[index];
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
                    <li><a class="dropdown-item leters" >Duracion: ${element.runtime}h</a></li>
                    <li><a class="dropdown-item leters">presupuestos: ${element.budget}</a></li>
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
            
        }
    }
  }
});
