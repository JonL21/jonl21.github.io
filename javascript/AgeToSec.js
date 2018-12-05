function AgeToSec() {
    const age = document.getElementById('age').value
    document.getElementById('output').innerHTML = age * 60 * 60 * 24 * 365.2425
}