function signout(){
    Swal.fire({
        icon: 'error',
        title: 'Sign Out',
        showCancelButton: true,
        text: 'Do you really want to sign out?',
        confirmButtonColor: 'tomato',
        confirmButtonText: 'Sign Out',
        cancelButtonText: "Cancel",

        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_points');
                window.location.href = "index.html";
            }
        
        })
}