// Oculta todos los ítems excepto el que tiene el id que se pasa como argumento.
function updateVisibleContent(id) {
  // Actualiza los divs de contenido.
  const enlaces = document.querySelectorAll('.tabs-tablist-item');
  const content = document.querySelectorAll('.tabs-content-item');
  for (let i = 0; i < content.length; i += 1) {
    content[i].classList.add('js-content-hidden');
    if
    (content[i].getAttribute('id') === id) {
      content[i].classList.remove('js-content-hidden');
    }
  }
  // Actualiza los enlaces, para mostrar como resaltado el que está seleccionado.
  for (let i = 0; i < enlaces.length; i += 1) {
    enlaces[i].classList.remove('js-active');
    if
    (enlaces[i].getAttribute('href').substring(1) === id) {
      enlaces[i].classList.add('js-active');
    }
  }
}
function clickHandler(event) {
  // Cancela el comportamiento default del enlace.
  event.preventDefault();
  // Obtiene el id del elemento que se mostrará.
  // Se usa el método substring(1) para eliminar el primer caracter ('#').
  const id = event.currentTarget.getAttribute('href').substring(1);
  // Llama a la función updateVisibleContent() para actualizar el componente.
  updateVisibleContent(id);
}
// Obtiene los enlaces.
const enlaces = document.querySelectorAll('.tabs-tablist-item');
// Obtiene los divs de contenido.
// Itera sobre los enlaces, registrando el manejador de los eventos click.
for (let i = 0; i < enlaces.length; i += 1) {
  enlaces[i].addEventListener('click', clickHandler);
}
// Oculta todos los elementos, excepto el primero.
// Se usa el método substring(1) para eliminar el primer caracter ('#').
updateVisibleContent(enlaces[0].getAttribute('href').substring(1));

// Slider
let counter = 1;
setInterval(() => {
  document.getElementById(`radio${counter}`).checked = true;
  counter += 1;
  if (counter > 5) {
    counter = 1;
  }
}, 8000);

// GIT HUB REPOS
const urlGit = 'https://api.github.com/users/alexguzman98/repos';
fetch(urlGit)
  .then((response) => response.json())
  .then((data) => {
    const listaGit = document.getElementById('lista-git');
    for (let i = 0; i < data.length; i += 1) {
    // Creo el li para la lista
      const lista = document.createElement('li');
      listaGit.appendChild(lista);
      // Agrego anchor y link para el repo correspondiente
      const nombreRepo = document.createElement('a');
      nombreRepo.setAttribute('href', `${data[i].html_url}`);
      nombreRepo.innerHTML = data[i].name;
      lista.appendChild(nombreRepo);
    }
  });

// Form
const abrirForm = document.getElementById('abrirForm');
abrirForm.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('userContent').style.display = 'none';
  document.getElementById('openForm').style.display = 'block';
});
// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 1000;

function getColor() {
  const r = 0;
  const g = 0;
  const b = 0;
  const Color = `rgb(${r}, ${g}, ${b})`;
  return Color;
}

class ParticleObject {
  constructor() {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = 5 * Math.random() - 2;
    this.vy = 4 * Math.random() - 2;
    this.color = getColor();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) {
      this.vx = +this.vx;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.vy = +this.vy;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numParticles; i += 1) {
    particles[i].update();
    particles[i].draw(ctx);
  }
  requestAnimationFrame(loop);
}

function initCanvas() {
  // Set Canvas width and height to window width and height.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Generate Particles
  for (let i = 0; i < numParticles; i += 1) {
    particles.push(new ParticleObject());
  }
  // Kick off animations
  loop();
}
initCanvas();
