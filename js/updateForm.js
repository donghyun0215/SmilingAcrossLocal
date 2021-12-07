
const updateApp = Vue.createApp({
    
});
// DO NOT EDIT - start
updateApp.component('update-form',{
    template: ` 
    <form class="mx-1 mx-md-4 loginsignup" id="updateForm">
        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Profile</p>
        <div class="d-flex flex-row align-items-center mb-4">
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="text" id="updateUserName" class="form-control" required/>
                <label class="form-label" for="updateUserName">Username</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="email" id="updateUserEmail" class="form-control" readonly/>
                <label class="form-label" for="updateUserEmail">Email</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="password" id="newPassword" class="form-control" minlength="6" required/>
                <label class="form-label" for="newPassword" >New Password(Minimum 6 Characters)</label>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
                <input type="password" id="cfmNewPassword" class="form-control" minlength="6" required/>
                <label class="form-label" for="cfmNewPassword">Repeat your new password(Minimum 6 Characters)</label>
            </div>
        </div>
        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" class="btn btn-primary btn-lg">Update</button>
        </div>

    </form>
    `    
});

const vm1 = updateApp.mount("#update");