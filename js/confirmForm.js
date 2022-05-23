const form = document.forms[0];
const fields = document.querySelectorAll('input');
let button = form.querySelector('button');


fields.forEach(input =>  {
    input.addEventListener('focusout', () => {
        let valid = input.checkValidity();
        if (!valid) {
            input.classList.add('invalid');
            let container = input.parentElement;
            container.classList.add('invalid');
        }
    })
    input.addEventListener('focusin', () => {
            input.classList.remove('invalid');
            let container = input.parentElement;
            container.classList.remove('invalid');
    })
})

function getMinDate () {
    let today = new Date();
    let day = today.getDate() + 1;
    var month = today.getMonth() + 2;
    var year = today.getFullYear();
    if (day < 10) {
        day ='0'+ day
    } 
    if (month < 10) {
        month ='0' + month
    } 
    if (day === '31' && month === '12') {
        year += 1;
    }

    tomorrow = year + '-' + month +'-' + day;
    return tomorrow
}

document.querySelector('#deliverydate').setAttribute('min', getMinDate());


console.log(fields);

form.addEventListener('change', function(){
  if (allHasClassValid() 
      && textIsNotEmpty()
      && isRadioBtnChecked()
      && isCheckBoxOk()
      && isDateIsNotEmpty()){
    updateBtnConfirm(true);
    return; 
  }
  updateBtnConfirm(false);
  
});

button.addEventListener('click', ()=>{
    let div= document.querySelector(".confirm-info");
    console.log(fields[0].value);
    let summary = document.querySelector("h2");
    summary.innerHTML = "The order created. The delivery address is " + fields[3].value +  " street house " + fields[4].value + " flat " + fields[5].value + ". Customer " + fields[0].value + " " + fields[1].value + ".";
    document.querySelector(".form").setAttribute("hidden", "hidden");
})
function updateBtnConfirm(is_valid){
    
    console.log("is_valid? on change form - " + is_valid);
    is_valid ? button.removeAttribute('disabled'): button.setAttribute('disabled', 'disabled');  
}

function allHasClassValid(){
    for (let i = fields.length - 1; i >= 0; i--) {
        if( fields[i].classList.contains('invalid') )
        {
          return false;
        } 
      }
      return true;
}

function textIsNotEmpty(){
    for (let i = fields.length - 1; i >= 0; i--) {
        if (fields[i].type == 'text' && fields[i].value == '') {
            return false;
        }
      }
      return true;
}
function isRadioBtnChecked(){
  for (let i = fields.length - 1; i >= 0; i--) {
    if (fields[i].type == 'radio' && fields[i].checked) {
         return true;
    }
  }
  return false;
}
function isCheckBoxOk(){
    let value = 0;
    for (let i = fields.length - 1; i >= 0; i--) {
        if (fields[i].type == 'checkbox' && fields[i].checked) {
             value++;
        }
      }
      return value<=2;
}
function isDateIsNotEmpty(){
    for (let i = fields.length - 1; i >= 0; i--) {
        if (fields[i].type == 'date' && fields[i].value == '') {
            return false;
        }
      }
      return true;
}