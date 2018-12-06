function RPS(choice) {
    const player_choice = choice
    const choices = ['rock', 'paper', 'scissors']

    const enemy_choice = choices[Math.floor(Math.random() * choices.length)]
    let output = `Enemy chose ${enemy_choice}. `
    if (choice == 'rock') {
        switch (enemy_choice) {
            case 'rock':
                output += "It's a tie!"
                break;
            case 'paper':
                output += 'You loss...'
                break;
            case 'scissors':
                output += 'You won!'
                break;
        }
    } else if (choice == 'paper') {
        switch (enemy_choice) {
            case 'rock':
                output += 'You won!'
                break;
            case 'paper':
                output += "It's a tie!"
                break;
            case 'scissors':
                output += 'You loss...'
                break;
        }
    } else if (choice == 'scissors') {
        switch (enemy_choice) {
            case 'rock':
                output += 'You loss...'
                break;
            case 'paper':
                output += 'You won!'
                break;
            case 'scissors':
                output += "It's a tie!"
                break;
        }
    }
    document.getElementById('out_3').innerHTML = output
}