function caso1(){
    var num1=prompt("Introduzca el primer número");
    var num2=prompt("Introduzca el segundo número");
    var num3=prompt("Introduzca el tercer número");
    var maximo=Math.max(num1, num2, num3);
    var minimo=Math.min(num1, num2, num3);

    if(num1<maximo && num1>minimo)
        document.getElementById("texto").innerHTML=maximo+">"+num1+">"+minimo;

    if(num2<maximo && num2>minimo)
        document.getElementById("texto").innerHTML=maximo+">"+num2+">"+minimo;
    
    if(num3<maximo && num3>minimo)
        document.getElementById("texto").innerHTML=maxiSmo+">"+num3+">"+minimo;
    
}
function caso2(){
    var num=prompt("Introduzca el número");
    var op=prompt("Seleccione la operación a realizar: + , - , x , / ");
    var resultado=1;
    if(num>0) {
        switch (op){
            case '+':
                for(i=num; i >= 1; i--)   {
                    resultado = resultado + i;
                }
                document.getElementById("texto").innerHTML=resultado+"";
                break;
            case '-':
                for(i=num; i >= 1; i--)   {
                    resultado = resultado - i;
                }
                document.getElementById("texto").innerHTML=resultado+"";
                break;
            case 'x':
                for(i=num; i >= 1; i--)   {
                    resultado = resultado * i;
                }
                document.getElementById("texto").innerHTML=resultado+"";
                break;
            case '/':
                for(i=num; i >= 1; i--)   {
                    resultado = resultado / i;
                }
                document.getElementById("texto").innerHTML=resultado+"";
                break;
            default:
                alert("No has elegido una operación valida");
                break;
        }
    }else
        alert("Ha habido un problema al introducir un menor a 0");    
    
}
function caso3(){
    var num=prompt("Introduzca su DNI sin letra");
    var resto=num%23;
    // var letras=['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    // document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: "+letras[resto]+", por lo tanto, su DNI completo es: "+num+""+letras[resto];
    switch(resto){
        case 0:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: T, por lo tanto, su DNI completo es: "+num+"T";
            break;
        case 1:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: R, por lo tanto, su DNI completo es: "+num+"R";
            break;
        case 2:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: W, por lo tanto, su DNI completo es: "+num+"W";
            break;
        case 3:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: A, por lo tanto, su DNI completo es: "+num+"A";
            break;
        case 4:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: G, por lo tanto, su DNI completo es: "+num+"G";
            break;
        case 5:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: M, por lo tanto, su DNI completo es: "+num+"M";
            break;
        case 6:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: Y, por lo tanto, su DNI completo es: "+num+"Y";
            break;
        case 7:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: F, por lo tanto, su DNI completo es: "+num+"F";
            break;
        case 8: 
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: P, por lo tanto, su DNI completo es: "+num+"P";
            break;
        case 9:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: D, por lo tanto, su DNI completo es: "+num+"D";
            break;
        case 10:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: X, por lo tanto, su DNI completo es: "+num+"X";
            break;
        case 11:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: B, por lo tanto, su DNI completo es: "+num+"B";
            break;
        case 12:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: N, por lo tanto, su DNI completo es: "+num+"N";
            break;
        case 13:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: J, por lo tanto, su DNI completo es: "+num+"J";
            break;
        case 14:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: Z, por lo tanto, su DNI completo es: "+num+"Z"
            break;
        case 15:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: S, por lo tanto, su DNI completo es: "+num+"S"
            break;
        case 16:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: Q, por lo tanto, su DNI completo es: "+num+"Q"
            break;
        case 17:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: V, por lo tanto, su DNI completo es: "+num+"V"
            break;
        case 18:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: H, por lo tanto, su DNI completo es: "+num+"H"
            break;
        case 19:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: L, por lo tanto, su DNI completo es: "+num+"L"
            break;
        case 20:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: C, por lo tanto, su DNI completo es: "+num+"C"
            break;
        case 21:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: K, por lo tanto, su DNI completo es: "+num+"K"
            break;
        case 22:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: E, por lo tanto, su DNI completo es: "+num+"E"
            break;
        case 23:
            document.getElementById("texto").innerHTML="Su correspondiente letra del DNI es: T, por lo tanto, su DNI completo es: "+num+"T";
            break;
    }
}