function caso1(){

    var primer_saludo = "Hola";

    var segundo_saludo = primer_saludo;
  
    primer_saludo = "Buenas...";
  
    alert (segundo_saludo);

}
 
function caso2(){

    var mensaje = "Hola";
  
    function aviso(mensaje) {
  
        alert (mensaje); 
         
    }
  
    aviso("adiós");
  
    alert(mensaje);
    
}

function caso3(){

    var mensaje = "Hola";

  function aviso() {

        mensaje = "adiós";

        alert (mensaje);  
    }

    aviso();

    alert(mensaje);
    
}