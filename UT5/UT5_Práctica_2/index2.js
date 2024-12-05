function deshabilitarGrupos() {
    // Obtener los grupos seleccionados
    const seleccionados = Array.from(document.getElementById('groupSelector').selectedOptions).map(opt => opt.value);

    // Resetear el estado de todos los optgroups
    document.querySelectorAll('optgroup').forEach(group => {
        group.disabled = false; // Habilitar todos los grupos primero
    });

    // Deshabilitar los grupos seleccionados
    seleccionados.forEach(grupoId => {
        const grupo = document.getElementById(grupoId);
        if (grupo) {
            grupo.disabled = true;
        }
    });

    // Mostrar mensaje
    const mensaje = seleccionados.length
        ? `Se han deshabilitado los siguientes grupos: ${seleccionados.join(', ')}`
        : 'No se ha deshabilitado ningún grupo.';
    document.getElementById('resultado').innerText = mensaje;
}