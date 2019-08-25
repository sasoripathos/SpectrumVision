(function(){
    "use strict";
    window.addEventListener('load', function(){
        document.querySelector('.login-box input[type="submit"]').addEventListener('click', e=> {
            e.preventDefault();
            window.location.href = '/home';
       });
    });
}())

