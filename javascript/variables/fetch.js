'use strict'

var users_div = document.querySelector('.users');
var only_user = document.querySelector('.user');

function fetchUsers() {
    let user_list = fetch('https://reqres.in/api/users')
                    .then(data => data.json()) // function (data) { return data.json() }
                    .then(users => {
                        let users_data = users.data;

                        users_data.map((user, index) => {
                            let h3 = document.createElement('h3');
                            h3.innerHTML = 'Indice: '+ index +' Nombre: ' + user.first_name + " Apellido: " + user.last_name;

                            users_div.append(h3);
                        });

                        let loading = document.querySelector('.loading').style.display = 'none';
                    });
}

function getUser() {
    let userId = Math.floor(Math.random() * 10);

    fetch("https://reqres.in/api/users/" + userId)
    .then(data => data.json())
    .then(user => {
        let userData = user.data;
        if (validateObject(userData) == false) return mostrarUser(userData)
    })
}


let validateObject = (user) => {
    for (let prop in user) {
        if (user.hasOwnProperty(prop)) return false // el objeto no esta vacio
    }

    return true;
}

function mostrarUser(user) {
    let h3 = document.createElement('h3');
    let img = document.createElement('img');
    img.src = user.avatar;
    img.width = '100';
    
    h3.innerHTML = 'Nombre: ' + user.first_name + " Apellido: " + user.last_name;

    only_user.append(h3);
    only_user.append(img);
}

function timer() {
    let timer = setTimeout(() => {
        fetchUsers();
        getUser();
    }, 999);

    return timer;
}

timer(); // Ejecuta el codigo
