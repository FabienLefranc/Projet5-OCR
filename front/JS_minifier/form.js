function form(){const e=document.querySelector(".validate"),t=document.querySelector("form");e.addEventListener("click",()=>t.style.display="flex");let a=[];for(const e of a)a.push(e._id);document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();let t={contact:{firstName:e.target.elements.firstName.value,lastName:e.target.elements.lastName.value,address:e.target.elements.address.value,city:e.target.elements.city.value,email:e.target.elements.email.value},products:a};if(1==checkValue(t.contact)){fetch("http://localhost:3000/api/teddies/order",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{console.log(e);let t=JSON.stringify(e);localStorage.setItem("commande",t),location.href="./confirmation.html"}).catch(e=>error())}else error()})}function checkValue(e){const t=document.getElementById("error");t.innerHTML="";let a=/[~`!#$%\^&*+=\-\[\]';,\/{}|":<>?0123456789]/;return!(e.firstName.match(a)||e.lastName.match(a)||e.address.match(/[~`!#$%\^&*+=\-\[\]';\/{}|":<>?]/)||""==e.address||e.city.match(a))||(t.innerHTML+='Veuillez remplir les champs "nom", "prénom" et/ou "ville" uniquement avec des lettres !',!1)}form();