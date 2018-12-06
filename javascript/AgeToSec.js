function AgeToSec() {
    const age = document.getElementById('age').value
    document.getElementById('output').innerHTML = `You are ${age * 60 * 60 * 24 * 365.2425} seconds old!`
}