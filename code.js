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
        0: ["no headgear selected", "Such a shiny head!", "You sure you don't want a hat or some hair?"],
        1: ["pot", "It's a pot.", "Found yourself in trouble with Malenia, Blade of Miquella? Consider calling upon the dual-wielding, bucket-hat-wearing extraordinaire Let Me Solo Her."],
        2: ["shaggy hair", "A certain composer comes to mind...", "The perfect hairstyle for holding virtual 3D concerts in Second Life."],
        3: ["blowout", "Lookin' good, girl!", "A haircut reminiscent of an early 2010s model – the dream for many young girls making their first foray into the world of gaming! Try it on for yourself!"]

    },
    outfit: {
        1: ["king's robes", "Garments befitting a legend. o7", "The royal attire of the beloved Minecraft youtuber Technoblade (RIP). Both he and his character left a lasting impact on the Minecraft community, and a tribute to him appeared in the recent Minecraft movie in the form of a pig with a crown."],
        2: ["no. 1 outfit", "It's your itemized bill!", "A basic Animal Crossing outfit worn by the Super Smash Brothers Ultimate iteration of the player character – perhaps head to the Able Sisters' store and design your own, grab some custom design codes from other players on the Internet, or save up some bells to buy from Tom Nook."],
        3: ["starlight serenade", "May the stars shine upon you!", "In Infinity Nikki, your clothes don't just look beautiful; they also give you special abilities! Don your best gown and use its magic to protect the world from the malevolent forces of The Dark."]
    },
    accessory: {
        0: ["no accessory selected", "Boring.", "Come on, pick something out!"],
        1: ["guild tag", "Try yelling your own name and rushing headfirst into a dungeon. It's sure to end well...", "Now an NPC found in World of Warcraft, Leeroy Jenkins is a player character who went viral for charging into battle heedless of his friends' carefully planned strategy."],
        2: ["plumbob", "Am I in a simulation...?", "The classic symbol of The Sims – just be sure to keep all your need bars full both in-game and out!"],
        3: ["rating scale", "You feel like arguing with kids half your age over arbitrary beauty standards.", "It's difficult to get a 5-star rating in the Roblox game Dress to Impress – mostly because rating someone else fairly lowers your own chance of being crowned Best At Fashion for the round (and who doesn't want to be the best?). At least we can safely say that the spirit of girls' dress-up games lives on!"]
    }
};

const currentSelections = {
    headgear: "0",
    outfit: "1",
    accessory: "0"
};

const setDescriptions = {
    "1": ["emergent personas", "For some, avatars transcend personal customisation and become iconic characters of gaming communities: from beloved internet personalities to players so well-known that their avatars were later incorporated into the game. As the internet has grown, so too has the notoriety of its inhabitants. In fact, these online personas can become so popular that they long outlast the activity and relevance of the player; they may even become synonymous with the lore of the game itself."],
    "2": ["self-expression and virtual life", "Of course, the perfect vehicle for self-discovery and expression is the interactive virtual world, where players can reinvent themselves and their surroundings at will. Online and social simulator games have dedicated player communities even 20 years on; their focus on interactivity and social simulation allows for greater user investment and provides limitless potential for self-expression without any real-life consequences. Players can use these games as tools of identity exploration, safe spaces to try on new skins and interests: an escape into a world that offers autonomy they may not have in their normal lives."],
    "3": ["fashion and “girls games”", "From the late 90s to the 2010s (and today, in new forms), online dress-up games targeted at young girls proliferated. While they introduced a new demographic to gaming, they also reinforced the harmful idea that appearance is everything — a mantra that was never true (nor should have been). Despite this, there is something to be said about the endless opportunities for experimentation and self-expression. Plus, as gaming cultures grow more inclusive, so do their player bases and the games themselves – as is the case with the open-world gacha game Infinity Nikki, which is enjoyed by people of all genders."]
};

function changeTextboxes(option) {
    let itemType = option.dataset.itemType;
    let number = option.dataset.number;
    currentSelections[itemType] = number;
    let flavorText = document.querySelector(`.${itemType}-flavor`);
    if (flavorText && itemDescriptions[itemType]?.[number]) {
        let title = flavorText.querySelector('.flavor-title');
        let quote = flavorText.querySelector('.flavor-quote');
        let desc = flavorText.querySelector('.flavor-desc');
        title.textContent = itemDescriptions[itemType][number][0];
        quote.textContent = itemDescriptions[itemType][number][1];
        desc.textContent = itemDescriptions[itemType][number][2];

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

    let headgearSet = currentSelections.headgear;
    let outfitSet = currentSelections.outfit;
    let accessorySet = currentSelections.accessory;

    let allMatch = (headgearSet == outfitSet && outfitSet == accessorySet)

    if (allMatch) {
        setFlavor.querySelector('.flavor-title').textContent = setDescriptions[headgearSet][0];
        setFlavor.querySelector('.flavor-desc').textContent = setDescriptions[headgearSet][1];
        setFlavor.classList.add('active');
    } else {
        setFlavor.querySelector('.flavor-title').textContent = "try to find sets!";
        setFlavor.querySelector('.flavor-desc').textContent = "Equip all items from a set to discover bonus content!";
        setFlavor.classList.remove('active');
    }
}

let options = document.querySelectorAll('.option');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
        changeItem(`${options[i].dataset.itemType}`, `${options[i].dataset.number}`)
        changeTextboxes(options[i])
    })
}

let tabs = document.querySelectorAll('.tab');
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) { openTab(e, `${tabs[i].dataset.typeOfClothing}`) })
}

document.querySelector('button.close').addEventListener("click", hideIntro)

document.querySelector('.tab').click();