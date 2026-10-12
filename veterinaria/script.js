const botonCita = document.querySelector("#botonCita");
const formularioCita = document.querySelector("#formularioCita");
const formCita = document.querySelector("#formCita");
const botonGuardar = document.querySelector("#guardarCita");
const resultadoCita = document.querySelector("#resultadoCita");

// Mostrar el formulario al presionar "Agendar una cita"
botonCita.addEventListener("click", function () {
    formularioCita.style.display = "block";
    formularioCita.scrollIntoView({ behavior: "smooth" });
    resultadoCita.innerHTML = "";
});

// Enviar el formulario al correo del doctor (sin recargar la página)
formCita.addEventListener("submit", async function (e) {
    e.preventDefault();

    botonGuardar.disabled = true;
    botonGuardar.textContent = "Enviando...";
    resultadoCita.innerHTML = "";

    // Usa el mismo correo del action, pero con el endpoint AJAX de FormSubmit
    const urlAjax = formCita.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

    try {
        const respuesta = await fetch(urlAjax, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(formCita)
        });

        const datos = await respuesta.json();

        if (respuesta.ok && (datos.success === true || datos.success === "true")) {
            resultadoCita.innerHTML =
                "<p>✅ ¡Cita enviada! La veterinaria se pondrá en contacto contigo para confirmarla.</p>";
            formCita.reset();
            formularioCita.style.display = "none";
        } else {
            throw new Error(datos.message || "Error al enviar");
        }
    } catch (error) {
        console.error(error);
        resultadoCita.innerHTML =
            "<p>❌ No se pudo enviar la cita. Inténtalo de nuevo o escríbenos por WhatsApp.</p>";
    } finally {
        botonGuardar.disabled = false;
        botonGuardar.textContent = "Confirmar cita";
    }
});
