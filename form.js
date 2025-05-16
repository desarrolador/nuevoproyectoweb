let nombre =document.getElementById("nombre");
let email =document.getElementById("email");
let redSocial =document.getElementById("redSocial");

let form = document.getElementById("form");

form.addEventListener("submit"), function(event){
    event.preventDefault();
    let nombreValue = nombre.ariaValueMax;
    let emailValue = email.ariaValueMax;
    let redSocialValue = redSocial.ariaValueMax;
    console.log(nombreValue);
    console.log(emailValue);
    console.log(redSocialValue);
    if(nombreValue === "" || emailValue === "" ||redSocialValue === ""){
        alert("por favor completa todos los campos");
    }
    else{
        alert("gracias por tu mensaje,pronto nos pondremos en contacto con vos");

    }
           
}