'use strict';

var newArr = [];

function forEach(arr, handler) {

    var iterate = function (index) {
        handler(arr[index], index, arr);
        if (++index != arr.length) {
            iterate(index);
        }
    }
    iterate(0);
    console.log(newArr);
}