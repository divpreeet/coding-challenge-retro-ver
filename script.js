const challenges = {
    javascript: [
        {
            question: "Log 'Hello, Coffee!' to the console.",
            answer: "console.log('Hello, Coffee!')",
            hint: "Use console.log() to output text."
        },
        {
            question: "Create a variable 'beans' and assign it the value 42.",
            answer: "let beans = 42;",
            hint: "Use 'let' to declare a variable and assign a value with '='."
        },
        {
            question: "Write a function that returns the square of a number.",
            answer: "function square(x) { return x * x; }",
            hint: "Define a function that takes a parameter and returns its product with itself."
        },
        {
            question: "Create an array called 'coffeeTypes' with three different types of coffee.",
            answer: "let coffeeTypes = ['Espresso', 'Latte', 'Cappuccino'];",
            hint: "Use square brackets [] to create an array and separate items with commas."
        },
        {
            question: "Write a for loop that prints numbers from 1 to 5.",
            answer: "for (let i = 1; i <= 5; i++) { console.log(i); }",
            hint: "Use a for loop with a counter that starts at 1 and ends at 5."
        }
    ],
    python: [
        {
            question: "Print 'Hello, Coffee!' to the console.",
            answer: "print('Hello, Coffee!')",
            hint: "Use the print() function to output text."
        },
        {
            question: "Create a variable 'beans' and assign it the value 42.",
            answer: "beans = 42",
            hint: "In Python, you can directly assign a value to a variable name."
        },
        {
            question: "Write a function that returns the square of a number.",
            answer: "def square(x):\n    return x * x",
            hint: "Use 'def' to define a function, and don't forget to indent the return statement."
        },
        {
            question: "Create a list called 'coffee_types' with three different types of coffee.",
            answer: "coffee_types = ['Espresso', 'Latte', 'Cappuccino']",
            hint: "Use square brackets [] to create a list and separate items with commas."
        },
        {
            question: "Write a for loop that prints numbers from 1 to 5.",
            answer: "for i in range(1, 6):\n    print(i)",
            hint: "Use a for loop with range() to generate numbers from 1 to 5."
        }
    ],
    cpp: [
        {
            question: "Print 'Hello, Coffee!' to the console.",
            answer: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, Coffee!\" << std::endl;\n    return 0;\n}",
            hint: "Use std::cout and don't forget to include <iostream>."
        },
        {
            question: "Create a variable 'beans' and assign it the value 42.",
            answer: "int beans = 42;",
            hint: "Declare an integer variable and initialize it in one line."
        },
        {
            question: "Write a function that returns the square of a number.",
            answer: "int square(int x) {\n    return x * x;\n}",
            hint: "Define a function that takes an int parameter and returns an int."
        },
        {
            question: "Create an array called 'coffeeTypes' with three different types of coffee.",
            answer: "#include <string>\n\nstd::string coffeeTypes[] = {\"Espresso\", \"Latte\", \"Cappuccino\"};",
            hint: "Use an array of strings to store the coffee types."
        },
        {
            question: "Write a for loop that prints numbers from 1 to 5.",
            answer: "#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        std::cout << i << std::endl;\n    }\n    return 0;\n}",
            hint: "Use a for loop with a counter that starts at 1 and ends at 5."
        }
    ]
};

let currentLang = '';
let currentChallenge = 0;
let score = 0;
let level = 1;

const languageButtons = document.querySelectorAll('[data-lang]');
const challengeArea = document.getElementById('challenge-area');
const outputArea = document.getElementById('output-area');
const challengeText = document.getElementById('challenge-text');
const codeInput = document.getElementById('code-input');
const hintBtn = document.getElementById('hint-btn');
const nextBtn = document.getElementById('next-btn');
const output = document.getElementById('output');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const progressBar = document.getElementById('progress-bar').querySelector('div');
const achievementPopup = document.getElementById('achievement-popup');
const achievementText = document.getElementById('achievement-text');

function setChallenge() {
    challengeText.textContent = challenges[currentLang][currentChallenge].question;
    codeInput.value = '';
    output.textContent = '';
    nextBtn.classList.add('hidden');
    updateProgressBar();
}

function checkCode() {
    const code = codeInput.value.trim();
    const answer = challenges[currentLang][currentChallenge].answer.trim();
    
    if (code === answer) {
        output.textContent = "Correct! Great job!";
        score += 10;
        scoreDisplay.textContent = score;
        if (score % 20 === 0) {
            level++;
            levelDisplay.textContent = level;
            showAchievement(`Level Up! You're now level ${level}`);
        }
        nextBtn.classList.remove('hidden');
        updateProgressBar();
    } else {
        output.textContent = "Not quite right. Keep trying!";
    }
}

function showHint() {
    alert(challenges[currentLang][currentChallenge].hint);
}

function nextChallenge() {
    currentChallenge = (currentChallenge + 1) % challenges[currentLang].length;
    setChallenge();
}

function updateProgressBar() {
    const progress = ((currentChallenge + 1) / challenges[currentLang].length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showAchievement(message) {
    achievementText.textContent = message;
    achievementPopup.classList.remove('hidden');
    setTimeout(() => {
        achievementPopup.classList.add('hidden');
    }, 3000);
}

languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        currentChallenge = 0;
        challengeArea.classList.remove('hidden');
        outputArea.classList.remove('hidden');
        setChallenge();
        
        // Highlight the selected language button
        languageButtons.forEach(b => b.classList.remove('bg-[#E5B299]'));
        btn.classList.add('bg-[#E5B299]');

        showAchievement(`Language changed to ${currentLang}`);
    });
});

codeInput.addEventListener('input', checkCode);
hintBtn.addEventListener('click', showHint);
nextBtn.addEventListener('click', nextChallenge);

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        checkCode();
    } else if (e.ctrlKey && e.key === 'h') {
        showHint();
    } else if (e.ctrlKey && e.key === 'n') {
        nextChallenge();
    }
});

// Initialize with a default language
languageButtons[0].click();
