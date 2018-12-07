function FizzBuzz() {
    document.getElementById('out_2').style.display = 'block'
    const fizz = document.getElementById('fizz').value
    const buzz = document.getElementById('buzz').value
    const range = document.getElementById('range').value
    if (!fizz || !buzz || !range) return;
    let output = ""
    for (let i = 1; i <= range; i++) {
        if (i % fizz == 0 && i % buzz == 0)
            output += "Fizz Buzz, ";
        else if (i % buzz == 0)
            output += "Buzz, ";
        else if (i % fizz == 0)
            output += "Fizz, ";
        else
            output += i + ", ";
    }
    output = output.substring(0, output.length - 2)
    document.getElementById('out_2_hd').innerHTML = 
    `Every number from 1 to ${range}, but:
    <ul>
    <li>each number divisible by ${fizz} replaced with 'Fizz',</li>
    <li>every number divisible by ${buzz} replaced with 'Buzz', and</li>
    <li>the numbers divisible by both ${fizz} and ${buzz} replaced with 'Fizz Buzz':</li>
    </ul>`
    document.getElementById('out_2').innerHTML = output
}