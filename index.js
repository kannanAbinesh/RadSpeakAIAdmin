const emailId = document.getElementById('login-emailId');
const password = document.getElementById("login-password");
const showPassword = document.getElementById('show-password-checkbox');
const loginSubmitBtn = document.getElementById('login-submitbtn');

emailId.value = 'abineshkannan98@gmail.com';
password.value = 'Qwerty@123';

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

    let { data, data: { status } } = await axios.post('http://192.168.1.15:3000/api/v1/login', {
        emailId: emailId.value,
        password: password.value
    });

    if (status == 200) {
        const date = new Date();
        date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `id_token=${data?.token}; expires=${expires}`;
        window.location.href = './superAdmin.html';
    } else {
        showToast('Something went wrong in login. Please try again later', true);
        return '';
    };

};