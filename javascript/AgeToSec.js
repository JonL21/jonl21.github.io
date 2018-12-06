function AgeToSec() {
    const age = document.getElementById('age').value
    var output = `Please enter an age.`
    if (age)
        output = `You are ${age * 60 * 60 * 24 * 365.2425} seconds old!`
    document.getElementById('out_1').innerHTML = output;
}