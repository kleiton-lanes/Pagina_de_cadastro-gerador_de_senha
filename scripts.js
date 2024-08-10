// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersinput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");
const registerInput = document.querySelector("#register");

// Funções
        // Leras, Números e Símbolos
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);  
};

const getLetterUperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);  
};

const getNumber = () => {
    return Math.floor(Math.random() * 11).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)]
};

        // gerando a senha
const generatePassword = (getLetterLowerCase, getLetterUperCase, getNumber, getSymbol) => {
    let password = "";

    const passwordLength = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUperCase);
    };

    if(numbersinput.checked) {
        generators.push(getNumber);
    };

    if(symbolsInput.checked) {
        generators.push(getSymbol);
    };

    console.log(generators.length);

    if(generators.length === 0) {
        return;
    };

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
        
            password += randomValue;
        })
    }

    password = password.slice(0,passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};


// Eventos
openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
});

generatePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    generatePassword(
        getLetterLowerCase,
        getLetterUperCase,
        getNumber,
        getSymbol
    );
});

copyPasswordButton.addEventListener ("click", (e) =>{
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!";

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        },1000);
    });
});

