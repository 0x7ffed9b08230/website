function showAlert(message, type = 'danger') {
    const alert = document.createElement('div');

    if (document.getElementById('alert')) {
        document.getElementById('alert').remove();
    }
    
    const typeToColor = {
        'danger': 'red',
        'success': 'green',
        'warning': 'yellow',
    };

    const _typeToColor = {
        'danger': 'rgb(153 27 27);',
        'success': 'rgb(27 153 27);',
        'warning': 'rgb(153 153 27);',
    }


    alert.className = `p-4 mb-4 text-sm text-${typeToColor[type]}-800 rounded-lg bg-${typeToColor[type]}-50 dark:bg-gray-800 dark:text-${typeToColor[type]}-400`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `<div style="color: ${_typeToColor[type]}" class="font-bold">${message}</div>`

    alert.id = 'alert';

    const form = document.getElementById('form');
    form.insertAdjacentElement('beforebegin', alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function verifyCaptcha() {
    const recaptchaToken = grecaptcha.getResponse();
    if (!recaptchaToken) {
        showAlert('Please verify the captcha');
        return false;
    }
    return true;
}


function validateFields(email, message, subject) {
    if (!email || !message || !subject) {
        showAlert('Please fill all fields');
        return false;
    }

    if (!email.includes('@')) {
        showAlert('Please enter a valid email address');
        return false;
    }

    if (subject.length > 50) {
        showAlert('Subject is too long');
        return false;
    }

    if (message.length > 500) {
        showAlert('Message is too long');
        return false;
    }
    return true;
}

async function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const recaptchaToken = grecaptcha.getResponse();

    if (!validateFields(email, message, subject)) return;

    if (!verifyCaptcha()) return;

    try {
        const response = await fetch('/api/send.email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, message, subject, recaptchaToken }),
        });

        const data = await response.json();
        if (data.code === "EMAIL_SENT") {
            showAlert('Email sent successfully', 'success');
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            document.getElementById('subject').value = '';
            grecaptcha.reset();
        } else {
            showAlert(`${data.message}::${data.code}`, 'danger');
        }
    } catch (error) {
        const data = await error.json();
        showAlert(`${data.message}::${data.code}`, 'danger');
    }
}

// Function to render the reCAPTCHA
function renderRecaptcha() {
    const submitButton = document.getElementById('submit-button');

    grecaptcha.render("recaptcha", {
        sitekey: "6LdXwPMpAAAAAP7mCBMzfZAy8ibyDHsVix7nbERg",
        callback: function () {
            submitButton.disabled = false;
        },
    });

    // Add event listener for submit button click
    submitButton.addEventListener('click', handleSubmit);
}

// Wait for the reCAPTCHA script to load before rendering
window.addEventListener('load', renderRecaptcha);
