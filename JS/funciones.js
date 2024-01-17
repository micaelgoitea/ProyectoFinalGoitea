// Función para visualizar el menú disponible para pedir.


function visualizarLaCarta (platosDisponibles, contenedorACompletar){
    console.log(platosDisponibles);
    platosDisponibles.forEach(plato => {
        contenedorACompletar.innerHTML += `
            <div class="platos-container class="card" style="width: 16rem;">
                <img src="${plato.img}" />
                <h4>${plato.nombre}</h4>
                <p>$${plato.precio}</p>
                <p>Valoracion: ${plato.valoración}</p>
                <p>${plato.tipoDeCocina}</p>
                <p>${plato.descripcion}</p>
                
                <button onclick = "agregarALaCuenta(${plato.ID})">Agregar a la Cuenta</button>
            </div>
        `;
    });
}

// Función para agregar a la cuenta el Plato que fue clickeado con "Agregar a la Cuenta"



function agregarALaCuenta (id) {
    
    fetch('DATA/platos.json')
        .then((respuesta) => {
          return respuesta.json()
        })
        .then ((data) => {
                const plato = data.find(plato => plato.ID == id);
                cuenta.push(plato);
                mostrarCuenta();
        })
        .catch((error) => {
          "Poner Error con SweetAlert"
        })

}


// Función para mostrar la cuenta final de todos los pedidos de una mesa.

function mostrarCuenta() {
    const cuentaFinal = document.getElementById('cuenta-final');
    cuentaFinal.innerHTML = '<h2>Cuenta Final:</h2>';
    cuenta.forEach(plato => {
        cuentaFinal.innerHTML += `
            <p>${plato.nombre} \t $${plato.precio}</p>
        `;
    });
    cuentaFinal.innerHTML += `
            <h3>Total de la Cuenta: $${totalDeLaCuenta()}</h3>
        `;
    sincronizarStorage();
}

// Calcular el total de la cuenta

function totalDeLaCuenta() {
    let suma = 0;
    for (const plato of cuenta) {
        suma += plato.precio;
    }
    return suma;
}

function borrarLaCuenta() {
    localStorage.clear();
}

// Array Method para filtrar y obtener solo la comida apta para celíacos.

let sinTACC = true;
let vegetariana = true;

function filtrarComidaSinTACC(plato) {
    if (sinTACC) {
        return plato.sinTACC === true;
    } else {
        return plato;
    }
}

function comidaParaCeliacos() {
    return menuDeComida.filter(filtrarComidaSinTACC);
}

// Array method para filtrar la comida para vegetarianos.

function filtrarComidaVegetariana(plato) {
    if (vegetariana) {
        return plato.vegetariano === true;
    } else {
        return plato;
    }
}

// Array method para filtrar la comida para vegetarianos y celíacos.

function comidaParaCeliacosYVegetarianos() {
    return menuDeComida.filter(filtrarComidaSinTACC).filter(filtrarComidaVegetariana);
}

// Búsqueda del Plato mas económico

function platoMasEconomico(listaDeComida) {

    var valorMasEconomico = listaDeComida[0].precio;
    var platoDeMenorValor = listaDeComida[0].nombre;

    for (var i = 1; i < listaDeComida.length; i++) {
        if (listaDeComida[i].precio < valorMasEconomico) {
            valorMasEconomico = listaDeComida[i].precio;
            platoDeMenorValor = listaDeComida[i].nombre;
        }
    }
}

function sincronizarStorage() {
    localStorage.setItem('cuentaFinal', JSON.stringify(cuenta));
}

window.addEventListener("DOMContentLoaded", () => {
    cuenta = JSON.parse(localStorage.getItem("cuentaFinal")) || [];
    mostrarCuenta();
});