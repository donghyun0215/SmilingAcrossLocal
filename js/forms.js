
const app1 = Vue.createApp({
    
});
// DO NOT EDIT - start
app1.component('signup-form',{
    template: ` 
    <form class="mx-1 mx-md-4 loginsignup" id="signupForm">
        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
        <div class="d-flex flex-row align-items-center mb-4">
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="text" id="userName" class="form-control" required/>
                <label class="form-label" for="userName">Username</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="email" id="userEmail" class="form-control" required/>
                <label class="form-label" for="userEmail">Email</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="password" id="pwd1" class="form-control" minlength="6" required/>
                <label class="form-label" for="pwd1" >Password(Minimum 6 Characters)</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="password" id="cfmPwd" class="form-control" minlength="6" required/>
                <label class="form-label" for="cfmPwd">Repeat your password(Minimum 6 Characters)</label>
            </div>
        </div>
        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" class="btn btn-primary btn-lg">Register</button>
        </div>
    </form> 
    `    
});

const vm1 = app1.mount("#signup");

const app2 = Vue.createApp({
    
});
// DO NOT EDIT - start
app2.component('login-form',{
    template: ` 
    <form class="mx-1 mx-md-4 loginsignup" style="display: none" id="loginForm">
        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
        <div class="d-flex flex-row align-items-center mb-4">
        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
        <div class="form-outline flex-fill mb-0">
            <input type="text" id="loginEmail" class="form-control" required/>
            <label class="form-label" for="loginEmail">Username/Email</label>
        </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="password" id="loginPwd" class="form-control" minlength="6" required/>
                <label class="form-label" for="loginPwd">Password(Minimum 6 Characters)</label>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
    </form> 
    `    
});

const vm2 = app2.mount("#login");