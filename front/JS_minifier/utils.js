function addNumberProduct(){const e=document.querySelector(".addNumberProduct");let r=0;if(null!==localStorage.getItem("cartProducts")){let e=JSON.parse(localStorage.getItem("cartProducts"));for(const o of e)r+=o.quantity}e.innerHTML=`<sup>${r}</sup>`}function errorProduit(){alert("La connexion aux différents produits est indisponible, veuillez réessayer plus tard ...")}function errorConnexion(){alert("La connexion au serveur est indisponible, veuillez réessayer plus tard ...")}function errorCommande(){alert("Désolé, la connexion à votre banque a échoué, veuillez réessayer plus tard ...")}addNumberProduct();