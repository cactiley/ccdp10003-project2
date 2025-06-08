function changeItem(itemType, number) {
    let div = document.querySelector(`.${itemType}-img`);
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

function hideIntro() {
    let intro = document.querySelector('div.intro');
    intro.style.display = "none";
}

const itemDescriptions = {
    headgear: {
        0: ["no headgear selected", "baldie ???"],
        1: ["pot", "its a pot."],
        2: ["shaggy hair", "a certain composer comes to mind."],
        3: ["blowout", "reminiscent of the early 2010s!"]

    },
    outfit: {
        1: ["king's robes", "o7"],
        2: ["no. 1 outfit", "you might want to take a look at the clothes others have designed by using their codes."],
        3: ["starlight serenade", "no expense spared!"]
    },
    accessory: {
        0: ["no accessory selected", "boring."],
        1: ["guild tag", "you suddenly feel like yelling your name and rushing a dungeon."],
        2: ["plumbob", "am i in a simulation?"],
        3: ["rating scale", "i feel compelled to argue with kids half my age over arbitrary beauty standards."]

    }
};

const currentSelections = {
    headgear: "0",
    outfit: "1",
    accessory: "0"
};

const setDescriptions = {
    "1": ["emergent personas???", "lorem ipsum"],
    "2": ["self-expression", "lorem ipsum"],
    "3": ["fashion man idk", "lorem ipsum"]
};

function changeTabs(option) {
    let itemType = option.dataset.itemType;
    let number = option.dataset.number;
    currentSelections[itemType] = number;
    let flavorText = document.querySelector(`.${itemType}-flavor`);
    if (flavorText && itemDescriptions[itemType]?.[number]) {
        let title = flavorText.querySelector('.flavor-title');
        let desc = flavorText.querySelector('.flavor-desc');
        title.textContent = itemDescriptions[itemType][number][0];
        desc.textContent = itemDescriptions[itemType][number][1];

        let textboxes = document.querySelectorAll(`.${itemType}-flavor`)
        for (let i = 0; i < textboxes.length; i++) {
            textboxes[i].classList.remove('active');
        }
        flavorText.classList.add('active');
    }

    checkForSet();
};

function checkForSet() {
    let setFlavor = document.querySelector('.set-flavor');
    setFlavor.querySelector('.flavor-title').textContent = "try to find sets!";
    setFlavor.querySelector('.flavor-desc').textContent = "equip all items from a set to discover bonus content !!";
    setFlavor.classList.remove('active');

    let numbers = Object.values(currentSelections);
    let setNumber = numbers[0];

    let allMatch = true;
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] !== setNumber) {
            allMatch = false;
            break;
        }
    }

    if (allMatch) {
        setFlavor.querySelector('.flavor-title').textContent = setDescriptions[setNumber][0];
        setFlavor.querySelector('.flavor-desc').textContent = setDescriptions[setNumber][1];
        setFlavor.classList.add('active');
    }
}

let options = document.querySelectorAll('.option');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
        changeItem(`${options[i].dataset.itemType}`, `${options[i].dataset.number}`)
        changeTabs(options[i])
    })
}

let tabs = document.querySelectorAll('.tab');
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) { openTab(e, `${tabs[i].dataset.typeOfClothing}`) })
}

document.querySelector('button.close').addEventListener("click", hideIntro)

document.querySelector('.tab').click();