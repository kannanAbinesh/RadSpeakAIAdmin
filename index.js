const mobileShowPassword = document.getElementById('togglePassword-show');
const mobileHidePassword = document.getElementById('togglePassword-hide');
mobileHidePassword.style.display = 'none';

const emailId = document.getElementById('login-emailId');
const password = document.getElementById("login-password");
const showPassword = document.getElementById('show-password-checkbox');
const loginSubmitBtn = document.getElementById('login-submitbtn');

emailId.value = 'abineshkannan98@gmail.com';
password.value = 'Qwerty@123';

mobileShowPassword.onclick = () => {
    mobileShowPassword.style.display = 'none';
    mobileHidePassword.style.display = 'block';
    password.type = 'text';
};

mobileHidePassword.onclick = () => {
    mobileShowPassword.style.display = 'block';
    mobileHidePassword.style.display = 'none';
    password.type = 'password';
};

showPassword?.addEventListener('change', () => {
    if (showPassword.checked) password.type = 'text';
    else password.type = 'password';
});


/* Login Action */
loginSubmitBtn.onclick = async () => {
    if (!emailId.value || !password.value) {
        showToast('Please enter the required fields', true);
        return '';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId.value)) {
        showToast('Please enter valid email address', true);
        return '';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(password?.value)) {
        showToast('Please provide password in correct format (It should atleast have one capital letter, one special characters, one numbers and the length of the password should me more than 8 characters.)', true);
        return '';
    };
    /*https://radspeakaiservernode-git-main-kannanabineshs-projects.vercel.app/api/v2/login */
    // let { data, data: { status } } = await axios.post('http://localhost:3000/api/v1/login', {
    //     emailId: emailId.value,
    //     password: password.value
    // });

    let response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailId: emailId.value,
            password: password.value
        })
    });

    let resp = await response.json()

    if (resp?.status == 200) {
        const date = new Date();
        date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `id_token=${resp?.token}; expires=${expires}`;
        window.location.href = './superAdmin.html';
    } else {
        showToast('Something went wrong in login. Please try again later', true);
        return '';
    };

};