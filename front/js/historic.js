$(document).ready(() => {



    $('.historic-items').append($('<div>').load('/historic-items?page=0', () => {


    }));

})