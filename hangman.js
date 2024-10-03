let image_changer = document.querySelector(".image-changer");
let hint = document.querySelector(".hint");
let reset = document.getElementsByClassName("reset");
let buttons = document.querySelectorAll(".button");
let lists = document.querySelector(".lists");
let incorrect_guess_element = document.querySelector(".incorrect_guess");
let score = document.querySelector(".score");
let quit = document.querySelector(".quit");

let generated_word = [];  // Make generated_word global                // gpt suggestion

// Array of words for Hangman game
const words = [
    "puzzle",
    "kangaroo",
    "astronomy",
    "chocolate",
    "volcano",
    "python",
    "library",
    "airplane",
    "horizon",
    "dinosaur",
    "keyboard",
    "internet",
    "sandcastle",
    "microscope",
    "butterfly"
];

// Array of corresponding hints
const hints = [
    "A game or problem that tests ingenuity.",
    "An Australian animal that hops.",
    "The study of celestial objects and the universe.",
    "A sweet treat made from cocoa beans.",
    "A mountain that erupts with lava.",
    "A type of programming language or a snake.",
    "A place where you borrow books.",
    "A vehicle that flies in the sky.",
    "The line where the sky meets the earth.",
    "An extinct reptile that lived millions of years ago.",
    "A device used to input characters into a computer.",
    "A global network of connected computers.",
    "A structure made of sand, often built on the beach.",
    "A device used to see tiny objects.",
    "An insect with colorful wings that goes through metamorphosis."
];

const images = [
    "./Allstages/stage1.png",
    "./Allstages/stage2.png",
    "./Allstages/stage3.png",
    "./Allstages/stage4.png",
    "./Allstages/stage5.png",
    "./Allstages/stage6.png",
    "./Allstages/stage7.png",
    "./Allstages/stage8.png"
];

let initialization = () => {
    let randomword = Math.floor(Math.random() * words.length);
    generated_word = words[randomword];
    let selected_word = generated_word.toUpperCase().split("");
    // console.log(selected_word);
    let hint = hints[randomword]
    // console.log(hint);
    li(selected_word)
    showhint(hint)
    button(selected_word)
}

// created list element

let li = (word) => {
    lists.innerHTML = "";
    word.forEach(() => {
        let list = document.createElement("li");
        list.textContent = "";
        lists.appendChild(list)

    })
}

// created hint element

let showhint = (hint_text) => {
    hint.innerHTML = "";
    h3 = document.createElement("h3");
    h3.textContent = hint_text;
    hint.appendChild(h3)

}


// initialization of incorrect guess and score

let incorrect_guess = 0;
let scoree = 0;

// updating imaes

const updateImage = () => {
    if (incorrect_guess > 0) {
        image_changer.src = images[incorrect_guess]      //  showed by chatgpt
    }

}

// Activating buttons

let button = (gen_word) => {
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            let letter = btn.innerHTML
            // console.log(`clicked letter is ${letter}`);

            //  Getting all the list items (each corresponds to a letter in the word)
            let listItems = document.querySelectorAll(".lists li");       //  showed by chatgpt
            let letterFound = false;

            // checking ifthe letter exist in the list or not

            gen_word.forEach((char, index) => {                         //  showed by chatgpt
                if (char === letter) {                                  //  showed by chatgpt
                    listItems[index].textContent = letter;              //  showed by chatgpt
                    letterFound = true;
                    scoree = scoree + 10
                    score.textContent = `${scoree}`
                }
                btn.disabled = true;

            })

            if (!letterFound) {                                           //  showed by chatgpt
                incorrect_guess++;
                incorrect_guess_element.textContent = `${incorrect_guess}/7`
                updateImage()

            }
            if(incorrect_guess==7){
                setTimeout(()=>{
                    alert("game over! refresh the page to start a new game or click reset button to start a new game")
                },1000)
            }
            clearTimeout()
        })
    })
}

initialization();


let resett = () => {
    buttons.forEach(btn => btn.disabled = false)
    initialization();
    incorrect_guess = 0
    scoree = 0
    incorrect_guess_element.textContent = `${incorrect_guess}/7`;
    score.textContent = `${scoree}`
    image_changer.src = images[0]
    quit.textContent = ""
    buttons.forEach(btn => btn.disabled = flase)
    

}

let quit_is_disabled = false                                       // gpt 
let quitt = () => {
    if (quit_is_disabled ) return;                                  //gpt
    let qui = document.createElement("h3");
    qui.textContent = generated_word;
    quit.appendChild(qui);
    quit.getAttribute('id')
    buttons.forEach(btn => btn.disabled = true)
    quit_is_disabled = true

}