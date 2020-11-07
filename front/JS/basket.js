//Affichage des produits dans le panier

function displayCart() {
    //Variables
    const cart = document.querySelector("#cart"); // Lier l'id "cart" avec JS

    if (localStorage.getItem("cartProducts") !== null) {
        let products = JSON.parse(localStorage.getItem("cartProducts"));
        
        cart.innerHTML = `
                <h2 class="yourCart">Votre panier :</h2>
                 <div class="container">
                    <div class="cartTable">            
                      <table>
                          <thead>
                                <tr class="trHead">
                                    <th class="th1">Article</th>
                                    <th class="th2">Couleur</th>
                                    <th class="th3">Quantité</th>
                                    <th class="th4">Prix</th>
                                </tr>
                          </thead>
                          <tbody class="section_tbody"></tbody>
                      </table>
                    </div>
                 </div> `;

        const tbody = document.querySelector(".section_tbody");

        products.forEach((product, index) => {
            
            tbody.innerHTML += `
                <tr class="trArticles">
                    <td class="tdArticle">
                        <span class="delete"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-circle product-${index}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></span>
                        <p class="teddy-name">${product.name}</p>
                        <img class="teddy-image" src="${product.image}">
                    </td>
                    <td class="teddy-color">${product.selectedColor}</td>
                    <td class="teddy-quantity">
                        <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-chevron-left deleteQuantity product-${index}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        ${product.quantity}
                        <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-chevron-right addQuantity product-${index}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </td>
                    <td class="teddy-price">${product.price/100} €</td>
                </tr>
            `;
        });     
        displayTotalPrice();
       
        // A l'écoute de tous les boutons "delete":
        const btnDelete = document.querySelectorAll(".delete");

        for (const btn of btnDelete) {
            btn.addEventListener("click", (e) =>{
                removeOneProduct(e,products);
            })
        }

        // A l'écoute de tous les boutons "deleteQuantity":
        const btnDeleteQuantity = document.querySelectorAll(".deleteQuantity");

        for (const btn of btnDeleteQuantity) {
            btn.addEventListener("click", (e) =>{
                removeOneQuantity(e,products);
            })
        }

        // A l'écoute de tous les boutons "addQuantity":
        const btnAddQuantity = document.querySelectorAll(".addQuantity");

        for (const btn of btnAddQuantity) {
            btn.addEventListener("click", (e) =>{
                addOneQuantity(e, products);
            })
        }       
            
    } else { // Si le panier est vide :       
        
        cart.innerHTML = `<p class="emptyText">Le panier est vide.</p>`;
        const formulaire = document.querySelector("form");
        const validate = document.querySelector(".validate");
        const cartTotal = document.getElementById("cartTotal"); 

        formulaire.style.display = "none";
        validate.style.display = "none";
        cartTotal.style.display = "none";
    }
    //A l'écoute du bouton "validate" pour ouvrir le formulaire

    const validate = document.querySelector(".validate");
    const formulaire = document.querySelector(".formulaire");

    validate.addEventListener("click", () => {
        formulaire.style.display = "flex";
    })
}


    /* ------ CREATION DES FONCTIONS ------ */

    // Affichage du prix total du panier

    function displayTotalPrice(){         
         const cartTotal = document.getElementById("cartTotal"); //Lier l'id "cartTotal" avec JS
         let productsBasket = JSON.parse(localStorage.getItem("cartProducts"));
         let totalRow;
         let totalPrice = 0;

         for (let prod of productsBasket) {
            totalRow = (prod.price * prod.quantity);  
            totalPrice += totalRow;        
         }        
         cartTotal.innerHTML = `
         <p><strong>Total : </strong>${totalPrice/100} €</p>
         `; 
    }


    /* ----- Création de la fonction qui supprime un produit ----- */

    function removeOneProduct(e, products) {
        
        let index = e.target.classList[2].slice(-1);//On sélectionne le numéro de l'index
        // console.log(index);
        products.splice(index, 1); //On retire le produit à l'index sélectionné du tableau "products"
        localStorage.setItem("cartProducts", JSON.stringify(products));//On modifie également le localStorage        

        if (products.length === 0) { //si le tableau "products" est vide 
            localStorage.removeItem("cartProducts"); //On vide le localStorage
        }       
        
        window.location.reload(); 
    }

    /* ----- Création de la fonction qui supprime une quantité ------ */

    function removeOneQuantity(e, products) {  

        /* On sélectionne l'index correspondant à la flèche de gauche qui a été cliquée
        et on retire le dernier élément soit le nombre qui va correspondre donc à l'index */
        let index = e.target.classList[3].slice(-1);        
        products[index].quantity--; // Et on retire -1 à "quantity"

        if(products[index].quantity === 0) { //Si la quantité du produit est égale à 0            
            products.splice(index, 1); //On retire cet élément du tableau "products"            
            if (products.length === 0){ // Et si la longueur du tableau est nulle
                localStorage.removeItem("cartProducts"); //On retire le produit du localStorage
            } else {//Sinon on modifie le localStorage
                localStorage.setItem("cartProducts", JSON.stringify(products));
            }
        } else { //si la quantité du produit n'est pas nulle, on modifie le localStorage
            localStorage.setItem("cartProducts", JSON.stringify(products));
        }
       
        window.location.reload(); 
        
    }

    /* ----- Création de la fonction qui ajoute une quantité ----- */
    

    function addOneQuantity(e, products) {        
        let index = e.target.classList[3].slice(-1); //idem que pour la suppression                
        products[index].quantity++; //on ajoute +1 à la quantité. 

        localStorage.setItem("cartProducts", JSON.stringify(products)); //On modifie le localStorage
       
        window.location.reload(); 
    }
    
displayCart();

  