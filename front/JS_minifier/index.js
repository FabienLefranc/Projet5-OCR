function callUrl(){fetch("http://localhost:3000/api/teddies").then(t=>t.json()).then(t=>{console.log(t),displayAllProducts(t)}).catch(t=>error())}function displayAllProducts(t){const e=document.getElementById("productList");for(const n of t){console.log(n);const t=document.createElement("section");e.appendChild(t),t.innerHTML=`<div class="teddiesCard"><img alt="${n.name}"\n        src="${n.imageUrl}" class="teddiesImg">\n        <p class="teddiesName">${n.name}</p>\n        <p class="teddiesDescription">${n.description} €</p>\n        <button class="enSavoirPlus" type="button"><a href="./front/HTML/product.html?id=${n._id}">\n        En savoir plus...</a></button></div>\n        `}}callUrl(),addNumberProduct();