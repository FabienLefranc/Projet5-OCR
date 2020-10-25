function confirmation() {
  const result = document.querySelector(".result");

  let commande = JSON.parse(localStorage.getItem("commande"));

    if (commande === null) {
        result.innerHTML += `<p>
        Vous n'avez pas de commande en cours!
        </p>`;
    } else {

      //Affichage de la confirmation de commande
      result.innerHTML += `<div>
        <h2 class="checkout">Commande validée</h2>
        <p>
          Merci <span>${commande.contact.firstName} ${commande.contact.lastName}</span> d'avoir passer votre commande.<br><br>
          Votre numéro de commande est le : <span>${commande.orderId}</span>.<br><br>
          Elle sera traitée dans les plus brefs délais.<br><br> Au plaisir de vous revoir sur Orinoco !
        </p>
      </div>`;
    }

  // Suppression des éléments dans le localStorage après affichage de la confirmation
  localStorage.removeItem("commande");
  localStorage.clear();
}

confirmation();