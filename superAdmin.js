const logoutBtn = document.getElementById('logout-btn');

logoutBtn.onclick = () => {
    document.cookie = 'id_token' + '=; path=/';
};