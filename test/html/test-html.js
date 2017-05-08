
var decidir = null
var selectedForm = undefined
var decidirWithFraudPrevention = undefined
var decidirNoFraudPrevention = undefined

window.addEventListener("DOMContentLoaded", function() {
       intializeExample();
   }, false);

function intializeExample() {
  decidirWithFraudPrevention = new Decidir('https://developers.decidir.com/api/v1',false);
  decidirWithFraudPrevention.setPublishableKey('e9cdb99fff374b5f91da4480c8dca741');
  decidirWithFraudPrevention.setTimeout(20000);//sets 20000ms timeout
  decidirNoFraudPrevention = new Decidir('https://developers.decidir.com/api/v1', true);
  decidirNoFraudPrevention.setPublishableKey('e9cdb99fff374b5f91da4480c8dca741');
  decidirNoFraudPrevention.setTimeout(10000);//sets 10000ms timeout
  withFraudPrevention(document.querySelector('#fraud_prevention').checked)
  changeRequestType('card_data_form');
  document.querySelectorAll('form[name=token-form').forEach( form => addEvent(form,'submit',sendForm));
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

function withFraudPrevention(useFraudPrevention) {
  decidir = useFraudPrevention ? decidirWithFraudPrevention : decidirNoFraudPrevention
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
  element.childNodes.forEach( x => resultado.removeChild(x))
}




function sendForm(event){
    event.preventDefault();
      var $form = document.querySelector('#'+selectedForm);
      console.log('Decidir.createToken()')
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
  containers.forEach((e) =>{
    e.setAttribute('hidden','true')
  })
  form = document.querySelector('#'+value)
  form.removeAttribute('hidden')

}
