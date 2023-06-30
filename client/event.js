

let grasses = document.getElementById("grasses");
let grassEaters = document.getElementById("grassEaters");
let predators = document.getElementById("predators");
let vilt = document.getElementById("vilt");
let parart = document.getElementById("parart");

function fetchAndUpdateContent() {
    fetch("value/grasses.txt")
        .then(response => response.text())
        .then(data => {
            grasses.innerHTML = "";
            let par = document.createElement("span");
            par.textContent = data;
            grasses.appendChild(par);
        });

    fetch("value/grassEaters.txt")
        .then(response => response.text())
        .then(data => {
            grassEaters.innerHTML = "";
            let par1 = document.createElement("span");
            par1.textContent = data;
            grassEaters.appendChild(par1);
        });

    fetch("value/predators.txt")
        .then(response => response.text())
        .then(data => {
            predators.innerHTML = "";
            let par2 = document.createElement("span");
            par2.textContent = data;
            predators.appendChild(par2);
        });

    fetch("value/vilt.txt")
        .then(response => response.text())
        .then(data => {
            vilt.innerHTML = "";
            let par3 = document.createElement("span");
            par3.textContent = data;
            vilt.appendChild(par3);
        });

    fetch("value/parart.txt")
        .then(response => response.text())
        .then(data => {
            parart.innerHTML = "";
            let par4 = document.createElement("span");
            par4.textContent = data;
            parart.appendChild(par4);
        });
}
fetchAndUpdateContent();
setInterval(fetchAndUpdateContent, 100);