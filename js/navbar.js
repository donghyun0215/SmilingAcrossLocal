
const app = Vue.createApp({
    
});
// DO NOT EDIT - start
app.component('include-navbar',{
    template: ` 
        <div><nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a href="index.html" class="navbar-brand">SmilingAcrossLocal<span style="font-size: 11px;"> SG</span></a> 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                                   data-bs-target="#navbarNav" aria-controls="navbarNav"
                                   aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li id="profile" class="nav-item active"> 
                            <a id="UserName" class="nav-link" aria-current="page" href="profileSettings.html"></a>
                        </li>
                        <li id="LoginSignUp" class="nav-item active"> 
                            <a class="nav-link" aria-current="page" href="login-signup.html">LOGIN/SIGNUP</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">HOME</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Attraction.html">ATTRACTIONS</a>
                        </li>
                        <li id="mapTab" class="nav-item">
                            <a class="nav-link" href="Maps.html">MAPS</a>
                        </li>
                        <li id="thTab" class="nav-item">
                            <a class="nav-link" href="travelHistory.html">TRAVEL HISTORY</a>
                        </li>
                        <li id="rewardTab" class="nav-item">
                            <a class="nav-link" href="Rewards.html">REWARDS</a>
                        </li>
                        <li id="rhTab" class="nav-item">
                            <a class="nav-link" href="rewardHistory.html">REWARD HISTORY</a>
                        </li>
                        <li id="signout" class="nav-item active"> 
                            <a class="nav-link" data-toggle="modal" aria-current="page" onclick="signout();" style="cursor: pointer;">Sign Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav></div>
    `    
});

const vm = app.mount("#navdiv");


const app5 = Vue.createApp({
    
});