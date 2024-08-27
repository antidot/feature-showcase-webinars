let msg = 'Hello';
if (user.isAuthenticated){
    msg += ' ' + user.profile.displayName;
}
document.getElementById("greetings").innerText = msg;