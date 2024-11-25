function calculo(){
    var numero = prompt ("Introduzca un número y le diremos si es primo");
    var total=0;
    for(i=1;i<=numero;i++){
        if(numero%i==0){
            total++;
        }
    }
    if(total==2)
        alert("El número que usted ha introducido es primo");
    else
        alert("El número que usted ha introducido no es primo");
}