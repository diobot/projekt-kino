
var filmy;
function loadFilms() {
    return fetch("/kino.json")
        .then(function (res) { return res.json(); })
        .then(function (json) {
            console.log(json);
            filmy = json;
        });
}
var rezerwacja;
function loadReservations() {
    return fetch("/reservation.json")
        .then(function (res) { return res.json(); })
        .then(function (json) {
            console.log(json);
            rezerwacja = json;
        });
}
function loadStorage(w) {
    w = JSON.parse(localStorage.getItem("res"));
    return w

}

var container = document.getElementById("container");
var is_log = false;



//////////////////////////////header////////////////

var navSlide = function () {
    var menu_mobile = document.querySelector(".menu-mobile");
    var nav = document.querySelector(".nav-links");
    var nav_links = document.querySelectorAll('.nav-links li');
    menu_mobile.addEventListener('click', function () {
        nav.classList.toggle('nav-active');
        nav_links.forEach(function (link, index) {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = "navLinkFade 0.5s ease forwards " + (index / 8 + 0.5) + "s";
            }
        });
        menu_mobile.classList.toggle('toggle');
    });
};
navSlide();




////////////////////////slajder - json z obrazkami/////////////
function home() {
    container.innerHTML = "";

    var slide = document.createElement('div');
    slide.setAttribute('class', 'slide');
    container.appendChild(slide);

    var trailer = document.createElement('div');
    trailer.setAttribute('class', 'trailer');
    slide.appendChild(trailer);

    var arrow_left = document.createElement('div');
    arrow_left.setAttribute('class', 'arrow');
    arrow_left.setAttribute('id', 'arrow-left');
    trailer.appendChild(arrow_left);
    var arrow_right = document.createElement('div');
    arrow_right.setAttribute('class', 'arrow');
    arrow_right.setAttribute('id', 'arrow-right');
    trailer.appendChild(arrow_right);

    function init() {
        loadFilms()
            .then(function () {
                for (i = 0; i < filmy.Looknij.length; i++) {
                    for (j = 0; j < filmy.Looknij[i].films.length; j++) {
                        var setImg = document.createElement('img');
                        var setA = document.createElement('a');
                        setA.setAttribute("class", "picture");
                        setA.appendChild(setImg);
                        trailer.appendChild(setA);
                        setImg.setAttribute("src", filmy.Looknij[i].films[j].img);
                        setA.setAttribute("href", filmy.Looknij[i].films[j].source);
                    }
                }


                let slider = document.querySelectorAll('.picture');
                let arrowLeft = document.querySelector('#arrow-left');
                let arrowRight = document.querySelector('#arrow-right');
                let current = 0;


                //////czysci obrazki
                function reset() {
                    for (i = 0; i < slider.length; i++) {
                        slider[i].style.display = 'none';
                    }
                }

                //////zaczyna slajdy
                function start_slider() {
                    reset();
                    slider[0].style.display = 'block';
                }

                ////pokazuje co wczesniej
                function slide_left() {
                    reset();
                    slider[current - 1].style.display = 'block';
                    current--;
                }

                ////////prawy przycisk dalej
                function slide_right() {
                    reset();
                    slider[current + 1].style.display = 'block';
                    current++;
                }

                ///////click na lewa strzalke

                arrowLeft.addEventListener('click', function () {
                    if (current === 0) {
                        current = slider.length;
                    }
                    slide_left();
                });

                arrowRight.addEventListener('click', function () {
                    if (current === slider.length - 1) {
                        current = -1;
                    }
                    slide_right();
                });
                start_slider();
            }
            );
    }
    init();
}

///////////////////////kina z filmami////////////////
function movies() {
    container.innerHTML = "";
    // var nav = document.querySelector(".nav-links");
    //  nav.classList.toggle('nav-active');

    function init_films() {
        loadFilms()
            .then(function () {

                var contain_cinema = document.createElement("div");
                contain_cinema.setAttribute("id", "contain_cinema");
                container.appendChild(contain_cinema);
                for (i = 0; i < filmy.Looknij.length; i++) {


                    var cinema = document.createElement('div');
                    cinema.setAttribute("class", "cinema");
                    var cinema_city = document.createElement("div");
                    cinema_city.setAttribute("class", "cinema_city");
                    cinema_city.innerHTML = filmy.Looknij[i].location;
                    cinema.appendChild(cinema_city);
                    var cinema_pic = document.createElement("img");
                    cinema_pic.setAttribute("class", "cinema_pic");
                    cinema_pic.setAttribute("src", filmy.Looknij[i].cinema_img);


                    contain_cinema.appendChild(cinema);
                    cinema.appendChild(cinema_pic);

                    for (j = 0; j < filmy.Looknij[i].films.length; j++) {

                        var cinema_posters = document.createElement('div');
                        cinema_posters.setAttribute("class", "cinema_posters");
                        cinema_posters.setAttribute("onclick", "movies_desc(" + i + j + ")");

                        var cinema_posters_img = document.createElement('img');
                        cinema_posters_img.setAttribute("class", "cinema_posters_img");
                        cinema_posters_img.setAttribute("src", filmy.Looknij[i].films[j].img)

                        cinema.appendChild(cinema_posters);
                        cinema_posters.appendChild(cinema_posters_img);
                    }
                }
            })
    }
    init_films();
}









////////////////////////////opisy filmow z dniai i godzinami//////////
function movies_desc(sec) {
    container.innerHTML = "";
    function init_films() {
        loadFilms()
            .then(function () {


                for (i = 0; i < filmy.Looknij.length; i++) {

                    for (j = 0; j < filmy.Looknij[i].films.length; j++) {

                        var loop = i;
                        var loop2 = j;

                        var films = document.createElement("section");
                        films.setAttribute("class", "films");
                        films.setAttribute("id", "films" + i + j);
                        container.appendChild(films);

                        var poster = document.createElement("div");
                        poster.setAttribute("class", "poster");
                        var img = document.createElement('img');
                        img.setAttribute("src", filmy.Looknij[i].films[j].img);

                        var info = document.createElement("div");
                        info.setAttribute("id", "info");

                        var loc = document.createElement("div");
                        loc.setAttribute("class", "loc");
                        loc.innerHTML = filmy.Looknij[i].location;

                        var date = document.createElement("div");
                        date.setAttribute("id", "date");






                        for (k = 0; k < filmy.Looknij[i].films[j].days.length; k++) {
                            var day_num = k;

                            var days_hours = document.createElement("div");
                            days_hours.setAttribute("class", "days_hours");

                            var days = document.createElement("div");
                            days.setAttribute("class", "days");
                            days.setAttribute("id", "day" + day_num);


                            var button = document.createElement("button");
                            button.setAttribute("id", "button_res" + i + j);
                            button.setAttribute("class", "hours")
                            button.setAttribute("onclick", `spec_reservation(${i},${j},${day_num})`);
                            button.innerHTML = filmy.Looknij[i].films[j].hours;

                            date.appendChild(days_hours);

                            days_hours.appendChild(days);
                            days_hours.appendChild(button);

                            days.innerHTML = filmy.Looknij[i].films[j].days[k];
                        }
                        var text = document.createElement("div");
                        text.setAttribute("class", "text");

                        info.appendChild(text);
                        text.innerHTML = filmy.Looknij[i].films[j].text;


                        films.appendChild(poster);
                        films.appendChild(info);
                        info.appendChild(loc);
                        info.appendChild(date);


                        poster.appendChild(img);




                    }
                }

                ///////////////// scrollowaniedo odpowiedniej sekcji //////////////////////

                var scroll_section = document.getElementById("films" + sec);
                scroll_section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })


            });
    }
    init_films();


}



//////krzesla//////////////////////////

var rows;
var columns;
function reservation() {

    container.innerHTML = "";


    function init_films() {
        loadFilms()
            .then(function () {

                function change_cinema() {
                    var s = document.getElementById("select_m").innerHTML = "";
                    var select_cinema_options = document.getElementById("select_cinema_options").selectedIndex;
                    var select_movie = document.createElement("select");
                    select_movie.setAttribute("class", "selection");
                    select_m.appendChild(select_movie);

                    for (i = 0; i < filmy.Looknij[select_cinema_options].films.length; i++) {

                        var select_movie_options = document.createElement("option");
                        select_movie_options.setAttribute("class", "options");
                        select_movie_options.innerHTML = filmy.Looknij[select_cinema_options].films[i].name;
                        select_movie.appendChild(select_movie_options);
                    }
                    rows = filmy.Looknij[select_cinema_options].row;
                    columns = filmy.Looknij[select_cinema_options].columns;
                    create_sits();
                };

                var select = document.createElement("div");
                select.setAttribute("id", "select");
                container.appendChild(select);
                var select_m = document.createElement("div");
                select_m.setAttribute("id", "select_m");
                container.appendChild(select_m);

                var select_cinema = document.createElement("select");
                select_cinema.setAttribute("class", "selection");
                select_cinema.setAttribute("id", "select_cinema_options");
                select_cinema.onchange = change_cinema;



                for (i = 0; i < filmy.Looknij.length; i++) {

                    var select_options = document.createElement("option");
                    select_options.setAttribute("class", "options");
                    select_options.innerHTML = filmy.Looknij[i].location;
                    select_cinema.appendChild(select_options);


                }


                select.appendChild(select_cinema);
                var places = document.createElement("div");
                places.setAttribute("id", "places");
                container.appendChild(places);

                function create_sits() {

                    places.innerHTML = "";

                    // var button_res = document.getElementById("button_res");
                    // button_res.onclick = button_onclick();


                    for (j = 0; j < rows; j++) {

                        var para_parent = document.createElement("div");
                        para_parent.setAttribute("class", "divy");
                        // let para_parent = document.getElementsByClassName("divy");
                        var divy = document.getElementsByClassName("divy");
                        // divy.style.color ="red";
                        for (i = 0; i < columns; i++) {

                            var para = document.createElement("div");
                            para.setAttribute('class', 'sit');
                            var img = document.createElement("img");
                            img.setAttribute("src", "chair.png");
                            img.setAttribute("id", "img_chair");

                            para.appendChild(img);
                            var info = "Rząd: " + (j + 1) + " Miejsce: " + (i + 1) + " ";


                            var tooltip_node = document.createElement("span");
                            tooltip_node.setAttribute("class", "tooltip");
                            tooltip_node.innerText = info;

                            para.appendChild(tooltip_node);
                            para_parent.appendChild(para);


                        }
                        places.appendChild(para_parent);
                    }

                }
            }
            )
    }


    init_films();
}

function spec_reservation(idc, idf, idd) {
    if (is_log == false) {
        alert("Zaloguj się aby móc zarezerwować miejsce.");
        log_in();
    } else {
        container.innerHTML = "";
        var rows = filmy.Looknij[idc].row;
        var columns = filmy.Looknij[idc].columns;
        var sits_control = [];
        var get_sits;
        var sit_to_send = {};
        var reserved_sits = [];

        function init_films() {
            loadFilms()
            loadReservations()
                .then(function () {
                    var head = document.createElement("div");
                    head.setAttribute("id","head");
                    container.appendChild(head);

                    var title_res = document.createElement("div");
                    title_res.setAttribute("id","title_res");
                    head.appendChild(title_res);

                    var city = document.createElement("h1");
                    city.innerHTML = filmy.Looknij[idc].location;
                    title_res.appendChild(city);

                    var movies = document.createElement("h2");
                    movies.innerHTML = filmy.Looknij[idc].films[idf].name;
                    title_res.appendChild(movies);

                    var day = document.createElement("h3");
                    day.innerHTML = filmy.Looknij[idc].films[idf].days[idd];
                    title_res.appendChild(day);

                    var hour = document.createElement("h3");
                    hour.innerHTML = filmy.Looknij[idc].films[idf].hours;
                    title_res.appendChild(hour);

                    var summary = document.createElement("div");
                    summary.setAttribute("id", "summary");
                    summary.innerHTML = "Koszyk jest pusty.";
                    head.appendChild(summary);

                    var places = document.createElement("div");
                    places.setAttribute("id", "places");
                    container.appendChild(places);

                    create_sits();

                    function create_sits() {

                        places.innerHTML = "";

                        // var button_res = document.getElementById("button_res");
                        // button_res.onclick = button_onclick();


                        for (j = 0; j < rows; j++) {

                            var para_parent = document.createElement("div");
                            para_parent.setAttribute("class", "divy");
                            // let para_parent = document.getElementsByClassName("divy");
                            var divy = document.getElementsByClassName("divy");
                            // divy.style.color ="red";
                            for (i = 0; i < columns; i++) {

                                var para = document.createElement("div");
                                para.setAttribute('class', 'sit');
                                para.setAttribute('id', 'sit' + i + j);
                                var img = document.createElement("img");
                                img.setAttribute("src", "chair.png");
                                img.setAttribute("id", "img_chair" + i + j);
                                img.setAttribute("class", "img_chair");
                                img.setAttribute("name", "Rząd: " + (j + 1) + " Miejsce: " + (i + 1));
                                img.setAttribute("value", 20);

                                para.appendChild(img);
                                var info = "Rząd: " + (j + 1) + " Miejsce: " + (i + 1) + " ";


                                var tooltip_node = document.createElement("span");
                                tooltip_node.setAttribute("class", "tooltip");
                                tooltip_node.innerText = info;

                                para.appendChild(tooltip_node);
                                para_parent.appendChild(para);


                            }
                            places.appendChild(para_parent);
                        }
                        var all_sits = document.getElementsByClassName("img_chair");

                        for (l = 0; l < all_sits.length; l++) {
                            all_sits[l].onclick = function (e) {
                                e.target.classList.toggle("sit_chosen");
                                get_sits = e.target.id;
                            }
                        }

                    }
                    var save_btn = document.createElement("button");
                    save_btn.onclick = save_sits;
                    save_btn.innerHTML = "Rezerwuj";
                    container.appendChild(save_btn);
                    

                    function save_sits() {
                        sits_control = document.getElementsByClassName("sit_chosen");
                        for (i = 0; i < sits_control.length; i++) {
                            reserved_sits.push(sits_control[i].id);
                        }

                        sit_to_send = reserved_sits;

                        var n = filmy.Looknij[idc].location;
                        var f = filmy.Looknij[idc].films[idf].name;
                        var t = filmy.Looknij[idc].films[idf].days[idd];
                        var r = filmy.Looknij[idc].films[idf].hours;
                        rezerwacja.reservation[n].films[f].days[t].hours[r].reserved_sits.push(sit_to_send);
                        localStorage.setItem("res", JSON.stringify(rezerwacja));

                        var sits_control_price = document.getElementsByClassName("sit_chosen");
                        for(i=0;i<sits_control_price.length;i++){
                        var sum = sits_control_price[i].getAttribute("value");
                        var suma = sum*sits_control_price.length;
                        }
                        summary.innerHTML = "Kwota do zapłaty: " + suma + "pln";
                    }
                    function get_res() {
                        var n = filmy.Looknij[idc].location;
                        var f = filmy.Looknij[idc].films[idf].name;
                        var t = filmy.Looknij[idc].films[idf].days[idd];
                        var r = filmy.Looknij[idc].films[idf].hours;
                        var g = JSON.parse(localStorage.getItem("res"));
                        console.log(g);


                        for (i = 0; i < g.reservation[n].films[f].days[t].hours[r].reserved_sits[0].length; i++) {
                            var change = g.reservation[n].films[f].days[t].hours[r].reserved_sits[0][i];
                            console.log(change);
                            var unable_chairs = document.getElementById(change);
                            unable_chairs.style.backgroundColor="yellow"
                            unable_chairs.style.cursor="not-allowed"
                            unable_chairs.setAttribute( "onClick", "" );
                        }
                    }
                    get_res();

                }
                )
        }
        init_films();
    }
}


//////////////logowanie///////////

var users;
function loadUsers() {
    return fetch("/register.json")
        .then(function (res) { return res.json(); })
        .then(function (json) {
            // console.log(json);
            users = json;
        });
}


function send() {
    loadUsers()
        .then(function () {
            var login = document.getElementById("login").value;
            var password = document.getElementById("password").value;

            for (i = 0; i < users.users.length; i++) {
                if (login == users.users[i].username && password == users.users[i].password) {
                    is_log = true;
                }
            }

            function countdown(elementName, minutes, seconds) {
                var element, endTime, hours, mins, msLeft, time;

                function twoDigits(n) {
                    return (n <= 9 ? "0" + n : n);
                }

                function updateTimer() {
                    msLeft = endTime - (+new Date);
                    if (msLeft < 1000) {
                        alert("Twoja sesja wygasła! Zaloguj się ponownie.");
                        is_log = false;
                        element.innerHTML = "Logowanie";
                        log_in();
                    } else {
                        time = new Date(msLeft);
                        hours = time.getUTCHours();
                        mins = time.getUTCMinutes();
                        element.innerHTML = "Witaj " + login + " " + (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
                        setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
                    }
                }

                element = document.getElementById(elementName);
                endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
                updateTimer();
            }

            countdown("logowanie", 10, 0);


            movies_desc();

        })


};

function log_in() {
    container.innerHTML = "";

    var log_dial = document.createElement("div");
    log_dial.setAttribute("id", "log_dial");

    var username_login = document.createElement("label");

    username_login.innerHTML = "Podaj login";
    username_login.setAttribute("class", "username_login");
    username_login.setAttribute("for", "username_login")


    var login = document.createElement("input");
    login.setAttribute("placeholder", "login");
    login.setAttribute("id", "login");

    var password_login = document.createElement("label");

    password_login.setAttribute("class", "password_login");
    password_login.innerHTML = "Podaj hasło";
    password_login.setAttribute("for", "password_login");

    var password = document.createElement("input");
    password.setAttribute("placeholder", "hasło");
    password.setAttribute("id", "password");
    password.setAttribute("type", "password");
    password.setAttribute("pattern", "(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z]).{8,}");

    var message = document.createElement("div");
    var message_must = document.createElement("div");
    message_must.innerHTML = "Hasło musi zawierać: ";
    var special = document.createElement("p");
    special.setAttribute("class", "invalid");
    special.setAttribute("id", "special");
    special.innerHTML = "Znaki specjalne";
    var capital = document.createElement("p");
    capital.setAttribute("class", "invalid");
    capital.setAttribute("id", "capital");
    capital.innerHTML = "Wielkie litery";
    var number = document.createElement("p");
    number.setAttribute("class", "invalid");
    number.setAttribute("id", "number");
    number.innerHTML = "Przynajmniej jedną cyfrę";
    var length = document.createElement("p");
    length.setAttribute("class", "invalid");
    length.setAttribute("id", "length");
    length.innerHTML = "Przynajmniej 8 znaków";

    var btn_log = document.createElement("button");
    btn_log.setAttribute("id", "btn_log");
    btn_log.innerText = "Zaloguj";
    btn_log.onclick = send;

    container.appendChild(log_dial);
    log_dial.appendChild(username_login);
    log_dial.appendChild(password_login);
    username_login.appendChild(login);
    password_login.appendChild(password);
    log_dial.appendChild(btn_log);
    log_dial.appendChild(message);
    message.appendChild(message_must);
    message.appendChild(special);
    message.appendChild(capital);
    message.appendChild(number);
    message.appendChild(length);


    // password.onblur = function(){
    //     message.style.display = "none";
    // };
    password.onfocus = function () {
        message.style.display = "block";
    };


    password.onkeyup = function () {
        var special_characters = /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=]/g;
        if (password.value.match(special_characters)) {
            special.classList.remove("invalid");
            special.classList.add("valid");
        } else {
            special.classList.remove("valid");
            special.classList.add("invalid");
        }
        var upper_case_letters = /[A-Z]/g;
        if (password.value.match(upper_case_letters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }
        var numbers = /[0-9]/g;
        if (password.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        if (password.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
};



















//     fetch ('http://localhost:4000/login', {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//             body: JSON.stringify({
//                 login: login.value,
//                 password: password.value

//             })
//     })
//     .then(res => zmienna = res)
//     .catch(() => undefined);


// }

// }


/////////////onload////////////
window.onload = home();