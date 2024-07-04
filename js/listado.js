import { API } from './config.js'



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTI2ZDgzMDU2NjMzNmJhNmU4Mzc2NGIyZjZiZmI2MSIsInN1YiI6IjY1Y2U2NDA0MTNhMzg4MDE4NzlmNjBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZTxSjr1fLqIi2LSwadmPT37grY2IF6y3d4LUHLbEmE'
    }
}

const obtenerItems = async () => {

    const resultado = await fetch(`${API}/items`, options)
    const data = await resultado.json()

    // const objetos = data.results
    const objetos = data
    console.log(objetos)
    // Seleccionar el contenedor donde se mostrarán los objetos
    let divObjetos = document.querySelector('#objetos')

    // Iterar sobre cada objeto y crear su elemento HTML
    for (let i = 0; i < objetos.length; i++) {
        // Crear el HTML para el item actual
        const ItemAInsertar =`
        <div class="objeto">
                <figure>
                    <a href="#" target="_blank">
                    <img src="${API}/static/img/${objetos[i].slide1}" width="250" alt="">
                </a>
                </figure>
                <div class="info-producto">
                    <h2 class='nombre'>${objetos[i].nombre}</h2>
                    <p class="precio">${objetos[i].precio}</p>
                </div>
            </div>
        
        `

        // Insertar el HTML del objeto en el contenedor
        divObjetos.insertAdjacentHTML('beforeend', ItemAInsertar)
    }
    if (objetos.length === 0) {
        divObjetos.insertAdjacentHTML('beforeend', "<p>No hay objetos en el sistema</p>")
    }
}


obtenerItems()
