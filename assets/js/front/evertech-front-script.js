console.log('Front script loaded...');

jQuery(document).ready(function () {
  //Init style...
  let buttonColor = '';
  let circleColor = '';
  let titleText   = '';

  (function ($) {
       $.ajax({
         url: jsforwp_globals.ajax_url,
         contentType: "application/json",
         data: {
           action: 'style'
         },
         method: 'GET',
         success: function(response) {
           buttonColor = response.bcgcolor;
           circleColor = response.circlecolor;
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
                  let prices = response.prices.split(',');
                  createUiEd(prices[0], prices[1], prices[2], prices[3], prices[4], prices[5], response.title);
                  let topPrice = +prices[6] - 1;
                  initAnimations(prices[6]);

                  let allButtons = document.querySelectorAll('.ed-ui-holder');

                  for(let p = 0; p < allButtons.length; p++) {

                    allButtons[p].addEventListener('mouseenter', (e) => {
                      e.target.style.animationDuration = '0s';
                      console.log(allButtons[p].style.animationName)
                    });
                    allButtons[p].addEventListener('mouseleave', (e) => {

                      if(e.target.classList.contains('active-o')){
                        e.target.style.animationDuration = '0s';
                      }else{
                        e.target.style.animationDuration = '10s';
                      }
                    });
                    allButtons[p].addEventListener('click', (e) => {
                      for(let i = 0; i < allButtons.length; i++) {
                        if(allButtons[i].classList.contains('active-o')){
                          allButtons[i].style.animationDuration = '0s';
                        }else {
                          allButtons[i].style.animationDuration = '10s';
                        }
                      }
                    });
                  }
                  callTimer(createTheDate(1) + ' 12:00:00');
                },
                error: function(err) {console.log(err)}
              })
        })(jQuery)
     }

});

function createTheDate(daysAhead){
  let today = new Date(new Date().getTime() + (86400000 * daysAhead));
  let dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return today = yyyy + '/' + mm + '/' + dd;
}

function createDateForArrival(daysAhead){
  let today = new Date(new Date().getTime() + (86400000 * daysAhead));
  let dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return today = dd + '/' + mm + '/' + yyyy;
}

function callTimer(dateObject){
  let dani = {1:'Pon', 2:'Uto', 3:'Sri', 4:'Čet', 5:'Pet', 6:'Sub', 0:'Ned'};
  let todaysDay = dani[new Date().getDay()];
  let arrivalDay;
  let createAhedDay = 2;
  if(todaysDay === 'Sub'){
    arrivalDay = 'Uto';
    createAhedDay = 4;
  }else {
    arrivalDay = dani[new Date().getDay() + 2];
  }
  let dateObj = dateObject;
  jQuery(".ed-ui-countdown").countdown(dateObject, function(event) {
      if(event.elapsed){
        let currentDay = dani[new Date().getDay()];

        if(currentDay === 'Pet') {
          callTimer(createTheDate(2) + ' 10:00:00');
        }else if(currentDay === 'Sub'){
          callTimer(createTheDate(4) + ' 12:00:00');
        }else if(currentDay === 'Ned'){
          callTimer(createTheDate(3) + ' 12:00:00');
        }else {
          callTimer(createTheDate(2) + ' 12:00:00');
        }

      }
      var $this = jQuery(this).html(''
        + '<div class="ed-col"><span>' + event.offset.totalHours + '</span><p>SATI</p></div>'
        + '<div class="ed-col"><span>' + event.offset.minutes + '</span><p>MIN</p></div>'
        + '<div class="ed-col"><span>' + event.offset.seconds + '</span><p>SEK</p></div>'
      );
    });
  jQuery(".ed-ui-countdown").after('<p class="ed-ui-info">da robu dobijete na adresi najkasnije u <strong>' + arrivalDay + '. ' + createDateForArrival(createAhedDay) + '.</strong></p>');
}

function initStyle(buttonColor, circleColor, topPrice){
  let dynamicStyle = document.createElement('style');
  dynamicStyle.innerHTML = `
  .ed-ui-holder {
    background: ${buttonColor};
    color: white;
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

function initAnimations(topPrice){
    let dynamicStyle = document.createElement('style');
    dynamicStyle.innerHTML = `
    .ed-ui-holder:nth-child(${topPrice}){
      animation: topPriceAni 10s infinite;
    }
    @keyframes disAni {

    }
    @keyframes topPriceAni {
      0%{transform: scale(1);}
      4.5%{transform: scale(1.3); background-color: #FFD700; border-color: #FFD700;}
      5%{transform: rotate(10deg) scale(1.3);}
      5.5%{transform: rotate(0deg) scale(1.3);}
      6%{transform: rotate(-10deg) scale(1.3);}
      6.5%{transform: rotate(0deg) scale(1.3);}
      7%{transform: rotate(10deg) scale(1.3);}
      7.5%{transform: rotate(0deg) scale(1.3);}
      8%{transform: rotate(-10deg) scale(1.3); }
      8.5%{transform: rotate(0deg) scale(1.3); background-color: #FFD700; border-color: #FFD700;}
      14.5%{transform: scale(1); background-color: #F42C37; border-color: #F42C37;}
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
  let countdownTimer = document.createElement('p');

  countdownTimer.classList.add('ed-ui-countdown');
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

  titleTag.innerHTML = '<strong>'+titleText+'</strong>';
  titleTag.style.marginTop = '30px';
  titleTag.classList.add('ed-ui-title-text');

  customParent.append(child1);
  customParent.append(child2);
  customParent.append(child3);

  price.parentNode.insertBefore(customParent, price.nextSibling);
  price.parentNode.insertBefore(titleTag, price.nextSibling);
  titleTag.parentNode.insertBefore(countdownTimer, titleTag.nextSibling);

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
