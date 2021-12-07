$(document).ready(function() {
    $('#toggle').click(function() {
        $('.loginsignup').toggle(); 
    });
});
function change(idElement) {
        var element = document.getElementById('change' + idElement);
        if (idElement === 1 || idElement === 2) {
            if (element.innerHTML === 'Login') {
                element.innerHTML = 'Sign Up';
            }
            else {
                element.innerHTML = 'Login';
            }
        }
}