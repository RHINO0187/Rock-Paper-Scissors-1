document.addEventListener('DOMContentLoaded', () => {
    const choices = ["rock", "paper", "scissors"];

    function computerPlay() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function playRound(playerSelection, computerSelection) {
        playerSelection = playerSelection.toLowerCase();
        computerSelection = computerSelection.toLowerCase();

        if (!choices.includes(playerSelection)) {
            return "Invalid choice. Please choose rock, paper, or scissors.";
        }

        if (playerSelection === computerSelection) {
            return "It's a tie!";
        } else if (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
        ) {
            return `You win! ${playerSelection} beats ${computerSelection}.`;
        } else {
            return `You lose! ${computerSelection} beats ${playerSelection}.`;
        }
    }

    function game(playerChoice) {
        const computerChoice = computerPlay();
        const result = playRound(playerChoice, computerChoice);

        // Display Result
        const resultDisplay = document.querySelector('.result');
        resultDisplay.textContent = result;
    }

    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            game(button.id);
        });
    });
});
