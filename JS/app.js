document.addEventListener("DOMContentLoaded", () => {
  
    fetch('DATA/platos.json')
        .then((respuesta) => {
          return respuesta.json()
        })
        .then ((data) => {
           visualizarLaCarta(data, contenedorPlatos);
           var menuSinTacc = data.filter((menu) => menu.sinTACC === true);
           visualizarLaCarta(menuSinTacc, contenedorPlatosSinTacc);
           var menuVeggie = data.filter((menu) => menu.vegetariano === true);
           visualizarLaCarta(menuVeggie, contenedorPlatosVeggies);
        })
        .catch((error) => {
          "Poner Error con SweetAlert"
        })
  })



botonDeVaciado.addEventListener('click', borrarLaCuenta);