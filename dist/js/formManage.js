var alreadySubmited = false;

function validateEmail(email) {
    return email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
};

notifyMeForm.addEventListener("submit", async e => {
    console.log("Reading form...")
    e.preventDefault();

    // Checking if already submitted
    if(alreadySubmited) {
        // Showing confetti!
        party.confetti(notifyMeForm.querySelector("button"), {
            spread: 30
        });

        document.querySelector(".submit-warning p").innerHTML = "Already Submited Responce";
        document.querySelector(".submit-warning").classList.add("active");
        setTimeout(() => {
            document.querySelector(".submit-warning").classList.remove("active");
        }, 3000);
        console.log("Already Submited")
        return;
    }

    // For removing warning when person types in the input
    NMemail.addEventListener("keypress", e => {
        document.querySelector(".NMemail-warning").classList.remove("active");
        NMemail.classList.remove("warn");
    })

    // Checking inputs
    document.querySelector(".NMemail-warning").classList.remove("active");
    NMemail.classList.remove("warn");
    document.querySelector(".submit-warning").classList.remove("active");
    document.querySelector(".submit-problem").classList.remove("active");
    if(NMemail.value.length < 1) {
        // There isn't anything inside the email input
        console.log("No email provided")

        NMemail.classList.add("warn");
        document.querySelector(".NMemail-warning").innerHTML = "Need to enter an email";
        document.querySelector(".NMemail-warning").classList.add("active");
        
        document.querySelector(".submit-warning p").innerHTML = "Action Needed";
        document.querySelector(".submit-warning").classList.add("active");
        setTimeout(() => {
            document.querySelector(".submit-warning").classList.remove("active");
        }, 5000);
    }else if(!validateEmail(NMemail.value)) {
        // The value isn't a valid email
        console.log("Email isn't valid")
        
        NMemail.classList.add("warn");
        document.querySelector(".NMemail-warning").innerHTML = "Email entered is not a valid email";
        document.querySelector(".NMemail-warning").classList.add("active");
        
        document.querySelector(".submit-warning p").innerHTML = "Action Needed";
        document.querySelector(".submit-warning").classList.add("active");
        setTimeout(() => {
            document.querySelector(".submit-warning").classList.remove("active");
        }, 5000);
    }else {
        // No problems, submit the thing!
        console.log("Form's good")

        // Need to show the form is loading
        notifyMeForm.querySelector("button").classList.add("loading");
        
        if(NMemail && NMpre) {
            var status = await storeData(NMemail.value, NMpre.checked)
            if(status === "Success") {
                console.log("Data Stored Successfully");

                // Show the success
                notifyMeForm.querySelector("button").classList.remove("loading");
                document.querySelector(".submit-success").classList.add("active");
                alreadySubmited = true;

                // Showing confetti, whoo!
                party.confetti(notifyMeForm.querySelector("button"), {
                    spread: 30
                });
            }else if(status === "Error") {
                console.error("Error adding document: ", e);

                notifyMeForm.querySelector("button").classList.remove("loading");
                document.querySelector(".submit-problem").classList.add("active");
            }
        }
    }
})