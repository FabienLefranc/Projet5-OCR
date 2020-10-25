function displayCart(){const t=document.getElementById("cart");if(null!==localStorage.getItem("cartProducts")){let e=JSON.parse(localStorage.getItem("cartProducts"));t.innerHTML='\n                <h2 class="yourCart">Votre panier :</h2>\n                 <div class="container">\n                    <div class="cartTable">            \n                      <table>\n                          <thead>\n                                <tr class="trHead">\n                                    <th class="th1">Article</th>\n                                    <th class="th2">Couleur</th>\n                                    <th class="th3">Quantité</th>\n                                    <th class="th4">Prix</th>\n                                </tr>\n                          </thead>\n                          <tbody class="section_tbody"></tbody>\n                      </table>\n                    </div>\n                 </div> ';const n=document.querySelector(".section_tbody");e.forEach((t,e)=>{n.innerHTML+=`\n                <tr class="trArticles">\n                    <td class="tdArticle">\n                        <span class="delete"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-circle product-${e}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\n                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n                        </svg></span>\n                        <p class="teddy-name">${t.name}</p>\n                        <img class="teddy-image" src="${t.image}">\n                    </td>\n                    <td class="teddy-color">${t.selectedColor}</td>\n                    <td class="teddy-quantity">\n                        <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-chevron-left deleteQuantity product-${e}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n                        </svg>\n                        ${t.quantity}\n                        <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-chevron-right addQuantity product-${e}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n                        </svg>\n                    </td>\n                    <td class="teddy-price">${t.price/100} €</td>\n                </tr>\n            `}),displayTotalPrice();const l=document.querySelectorAll(".delete");for(const t of l)t.addEventListener("click",t=>{removeOneProduct(t,e)});const a=document.querySelectorAll(".deleteQuantity");for(const t of a)t.addEventListener("click",t=>{removeOneQuantity(t,e)});const r=document.querySelectorAll(".addQuantity");for(const t of r)t.addEventListener("click",t=>{addOneQuantity(t,e)})}else{t.innerHTML='\n        <p class="emptyText">Le panier est vide.</p>\n        ';const e=document.querySelector("form"),n=document.querySelector(".validate"),l=document.getElementById("cartTotal");e.style.display="none",n.style.display="none",l.style.display="none"}const e=document.querySelector(".validate"),n=document.querySelector(".formulaire");e.addEventListener("click",()=>{n.style.display="flex"})}function displayTotalPrice(){const t=document.getElementById("cartTotal");let e,n=JSON.parse(localStorage.getItem("cartProducts")),l=0;for(let t of n)l+=e=t.price*t.quantity;t.innerHTML=`\n         <p><strong>Total : </strong>${l/100} €</p>\n         `}function removeOneProduct(t,e){let n=t.target.classList[2].slice(-1);e.splice(n,1),localStorage.setItem("cartProducts",JSON.stringify(e)),window.location.reload(),0===e.length&&localStorage.removeItem("cartProducts"),refreshSectionAndCart()}function removeOneQuantity(t,e){let n=t.target.classList[3].slice(-1);e[n].quantity--,0===e[n].quantity?(e.splice(n,1),0===e.length?localStorage.removeItem("cartProducts"):localStorage.setItem("cartProducts",JSON.stringify(e))):localStorage.setItem("cartProducts",JSON.stringify(e)),window.location.reload(),refreshSectionAndCart()}function addOneQuantity(t,e){e[t.target.classList[3].slice(-1)].quantity++,localStorage.setItem("cartProducts",JSON.stringify(e)),window.location.reload(),refreshSectionAndCart()}function refreshSectionAndCart(){cart.innerHTML="",displayCart(),addNumberProduct()}displayCart();