const singleWishBtn = document.getElementById('single-wish');
const tenWishBtn = document.getElementById('ten-wish');
const totalPullsEl = document.getElementById('total-pulls');
// const pity7El = document.getElementById('pity7-pulls');
// const pity5El = document.getElementById('pity5-pulls');
// const pity4El = document.getElementById('pity4-pulls');
const cardContainer = document.getElementById('card-container');
const summaryEl = document.getElementById('summary');



//         Clicker system



let dinero = 0;
let precioTiros = [100,1000];


// Funcion de click y render 


function clic(){
    dinero++;
}

function render(){
    document.getElementById("contador").innerHTML = dinero;
}

// ------

var FPS = 30;

setInterval(function(){
    render();
},1000/FPS);



// Sonido de click

function audioPlay(){
    var audio = new Audio("./sfx/softclick.mp3");
    for(i= 0; i<audio.length; i++){
        audio[i].pause();
        audio[i].currentTime = 0;
    }
    audio.play();
    audio.volume = 0.3;
}

// Funcion de comprar tiros


function comprar(tiros){
    if(dinero >= precioTiros[tiros]){
        dinero -= precioTiros[tiros];
        return makeSingleWish();
    } else {
        alert('No tenes guita');
    }
} 

function comprarDiez(){
    if (dinero >= precioTiros[1]){
        dinero -= precioTiros[1]
        return makeTenWishes();
    } else {
        alert('No tenes plata');
    }
}


//         Gacha system 



let totalPullCount = 0;

let pity4 = 0;
let pity5 = 0;
let pity7 = 0;


// Output total pull count, pity5, pity4 values to DOM

//  DESCOMENTAR SI ANDA MAL 

// totalPullsEl.innerText = `${totalPullCount}`;
// pity7El.innerText = `${pity7}`;
// pity5El.innerText = `${pity5}`;
// pity4El.innerText = `${pity4}`;

let pullData = [
    /*
    {name: 'Keqing', count: 2, rarity: 5, type: "characters"},
    {name: 'emerald-orb', count: 4, rarity: 3, type: "weapons"}
    */
];

/*
const odds = {
    fiveStars: {
        chance: 0.006,
        softPityChance: 0.2,
        pity: 90,
        softPity: 75
    },
    fourStars: {
        chance: 0.05,
        pity: 10
    },
    threeStars: {
        chance: 0.944
    }
}
*/

const characters = {
    sevenStars: ['Pancho'],
    fiveStars: [
        'Burger con papas', 
        'Sushi', 
        'Doritos',
        'ramen',
        'pizza-muzzarella',
        'pollo-frito',
        'choripan',
        'Milanesa-de-pollo',
        'pringles'
    ],
    fourStars: [
        'pollo-asado',
        'milanesa-de-carne',
        'empanadas-de-carne',
        'Carlitos',
        'tacos',
        'canelones',
    ]
    
}

const weapons = {
    fiveStars: [
        'tentaciones',
        'oreos'
    ],
    fourStars: [
        'flan',
        'sonrisas',
        'pepitos',
        'chocolinas',
        'chipacitos',
        'panqueques'
    ],
    threeStars: [
        'galletitas-de-agua',
        'pitusas',
        'alfajor-oreo',
        'facturas',
        'surtido-bagley'
    ],
    oneStar: [
        'mondongo',
        'chinchulin',
        'fideos',
        'polenta',
        'pan-dulce-de-frutas',
        'capelettini',
        'higado-con-cebolla',
        'lincoln',
        'mellizas',
        'galletitas-de-salvado'
    ]
}

let sevenStarsIcon = `<i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    `;

let fiveStarsIcon = `<i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    `;

let fourStarsIcon = `<i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    `;

let threeStarsIcon = `<i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    `;

//        MODIFICADO POR MI TRATAR DE CAMBIAR SI NO VA 

let oneStarIcon = `<i class="fas fa-star"></i>
                    `;

// Output character or weapon (50% chance each)
function charOrWeaponSelect(rarity) {
    let val = Math.random();

    if (val > 0.2 && rarity === 7) {
        createCard('characters', characters.sevenStars, rarity);
    }

 if (val > 0.5) {
        if (rarity === 5) {
            // Ouput 5 star character
            createCard('characters', characters.fiveStars, rarity);
        } else if (rarity === 4) {
            // Ouput 4 star character
            createCard('characters', characters.fourStars, rarity);
        }
    } else {
        if (rarity === 5) {
            // Ouput 5 star weapon
            createCard('weapons', weapons.fiveStars, rarity);
        } else if (rarity === 4) {
            // Ouput 4 star weapon
            createCard('weapons', weapons.fourStars, rarity);
        }
    }
    console.log('50% chance of char or weapon');
}

// Create card & output to DOM
function createCard(type, drawableItems, rarity) {
    let rarityIcon;
    const card = document.createElement('div');

    card.classList.add('card', `${rarity}`);
    let result = drawableItems[Math.floor(Math.random() * drawableItems.length)];

    // Change name from 'cool-steel' to 'Cool Steel'
    let formattedName = (result.replace(/-/g, ' ')).replace(/\b\w/g, letter => letter.toUpperCase());

    if (rarity === 7){
        rarityIcon = sevenStarsIcon;
        card.style.background = '#DF1C5A';
    } else if (rarity === 5) {
        rarityIcon = fiveStarsIcon;
        card.style.background = '#F5B047';
    } else if (rarity === 4) {
        rarityIcon = fourStarsIcon;
        card.style.background = '#A85AAD';
    } else if (rarity === 3) {
        rarityIcon = threeStarsIcon;
        card.style.background = '#AFCDF2';
    } else {
        rarityIcon = oneStarIcon;  //Tal vez tenga q modificarlo
    }

    
    card.innerHTML = `
                    <img src="images/${type}/${result}.png">
                    <p class="item-name">${formattedName}</p>
                    <div class="rarity-icon">${rarityIcon}</div>
                    `;

    // Add 'slide-in' class after 0.2s (CSS applied to 'slide-in' class)
    setTimeout(() => card.classList.add('slide-in'), 300);

    // Update pullData arr
    updateData(result, rarity); 

    cardContainer.appendChild(card);
}

function itemExists(name) {
    return pullData.some(item => { return item.name === name });
}


// Add item to pullData arr
function updateData(itemName, rarity) {
    // If value of the key 'name' already exist, increase the count
    if (itemExists(itemName) === true) {
        pullData.forEach(item => {
            if (itemName === item.name) {
                item.count++;
            }
        });
        // If value of the key 'name' doesnt exist - push a new item into the pullData array
    } else {
        let type
        // Determine what type
        if (characters.sevenStars.includes(itemName) || characters.fiveStars.includes(itemName) || characters.fourStars.includes(itemName)) {
            type = "characters";
        } else {
            type = "weapons"
        }

        pullData.push({
            name: itemName,
            count: 1,
            rarity: rarity,
            type: type
        });
    }
    // console.log(pullData);

    updateSummaryEl();
}

// output each item to DOM
function updateSummaryEl() {
    let output = '';
    // convert the array of objects into an array of array (ordering can only be done on an array)
    let sortable = sortByRarity(); // [ ["Keqing", 1 , 5, "characters"], ["emerald-orb", 2, 3, "weapons"] ]
    sortable = sortByType(sortable);

    sortable.forEach(item => {
        let rarityIcon
        // Determine the rarity icon to show
        if (item[2] === 7){
            rarityIcon = sevenStarsIcon;
        } else if (item[2] === 5) {
            rarityIcon = fiveStarsIcon;
        } else if (item[2] === 4) {
            rarityIcon = fourStarsIcon;
        } else if (item[2] === 3 ) {
            rarityIcon = threeStarsIcon;
        } else {
            rarityIcon = oneStarIcon;
        }
      

        // Change name from 'cool-steel' to 'Cool Steel'
        let formattedName = (item[0].replace(/-/g, ' ')).replace(/\b\w/g, letter => letter.toUpperCase());
        
        // Create list element
        output += `
            <li class="items">
                <img src="images/${item[3]}/${item[0]}.png">
                <span><strong> ${formattedName} </strong></span> 
                <span class="rarity-icon"> ${rarityIcon}</span>
                <span> x ${item[1]} </span>
                <button class="button-sell">Vender</button>
            </li>
        `;
    });

    summaryEl.innerHTML = `
        <ul class="summary-data">
            ${output}
        </ul>
    `;
}


//           Vender en el inventario?? puede ser pa

const listContainer = document.getElementsByClassName('items');

summaryEl.addEventListener('click', e => {
    const botonBorrar = e.target.classList.contains('button-sell');
    dinero += 150;
})



// Sort pull summary by rarity - rarest first (char and weapons not ordered)
function sortByRarity() {
    sortable = pullData.map(Object.values); // [ ["Keqing", 1 , 5, "characters"], ["emerald-orb", 2, 3, "weapons"] ]
    // Sort by descending order
    return sortable.sort((a, b) => b[2] - a[2]);
}

// Sort pull summary by type - characters first, then weapons
function sortByType(raritySortedArr) {
    let typeSortedArr = []
    // Push the characters into the arr first
    raritySortedArr.forEach( item => {
        if(item[3] == "characters") {
            typeSortedArr.push(item)
        }
    });
    // After characters are pushed in, push the weapons
    raritySortedArr.forEach(item => {
        if(item[3] == "weapons") {
            typeSortedArr.push(item)
        }
    });
    
    return typeSortedArr;
}

// Check for 5 star SOFT pity
function softPityCheck() {
    let val = Math.random();

    // Scenario: 7 - 5 star (Chance of 0.2 - increased due to soft pity)
    if (val < 0.00015 && val >= 0.002) {
        charOrWeaponSelect(7);
        console.log('Soft pity activated');

        pity7 = 0;
    } else if (val < 0.1 && val >= 0.01) {
        // Output 5 star chracter or weapon (50% chance each)
        charOrWeaponSelect(5);
        console.log('Soft pity activated');

        // reset pity 5 count
        pity5 = 0;

        // Scenario: 4 star (Chance of 0.05)
    } else if (val < 0.05) {
        // Output 4 star character or weapon (50% chance each)
        charOrWeaponSelect(4);

        // reset pity 4 count
        pity4 = 0;

        // Scenario: 3 star (Chance of 0.944)
    } else if (val < 0.15) {
        createCard('weapons', weapons.threeStars, 3);
    } else {
        createCard('weapons', weapons.oneStar, 1);
    }
}

// Make a Single Wish






function makeSingleWish() {

    
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Increase pity count & totalPullCount by 1
    pity7++;
    pity5++;
    pity4++;
    totalPullCount++;

    console.log(pity5, pity4);

    // Check for 5 star SOFT pity && 4 star pity (occur at the same time)
  if (pity7 >= 15 && pity7 < 150 && pity5 >= 75 && pity5 < 90 && pity4 === 10) {
        // 4 star first - if pity4 === 10, output a 4 star char or weapon 
        // Output a 4 star character or weapon (50% chance each)
        charOrWeaponSelect(4);

        // reset pity 4 count
        pity4 = 0;

        // Check for 5 star SOFT pity
    } else if (pity7 >= 15 && pity7 < 150) {
        softPityCheck();

    } else if (pity7 === 150) {
        charOrWeaponSelect(7);
        //resetea el pity
        pity7 = 0;
    } else if (pity5 >= 75 && pity5 < 90) {
        softPityCheck();

        // Check for 5 star pity
    } else if (pity5 === 90) {
        // Output 5 star chracter or weapon (50% chance each)
        charOrWeaponSelect(5);

        // Reset pity 5 count
        pity5 = 0;

        // Check for 4 star pity
    } else if (pity4 === 10) {
        // Output a 4 star character or weapon (50% chance each)
        charOrWeaponSelect(4);

        // reset pity 4 count
        pity4 = 0;

    } else { // Normal non-pity pull - Need to check for 0.006, 0.05
        let val = Math.random();

        // Scenario: 7 star (Chance of 0.002)
        if (val < 0.003) {
            charOrWeaponSelect(7);
            pity7= 0;

        } else if (val < 0.001) {
            // Output 5 star character or weapon (50% chance each)
            charOrWeaponSelect(5);

            // reset pity 5 count
            pity5 = 0;

            // Scenario: 4 star (Chance of 0.05)
        } else if (val < 0.056 && val >= 0.006) {
            // Output 4 star character or weapon (50% chance each)
            charOrWeaponSelect(4);

            // reset pity 4 count
            pity4 = 0;

            // Scenario: 3 star (Chance of 0.944)
        } else if (val < 0.350) {
            createCard('weapons', weapons.threeStars, 3);
        } else {
            createCard('weapons', weapons.oneStar, 1)
        }
    }
}


// Make Ten Wishes
function makeTenWishes() {
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Make 10 single wishes
    let i = 0;

    while (i < 10) {
        // Increase pity count & totalPullCount by 1
        pity7++;
        pity5++;
        pity4++;
        totalPullCount++;
        console.log(pity5, pity4);

        // Output total pull count, pity5, pity4 values to DOM

        // DESCOMENTAR LUEGO SI ANDA MAL 

        // totalPullsEl.innerText = `${totalPullCount}`;
        // pity7El.innerText = `${pity7}`;
        // pity5El.innerText = `${pity5}`;
        // pity4El.innerText = `${pity4}`;

        // Check for 5 star SOFT pity && 4 star pity (occur at the same time)
        if (pity7 >= 15 && pity7 < 150 && pity5 >= 75 && pity5 < 90 && pity4 === 10) {
            // 4 star first - if pity4 === 10, output a 4 star char or weapon 
            // Output a 4 star character or weapon (50% chance each)
            charOrWeaponSelect(4);

            // reset pity 4 count
            pity4 = 0;

            // Check for 5 star SOFT pity
        } else if (pity7 >= 15 && pity7 < 150) {
            softPityCheck();
        } else if (pity5 >= 75 && pity5 < 90) {
            softPityCheck();


            // Check for 5 star pity
        } else if (pity7 === 150){
            charOrWeaponSelect(7);
            pity7 = 0;
        } else if (pity5 === 90) {
            // Output 5 star chracter or weapon (50% chance each)
            charOrWeaponSelect(5);

            // Reset pity 5 count
            pity5 = 0;

            // Check for 4 star pity
        } else if (pity4 === 10) {
            // Output a 4 star character or weapon (50% chance each)
            charOrWeaponSelect(4);
            console.log('4 star pity');

            // reset pity 4 count
            pity4 = 0;

        } else { // Normal non-pity pull - Need to check for 0.006, 0.05
            let val = Math.random();

            // Scenario: 5 star (Chance of 0.006)

            if (val < 0.003) {
                charOrWeaponSelect(7);
                pity7 = 0;
            } else if (val < 0.0004) {
                // Output 5 star chracter or weapon (50% chance each)
                charOrWeaponSelect(5);

                // reset pity 5 count
                pity5 = 0;

                // Scenario: 4 star (Chance of 0.05)
            } else if (val < 0.056 && val >= 0.006) {
                // Output a 4 star character or weapon (50% chance each)
                charOrWeaponSelect(4);
                console.log('4 star non-pity');

                // reset pity 4 count
                pity4 = 0;

                // Scenario: 3 star (Chance of 0.944)
            } else if (val < 0.350){
                createCard('weapons', weapons.threeStars, 3);
                // Scenario: 1 estrella puaj
            } else {
                createCard('weapons', weapons.oneStar, 1)
            }
        }
        //console.log(sortByRarity());
        i++;
    }
}

// Event Listeners
// singleWishBtn.addEventListener('click', makeSingleWish);
//tenWishBtn.addEventListener('click', makeTenWishes);