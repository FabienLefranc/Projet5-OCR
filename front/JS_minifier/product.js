function callAPI(){const t=new URLSearchParams(window.location.search).get("id");fetch("http://localhost:3000/api/teddies/"+t).then(t=>t.json()).then(t=>{console.log(t),displayProduct(t)}).catch(t=>errorProduit())}function displayProduct(t){document.getElementById("displayTeddy").innerHTML=`\n      <div class="displayTeddy">\n        <div class="productBlockImage">\n         <img class="product-image" src="${t.imageUrl}" alt="${t.name}">\n         <button class="backLink"><a href="../../index.html">Retour à la boutique</a></button>\n        </div>    \n        <div class="product-information">\n          <p class="product-title"><strong>Nom: </strong> ${t.name}</p>\n          <p class="product-id"><strong>Réf: </strong>${t._id}</p>\n          <p class="product-description"><strong>Description: </strong>${t.description}</p>                           \n          <label for="colorList" class="colorList"><strong>Couleurs disponibles: </strong>  \n          <select name="colors" id="colorList"></select></label>\n          <p class="product-price"><strong>Prix: </strong>${t.price/100} €</p> \n          <div class="addBasketText">\n            <button type="button" class="addBasket"><p>Ajoutez au panier</p></button>\n            <div id="addBasketText"></div>\n          </div>  \n        </div>\n      </div>`;const e=document.querySelector("select");for(const o of t.colors){let t=document.createElement("option");t.value=o,t.textContent=o,e.appendChild(t)}document.querySelector(".addBasket").addEventListener("click",()=>{const e=document.querySelector("select");t.selectedColor=e.options[e.selectedIndex].value,document.getElementById("addBasketText").innerHTML='<p class="addBasketText"> Un article vient d\'être ajouté au panier.</p>',setTimeout(function(){document.getElementById("addBasketText").innerHTML=""},2e3),addToCart(t)})}function addToCart(t){let e=[],o={_id:t._id,name:t.name,price:t.price,image:t.imageUrl,selectedColor:t.selectedColor,quantity:1},n=!0;if(null===localStorage.getItem("cartProducts"))e.push(o),localStorage.setItem("cartProducts",JSON.stringify(e));else{e=JSON.parse(localStorage.getItem("cartProducts"));for(const o of e)t._id===o._id&&t.selectedColor===o.selectedColor&&(o.quantity++,n=!1);n&&(e.push(o),localStorage.setItem("cartProducts",JSON.stringify(e)))}addNumberProduct()}callAPI();