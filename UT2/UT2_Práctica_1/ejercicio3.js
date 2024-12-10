function calculo(){
    var numero = prompt ("Introduzca un número y le diremos si es primo");
    var cont;
    if(numero>1){
        for(i=1;i<=numero;i++)
            if(numero%i==0)
                cont++; 
        if(cont==2)
            alert("El número que usted ha introducido es primo");
        else
            alert("El número que usted ha introducido no es primo");
    }else
        alert("El número que has introducido es menor a 0");     
        
}