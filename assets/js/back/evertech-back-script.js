console.log('Admin script started...')

jQuery(document).ready(function() {

  let allProducts = document.querySelectorAll('.ed-product-info > th');
  let allProductsParent = document.querySelectorAll('.ed-product-info');

  //Change dummy button color...
  let dummyButtonColor = document.querySelector('.ed-ui-dummy-button-input input').value;
  let dummyButtonInput = document.querySelector('.ed-ui-dummy-button-input input');
  let dummyCircleInput = document.querySelector('.ed-ui-dummy-circle-input input');
  let dummyButton = document.querySelector('.dummy-button');
  let dummyCircle = document.querySelector('.dummy-circle');

  //Set dummy style...
  dummyButton.style.background = dummyButtonColor;
  dummyButton.style.borderColor = dummyButtonColor;
  dummyCircle.style.background = dummyCircleInput.value;
  //Simulate hover for dummy...
  dummyButton.addEventListener('mouseenter', () => {
    currentColor = window.getComputedStyle(dummyButton).backgroundColor;
    dummyButton.style.setProperty('color', currentColor, 'important');
  });
  dummyButton.addEventListener('mouseleave', () => {
    dummyButton.style.setProperty('color', 'white', 'important');
  });

  dummyButtonInput.addEventListener('input', (e) => {
    dummyButtonColor = e.target.value;
    dummyButton.style.background = dummyButtonColor;
    dummyButton.style.borderColor = dummyButtonColor;
  });

  dummyCircleInput.addEventListener('input', (e) => {
    dummyCircleColor = e.target.value;
    dummyCircle.style.background = dummyCircleColor;
    dummyCircle.style.borderColor = dummyCircleColor;
  });

  for(let i = 0; i < allProducts.length; i++) {

    //Open product info on click...
    allProducts[i].addEventListener('click', () => {
      console.log('hees')
      allProducts[i].parentNode.classList.add('active-tab');
      allProducts[i].parentNode.querySelector('.ed-product-info > td').style.opacity = 1;
    });
    //Handle input values...
    let productInfo;

    let allInputs = allProductsParent[i].querySelectorAll('input');
    console.log(allProducts[i]);
    for(let p = 0; p < allInputs.length; p++) {
      allInputs[p].addEventListener('input', () => {
        productInfo = allInputs[0].value.replace(',', '.') + ',' + allInputs[2].value.replace(',', '.')+ ',' +allInputs[4].value.replace(',', '.')+ ',' +allInputs[1].value.replace(',', '.')+ ',' +allInputs[3].value.replace(',', '.')+ ',' +allInputs[5].value.replace(',', '.');
        allInputs[6].setAttribute('value', productInfo);
      });
    }
  }

  //Close product info on click...
  let allHideButtons = document.querySelectorAll('.close-ed-product');
  for(let i = 0; i < allHideButtons.length; i++) {
    allHideButtons[i].addEventListener('click', () => {
      console.log(allHideButtons[i].parentNode.parentNode)
      allHideButtons[i].parentNode.parentNode.classList.remove('active-tab');
      allHideButtons[i].parentNode.style.opacity = 0;
    });
  }

  let loader = document.querySelector('.evertech-loader');
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.zIndex = -1;
  }, 1000);
});
