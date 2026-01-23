
const handleForm = (e) => {

    e.preventDefault()

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;


    if(firstname == "" && lastname == "" && email == "" && phone == "" ){
        const message = document.querySelector(".error-message");
        message.innerHTML="please fill all detail properly.!"
        message.style.color = "red"
        message.style.marginLeft = "10px"
        message.style.fontSize = "14px"
        return 

    } else if(firstname == ""){
        const message = document.querySelector(".error-message");
        message.innerHTML="please fill Firstname properly.!"
        message.style.color = "red"
        message.style.marginLeft = "10px"
        message.style.fontSize = "14px"
        return 

    } else if(lastname == ""){
        const message = document.querySelector(".error-message");
        message.innerHTML="please fill Lastname properly.!"
        message.style.color = "red"
        message.style.marginLeft = "10px"
        message.style.fontSize = "14px"
        return

    } else if(email == ""){
        const message = document.querySelector(".error-message");
        message.innerHTML="please fill Email properly.!"
        message.style.color = "red"
        message.style.marginLeft = "10px"
        message.style.fontSize = "14px"
        return

    } else if(phone.trim() === "" || 
                Number.isNaN(Number(phone)) ||
                phone.length !== 10
            ){
        const message = document.querySelector(".error-message");
        message.innerHTML="please fill min 10 digits Phone Number properly.!"
        message.style.color = "red"
        message.style.marginLeft = "10px"
        message.style.fontSize = "14px"
        return
        
    } else {
        document.querySelector(".error-message").innerHTML="";
        window.location.href = "home.html";
    }

}