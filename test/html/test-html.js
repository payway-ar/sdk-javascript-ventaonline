
var decidir = null
var selectedForm = undefined
var decidirAgro = undefined

//Aux variables
let decidirDevelConCS = new Decidir('https://developers.decidir.com/api/v2', false);
decidirDevelConCS.setPublishableKey('e9cdb99fff374b5f91da4480c8dca741'); //para generar el device-fingerprint-id

window.addEventListener("DOMContentLoaded", function() {
       intializeExample();
   }, false);

function FactoryDecidir(){
  this.create = function(environment, cybersource){

    var decidirInstance = null;

    if(cybersource){ // Si usa Cybersource
      decidirInstance = decidirDevelConCS;
    }else{
      decidirInstance = new Decidir('https://developers.decidir.com/api/v2', true);
      decidirInstance.setPublishableKey('e9cdb99fff374b5f91da4480c8dca741');
    }

    let timeout = cybersource ? 20000 : 10000;
    decidirInstance.setTimeout(timeout);

    return decidirInstance;
  }
}

function intializeExample() {

  changeRequestType('card_data_form');

  let element = document.querySelectorAll('form[name=token-form');
  for (var i=0; element.length > i; i++) {
    let form = element[i];
    addEvent(form,'submit',sendForm)
  }

  addEvent(document.querySelector('input[data-decidir][name="card_number"]'), 'keyup', guessingPaymentMethod);
  addEvent(document.querySelector('input[data-decidir][name="card_number"]'), 'change', guessingPaymentMethod);

}


function addEvent(el, eventName, handler){
    if (el.addEventListener) {
           el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function(){
          handler.call(el);
        });
    }
};

function withAgro(isAgro){
  decidirAgro = isAgro;

  let environment = document.querySelector('input[name="environment"]:checked').value;

  var factory = new FactoryDecidir();
  if(isAgro){
    document.querySelector('#btnGenerateToken').setAttribute('hidden', true);
    document.querySelector('#agro_set').removeAttribute('hidden');
    var $formAgro = document.querySelector('#agro_data_form');

    decidir = factory.create(environment, true);
    decidir.setUpAgro($formAgro, 184, 200); //184: días de pacto - 200: monto total de la operacion
  }
  else{
    document.querySelector('#agro_set').setAttribute('hidden','true');
    document.querySelector('#btnGenerateToken').removeAttribute('hidden');
  }
}

function sdkResponseHandler(status, response) {

  console.log('respuesta', response);

  let resultado = document.querySelector('#resultado')
  cleanHtmlElement(resultado)
  if (status != 200 && status != 201) {
    alert('Error! code: ' + status +' - response: ' + JSON.stringify(response))
  } else {
    createHtmlListFromObject(response,resultado)
  }

}

function createHtmlListFromObject(object, parentElement) {
  let ul = document.createElement('ul')
  for (let prop in object) {
    let li = document.createElement('li')
    let spanLabel = document.createElement('span')
    let spanValue = document.createElement('span')
    spanLabel.innerText = prop + ': '
    if(typeof(object[prop]) === 'object' ) {
      createHtmlListFromObject(object[prop],spanValue)
    } else {
      spanValue.innerText = object[prop]
    }
    li.appendChild(spanLabel)
    li.appendChild(spanValue)
    ul.appendChild(li)
  }
  parentElement.appendChild(ul)
}

function cleanHtmlElement(element) {
  element.innerText = ''

  /*for (var i=0; children.length > i; i++) {
    let x = children[i];
    element.removeChild(x)
  }*/
}




function sendForm(event){
    event.preventDefault();

    var $form = document.querySelector('#'+selectedForm);
    
    let environment = document.querySelector('input[name="environment"]:checked').value;
    let useCybersource = document.querySelector('#fraud_prevention').checked;

    if(decidirAgro !== true){
      var factory = new FactoryDecidir(); //Agro usa configuracion local por defecto.
      decidir = factory.create(environment, useCybersource);
    }

    console.log('Decidir.createToken()');
    decidir.createToken($form, sdkResponseHandler);

    return false;
};

function guessingPaymentMethod() {

  var cardNumber = document.querySelector('input[data-decidir][name="card_number"]').value;

  var bin = decidir.getBin(cardNumber);

  var issuedInput = document.querySelector('input[name="issued"]');

  issuedInput.value = decidir.cardType(cardNumber);

  console.log('bin', bin);
}


function changeRequestType(value) {
  selectedForm = value
  let  containers = document.querySelectorAll('form')
  for (var i=0; containers.length > i; i++) {
    let e = containers[i];
    e.setAttribute('hidden','true')
  }
  form = document.querySelector('#'+value)
  form.removeAttribute('hidden')

}
