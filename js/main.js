//VARIABLES
const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoValido = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
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

const validateForm = () => {
  const nombre = document.forms["contacto"]["nombre"]
  const correo = document.forms["contacto"]["correo"]
  const telefono = document.forms["contacto"]["telefono"]
  const mensaje = document.forms["contacto"]["mensaje"]

  if (!nombre.value) {
    return noValido(nombre, 'El nombre no puede ser vacio')
  } else if (nombre.value.length < 4) {
    return noValido(nombre, 'El nombre es muy corto')
  } else {
    resultado.style.display = "none";
    const div = document.getElementById(`div-${nombre.id}`);
    div.removeChild(div.lastChild)
    console.log(nombre.value);
  }

  if (!correo.value) {
    return noValido(correo, 'El correo no puede estar vacio')
  } else if (!correoValido.test(correo.value)) {
    return noValido(correo, 'El correo no es valido')
  } else {
    const div = document.getElementById(`div-${correo.id}`);
    div.removeChild(div.lastChild)
    console.log(correo.value);
  }

  if (!telefono.value) {
    return noValido(telefono, 'El telefono no puede estar vacio')
  } else if (!telefonoValido.test(telefono.value)) {
    return noValido(telefono, 'El telefono no es valido')
  } else {
    const div = document.getElementById(`div-${telefono.id}`);
    div.removeChild(div.lastChild)
    console.log(telefono.value);
  }

  if (!mensaje.value) {
    return noValido(mensaje, 'El mensaje no puede ser vacio')
  } else if (mensaje.value.length < 15) {
    return noValido(mensaje, 'El mensaje es muy corto')
  } else {
    const div = document.getElementById(`div-${mensaje.id}`);
    div.removeChild(div.lastChild)
    console.log(mensaje.value);
  }
  resultado.innerHTML = "<span>Te suscribiste correctamente </span>";
  resultado.style.color = "green";
  resultado.style.backgroundColor = "rgba(122, 245, 147, 0.5)";
  resultado.style.border = "green solid 2px";
  resultado.style.display = "block";
}

const noValido = (campo, mensaje) => {
  const div = document.getElementById('resultado');
  const contenido = document.createTextNode(mensaje);
  div.appendChild(contenido);
  resultado.style.display = "block";
  campo.focus();
  return false;
}

document.getElementById('formReset').addEventListener('click', function () {
  resultado.style.display = "none";
  nombre.focus();
})

