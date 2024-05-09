document.addEventListener('DOMContentLoaded', () => {
    const choices = ["rock", "paper", "scissors"];
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let roundsPlayed = 0;

    function computerPlay() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function updateScoreboard() {
        document.getElementById('wins').textContent = wins;
        document.getElementById('losses').textContent = losses;
        document.getElementById('ties').textContent = ties;
    }

    function resetGame() {
        wins = 0;
        losses = 0;
        ties = 0;
        roundsPlayed = 0;
        updateScoreboard();
        document.querySelector('.result').textContent = 'Pick your tool of choice';
        const buttons = document.querySelectorAll('.options button');
        buttons.forEach(button => {
            button.disabled = false;  // Re-enable all game buttons
        });
        document.getElementById('reset').style.display = 'none';  // Hide the reset button
    }

    function declareWinner() {
        const resetButton = document.getElementById('reset');
        resetButton.style.display = 'inline'; // Show the reset button
        if (wins > losses) {
            return "Congratulations! You've won the game!";
        } else if (losses > wins) {
            return "Game Over! The computer wins the game.";
        } else {
            return "It's a tie game!";
        }
    }

    function playRound(playerSelection, computerSelection) {
        if (roundsPlayed >= 5) {
            return declareWinner();
        }

        playerSelection = playerSelection.toLowerCase();
        computerSelection = computerSelection.toLowerCase();

        if (!choices.includes(playerSelection)) {
            return "Invalid choice. Please choose rock, paper, or scissors.";
        }

        if (playerSelection === computerSelection) {
            ties++;
        } else if (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
        ) {
            wins++;
        } else {
            losses++;
        }

        roundsPlayed++;
        updateScoreboard();
        if (roundsPlayed === 5) {
            return declareWinner();
        }

        return ""; // Return an empty string if the game has not reached the end.
    }

    function game(playerChoice) {
        const computerChoice = computerPlay();
        const result = playRound(playerChoice, computerChoice);

        const resultDisplay = document.querySelector('.result');
        resultDisplay.textContent = result || `Round ${roundsPlayed}: Choose your move!`;
    }

    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'reset') {
                resetGame();
            } else if (roundsPlayed < 5) {
                game(button.id);
            } else {
                button.disabled = true; // Disable game buttons after 5 rounds
            }
        });
    });
});
