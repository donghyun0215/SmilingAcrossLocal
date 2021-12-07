    const displayUserName = document.querySelector('#UserName');
    const profileTab = document.querySelector('#profile');
    const signoutTab = document.querySelector('#signout');
    const loginSignupTab = document.querySelector('#LoginSignUp');
    const mapTab = document.querySelector('#mapTab');
    const thTab = document.querySelector('#thTab');
    const rewardTab = document.querySelector('#rewardTab');
    const rewardHist = document.querySelector('#rhTab');

    const toSign = document.querySelector('#to-signup');
    const noSign = document.querySelector('#no-needsign');
    // define the nameDisplayCheck() function
    function nameDisplayCheck() {
        // check whether the 'name' data item is stored in web Storage
        if((localStorage.getItem('user_name')&&localStorage.getItem('user_name')!==null)) {
            // If it is, display name
            let name = localStorage.getItem('user_name');
            displayUserName.textContent =  name;
            profileTab.style.display = "block";
            signoutTab.style.display = "block";
            loginSignupTab.style.display = "none";
            if(toSign!==null){
                toSign.style.display = "none";
            }
            if(noSign!==null){
                noSign.style.display = "block";
            }
            

        } else {
            // if not just login/sign up
            loginSignupTab.style.display = "block";
            signoutTab.style.display = "none";
            profileTab.style.display = "none";
            mapTab.style.display = "none";
            thTab.style.display = "none";
            rewardTab.style.display = "none";
            rewardHist.style.display = "none";
            if(toSign!==null){
                toSign.style.display = "block";

            }
            if(noSign!==null){
                noSign.style.display = "none";
            }
            
        }
    }
document.body.onload = nameDisplayCheck;
