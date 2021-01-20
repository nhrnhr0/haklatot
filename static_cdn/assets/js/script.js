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
        
        
        
        /*$('.post').css('visibility', 'hidden');
        $('.post').css('opacity', '0');*/
        $(".post-image").css("background-image", "url("+item.dataset.image2+")");
        $(".post_content h1").text(item.dataset.title);
        $(".post_content p").text(item.dataset.description);
        openProductsModal();
        $('.grid-item').removeClass('active')
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
  modal.style.display = 'block';
}

function openProductsModal() {
    productsModal.style.display = 'block';
}

function openCartModal(){
  var products = JSON.parse(myStorage.getItem('products'));
  $('.cart-table-body').empty();
  for(let i = 0; i < products.length; i++) {
    var gridItem = $(`div[name=${products[i].id}]`)[0];
    var productImage = $(`#img${products[i].id}`);
    console.log(gridItem);
    console.log(productImage);

    var markup = `
      <tr>
        <td>
          <img src="${productImage.attr('src')}"/>
        </td>
        <td>
          <div>
            <div>
              ${gridItem.dataset.title}
            </div>
            <div class="item-extras">
              <div class="price">
                מחיר <span>${gridItem.dataset.price}</span>
              </div>
              <div>
                <span>${450}</span>g
              </div>
            </div>
          </div>
        </td>
        <td>
        <input class="number-input" type="number" value="${products[i].amount}" />
          
        </td>
        <td>
          <button class="del-btn"> <i class="fas fa-trash"></i> </button>
        </td>
        <td>
        ${products[i].amount * gridItem.dataset.price}
        </td>
      </tr>
    `
    
    $('.cart-table-body').append(markup)
  }

  cartModal.style.display = 'block';
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
    var product = $('.grid-item.active');
    var amount = $('.container_infos .number > input')
    console.log(product);
    addProductToCart(product.attr('name'), amount.val());
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
  $('.buy-cart .badge').text(products.length);
  myStorage.setItem('products', JSON.stringify(products));
}

/* Lettering.JS 0.6.1 by Dave Rupert  - http://daverupert.com */
(function($){function injector(t,splitter,klass,after){var a=t.text().split(splitter),inject='';if(a.length){$(a).each(function(i,item){inject+='<span class="'+klass+(i+1)+'">'+item+'</span>'+after});t.empty().append(inject)}}var methods={init:function(){return this.each(function(){injector($(this),'','char','')})},words:function(){return this.each(function(){injector($(this),' ','word',' ')})},lines:function(){return this.each(function(){var r="eefec303079ad17405c889e092e105b0";injector($(this).children("br").replaceWith(r).end(),r,'line','')})}};$.fn.lettering=function(method){if(method&&methods[method]){return methods[method].apply(this,[].slice.call(arguments,1))}else if(method==='letters'||!method){return methods.init.apply(this,[].slice.call(arguments,0))}$.error('Method '+method+' does not exist on jQuery.lettering');return this}})(jQuery);

// I think this is unused code
function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /*set the position of the magnifier glass:*/
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  } 