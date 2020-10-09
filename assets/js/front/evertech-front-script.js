console.log('Front script loaded...');

jQuery(document).ready(function () {
  //Init style...
  let buttonColor = '';
  let circleColor = '';
  let titleText   = '';

  (function ($) {
       $.ajax({
         url: jsforwp_globals.ajax_url,
         data: {
           action: 'style'
         },
         method: 'GET',
         success: function(response) {
           let responseData = response.split(',');
           buttonColor = responseData[0];
           circleColor = responseData[1];
           initStyle(buttonColor, circleColor);
         },
         error: function(err) {console.log(err)}
       })
      })(jQuery)

     let product = document.querySelector('.product .summary');
     let data = product.parentNode.id.replace('product-', '');
     if(product){

         (function ($) {
              $.ajax({
                url: jsforwp_globals.ajax_url,
                data: {
                  action: 'manipulator',
                  id: data
                },
                method: 'POST',
                success: function(response) {
                  let prices = response.split(',');
                  createUiEd(prices[0], prices[1], prices[2], prices[3], prices[4], prices[5]);
                },
                error: function(err) {console.log(err)}
              })
        })(jQuery)
     }
});

function initStyle(buttonColor, circleColor){
  let dynamicStyle = document.createElement('style');
  dynamicStyle.innerHTML = `
  .ed-ui-holder {
    background: ${buttonColor};
    color: white !important;
    border-color: ${buttonColor};
  }
  .active-o {
    color: ${buttonColor} !important;
    background: white;
    border-color: ${buttonColor};
  }
  .ed-ui-holder:hover {
    color: ${buttonColor} !important;
    background: white;
    border-color: ${buttonColor};
  }
  .ed-ui-cost {
    background: ${circleColor};
  }
  `;
  document.body.append(dynamicStyle);
}

function createUiEd(price1, price2, price3, q1, q2, q3, titleText){
  let product = document.querySelector('.product .summary');
  let inputF = product.parentNode.querySelector('.quantity input');
  let price = product.parentNode.querySelector('.cart');
  let customParent = document.createElement('div');
  let quantityElem = document.querySelector('.quantity');

  customParent.classList.add('ed-ui-holder-outer');


  let child1 = document.createElement('div');
  let pTag = document.createElement('p');
  let costTag = document.createElement('p');

  let child2 = document.createElement('div');
  let pTag2 = document.createElement('p');
  let costTag2 = document.createElement('p');

  let child3 = document.createElement('div');
  let pTag3 = document.createElement('p');
  let costTag3 = document.createElement('p');

  let titleTag = document.createElement('p');

  costTag.classList.add('ed-ui-cost');

  child1.classList.add('ed-ui-holder');
  child1.append(pTag);
  child1.append(costTag);

  costTag2.classList.add('ed-ui-cost');

  child2.classList.add('ed-ui-holder');
  child2.append(pTag2);
  child2.append(costTag2);

  costTag3.classList.add('ed-ui-cost');

  child3.classList.add('ed-ui-holder');
  child3.append(pTag3);
  child3.append(costTag3);

  pTag.innerHTML = price1 + ' KM';
  pTag2.innerHTML = price2 + ' KM';
  pTag3.innerHTML = price3 + ' KM';
  costTag.innerHTML = q1 + 'x';
  costTag2.innerHTML = q2 + 'x';
  costTag3.innerHTML = q3 + 'x';

  child3.addEventListener('click', () => {
    inputF.innerHTML = q3;
    inputF.value = q3;
  });

  child2.addEventListener('click', () => {
    inputF.innerHTML = q2;
    inputF.value = q2;
  });

  child1.addEventListener('click', () => {
    inputF.innerHTML = q1;
    inputF.value = q1;
  });

  titleTag.innerHTML = '<strong>Uštedite kupovinom više od jednog artikla!</strong>';
  titleTag.style.marginTop = '30px';
  titleTag.classList.add('ed-ui-title-text');

  customParent.append(child1);
  customParent.append(child2);
  customParent.append(child3);

  price.parentNode.insertBefore(customParent, price.nextSibling);
  price.parentNode.insertBefore(titleTag, price.nextSibling);

  let allO = document.querySelectorAll('.ed-ui-holder');
  for(let i = 0; i < allO.length; i++) {

    allO[i].addEventListener('click', () => {

      for(let i = 0; i < allO.length; i++) {
        if(allO[i].classList.contains('active-o')){
      		allO[i].classList.remove('active-o');
    	}
      }
      allO[i].classList.add('active-o');


    });
  }
  document.querySelector('.ed-ui-holder-outer').style.opacity = '1';
}
