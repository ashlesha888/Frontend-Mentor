let calculation=localStorage.getItem('calculation') || '';
document.querySelector('.js-answer').innerHTML = calculation; 


function updateCalc(value){
    calculation+=value;
    localStorage.setItem('calculation', calculation);
    document.querySelector('.js-answer').innerHTML = calculation;
    const display = document.querySelector('.js-answer');
    display.innerHTML = calculation;
    display.scrollLeft = display.scrollWidth; 
}

function clearCalc(){
    calculation = '';
    localStorage.setItem('calculation', '');
    document.querySelector('.js-answer').innerHTML = '';
}
function gettingAns(){
    try{
        let answer=eval(calculation);
        document.querySelector('.js-answer').innerHTML = answer;
        calculation = answer.toString();
        localStorage.setItem('calculation', calculation);
    }catch {
        document.querySelector('.js-answer').innerHTML = "Error";
    }
}
function delLast() {
    calculation = calculation.slice(0, -1); 
    localStorage.setItem('calculation', calculation);
    document.querySelector('.js-answer').innerHTML = calculation;
}