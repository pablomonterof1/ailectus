// =======================
// Función: recoger valores de los inputs
// =======================
function getFormValues() {
    const nivel = document.getElementById("nivelSelect").value;
    const tono = document.getElementById("tonoSelect").value;
    const redaccion = document.getElementById("redaccionSelect").value;
    const enfoque = document.getElementById("enfoqueSelect").value;
    const formato = document.getElementById("formatoSelect").value;

    // Validación: no permitir vacío o "Seleccione"
    if (!nivel || !tono || !redaccion || !enfoque || !formato) {
        toastr.error("⚠️ Debes llenar todos los campos obligatorios.");
        return null;
    }

    return {
        profesion: document.getElementById("profesion").value.trim(),
        especializado: document.getElementById("especializado").value.trim(),
        idioma: document.getElementById("idiomaSelect").value,
        nivel,
        contexto: document.getElementById("contexto").value.trim(),
        tono,
        redaccion,
        enfoque,
        formato,
        citas: document.getElementById("citasSelect").value,
        tareas: [
            document.getElementById("tarea1").value.trim(),
            document.getElementById("tarea2").value.trim(),
            document.getElementById("tarea3").value.trim()
        ].filter(t => t !== "")
    };
}

// =======================
// Función: cargar valores en el formulario (para historial)
// =======================
function setFormValues(data) {
    document.getElementById("profesion").value = data.profesion || "";
    document.getElementById("especializado").value = data.especializado || "";
    document.getElementById("idiomaSelect").value = data.idioma || "";
    document.getElementById("nivelSelect").value = data.nivel || "";
    document.getElementById("contexto").value = data.contexto || "";
    document.getElementById("tonoSelect").value = data.tono || "";
    document.getElementById("redaccionSelect").value = data.redaccion || "";
    document.getElementById("enfoqueSelect").value = data.enfoque || "";
    document.getElementById("formatoSelect").value = data.formato || "";
    document.getElementById("citasSelect").value = data.citas || "Ninguno";

    document.getElementById("tarea1").value = data.tareas[0] || "";
    document.getElementById("tarea2").value = data.tareas[1] || "";
    document.getElementById("tarea3").value = data.tareas[2] || "";
}

// =======================
// Prompt estándar (dinámico)
// =======================
function llamarvalor() {
    const data = getFormValues();
    if (!data) return;

    if (!data.profesion || !data.especializado || !data.contexto || data.tareas.length === 0) {
        toastr.error("⚠️ Debes llenar todos los campos obligatorios.");
        return;
    }

    let prompt = `Rol: Actúa como ${data.profesion}, especializado en ${data.especializado}.\n`;
    prompt += `Idioma: Redacta en ${data.idioma}.\n`;
    prompt += `Nivel académico: Ajusta la profundidad al nivel ${data.nivel}.\n`;
    prompt += `Contexto: ${data.contexto}.\n\n`;

    prompt += `Tareas a realizar:\n`;
    data.tareas.forEach((tarea, index) => {
        prompt += `- Tarea ${index + 1}: ${tarea}\n`;
    });

    prompt += `\nEstilo: Usa un tono ${data.tono} y un estilo de redacción ${data.redaccion}.\n`;
    prompt += `Enfoque de la redacción: ${data.enfoque}.\n`;
    prompt += `Formato de salida esperado: ${data.formato}.\n`;
    if (data.citas && data.citas !== "Ninguno") {
        prompt += `Usa referencias y citas en formato ${data.citas}.\n`;
    }
    prompt += `Restricción: No repitas las instrucciones en tu respuesta.\n`;

    document.getElementById("promptfinal").value = prompt;
    guardarHistorial(prompt, data);
    toastr.success("✅ Prompt generado con éxito");
}

// =======================
// Plantilla 1: Académica general
// =======================
function plantillaAcademica() {
    const data = getFormValues();
    if (!data) return;

    if (!data.profesion || !data.especializado || !data.contexto || data.tareas.length === 0) {
        toastr.error("⚠️ Debes llenar todos los campos obligatorios.");
        return;
    }

    let prompt = `Rol: Actúa como ${data.profesion}, especializado en ${data.especializado}.  
Idioma: Redacta en ${data.idioma}.  
Nivel académico: ${data.nivel}.  
Contexto: ${data.contexto}.  

Tareas a realizar:\n`;
    data.tareas.forEach((t, i) => {
        prompt += `${i + 1}. ${t}\n`;
    });

    prompt += `\nRequisitos académicos:  
- Usa un tono ${data.tono} y un estilo de redacción ${data.redaccion}.  
- Enfoque: ${data.enfoque}.  
- Usa referencias en formato ${data.citas}.  

Formato de salida esperado: ${data.formato}.  

Restricciones:  
- No repitas las instrucciones.  
- Sé claro, preciso y con rigor académico.`;

    document.getElementById("promptfinal").value = prompt;
    guardarHistorial(prompt, data);
    toastr.info("📘 Prompt con plantilla académica generado");
}

// =======================
// Plantilla 2: Paper científico (IMRyD)
// =======================
function plantillaPaper() {
    const data = getFormValues();
    if (!data) return;

    if (!data.profesion || !data.especializado || !data.contexto) {
        toastr.error("⚠️ Debes llenar todos los campos obligatorios.");
        return;
    }

    let prompt = `Rol: Actúa como ${data.profesion}, especializado en ${data.especializado}.  
Idioma: Redacta en ${data.idioma}.  
Nivel académico: ${data.nivel}.  
Contexto: ${data.contexto}.  

Estructura esperada (IMRyD):  
1. Introducción: justificación y revisión de literatura breve.  
2. Metodología: clara y replicable.  
3. Resultados: presentados de forma narrativa o tabular.  
4. Discusión: comparación con estudios previos.  
5. Conclusión: hallazgos principales y futuras líneas de investigación.  

Requisitos académicos:  
- Tono ${data.tono}, estilo ${data.redaccion}.  
- Enfoque: ${data.enfoque}.  
- Usa referencias en formato ${data.citas}.  

Formato de salida esperado: Texto académico con secciones IMRyD.  

Restricciones:  
- No repitas las instrucciones.  
- Sé claro, preciso, con rigor científico.`;

    document.getElementById("promptfinal").value = prompt;
    guardarHistorial(prompt, data);
    toastr.info("📄 Prompt con plantilla Paper IMRyD generado");
}

// =======================
// Plantilla 3: Plan de clase universitaria
// =======================
function plantillaClase() {
    const data = getFormValues();
    if (!data) return;

    if (!data.profesion || !data.especializado || !data.contexto) {
        toastr.error("⚠️ Debes llenar todos los campos obligatorios.");
        return;
    }

    let prompt = `Rol: Actúa como ${data.profesion}, especializado en ${data.especializado}.  
Idioma: Redacta en ${data.idioma}.  
Nivel académico: ${data.nivel}.  
Contexto: ${data.contexto}.  

Diseña un plan de clase universitaria con la siguiente estructura:  
1. Objetivos de aprendizaje claros y medibles.  
2. Contenidos organizados por tiempo (ejemplo: 2 horas de clase).  
3. Actividades prácticas con uso de TIC y TAC.  
4. Recursos didácticos y plataformas digitales sugeridas.  
5. Criterios de evaluación formativa.  

Requisitos académicos:  
- Tono ${data.tono}, estilo ${data.redaccion}.  
- Enfoque: ${data.enfoque}.  

Formato de salida esperado: Plan de clase estructurado.  

Restricciones:  
- No repitas las instrucciones.  
- Sé práctico, claro y enfocado en la enseñanza universitaria.`;

    document.getElementById("promptfinal").value = prompt;
    guardarHistorial(prompt, data);
    toastr.info("🎓 Prompt con plantilla de Plan de Clase generado");
}

// =======================
// Historial
// =======================
function guardarHistorial(prompt, data) {
    let historial = JSON.parse(localStorage.getItem("historialPrompts")) || [];
    historial.unshift({ prompt, data });
    if (historial.length > 5) historial = historial.slice(0, 5); // máximo 5
    localStorage.setItem("historialPrompts", JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialPrompts")) || [];
    const ul = document.getElementById("historialPrompts");
    if (!ul) return;
    ul.innerHTML = "";
    historial.forEach((item, i) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span>Prompt ${i + 1}</span>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="copiarTexto(\`${item.prompt.replace(/`/g, "\\`")}\`)">Copiar</button>
                <button class="btn btn-sm btn-outline-success" onclick='cargarPrompt(${i})'>Cargar</button>
            </div>`;
        ul.appendChild(li);
    });
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto);
    toastr.info("📋 Prompt copiado desde historial");
}

function cargarPrompt(index) {
    const historial = JSON.parse(localStorage.getItem("historialPrompts")) || [];
    if (historial[index]) {
        setFormValues(historial[index].data);
        document.getElementById("promptfinal").value = historial[index].prompt;
        toastr.info("🔄 Prompt cargado en el formulario para editar");
    }
}

// =======================
// Copiar prompt actual
// =======================
function copiar() {
    const copyText = document.getElementById("promptfinal").value;
    if (!copyText) {
        toastr.warning("⚠️ No hay prompt para copiar.");
        return;
    }
    navigator.clipboard.writeText(copyText);
    toastr.success("📋 Prompt copiado al portapapeles");
}

// =======================
// Inicializar historial al cargar
// =======================
window.onload = mostrarHistorial;



// =======================
// Red neuronal animada con nodos pulsantes
// =======================
let nodos = [];
let lineas = [];
let svg;
const numNodos = 70;
const probConexion = 0.07;

function generarFondoRedAnimado() {
  svg = document.getElementById("bgNetwork");
  const width = window.innerWidth;
  const height = window.innerHeight;

  svg.innerHTML = "";
  nodos = [];
  lineas = [];

  for (let i = 0; i < numNodos; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const dx = (Math.random() - 0.5) * 0.5;
    const dy = (Math.random() - 0.5) * 0.5;

    // Crear nodo
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", 2.5);
    circle.setAttribute("fill", "#ffffff");

    // Animación de pulso con <animate>
    const animateRadius = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateRadius.setAttribute("attributeName", "r");
    animateRadius.setAttribute("values", "2.5;4;2.5");
    animateRadius.setAttribute("dur", `${2 + Math.random()}s`);
    animateRadius.setAttribute("repeatCount", "indefinite");

    const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateOpacity.setAttribute("attributeName", "opacity");
    animateOpacity.setAttribute("values", "1;0.4;1");
    animateOpacity.setAttribute("dur", `${2 + Math.random()}s`);
    animateOpacity.setAttribute("repeatCount", "indefinite");

    circle.appendChild(animateRadius);
    circle.appendChild(animateOpacity);

    svg.appendChild(circle);
    nodos.push({ x, y, dx, dy, circle });
  }

// Conexiones
for (let i = 0; i < numNodos; i++) {
  for (let j = i + 1; j < numNodos; j++) {
    if (Math.random() < probConexion) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke", "#ffffff"); // 🔹 ahora líneas blancas
      line.setAttribute("stroke-width", "0.8");
      line.setAttribute("opacity", "0.25"); // más sutil
      svg.insertBefore(line, svg.firstChild);
      lineas.push({ i, j, line });
    }
  }
}

}

function animarRed() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  nodos.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    if (n.x < 0 || n.x > width) n.dx *= -1;
    if (n.y < 0 || n.y > height) n.dy *= -1;

    n.circle.setAttribute("cx", n.x);
    n.circle.setAttribute("cy", n.y);
  });

  lineas.forEach(l => {
    const n1 = nodos[l.i];
    const n2 = nodos[l.j];
    l.line.setAttribute("x1", n1.x);
    l.line.setAttribute("y1", n1.y);
    l.line.setAttribute("x2", n2.x);
    l.line.setAttribute("y2", n2.y);
  });

  requestAnimationFrame(animarRed);
}

window.addEventListener("load", () => {
  generarFondoRedAnimado();
  animarRed();
});
window.addEventListener("resize", generarFondoRedAnimado);
