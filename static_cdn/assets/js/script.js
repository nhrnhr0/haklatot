
var nav_sections = $('section');
var main_nav = $('.navbar');

$(window).on('scroll', function() {

    // black navbar functionality when scroll not on top
    var scroll = $(window).scrollTop();
    if(scroll) {
        $('nav').addClass('block');
        // hide icon-bar
        $('.icon-bar > div').css('transform', 'translateX(-80px)');
    }else{
        $('nav').removeClass('block');
    }
    console.log(scroll);
    if(scroll > 200) {
        // peek icon-bar
        $('.icon-bar > div').css('transform', 'translateX(0px)');
    }



    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
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

$(document).ready(function() {
    $('.icon-bar > div').click((e)=>{
        var xTrans = parseInt($(e.currentTarget).css('transform').split(',')[4]);
        if(xTrans == 0 && e.currentTarget.classList.contains('move')) {
            $(e.currentTarget).css('transform', 'translateX(160px)');
        }
        else {
            var all_elements = $('.icon-bar > div');
            all_elements.css('transform', 'translateX(0px)');
        }
        
    });
    $('.icon-bar > div').on('focusout', function (e) {
        console.log('focusout');
        $(e.currentTarget).css('transform', 'translateX(-160px)');
    });
    /*magnify("img1", 3);
    magnify("img2", 3);
    magnify("img3", 3);
    magnify("img4", 3);
    magnify("img5", 3);*/
    $(".grid-item > h1").lettering();

    $('.grid-item').click(function (e) {
        var item = e.currentTarget;
        var name = item.getAttribute('name');
        var item2 = $(`.products-footer > div[name='${name}']`);
        
        
        debugger;
        /*$('.post').css('visibility', 'hidden');
        $('.post').css('opacity', '0');*/
        $('.post')[0].dataset.current=name;
        $(".post-image").css("background-image", "url("+item.dataset.image2+")");
        $(".post_content h1").text(item.dataset.title);
        $(".post_content p").text(item.dataset.description);
        openProductsModal();
        $('.grid-item').removeClass('active');
        var amount = getProductAmount(name);
        if(amount == 0) amount = 1;
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


// modal functionality
const modal = document.querySelector('#my-modal');
const productsModal = document.querySelector('#products-modal');
const cartModal = document.querySelector('#cart-modal');
const modalBtn = document.querySelector('#modal-btn');
const cartModalBtn = document.querySelector('.buy-cart');
const closeBtns = document.querySelectorAll('.close');

// Events
modalBtn.addEventListener('click', openModal);
for (var i=0; i<closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', closeModal);
}
cartModalBtn.addEventListener('click', openCartModal);

window.addEventListener('click', outsideClick);

// Open
function openModal() {
  closeModal();
  modal.style.display = 'block';
}

function openProductsModal() {
    closeModal();
    productsModal.style.display = 'block';
}

function openCartModal(){
  closeModal();
  var products = JSON.parse(myStorage.getItem('products'));
  $('.cart-table-body').empty();
  for(let i = 0; i < products.length; i++) {
    var gridItem = $(`div[name=${products[i].id}]`)[0];
    var productImage = $(`#img${products[i].id}`);
    console.log(gridItem);
    console.log(productImage);

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
        <input class="number-input" data-id="${products[i].id}" name="item-cart-amount-${products[i].id}" onchange="itemamountchange(this)" type="number" value="${products[i].amount}" />
          
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
  }
  updateCartTotalPrice();
  cartModal.style.display = 'block';
}
function delete_product(id) {
  debugger;
  products = JSON.parse(myStorage.getItem('products'));
  for(var i = 0; i < products.length; i++) {
    if(parseInt(products[i].id) == id) {
      var row=$(`[name=cart-product-row-${id}`);
      row.remove();
      products.splice(i, 1);
    }
  }
  myStorage.setItem('products', JSON.stringify(products));
  updateCartTotalPrice();
  
}
function getProductAmount(name) {
  products = JSON.parse(myStorage.getItem('products'));
  for(var i = 0; i<products.length; i++) {
      if(products[i].id == name)
        return products[i].amount;
  }
  return 0;
}
function updateCartTotalPrice() {
  var products = JSON.parse(myStorage.getItem('products'));
  totalPrice = 0;
  for(var i = 0; i< products.length;i++) {
    totalPrice += getProductPrice(products[i].id) * products[i].amount;
  }
  var cellLen = 10;
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
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
  if(e.target == productsModal){
    productsModal.style.disply = 'none';
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

  
	setTimeout(()=>{ 
    button.classList.remove('clicked');
    //var product = $('.grid-item.active');
    var name = $('.post')[0].dataset.current;
    var amount = $('.container_infos .number > input')
    addProductToCart(name, amount.val());
  },3000);
}

myStorage = window.sessionStorage;

function addProductToCart(name, amount) {
  products = [];
  if(myStorage.getItem('products') != undefined){
    products = JSON.parse(`${myStorage.getItem('products')}`);
  }
  let found = false;
  for(let i = 0; i< products.length; i++) {
    if(products[i].id == name) {
      found = true;
      products[i].amount = amount;
    }
  }
  if(!found) {
    products.push({'id': name, 'amount': amount});
  }
  // update cart counder, TODO: add shake animation:
  
  myStorage.setItem('products', JSON.stringify(products));
  updateProductsCount();
  updateCartTotalPrice();
}

function updateProductsCount() {
  products = JSON.parse(`${myStorage.getItem('products')}`);
  var counter = parseInt($('.buy-cart .badge').text());
  if(counter != products.length) {
    $('.buy-cart').addClass('spin');
    setTimeout(()=>{ $('.buy-cart').removeClass('spin'),1000});
    $('.buy-cart .badge').text(products.length);
  }
}

window.addEventListener('load', (event) => {
  updateProductsCount();
});
$(document).ready(function () {
  //initGoogleMapAutocomplete();
});

$(document).ready(function () {
  // init google map api
  var mapAutocomplete = new google.maps.places.Autocomplete(document.getElementById("addres_inp"));
  mapAutocomplete.setComponentRestrictions({
      'country': ['il']
  });
});

/* Lettering.JS 0.6.1 by Dave Rupert  - http://daverupert.com */
(function($){function injector(t,splitter,klass,after){var a=t.text().split(splitter),inject='';if(a.length){$(a).each(function(i,item){inject+='<span class="'+klass+(i+1)+'">'+item+'</span>'+after});t.empty().append(inject)}}var methods={init:function(){return this.each(function(){injector($(this),'','char','')})},words:function(){return this.each(function(){injector($(this),' ','word',' ')})},lines:function(){return this.each(function(){var r="eefec303079ad17405c889e092e105b0";injector($(this).children("br").replaceWith(r).end(),r,'line','')})}};$.fn.lettering=function(method){if(method&&methods[method]){return methods[method].apply(this,[].slice.call(arguments,1))}else if(method==='letters'||!method){return methods.init.apply(this,[].slice.call(arguments,0))}$.error('Method '+method+' does not exist on jQuery.lettering');return this}})(jQuery);
