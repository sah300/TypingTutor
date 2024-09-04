
const paragraphs = [
    'In Harrys world fate works not only through powers and objects such as prophecies, the Sorting Hat, wands, and the Goblet of Fire, but also through people. Repeatedly, other characters decide Harrys future for him, depriving him of freedom and choice. For example, before his eleventh birthday, the Dursleys control Harrys life, keeping from him knowledge of his past and understanding of his identity',
    'Evidence from industrialized countries suggests that compared with older men, older women more often experience functional impairments and activity limitations, have longer durations of disability, and spend proportionately more remaining years of life disabled.',
    'In brief, the mummification process may be summarized as follows: extract, sterilize, dehydrate, perfume, seal, tag, and stock. All were done ceremoniously and with due respect to the dead body. The viscera were extracted through an incision about 10 inches long, usually made in the left side of the abdomen. Through this incision, all the floating contents of the abdominal cavity, namely, the stomach, the liver, the spleen, and the intestines, were removed but the kidneys were left in place.',
    'This study was a preliminary study of high school student value changes because of the terrorist attack on the U.S. The major limitations of this study were that the student population was from California and might not truly represent all high school students in the U.S. Further, this study could not be considered a truly longitudinal study because of privacy issues that prevented the researchers from identifying all the students who returned surveys before the attack.',
    'A celebrity is known for being well-known, regardless of whether that eminence derives from the entertainment field, medicine, science, politics, religion, sports, or close association with other celebrities. Therefore, fame is a psychological concept akin to object-relations theory and is multifaceted in scope. ',
    'Its perhaps not surprising that Marshall McLuhan, the most influential communications expert of the twentieth century, was a Canadian. As a nation, we have been preoccupied with forging communication links among a sparse, widespread population. The old Canadian one-dollar bill, with its line of telephone poles receding to the distant horizon, illustrates this preoccupation. Year after year we strive to maintain a national radio and television broadcasting system in the face of foreign competition. We have been aggressive in entering the international high technology market with our telecommunications equipment.',
    'Our typology is built on three dimensions: internality, types of participants, and the degree of effective resistance. For our study, a civil war is any armed conflict that involves (a) military action internal to the metropole, (b) the active participation of the national government, and (c) effective resistance by both sides. With these criteria, we differentiate civil wars from other types of internal violent conflicts.',    
    'Spreadsheets provide a great way to organize data. Think of a spreadsheet as a table with rows and columns. Spreadsheets also provide mathematical functions, such as means and standard deviations. Each row holds details about one entity. Each column holds details about a particular parameter. For example, you can create a spreadsheet to organize data about different trees. Each row would represent a different type of tree. Each column would represent a different characteristic, such as the tree height or the tree spread.',
]

const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".main .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    }    
    else {
        clearInterval(timer);
        inpField.value = "";
    }   
}
function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    }
    else {
        clearInterval(timer);
    }
}
function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", reset);