// Appel vers l'API

function callAPI() {
    /*VARIABLES */

  const url = `http://localhost:3000/api/teddies`;

  //Récupération de la variable contenant l'id du produit sélectionné 

  const parameters = new URLSearchParams(window.location.search);
  const id = parameters.get("id");

  const section = document.querySelector(".displayTeddy");

  /*Appel de la méthode Fetch pour récupérer l'url et l'ID 
  d'un seul Teddy */

  fetch(url+"/"+id)
    .then((response) => response.json())
    .then(product => {
      if(product){
        displayProduct(product);
      } else {  //Message si aucune connexion à l'url
        alert ("La connexion au serveur ne s'est pas faite, veuillez réessayer plus tard..."); 
      }
    })
}

callAPI();

// Affichage du produit sélectionné

function displayProduct(product){

  const displayTeddy = document.getElementById("displayTeddy");

  displayTeddy.innerHTML =  `
      <div class="displayTeddy">
        <div class="productBlockImage">
         <img class="product-image" src="${product.imageUrl}" alt="${product.name}">
         <button class="backLink"><a href="../../index.html">Retour à la boutique</a></button>
        </div>    
        <div class="product-information">
          <p class="product-title"><strong>Nom: </strong> ${product.name}</p>
          <p class="product-id"><strong>Réf: </strong>${product._id}</p>
          <p class="product-description"><strong>Description: </strong>${product.description}</p>                           
          <label for="colorList" class="colorList"><strong>Couleurs disponibles: </strong>  
          <select name="colors" id="colorList"></select></label>
          <p class="product-price"><strong>Prix: </strong>${product.price/100} €</p> 
          <div class="addBasketText">
            <button type="button" class="addBasket"><p>Ajoutez au panier</p></button>
            <div id="addBasketText"></div>
          </div>  
        </div>
      </div>`;

  //Affichage des différentes couleurs disponibles  
  const select = document.querySelector("select");
  for (const color of product.colors)
    {
      let option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);   
    }

  // A l'écoute du bouton "addBasket" pour ajouter la couleur sélectionnée au panier

  const addBasket = document.querySelector(".addBasket");  

  addBasket.addEventListener ('click', () => {
    const select = document.querySelector("select");
    product.selectedColor = select.options[select.selectedIndex].value;

    //Ajouter texte "Un article a été ajouté à votre panier" pdt x seconds
    document.getElementById("addBasketText").innerHTML = `<p class="addBasketText"> Un article vient d'être ajouté au panier.</p>`;
    setTimeout(function() {
      document.getElementById("addBasketText").innerHTML = ``;
    },2000);

    addToCart(product);
  })
}

// Création de la fonction pour ajouter les produits au localStorage (panier)

function addToCart (product) {

  //Création d'un tableau vide qui va recevoir les différents produits
  let cartProducts = [];

  //Création en format objet des futurs produits qui iront dans le panier
  let cartProduct = {
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.imageUrl,
    selectedColor: product.selectedColor,
    quantity: 1
  }

  let newDifferentProduct = true;

  if(localStorage.getItem("cartProducts") === null) { //Si le localStorage est vide
    cartProducts.push(cartProduct); //On ajoute le produit au format objet dans le tableau "cartProducts"
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); // On ajoute ce produit dans le localStorage    
  } else {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

    for (const prod of cartProducts){ //pour chaque produit dans le tableau "cartProducts"
      /* Si un produit possède le même id et la même couleur */
      if(product._id === prod._id && product.selectedColor === prod.selectedColor) {
        prod.quantity++; //alors on augmente la quantité de ce produit de +1
        newDifferentProduct = false; // et on attribue false à ce produit car ce n'est pas un nouveau produit
      }
    }
    if(newDifferentProduct) { // si c'est un nouveau produit
      cartProducts.push(cartProduct); // alors on "push" ce nouveau produit dans le tableau "cartProducts"
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }
  addNumberProduct();
}

 