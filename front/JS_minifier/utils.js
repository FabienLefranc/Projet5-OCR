function addNumberProduct(){const e=document.querySelector(".addNumberProduct");let r=0;if(null!==localStorage.getItem("cartProducts")){let e=JSON.parse(localStorage.getItem("cartProducts"));for(const t of e)r+=t.quantity}e.innerHTML=`<sup>${r}</sup>`}function error(){alert("La connexion au serveur est indisponible, veuillez réessayer plus tard ...")}addNumberProduct();