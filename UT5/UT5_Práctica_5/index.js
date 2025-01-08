// Crear o modificar una cookie
function setCookie(nombre, valor, dias) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000)); 
    let expira = "expires=" + fecha.toUTCString();
    document.cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; ${expira}; path=/;`;
    console.log(`✅ Cookie creada: ${nombre}=${valor}; ${expira}; path=/`);
}

// Obtener el valor de una cookie
function getCookie(nombre) {
    let nombreCookie = encodeURIComponent(nombre) + "=";
    let cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nombreCookie) === 0) {
            return decodeURIComponent(cookie.substring(nombreCookie.length, cookie.length));
        }
    }
    return null;
}

// Borrar una cookie
function deleteCookie(nombre) {
    document.cookie = `${encodeURIComponent(nombre)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`❌ Cookie eliminada: ${nombre}`);
}

// Mostrar todas las cookies
function showCookies() {
    if (document.cookie) {
        return document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .join('\n');
    }
    return 'No hay cookies disponibles';
}

// Manejadores de botones
function handleSetCookie() {
    const name = document.getElementById('cookieName').value;
    const value = document.getElementById('cookieValue').value;
    const days = document.getElementById('cookieDays').value;
    if (name && value && days) {
        setCookie(name, value, parseInt(days));
        document.getElementById('output').innerText = `✅ Cookie "${name}" creada/modificada.`;
    } else {
        document.getElementById('output').innerText = '⚠️ Completa todos los campos.';
    }
}

function handleGetCookie() {
    const name = document.getElementById('cookieQuery').value;
    if (name) {
        const value = getCookie(name);
        document.getElementById('output').innerText = value 
            ? `🔍 Valor de "${name}": ${value}` 
            : `❌ Cookie "${name}" no encontrada.`;
    } else {
        document.getElementById('output').innerText = '⚠️ Ingresa el nombre de la cookie.';
    }
}

function handleDeleteCookie() {
    const name = document.getElementById('cookieDelete').value;
    if (name) {
        deleteCookie(name);
        document.getElementById('output').innerText = `❌ Cookie "${name}" eliminada.`;
    } else {
        document.getElementById('output').innerText = '⚠️ Ingresa el nombre de la cookie.';
    }
}

function handleShowCookies() {
    const cookies = showCookies();
    document.getElementById('output').innerText = `🍪 Cookies actuales:\n${cookies}`;
}
