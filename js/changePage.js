var Al = document.getElementById('button');

if (Al) {
        Al.addEventListener('click', function () {
                window.location.href = "http://127.0.0.1:5500/Home2.html";
        }, false);
}

const login = document.getElementById('btnLogin-popup');

login.onclick = function () {
        window.location.href = "http://127.0.0.1:5500/FormLogin/login.html";
};