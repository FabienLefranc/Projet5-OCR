function form(){
    /* Affichage du formulaire lorsque le bouton "Valider votre panier"
est cliqué */

    const validation = document.querySelector(".validate");
    const forms = document.querySelector("form");

    validation.addEventListener("click", () => forms.style.display = "flex");


    //Variables du formulaires

    let products = []; //Création d'un Array "products" contenant les Id de chq article du panier

    for (const product of products)
        {
            products.push(product._id);
        }

    const form = document.querySelector("form"); // Liaison entre le formulaire et JS

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let data = { // création d'un Object "data" qui va contenir les valeurs du formulaire et celles de l'Array "products"
            contact : {
                firstName: e.target.elements.firstName.value,
                lastName: e.target.elements.lastName.value,
                address: e.target.elements.address.value,
                city: e.target.elements.city.value,
                email: e.target.elements.email.value,
            },
            products
        }

        if (checkValue(data.contact) == true) { //Si validation des données du formulaire
            let url = "http://localhost:3000/api/teddies/order"; // Appel vers l'API/order
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type" : "application/json"
                },
            })
            .then (res => res.json())
            .then (res => {
                console.log(res);
                let commande = JSON.stringify(res); //Retour des données de l'API
                localStorage.setItem("commande", commande); //Création d'un nouveau fichier dans le localStorage avec les données retournées par l'API
                location.href = "./confirmation.html";
            }) 
            .catch (e => errorCommande());
        } else {
            errorConnexion();
        }
    })
}

form();


// Fonction qui va valider les inputs du formulaire

function checkValue(data) {
    const error = document.getElementById("error");
    error.innerHTML = ``;

    let regex = /[~`!#$%\^&*+=\-\[\]';,\/{}|":<>?0123456789]/; 
    let regexAddress = /[~`!#$%\^&*+=\-\[\]';\/{}|":<>?]/;

    if(data.firstName.match(regex) || data.lastName.match(regex) || data.address.match(regexAddress) || data.address == ""  || data.city.match(regex))
    {
      error.innerHTML += `Veuillez remplir les champs "nom", "prénom" et/ou "ville" uniquement avec des lettres !`;
      return false;
    }
    else{
        return true;
    }
}

