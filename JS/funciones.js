// Función para visualizar el menú disponible para pedir.

function visualizarLaCarta(platosDisponibles, contenedorACompletar) {
    platosDisponibles.forEach(plato => {
        contenedorACompletar.innerHTML += `
            <div class="platos-container card" style="width: 16rem">
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

function agregarALaCuenta(id) {

    fetch('DATA/platos.json')
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((data) => {
            const plato = data.find(plato => plato.ID == id);
            if (cuentita[plato.ID]) {
                cuentita[plato.ID].cantidad += 1;
            } else {
                cuentita[plato.ID] = {
                    cantidad: 1,
                    comida: plato
                };
            }
            mostrarCuenta();
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal en la carga del Plato a la cuenta",
            });
        })
}

// Función para mostrar la cuenta final de todos los pedidos de una mesa.

function mostrarCuenta() {
    const cuentaFinal = document.getElementById('cuenta-final');
    cuentaFinal.innerHTML = '<h2>Cuenta Final:</h2>';
    Object.keys(cuentita).forEach(idPlato => {
        cuentaFinal.innerHTML += `
        <p> ${cuentita[idPlato].cantidad} \t X \t ${cuentita[idPlato].comida.nombre} \t $${cuentita[idPlato].comida.precio} \t <button onclick = "eliminarPlato(${idPlato})">❌</button> </p>
        `;
    })
    cuentaFinal.innerHTML += `
            <h3>Total de la Cuenta: $${totalDeLaCuenta()}</h3>
        `;
    sincronizarStorage();
}

function eliminarPlato(id) {
    if (cuentita[id]) {
        cuentita[id].cantidad -= 1;
    }
    if (cuentita[id].cantidad == 0) {
        delete cuentita[id];
    }
    mostrarCuenta();
}

// Calcular el total de la cuenta

function totalDeLaCuenta() {
    let suma = 0;
    Object.keys(cuentita).forEach(idPlato => {
        suma += cuentita[idPlato].comida.precio * cuentita[idPlato].cantidad;
    })
    return suma;
}

function borrarLaCuenta() {
    while (cuentaFinal.firstChild) {
        cuentaFinal.removeChild(cuentaFinal.firstChild);
    }
    localStorage.clear();
    cuentaFinal.innerHTML += `
            <h3>Total de la Cuenta: $${0}</h3>
        `;
    Swal.fire({
        title: "Cuenta Cerrada",
        text: "Cuenta cerrada Satisfactoriamente",
        icon: "success"
    });
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
    localStorage.setItem('cuentaFinal', JSON.stringify(cuentita));
}

window.addEventListener("DOMContentLoaded", () => {
    cuentita = JSON.parse(localStorage.getItem("cuentaFinal")) || {};
    mostrarCuenta();
});