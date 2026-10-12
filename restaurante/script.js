const botonCita = document.querySelector("#botonCita");
const formularioCita = document.querySelector("#formularioCita");
const formCita = document.querySelector("#formCita");
const botonGuardar = document.querySelector("#guardarCita");
const resultadoCita = document.querySelector("#resultadoCita");

// Mostrar el formulario al pulsar el botón principal o el enlace "Citas" del menú
function mostrarFormulario() {
    formularioCita.style.display = "block";
    formularioCita.scrollIntoView({ behavior: "smooth" });
    resultadoCita.innerHTML = "";
}
botonCita.addEventListener("click", mostrarFormulario);
document.querySelectorAll('a[href="#formularioCita"]').forEach(function (a) {
    a.addEventListener("click", function () { formularioCita.style.display = "block"; });
});

// Enviar el formulario al correo del negocio (sin recargar la página)
formCita.addEventListener("submit", async function (e) {
    e.preventDefault();
    botonGuardar.disabled = true;
    botonGuardar.textContent = "Enviando...";
    resultadoCita.innerHTML = "";

    // Mismo correo del action, pero con el endpoint AJAX de FormSubmit
    const urlAjax = formCita.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

    try {
        const respuesta = await fetch(urlAjax, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(formCita)
        });
        const datos = await respuesta.json();

        if (respuesta.ok && (datos.success === true || datos.success === "true")) {
            resultadoCita.innerHTML = "<p>✅ ¡Enviado! Nos pondremos en contacto contigo para confirmar.</p>";
            formCita.reset();
            formularioCita.style.display = "none";
        } else {
            throw new Error(datos.message || "Error al enviar");
        }
    } catch (error) {
        console.error(error);
        resultadoCita.innerHTML = "<p>❌ No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.</p>";
    } finally {
        botonGuardar.disabled = false;
        botonGuardar.textContent = "Confirmar reserva";
    }
});
