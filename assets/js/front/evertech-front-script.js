console.log('Front script loaded...');

jQuery(document).ready(function () {
  (function ($) {
       $.ajax({
         url: jsforwp_globals.ajax_url,
         data: {
           action: 'gi'
         },
         method: 'GET',
         success: function(response) {
           console.log(response)
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

function createUiEd(price1, price2, price3, q1, q2, q3){
  let product = document.querySelector('.product .summary');
  let inputF = product.parentNode.querySelector('.quantity input');
  let price = product.parentNode.querySelector('.cart');
  let customParent = document.createElement('div');
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

  pTag.innerHTML = price1 + ' km';
  pTag2.innerHTML = price2 + ' km';
  pTag3.innerHTML = price3 + ' km';
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

  customParent.append(child1);
  customParent.append(child2);
  customParent.append(child3);
  price.parentNode.insertBefore(customParent, price.nextSibling);

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
}
