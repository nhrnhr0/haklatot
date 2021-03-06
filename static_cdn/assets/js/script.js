var nav_sections = $('section');
var main_nav = $('.navbar');

$(window).on('scroll', function () {

  // black navbar functionality when scroll not on top
  var scroll = $(window).scrollTop();
  if (scroll) {
    $('nav').addClass('block');
    // hide icon-bar
    $('.icon-bar > div').css('transform', 'translateX(-80px)');
  } else {
    $('nav').removeClass('block');
  }
  if (scroll > 200) {
    // peek icon-bar
    $('.icon-bar > div').css('transform', 'translateX(0px)');
  }



  var cur_pos = $(this).scrollTop() + 200;

  nav_sections.each(function () {
    var top = $(this).offset().top,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      if (cur_pos <= bottom) {
        main_nav.find('li > a').removeClass('active');
      }
      main_nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
    }
    if (cur_pos < 300) {
      $("nav li:first > a").addClass('active');
    }
  });
});

$(document).ready(function () {
  setTimeout(popupsLoop, 2000);
  setInterval(popupsLoop, 30000);

  $('.icon-bar > div').click((e) => {
    var xTrans = parseInt($(e.currentTarget).css('transform').split(',')[4]);
    if (xTrans == 0 && e.currentTarget.classList.contains('move')) {
      $(e.currentTarget).css('transform', 'translateX(160px)');
    } else {
      var all_elements = $('.icon-bar > div');
      all_elements.css('transform', 'translateX(0px)');
    }

  });
  $('.icon-bar > div').on('focusout', function (e) {
    //$(e.currentTarget).css('transform', 'translateX(-160px)');
  });
  /*magnify("img1", 3);
  magnify("img2", 3);
  magnify("img3", 3);
  magnify("img4", 3);
  magnify("img5", 3);*/
  $(".grid-item > h1").lettering();
  $(`.products-footer > .grid-item`).click(function (e) {
    $('#products-modal .modal-header')[0].scrollIntoView();
  });

  $('.grid-item').click(function (e) {
    var item = e.currentTarget;
    var name = item.getAttribute('name');
    var item2 = $(`.products-footer > div[name='${name}']`);

    /*$('.post').css('visibility', 'hidden');
    $('.post').css('opacity', '0');*/
    $('.post')[0].dataset.current = name;
    $(".post-image").css("background-image", "url(" + item.dataset.image2 + ")");
    $(".post_content h1").text(item.dataset.title);
    $(".post_content p").text(item.dataset.description);
    $(".post_content .product-size-lbl").html(`חבילה: ${item.dataset.size}`);
    openProductsModal();
    $('.grid-item').removeClass('active');
    var amount = getProductAmount(name);
    if (amount == 0) amount = 1;
    $('#amount-input').val(amount)
    item2.addClass("active");
  });

  // amount number input field functionlity
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

function popupsLoop() {
  setTimeout(function () {
    var items = $('.icon-bar > div.move');
    for (var i = 0; i < items.length; i++) {
      var index = i;
      popWithTimeout(index);
    }

  }, 2000);
  setTimeout(function () {
    var items = $('.icon-bar > div.move');
    for (var i = 0; i < items.length; i++) {
      var index = i;
      closePopWithTimeout(index);
    }
  }, 5000)

}

function popWithTimeout(index) {
  setTimeout(function () {
      $($('.icon-bar > div.move')[index]).css('transform', 'translateX(160px)');
    },
    500 * index);
}

function closePopWithTimeout(index) {
  setTimeout(function () {
      $($('.icon-bar > div.move')[index]).css('transform', 'translateX(0px)');
    },
    1000 * index);
}
// modal functionality
const modal = document.querySelector('#my-modal');
const discountModal = document.querySelector('#discount-modal');
const productsModal = document.querySelector('#products-modal');
const cartModal = document.querySelector('#cart-modal');
const modalBtn = document.querySelector('#modal-btn');
const modalBtn2 = document.querySelector('#modal-btn2');
const cartModalBtn = document.querySelector('.buy-cart');
const closeBtns = document.querySelectorAll('.close');

// Events
modalBtn.addEventListener('click', openModal);
modalBtn2.addEventListener('click', openDiscountModal);

for (var i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener('click', closeModal);
}
cartModalBtn.addEventListener('click', openCartModal);

window.addEventListener('click', outsideClick);

function openDiscountModal() {
  closeModal();
  discountModal.style.display = 'block';
}

// Open
function openModal() {
  closeModal();
  modal.style.display = 'block';
}

function openProductsModal() {
  closeModal();
  productsModal.style.display = 'block';
}

function openCartModal() {
  closeModal();
  var products = JSON.parse(myStorage.getItem('products'));
  $('.cart-table-body').empty();
  for (let i = 0; i < products.length; i++) {
    var gridItem = $(`div[name=${products[i].id}]`)[0];
    var productImage = $(`#img${products[i].id}`);

    var markup = `
      <tr name="cart-product-row-${products[i].id}">
        <td>
          <img class="product-small-image" src="${productImage.attr('src')}"/>
        </td>
        <td>
          <div>
            <div>
              ${gridItem.dataset.title}
            </div>
            <div class="item-extras">
              <div class="price">
                מחיר <span>${gridItem.dataset.price}</span><img class="money-icon" src="https://img.icons8.com/material/24/000000/shekel.png"/>
              </div>
              <div>
                <span>${gridItem.dataset.size}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
        
        <div name="number-input-${products[i].id}" class="number">
          <span class="minus">-</span>
          <input  class="number-input" data-id="${products[i].id}"min="0" name="item-cart-amount-${products[i].id}" onchange="itemamountchange(this)" type="number" value="${products[i].amount}" />
          <span class="plus">+</span>
          </div>
        </td>
        <td>
        <div class="product-price-total" id="product-price-total-${products[i].id}">
          ${products[i].amount * gridItem.dataset.price}
        </div>
        </td>
        <td>
          <button onclick="delete_product(${products[i].id})" class="del-btn"> <i class="fas fa-trash"></i> </button>
        </td>
      </tr>
    `

    $('.cart-table-body').append(markup)

    $(`[name=number-input-${products[i].id}] .minus`).click(function () {
      //    $('.minus').click(function () {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $(`[name=number-input-${products[i].id}] .plus`).click(function () {
      //$('.plus').click(function () {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  }
  updateCartTotalPrice();

  cartModal.style.display = 'block';
}

function delete_product(id) {
  products = JSON.parse(myStorage.getItem('products'));
  for (var i = 0; i < products.length; i++) {
    if (parseInt(products[i].id) == id) {
      var row = $(`[name=cart-product-row-${id}`);
      row.remove();
      products.splice(i, 1);
    }
  }
  myStorage.setItem('products', JSON.stringify(products));
  updateProductsCount();
  updateCartTotalPrice();

}

function getProductAmount(name) {
  products = JSON.parse(myStorage.getItem('products'));
  if(products == null || products == undefined)
    return 0;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == name)
      return products[i].amount;
  }
  return 0;
}
function applyDiscounts(discount, products) {
  var cloneproducts = JSON.parse(JSON.stringify(products));
  for(var i = 0; i < discount.products.length; i++) {
    var currDisProduct = discount.products[i];
    var prodToRemove = cloneproducts.find((item)=>item.id == currDisProduct.product.id);
    if(prodToRemove == undefined)  return null;
    if(prodToRemove.amount >= currDisProduct.amount) {
      prodToRemove.amount -= currDisProduct.amount;
    }else{
      return null;
    }
  }
  return cloneproducts;
}
/*function knapsack(products) {
  discounts = getDiscounts();
    var found = false;
    results = [];
    for(var i = 0; i < discounts.length; i++) {
      newProducts = applyDiscounts(discounts[i], products);
      if(newProducts != null) {
        found = true;
        //var bestOption = max(knapsack(newProducts), knapsack(products));
        var res = knapsack(newProducts) + discounts[i].price ;
        results.push(res);
      }
    }

    if(found == false) {
      return 0;
    }
    else {
      return Math.max(...results);
    }

}*/

function sumProductPrices(products) {
  var totalPrice = 0;
  for (var i = 0; i < products.length; i++) {
      totalPrice += getProductPrice(products[i].id) * products[i].amount;
  }
  return totalPrice;
}

function knapsack(products, discounts, appliedDiscounts) {
  var bestPrice = sumProductPrices(products);
  var bestDiscounts = appliedDiscounts;
  console.log(bestPrice)
  for (var i = 0; i < discounts.length; i++) {
      newProducts = applyDiscounts(discounts[i], products);
      if (newProducts == null) continue;
      
      const bestPriceAfterDiscount = knapsack(newProducts, discounts, appliedDiscounts.concat([discounts[i]]));
      if(bestPrice > (bestPriceAfterDiscount[0] + discounts[i].price)) {
        bestPrice = bestPriceAfterDiscount[0] + discounts[i].price;
        bestDiscounts = bestPriceAfterDiscount[1];
      }
  }

  return [bestPrice, bestDiscounts];
}

function calculateDiscounts(products, discounts) {
  return knapsack(products, discounts, []);
}

function groupingDiscounts(discounts) {
  var counts = {};
  for(var i = 0; i < discounts.length; i++) {
    counts[discounts[i].id] = 1 + (counts[discounts[i].id]|| 0);
  }
  return counts;
}
function generateDiscountsCartMarkup(groupDiscount, discounts) {
  var markup = '';
  for (const [key, value] of Object.entries(groupDiscount)) {
    console.log(`${key}: ${value}`);
    discount = discounts.find((item)=>item.id==key, groupDiscount);
    markup +=
      `<tr class="discount-item" name="discount-item-${key}">
        <td><img class="discount-image" src="${discount.image}"/></td>
        <td colspan="2">
          ${discount.name}
        </td>
        <td class="product-price-total">
          x${value}
        </td>
        <td></td>
      </tr>`
  }
  return markup;
}
function updateCartTotalPrice() {
  var products = JSON.parse(myStorage.getItem('products'));
  discounts = getDiscounts();
  /*totalPrice = 0;
  for (var i = 0; i < products.length; i++) {
    totalPrice += getProductPrice(products[i].id) * products[i].amount;
  }*/
  totalPrice = sumProductPrices(products);
  var cellLen = 10;
  [totalPrice, applyedDiscounts] = calculateDiscounts(products, discounts);
  groupDiscount = groupingDiscounts(applyedDiscounts);
  discountMarkup = generateDiscountsCartMarkup(groupDiscount, discounts);
  var oldDiscounts = $('.discount-item');
  oldDiscounts.remove();
  $('.delivery-disclaimer-tr').before(discountMarkup);
  deliveryConst = 30;
  if (totalPrice >= 100) {
    deliveryConst = 0;
  }
  totalPrice += deliveryConst;
  $('.delivery-cost').html(deliveryConst);
  $('#item-total-price').empty();
  $('#item-total-price').html(totalPrice.toString() + ' '.repeat(cellLen - totalPrice.toString().length) + '<img class="money-icon" src="https://img.icons8.com/material/24/000000/shekel.png"/>');
}

function itemamountchange(inp) {
  var id = inp.dataset.id;
  var val = parseInt(inp.value);
  addProductToCart(id, val);
  var price = getProductPrice(id);
  var totalTd = $(`#product-price-total-${id}`);
  var newTotal = price * val;
  totalTd.empty();
  const cellLen = 5;
  newTotal = newTotal.toString() + ' '.repeat(cellLen - newTotal.toString().length);
  totalTd.append(newTotal);
}

function getProductPrice(id) {
  var price = $(`div[name=${id}]`)[0].dataset.price;
  return parseFloat(price);
}

// Close
function closeModal() {
  modal.style.display = 'none';
  productsModal.style.display = 'none';
  cartModal.style.display = 'none';
  discountModal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
  if (e.target == productsModal) {
    productsModal.style.display = 'none';
  }
  if (e.target == cartModal) {
    cartModal.style.display = 'none';
  }
}




//navbar functionality:

function openNavbar() {
  var x = document.getElementsByClassName('navbar')
  x[0].classList.toggle('responsive');
}


// add to cart:
const cartButtons = document.querySelectorAll('.cart-button');

cartButtons.forEach(button => {
  button.addEventListener('click', cartClick);
});

function cartClick() {
  let button = this;
  button.classList.add('clicked');

  var name = $('.post')[0].dataset.current;
  var amount = $('.container_infos .number > input')
  addProductToCart(name, amount.val());

  setTimeout(() => {
    button.classList.remove('clicked');
    //var product = $('.grid-item.active');

  }, 3000);
}

myStorage = window.sessionStorage;

function addProductToCart(name, amount) {
  products = [];
  if (myStorage.getItem('products') != undefined) {
    products = JSON.parse(`${myStorage.getItem('products')}`);
  }
  let found = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == name) {
      found = true;
      products[i].amount = amount;
    }
  }
  if (!found) {
    products.push({
      'id': name,
      'amount': amount
    });
    //    $('.buy-cart > img').addClass('icn-spinner');
    setTimeout(function () {
      $('.buy-cart > img').addClass('icn-spinner');
    }, 250);
    setTimeout(function () {
      $('.buy-cart > img').removeClass('icn-spinner');
    }, 1000);
  }

  myStorage.setItem('products', JSON.stringify(products));
  updateProductsCount();
  updateCartTotalPrice();
}

function updateProductsCount() {
  products = JSON.parse(`${myStorage.getItem('products')}`);
  var counter = parseInt($('.buy-cart .badge').text());
  if (counter != products.length) {
    $('.buy-cart').addClass('spin');
    setTimeout(() => {
      $('.buy-cart').removeClass('spin'), 1000
    });
    $('.buy-cart .badge').text(products.length);
  }
}

function addDiscountToCart(btn, id) {
  debugger;
  discounts = getDiscounts();
  disc = discounts.find((el)=>el.id == id);
  for(var i = 0; i < disc.products.length; i++) {
    addProductToCart(disc.products[i].product.id, getProductAmount(disc.products[i].product.id) + disc.products[i].amount);
  }
  let button = btn;
  button.classList.add('clicked');
  
  setTimeout(() => {
    button.classList.remove('clicked');
    //var product = $('.grid-item.active');

  }, 3000);
}

function updateDiscountModal(discounts) {
  var modelBody = $('#discount-modal-body');
  var markup = '<table class="discounts-table">';
  for(var i = 0; i < discounts.length; i++) {
    markup += `
    <tr>
      <td><img class="discount-image" src="${discounts[i].image}"/></td>
      <td>${discounts[i].name} </td>
      <td>
      <button onclick="addDiscountToCart(this, ${discounts[i].id})" class="cart-button">
                                            <span  class="add-to-cart">הוסף לסל</span>
                                            <span class="added">הוסף</span>
                                            <i class="fa fa-shopping-cart">
                                            </i>
                                            <i class="fas fa-box"></i>
                                        </button>
    </tr>
    `
  }
  markup += '</table>'
  modelBody.empty();
  modelBody.append(markup);
}

var _discounts = null;
function getDiscounts() {
  //const storeId = 'haklatotDiscounts'
  //var discounts = sessionStorage.getItem(storeId);
  if (_discounts != null)
    return _discounts;
  else {
    $.ajax({
      url: '/api/discounts',
      type: 'GET',
      success: function (json) {
        _discounts = json;
        updateDiscountModal(_discounts);
      },

    })
    return null;
  }
}

window.addEventListener('load', (event) => {
  getDiscounts()
  updateProductsCount();



});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

$(document).ready(function () {
  $('.next-btn').on('click', function () {
    if ($(this).text() == 'שלח') {
      var client_data = getFormData($('#cartform'));
      var products_data = JSON.parse(myStorage.getItem('products'));
      client_data['products'] = products_data

      $.ajax({
        url: '/cart',
        type: 'POST',
        data: client_data,
        success: function (json) {
          window.location.reload();
        },

      })
    }
  });


  // init google map api
  var mapAutocomplete = new google.maps.places.Autocomplete(document.getElementById("addres_inp"));
  mapAutocomplete.setComponentRestrictions({
    'country': ['il']
  });
  $('#exampleSlider').multislider({
    interval: 2,
    duration: 5000,
    slideAll: true,
    continuous: true,
    hoverPause: true
  });

  $('#exampleSlider .MS-content .item').hover(function () {
    $('#exampleSlider .MS-content').css('overflow', 'visible');
    $(this).css('z-index', '10');

  }, function () {
    $('#exampleSlider .MS-content').css('overflow', 'hidden');
    $(this).css('z-index', '0');
  });


  // checkout form steps animation:
  $('.next-btn').click(function () {
    $('.prev-btn').attr("disabled", false);
    $('.next-btn').text('שלח');
    $('.modal-body-step-1').css({
      'display': 'none'
    });
    $('.modal-body-step-2').css({
      'display': 'block'
    });
  });
  $('.prev-btn').click(function () {
    $('.prev-btn').attr("disabled", true);
    $('.next-btn').text('הבא');
    $('.modal-body-step-1').css({
      'display': 'block'
    });
    $('.modal-body-step-2').css({
      'display': 'none'
    });
  });

  /*{
    
  });*/
});
/*
function popupsLoop() {
  console.log('popup loop');
  moveables = $('.icon-bar > div.move');
  for(var i = 0; i < moveables.length; i++) {
    var xTrans = parseInt($(moveables[i]).css('transform').split(',')[4]);
    if(xTrans == 0) {
      animatePopup(moveables[i]);
      showPopup(moveables[i]);
      setTimeout(closePopup(moveables[i]),2500);
    }
  }
}
function animatePopup(pop) {
  setTimeout(showPopup(pop), 500);
  setTimeout(closePopup(pop), 2500);
}
function showPopup(pop) {
  console.log('open', pop);
  $(pop).css('transform', 'translateX(160px)');
}
function closePopup(pop) {
  console.log('close', pop);
  $(pop).css('transform', 'translateX(0px)');
}*/

/* Lettering.JS 0.6.1 by Dave Rupert  - http://daverupert.com */
(function ($) {
  function injector(t, splitter, klass, after) {
    var a = t.text().split(splitter),
      inject = '';
    if (a.length) {
      $(a).each(function (i, item) {
        inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after
      });
      t.empty().append(inject)
    }
  }
  var methods = {
    init: function () {
      return this.each(function () {
        injector($(this), '', 'char', '')
      })
    },
    words: function () {
      return this.each(function () {
        injector($(this), ' ', 'word', ' ')
      })
    },
    lines: function () {
      return this.each(function () {
        var r = "eefec303079ad17405c889e092e105b0";
        injector($(this).children("br").replaceWith(r).end(), r, 'line', '')
      })
    }
  };
  $.fn.lettering = function (method) {
    if (method && methods[method]) {
      return methods[method].apply(this, [].slice.call(arguments, 1))
    } else if (method === 'letters' || !method) {
      return methods.init.apply(this, [].slice.call(arguments, 0))
    }
    $.error('Method ' + method + ' does not exist on jQuery.lettering');
    return this
  }
})(jQuery);