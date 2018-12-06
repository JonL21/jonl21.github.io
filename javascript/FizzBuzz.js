function FizzBuzz() {
    const fizz = document.getElementById('fizz').value
    const buzz = document.getElementById('buzz').value
    const range = document.getElementById('range').value
    if (!fizz || !buzz || !range) return;
    let output = ""
    for (let i = 1; i <= range; i++) {
        if (i % fizz == 0 && i % buzz == 0)
            output += "Fizz Buzz, \n";
        else if (i % buzz == 0)
            output += "Buzz, \n";
        else if (i % fizz == 0)
            output += "Fizz, \n";
        else
            output += i + ", \n";
    }
    output = output.substring(0, output.length - 3)
    document.getElementById('out_2').innerHTML = output
}