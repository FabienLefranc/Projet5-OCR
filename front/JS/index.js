
/* Appel de l'Url */

function callUrl () {    
    // Variable de l'URL
    const url ="http://localhost:3000/api/teddies";
    /* Demande Fetch concernant les teddies de l'API */
    
        fetch(url)
            .then((response) => response.json()) //Attente d'une promesse de l'API
            .then(products => {
                console.log(products);
                displayAllProducts(products);
            })    
            .catch (e => errorProduit());
}

     
/* Affichage de tous les teddies sur la page index.html */

function displayAllProducts(products) {
    const productList = document.getElementById("productList");

    for (const product of products){
        // console.log(product);

        // On crée une section au niveau de l'html
        const section = document.createElement("section");
        productList.appendChild(section); 

    //Et on y insère de l'html
        section.innerHTML = `<div class="teddiesCard"><img alt="${product.name}"
        src="${product.imageUrl}" class="teddiesImg">
        <p class="teddiesName">${product.name}</p>
        <p class="teddiesDescription">${product.description} €</p>
        <button class="enSavoirPlus" type="button"><a href="./front/HTML/product.html?id=${product._id}">
        En savoir plus...</a></button></div>
        `  
    }

}
callUrl();


