function callAPI(){const e=new URLSearchParams(window.location.search).get("id");document.querySelector(".displayTeddy");fetch("http://localhost:3000/api/teddies/"+e).then(e=>e.json()).then(e=>{console.log(e),displayProduct(e)}).catch(e=>error())}function displayProduct(e){document.getElementById("displayTeddy").innerHTML=`\n      <div class="displayTeddy">\n        <div class="productBlockImage">\n         <img class="product-image" src="${e.imageUrl}" alt="${e.name}">\n         <button class="backLink"><a href="../../index.html">Retour à la boutique</a></button>\n        </div>    \n        <div class="product-information">\n          <p class="product-title"><strong>Nom: </strong> ${e.name}</p>\n          <p class="product-id"><strong>Réf: </strong>${e._id}</p>\n          <p class="product-description"><strong>Description: </strong>${e.description}</p>                           \n          <label for="colorList" class="colorList"><strong>Couleurs disponibles: </strong>  \n          <select name="colors" id="colorList"></select></label>\n          <p class="product-price"><strong>Prix: </strong>${e.price/100} €</p> \n          <div class="addBasketText">\n            <button type="button" class="addBasket"><p>Ajoutez au panier</p></button>\n            <div id="addBasketText"></div>\n          </div>  \n        </div>\n      </div>`;const t=document.querySelector("select");for(const o of e.colors){let e=document.createElement("option");e.value=o,e.textContent=o,t.appendChild(e)}document.querySelector(".addBasket").addEventListener("click",()=>{const t=document.querySelector("select");e.selectedColor=t.options[t.selectedIndex].value,document.getElementById("addBasketText").innerHTML='<p class="addBasketText"> Un article vient d\'être ajouté au panier.</p>',setTimeout(function(){document.getElementById("addBasketText").innerHTML=""},2e3),addToCart(e)})}function addToCart(e){let t=[],o={_id:e._id,name:e.name,price:e.price,image:e.imageUrl,selectedColor:e.selectedColor,quantity:1},n=!0;if(null===localStorage.getItem("cartProducts"))t.push(o),localStorage.setItem("cartProducts",JSON.stringify(t));else{t=JSON.parse(localStorage.getItem("cartProducts"));for(const o of t)e._id===o._id&&e.selectedColor===o.selectedColor&&(o.quantity++,n=!1);n&&(t.push(o),localStorage.setItem("cartProducts",JSON.stringify(t)))}addNumberProduct()}callAPI(),addNumberProduct();