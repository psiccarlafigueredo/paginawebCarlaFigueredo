function abrirPopup(indice) {
  const contenido = [
    `<h3>Terapia Online</h3>
    <p>✔️ Comodidad desde tu casa<br>
    ✔️ Flexibilidad horaria<br>
    ✔️ Menor tiempo de traslado<br>
    ✔️ Mismo nivel de profundidad terapéutica</p>`,

    `<h3>Terapia Presencial</h3>
    <p>✔️ Mayor conexión personal<br>
    ✔️ Ambiente terapéutico seguro<br>`,

    `<h3>🌸</h3>
    <p>Próximamente más información o recursos para vos 🌷</p>`,
  ];

  document.getElementById("popup-texto").innerHTML = contenido[indice];
  document.getElementById("popup-contenido").style.display = "block";
}

function cerrarPopup() {
  document.getElementById("popup-contenido").style.display = "none";
}
function abrirPopup(indice) {
  const contenido = [
    `<h3>Terapia Online</h3>
    <p>✔️ Comodidad desde tu casa<br>
    ✔️ Flexibilidad horaria<br>
    ✔️ Menor tiempo de traslado<br>
    ✔️ Mismo nivel de profundidad terapéutica</p>`,

    `<h3>Terapia Presencial</h3>
    <p>✔️ Mayor conexión personal<br>
    ✔️ Ambiente terapéutico seguro<br>`,

    `<h3>🌸</h3>
    <p>Próximamente más información o recursos para vos 🌷</p>`,
  ];
  document.getElementById("popup-texto").innerHTML = contenido[indice];
  document.getElementById("popup-contenido").style.display = "block";
}
function cerrarPopup() {
  document.getElementById("popup-contenido").style.display = "none";
}

(function () {
  const gal = document.querySelector(".galeria-consultorio");
  if (!gal) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = '<img alt=""><button aria-label="Cerrar">×</button>';
  document.body.appendChild(overlay);

  const img = overlay.querySelector("img");
  const btnClose = overlay.querySelector("button");
  const show = (src) => {
    img.src = src;
    overlay.classList.add("on");
    document.body.style.overflow = "hidden";
  };
  const hide = () => {
    overlay.classList.remove("on");
    document.body.style.overflow = "";
  };

  gal.addEventListener("click", (e) => {
    const t = e.target.closest("img");
    if (!t) return;
    show(t.src);
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) hide();
  });
  btnClose.addEventListener("click", hide);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });
})();
// ===== Carrusel Consultorio =====
(function () {
  const root = document.getElementById("carrusel-consultorio");
  if (!root) return;

  const track = root.querySelector(".track");
  const slides = [...root.querySelectorAll(".slide")];
  const btnPrev = root.querySelector(".prev");
  const btnNext = root.querySelector(".next");
  const dotsWrap = root.querySelector(".dots");

  let index = 0,
    timer,
    hover = false;

  // crear dots
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir a la foto ${i + 1}`);
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dotsWrap
      .querySelectorAll("button")
      .forEach((b, i) => b.setAttribute("aria-current", i === index ? "true" : "false"));
  }
  function go(i, stopAuto = false) {
    index = (i + slides.length) % slides.length;
    render();
    if (stopAuto) restartAuto();
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  btnNext.addEventListener("click", () => go(index + 1, true));
  btnPrev.addEventListener("click", () => go(index - 1, true));

  // teclado
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(index + 1, true);
    if (e.key === "ArrowLeft") go(index - 1, true);
  });
  root.tabIndex = 0;

  // autoplay
  function startAuto() {
    timer = setInterval(next, 5000);
  }
  function stopAuto() {
    clearInterval(timer);
  }
  function restartAuto() {
    stopAuto();
    if (!hover) startAuto();
  }
  root.addEventListener("mouseenter", () => {
    hover = true;
    stopAuto();
  });
  root.addEventListener("mouseleave", () => {
    hover = false;
    startAuto();
  });

  // swipe en móvil
  let x0 = null;
  root.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  root.addEventListener(
    "touchend",
    (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1), true);
      x0 = null;
    },
    { passive: true }
  );

  render();
  startAuto();
})();

const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

const form = document.getElementById("formulario");
if (form) {
  const estado = document.getElementById("estado");
  const btnEnviar = document.getElementById("btnEnviar");
  const btnWhats = document.getElementById("btnWhats");

  const numeroWA = "59891844437";

  function construirTexto() {
    const nombre = (form.nombre?.value || "").trim();
    const email = (form.email?.value || "").trim();
    const telefono = (form.telefono?.value || "").trim();
    const modalidad = (form.modalidad?.value || "").trim();
    const mensaje = (form.mensaje?.value || "").trim();

    let texto = `Hola, soy ${nombre || "—"}.%0A`;
    texto += `Modalidad: ${modalidad || "—"}%0A`;
    if (telefono) texto += `Teléfono: ${telefono}%0A`;
    texto += `Email: ${email || "—"}%0A%0A`;
    texto += `Motivo de consulta:%0A${mensaje || "—"}`;

    return `https://wa.me/${numeroWA}?text=${texto}`;
  }

  function setWhatsLink() {
    btnWhats.href = construirTexto();
  }
  form.addEventListener("input", setWhatsLink);
  setWhatsLink();

  function validar() {
    let ok = true;
    const req = ["nombre", "email", "modalidad", "mensaje"];
    req.forEach((n) => {
      const el = form[n];
      const valid =
        el.value &&
        (n !== "email" || /^[^@]+@[^@]+\.[^@]+$/.test(el.value)) &&
        (n !== "mensaje" || el.value.trim().length >= 10);
      el.classList.toggle("error", !valid);
      if (!valid) ok = false;
    });
    if (!document.getElementById("acepto").checked) ok = false;
    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    estado.textContent = "";

    if (form.empresa && form.empresa.value) return;

    if (!validar()) {
      estado.textContent = "Revisá los campos marcados.";
      return;
    }

    const url = construirTexto();
    window.open(url, "_blank", "noopener,noreferrer");

    form.reset();
    setWhatsLink();
    estado.textContent = "Listo, se abrió WhatsApp con tu mensaje. ¡Gracias!";
  });
}

(function () {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (!btn || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    nav.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  };

  btn.addEventListener("click", () => {
    nav.classList.contains("open") ? close() : open();
  });

  nav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", close);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) close();
  });
})();

const nube = document.querySelector(".nube");
const mensaje = document.querySelector(".mensaje-final");

if (nube && mensaje) {
  nube.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "soltar");
  });

  const contenedor = document.querySelector(".contenedor-nube");
  contenedor.addEventListener("dragover", (e) => e.preventDefault());

  contenedor.addEventListener("drop", (e) => {
    e.preventDefault();
    nube.style.display = "none";
    mensaje.hidden = false;

    const frases = [
      "Permitite este momento para vos ✨",
      "Todo está bien por ahora 💖",
      "Respirá. No tenés que poder con todo 🌿",
      "Soltá. Lo estás haciendo bien ☁️",
      "Un paso a la vez. Estás avanzando 🌸",
    ];

    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    mensaje.textContent = fraseAleatoria;
  });
}
