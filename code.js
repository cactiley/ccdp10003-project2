function changeItem(itemType, number) {
    let div = document.querySelector(`.${itemType}`);
    div.style.backgroundImage = `url(assets/${itemType}${number}.webp)`;
}

function openTab(e, typeOfClothing) {
    let options = document.querySelectorAll('.options');
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = "none";
    }
    let tabs = document.querySelectorAll('.tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    let activeDiv = document.querySelector(`.${typeOfClothing}.options`);
    activeDiv.style.display = "block";
    e.currentTarget.classList.add("active");
}

let options = document.querySelectorAll('.option');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () { changeItem(`${options[i].dataset.itemType}`, `${options[i].dataset.number}`) })
}
let tabs = document.querySelectorAll('.tab');
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) { openTab(event, `${tabs[i].dataset.typeOfClothing}`) })
}

document.querySelector('.tab').click();