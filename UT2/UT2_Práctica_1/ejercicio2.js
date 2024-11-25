function calculo(){
    var dividendo = prompt ("Introduce el dividendo: ");
    var divisor = prompt ("Introduce el divisor: ");
    var resultado;
    divisor !=0 ? resultado = dividendo/divisor :
    alert("No es posible la división por cero");
    alert ("El resultado es: " + resultado);
}