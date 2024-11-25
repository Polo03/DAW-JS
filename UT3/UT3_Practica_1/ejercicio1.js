function caso1(){
    const letrasDNI="TRWAGMYFPDXBNJZSQVHLCKET";
    var dni=document.getElementById('dni').value;
    var dniCompleto=dni+""+letrasDNI.charAt(dni%23);
    document.getElementById("muestraDniCompleto").innerHTML="Su correspondiente letra del DNI es: "+letrasDNI.charAt(dni%23)+", por lo tanto, su DNI completo es: "+dniCompleto;
}
function caso2(){
    var nota1=document.getElementById('notaPractica1').value;
    var nota2=document.getElementById('notaPractica2').value;
    var nota3=document.getElementById('notaExamen').value;
    var nota4=document.getElementById('notaActitud').value;
    
    if(nota1=='' || nota2=='' || nota3=='' || nota4=='')
        alert("Alguna de las notas no ha sido introducida");
    else{
        if((nota1<0 || nota1>10) || (nota2<0 || nota2>10) || (nota3<0 || nota3>10) || (nota4<0 || nota4>10))
            alert("Alguna de las notas introducidas es menor a 0 o mayor a 10, lo cuál es cosa imposible.");
        else{
            if(nota1<4 || nota2<4 || nota3<4 || nota4<4)
                alert("Una de las notas introducidas no es superior a 4");
            else{
                var notaFinal=0;
                if(nota1<4.5 || nota2<4.5 || nota3<4.5){
                    alert("La nota de actitud no se aplicará a la nota final ya que alguna de las notas de las pŕaticas o la nota del examen ha sido inferior a 4.5");
                    notaFinal=(((nota1/2)+(nota2/2))*0.45)+(nota3*0.45);
                }else
                    notaFinal=(((nota1/2)+(nota2/2))*0.45)+(nota3*0.45)+(nota4*0.1);
                document.getElementById('muestraNotaFinal').innerHTML="Su nota final es: "+notaFinal;
            }
        } 
    }
} 