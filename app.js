let admin = document.querySelector('.admin');

let adminLines = document.querySelector('.adm_line_wrapper');
let adminStationBtn = document.querySelector('.admin_stations_btn');
let admin_line = document.querySelectorAll('.admin_line');
let admin_stations = document.querySelectorAll('.admin_stations');
let admBtn = document.querySelector('.admin_menu_btn')
let closeBtn = document.querySelector('.closeBtn') 
let admin_panel = document.querySelector('.nav_panel')

let nav_menu = document.querySelectorAll('.nav_menu');
let nav_stations = document.querySelectorAll('.nav_stations');
let nav_line_name = document.querySelectorAll('.nav_line_name');
let stationsBtn = document.querySelectorAll('.stations');
let mini_station = document.querySelectorAll('.mini_station');
let station = document.querySelectorAll('.Line');
let mobStationBtns = document.querySelectorAll('.mark_content');
let mobStations = document.querySelectorAll('.station_content');
let menu_btns = document.querySelectorAll('.menu_btn');
let mob_menu = document.querySelector('.mob_menu');
let hiddenElements = document.querySelectorAll('.hidden');

let historyBtn = document.querySelector('.mob_history_title');
let history = document.querySelector('.mob_history_wrapper');

window.addEventListener('scroll', function() {
    nav_menu.forEach(menu => menu.classList.remove('active'));
    stationsBtn.forEach(btn => btn.classList.remove('active'));
});

function setupClickOutside(activeElements, closeCallback) {
    document.addEventListener('click', function(event) {
        let shouldClose = true;
        
        activeElements.forEach(element => {
            if (element.contains(event.target)) {
                shouldClose = false;
            }
        });
        
        if (shouldClose) {
            closeCallback();
        }
    });
}

if (historyBtn) {
    historyBtn.onclick = () => {
        history.classList.toggle('active')
    }
}

if (admin) {
    adminStationBtn.onclick = () => {
        adminLines.classList.toggle('active');
        adminStationBtn.classList.toggle('active');
    };
    admin_line.forEach((name, index) => {
        name.onclick = () => {
            admin_stations[index].classList.toggle('active');
        };
    });
    admBtn.onclick = () => {
        admin_panel.classList.add('active');
        admBtn.classList.add('active');
    };
    
    closeBtn.onclick = () => {
        admin_panel.classList.remove('active');
        admBtn.classList.remove('active');
    };


} else {
    document.querySelectorAll('.station').forEach((station, index) => {
        station.style.transitionDelay = `${(index + 1) * 100}ms`;
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    hiddenElements.forEach((el) => observer.observe(el));
    menu_btns.forEach((menu_btn, index) => {
        menu_btn.onclick = () => {
            mob_menu.classList.toggle('active');
            menu_btns[0].classList.toggle('active');
        };
    })
    
    stationsBtn.forEach((name, index) => {
        name.onclick = () => {
            nav_menu[index].classList.toggle('active');
            stationsBtn[index].classList.toggle('active');
        };
    });
    nav_line_name.forEach((name, index) => {
        name.onclick = () => {
            nav_stations[index].classList.toggle('active');
            nav_line_name[index].classList.toggle('active');
        };
    });
    mini_station.forEach((mini, index) => {
        mini.onclick = () => {
            if (index <= 8) {
                station[0].classList.add('active');
            } else {
                station[1].classList.add('active');
            };
        };
    });

    mobStationBtns.forEach((mobStationBtn, index) => {
        mobStationBtn.onclick = () =>{
            mobStationBtns[index].classList.toggle('active');
            mobStations[index].classList.toggle('active');
        };
    });

    setupClickOutside([...nav_menu, ...stationsBtn], () => {
        nav_menu.forEach(menu => menu.classList.remove('active'));
        stationsBtn.forEach(btn => btn.classList.remove('active'));
    });

    setupClickOutside([mob_menu, ...menu_btns], () => {
        mob_menu.classList.remove('active');
        menu_btns[0].classList.remove('active');
    });
    
    setupClickOutside([...mobStations, ...mobStationBtns], () => {
        mobStations.forEach(station => station.classList.remove('active'));
        mobStationBtns.forEach(btn => btn.classList.remove('active'));
    });


    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    

}

document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const url = new URL(this.href);
        const targetId = url.hash.substring(1);

        if (url.pathname === window.location.pathname && targetId) {
            e.preventDefault();
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});