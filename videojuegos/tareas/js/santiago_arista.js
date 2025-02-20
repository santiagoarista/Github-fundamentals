/* 
Santiago Arista Viramontes

Example functions to practice JavaScript

2025-02-12
*/

"use strict";

function area(base, height){
    let area = base * height / 2;
    return area
}

console.log(area(4,7));


//Pregunta 1
export function firstNonRepeating(text){

    let string = text;

    if (string.length === 0){
        return undefined
    }

    for (let i = 0 ; i < string.length; i++){

        let repeated = true;

        for (let j = 0; j < string.length; j++){
            if(string[i] === string[j] && i !== j ){
                repeated = false;
                break;
            }
        }
        if (repeated){
            return string[i];
        }
    }
    return null;

}

//Pregunta 2
export function bubbleSort(array) {
    let n = array.length;

    for (let i=0;i<n;i++){

        for (let j=0;j< n-i;j++){

            if (array[j] > array[j+1]){

                let temp = array[j];

                array[j] = array[j+1];
                array[j+1] = temp 
            }
        }

    }
    return array;
}

//Pregunta 3
export function invertArray(array){

    let arrayInv = [];
    let j = array.length

    for (let i=0; i<array.length; i++){
        arrayInv.push(array[j-i-1]);
    }

    return arrayInv
}

export function invertArrayInplace(newArray){

    let left =0;
    let right = newArray.length-1;

    while (left < right){
        [newArray[left], newArray[right]] = [newArray[right], newArray[left]];

        left++;
        right--;
    }

    return newArray;
}

//Pregunta 4
export function capitalize(array){

    let arrayCap = array.split("");

    for (let i=0; i < arrayCap.length; i++){
        if (i===0 || arrayCap[i-1] === " "){

            arrayCap[i] = arrayCap[i].toUpperCase();

        }
    }
    return arrayCap.join("");
}

//Pregunta 5
export function mcd(x,y){

    let menor = Math.min(x,y);

    if (x === 0 && y === 0){
        return 0;
    }
    for (let i = menor; i > 1; i--){
        if (x % i === 0 && y % i == 0){
            return i;
        }
    }
}

//Pregunta 6
export function hackerSpeak(array){

    var oracion = array.split("");

    for (let i = 0; i < array.length; i++){
        if (oracion[i].toLowerCase() === "a"){

            oracion[i]="4";
        }
        if (oracion[i].toLowerCase() === "e"){

            oracion[i]="3";
        }
        if (oracion[i].toLowerCase() === "i"){

            oracion[i]="1";
        }
        if (oracion[i].toLowerCase() === "o"){

            oracion[i]="0";
        }
        if (oracion[i].toLowerCase() === "s"){

            oracion[i]="5";
        }
    }

    return oracion.join("");
}

//Pregunta 7
export function factorize(array){

    let lista = [];

    for (let i = 1; i <= array; i++){
        if (array % i === 0){

            lista.push(i);
        }
    }
    return lista;
}

//Pregunta 8
export function deduplicate(array){

    let lista =[];

    for (let i = 0; i < array.length; i++){

        let condicion = true;

        for (let j = 0; j < array.length; j++){
            if (array[i] === array[j]){

                for(let k = 0; k <= array.length; k++){
                    if (lista[k] === array[j]){

                        condicion = false;
                        break;
                    }
                }
            }
        }

        if (condicion===true){

            lista.push(array[i]);
        }
    }

    return lista;
}

//Pregunta 9
export function findShortestString(array) {

    if (array.length === 0){ 
        return 0;
    }

    let resultado = array[0].length;

    for (let i = 1; i < array.length; i++) {
        if (array[i].length < resultado) {

            resultado = array[i].length;
        }
    }

    return resultado;
}

//Pregunta 10
export function isPalindrome(array) {

    const palabra = array.toLowerCase()

    return palabra === palabra.split('').reverse().join('');
  }


//Pregunta 11
export function sortStrings(array){

    return array.sort();
}

//Pregunta 12
export function stats(array) {
    if (array.length === 0) {
        return [0, 0];
    }

    if (array.length === 1) {
        return [array[0], array[0]];
    }

    let ordenado = array.slice().sort((a, b) => a - b);

    let mediana;
    const midIndex = Math.floor(array.length / 2);

    if (array.length % 2 === 0) {
        mediana = (ordenado[midIndex - 1] + ordenado[midIndex]) / 2;
    } else {
        mediana = ordenado[midIndex];
    }

    let conteoMax = 0;
    let moda = ordenado[0];

    for (let i = 0; i < ordenado.length; i++) {
        let conteoActual = 1; 
        for (let j = i + 1; j < ordenado.length; j++) {
            if (ordenado[i] === ordenado[j]) {
                conteoActual++;
            }
        }

        if (conteoActual > conteoMax) {
            conteoMax = conteoActual;
            moda = ordenado[i];
        }
    }

    return [mediana, moda];
}

//Pregunta 13
export function popularString(array){

    if (!array){
        return 0;
    }

    let resultado="";

    let conteoTotal=0;

    let listaSR=[...new Set(array)];

    for (let i = 0; i < listaSR.length; i++){

        let conteo=0;

        for(let j = 0; j < array.length; j++){
            if (listaSR[i] === array[j]){

                conteo++
            }
        }

        if(conteo>conteoTotal){

            resultado = listaSR[i];
            conteoTotal = conteo;
        }
    }

    return resultado;
}


//Pregunta 14
export function isPowerOf2(x){

    if (x <= 2){
        return true;
    }

    let i=1;

    while (true){

        let raiz = x ** (1/i);
        if (raiz === 2){
            return true;
        }
        else if (raiz < 2){
            return false;
        }

        i++
    }
}

//Pregunta 15
export function sortDescending(array){

    let list =array.sort((a,b) => b-a)
    return list;
}