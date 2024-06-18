/* Common links and script tags */
document.addEventListener('DOMContentLoaded', () => {
    let bootstrapLinks = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    `;
    document.head.insertAdjacentHTML('beforeend', bootstrapLinks);

    /* Checl user login status. */
    (async (retrivedToken) => {
        let token = retrivedToken;
        if (!token) {
            changeRoutesFunction('/index.html')
            return '';
        };
        token = token.substring(1);

        let { data: { status } } = await axios.post('http://localhost:3000/api/v1/checkLoginStatus', { token });

        if (status == 200) changeRoutesFunction('/superAdmin.html');
        else changeRoutesFunction('/index.html');

    })(checkUserLoginStatus('id_token'));
});

/* Function to change the routes. */
const changeRoutesFunction = (pathName) => { if (window.location.pathname != pathName) window.location.href = `.${pathName}` };

/* Check user login status. */
const checkUserLoginStatus = (cookieName) => {
    const name = cookieName;
    const splitCookie = document.cookie.split(';');
    for (let index = 0; index < splitCookie.length; index++) {
        let element = splitCookie[index].trim();
        if (element.indexOf(name) === 0) return element.substring(name.length, element.length);
    };
};

/* Toaster */
function showToast(message, isError) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    !isError ? toast.style.backgroundColor = "rgb(23, 147, 23)" : toast.style.backgroundColor = "#df5959";

    toastContainer.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
};



/* 

"headers": {
        "Access-Control-Allow-Origin": "*" 
      }*/