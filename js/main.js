"use strict";
//VARIABLES
const limpiarFormulario = document.getElementById("form");
const inputs = document.getElementsByClassName('formularioInput');

//MUESTRA INTRODUCCION
const contenedor = document.querySelector('.contenedor');
contenedor.innerHTML = explicacion;

//TOMA LOS SISTEMAS DE REFLEXOLOGIA CON UN JSON LOCAL
const url = './js/sistemas.json';
function mostrarSistemas() {
  const contentSistemas = document.querySelector('.sistemas');
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(sistemas => {
      sistemas.forEach(sistema => {
        if (sistema.id == 1) {
          contentSistemas.innerHTML +=
            `<div class="carousel-item active" id=sistema${sistema.id}>
            <div class="carousel-caption d-none d-md-block">
              <p style="background-color:rgba(0, 0, 0, 0.5);"><strong>${sistema.texto}</strong></p>
            </div>
          <img src=${sistema.imagen} class="d-block w-100 medidasImgH" alt="Reflexología podal">
          </div>`
        } else {
          contentSistemas.innerHTML +=
            `<div class="carousel-item" id=sistema${sistema.id}>
            <div class="carousel-caption d-none d-md-block">
              <p style="background-color:rgba(0, 0, 0, 0.5);"><strong>${sistema.texto}</strong></p>
            </div>
          <img src=${sistema.imagen} class="d-block w-100 medidasImgH" alt="Reflexología podal">
          </div>`
        }
      })
    })
    .catch(error => console.log(error))
}
mostrarSistemas();

//ARMA FAQS CON UN JSON LOCAL
function mostrarFaqs() {
  const urlFaqs = './js/faq.json';
  const contentFaqs = document.querySelector('.faq');
  fetch(urlFaqs).then(respuesta => respuesta.json()).then(faqs => {
    const contentFaqs = document.querySelector('.faq');
    for (let item of faqs) {
      contentFaqs.innerHTML +=
        `<li class='que'><img class=img src='./img/arrow.png' alt='flecha'>${item.pregunta}</li>
         <li class='ans'>${item.respuesta}</li>`;
    }
  }
  )
    .catch(error => console.log(error))
}
mostrarFaqs();

//MUESTRA RESPUESTAS ANIMADAS
const speed = 700;
document.getElementById('faq').addEventListener('click', function (e) {
  $(e.path[0]).next().slideToggle(speed).siblings('li.ans').slideUp();
  const img = $(e.path[0]).children('.img');
  img.toggleClass('rotate');
  $('.img').not(img).removeClass('rotate');
})

//FORMULARIO DE CONTACTO
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function () {
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add('fijar');
    } else {
      this.nextElementSibling.classList.remove('fijar');
    }
  })
}

// VALIDACION DEL FORMULARIO
const validar = (e) => {
  e.preventDefault();

  // VALIDACION DE NOMBRE VACIO
  if (nombre.value === "") {
    resultado.innerHTML = "<span>Debe completar el nombre de usuario </span>";
    resultado.style.display = "block";
    nombre.classList.add("error");
    nombre.focus();
    return false;
  }

  // VALIDACION DE CORREO VACIO Y CORRECTO
  if (correo.value === "") {
    resultado.innerHTML = "<span>Debe completar la direccion de email </span>";
    resultado.style.display = "block";
    correo.focus();
    return false;
  }

  if (!emailValido(correo.value)) {
    resultado.innerHTML = "<span>Debe escribir un email valido </span>";
    resultado.style.display = "block";
    return false;
  }

  // VALIDACION DE TELEFONO VACIO
  if (telefono.value === "") {
    resultado.innerHTML = "<span>Debe completar el telefono </span>";
    resultado.style.display = "block";
    telefono.focus();
    return false;
  }

  // VALIDACION DE MENSAJE VACIO
  if (mensaje.value === "") {
    resultado.innerHTML = "<span>Debe completar el mensaje </span>";
    resultado.style.display = "block";
    mensaje.classList.add("error");
    mensaje.focus();
    return false;
  }

  // SUSCRIPCION CORRECTA
  resultado.innerHTML = "<span>Te suscribiste correctamente </span>";
  resultado.style.color = "green";
  resultado.style.backgroundColor = "rgba(122, 245, 147, 0.5)";
  resultado.style.border = "green solid 2px";

  nombre.classList.remove("error");
  correo.classList.remove("error");
  telefono.classList.remove("error");
  mensaje.classList.remove("error");
  return true;
};

const emailValido = (email) => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); };

formSubmit.addEventListener("click", validar);

document.getElementById('formReset').addEventListener('click', function () {
  resultado.style.display = "none";
  // nombre.focus();
})
