function addNumberProduct() {

    //On cible pour ajouter le nombre de produit à côté de "panier" dans la navbar
        const addNumber = document.querySelector(".addNumberProduct");

    let nbre = 0;

    if(localStorage.getItem("cartProducts") !== null) { //si le panier n'est pas vide
        let basket = JSON.parse(localStorage.getItem("cartProducts"));

        for( const prod of basket) { //pour chq produit dans le panier
            nbre = nbre + prod.quantity; // on ajoute la quantité à "nbre"
        }
    }  
    
    addNumber.innerHTML = `<sup>${nbre}</sup>`;
}
addNumberProduct();




function error() {
    alert("La connexion au serveur est indisponible, veuillez réessayer plus tard ...");
}


