//Crea un array llamado elementos que tenga 10 datos de tipo string (tipo primitivo).
var elementos = ["manzana","banana","naranja","uva","fresa","kiwi","mango","piña","cereza","pera"];
//Visualiza por pantalla todo el contenido del array, separando cada dato en líneas distintas.
function caso1(){
       var cadena="";
       for(i=0;i<elementos.length;i++){
              cadena+=elementos[i] + "<br>";
       }
       document.getElementById('texto').innerHTML=cadena;       
}
//Añade al array un dato más. (mediante el uso [longitud])
function caso2(){
       elementos[elementos.length]=prompt("Introduzca el dato que quiere meter dentro del array");
}
//Añade al array dos datos más mediante utilizando un solo método.
function caso3(){
       var dato1=prompt("Introduzca el dato que quiere meter dentro del array");
       var dato2=prompt("Introduzca el dato que quiere meter dentro del array");
       elementos.push(dato1, dato2);
}
//Añade un dato más al principio del array.
function caso4(){
       elementos.unshift(prompt("Introduzca el dato que quiere meter dentro del array"));
}
//Localiza un cierto dato dentro del array.
function caso5(){
       var datoBuscado = prompt("Introduzca el dato que quiere buscar dentro del array");
       var indice = elementos.indexOf(datoBuscado);
       var cadena="";

       if (indice !== -1) 
              cadena="El dato "+datoBuscado+" se encuentra en el índice "+indice+", es decir, el elemento "+(indice+1)+" del array.";
       else
              cadena="El dato "+datoBuscado+" no se encuentra en el array.";
       
       document.getElementById('texto').innerHTML=cadena; 
}
//Elimina los últimos tres datos del array.
function caso6(){
       elementos.splice(-3, 3);
}
//Crea un sub-array llamado array_recortado con los datos del array elementos, comprendidos entre la posición 4 y 8 (ambos inclusive).
function caso7(){
       var array_recortado = elementos.slice(4, 9);
       var cadena="";
       for(i=0;i<array_recortado.length;i++){
              cadena+=array_recortado[i] + "<br>";
       }
       document.getElementById('texto').innerHTML=cadena; 
}
//Crea un nuevo array llamado elementos_MYCLS con los datos del array elementos en mayúsculas.
function caso8(){
       var elementos_MYCLS = elementos.map(elemento => elemento.toUpperCase());
       var cadena="";
       for(i=0;i<elementos_MYCLS.length;i++){
              cadena+=elementos_MYCLS[i] + "<br>";
       }
       document.getElementById('texto').innerHTML=cadena; 
}