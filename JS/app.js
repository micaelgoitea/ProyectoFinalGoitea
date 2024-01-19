const contenedorPlatos = document.getElementById('contenedor-platos');
const contenedorPlatosSinTacc = document.getElementById('contenedor-platos-sintacc');
const contenedorPlatosVeggies = document.getElementById('contenedor-platos-vegetarianos');
const cuentaFinal = document.querySelector("#cuenta-final");
const botonDeVaciado = document.getElementById('vaciar-cuenta');
botonDeVaciado.addEventListener('click', borrarLaCuenta);
let cuentita = {};

document.addEventListener("DOMContentLoaded", () => {

  fetch('DATA/platos.json')
    .then((respuesta) => {
      return respuesta.json()
    })
    .then((data) => {
      visualizarLaCarta(data, contenedorPlatos);
      var menuSinTacc = data.filter((menu) => menu.sinTACC === true);
      visualizarLaCarta(menuSinTacc, contenedorPlatosSinTacc);
      var menuVeggie = data.filter((menu) => menu.vegetariano === true);
      visualizarLaCarta(menuVeggie, contenedorPlatosVeggies);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal en la carga del Menú",
      });
    })
})


