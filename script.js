function togglePhoneRequirement() {
    const checkbox = document.getElementById("requestCallback");
    const phoneGroup = document.getElementById("phoneGroup");
    const phoneInput = document.getElementById("phoneNumber");

    if (checkbox.checked) {
        phoneGroup.style.display = "flex";
        phoneInput.required = true;
    } else {
        phoneGroup.style.display = "none";
        phoneInput.required = false;
        phoneInput.value = "";
    }
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitBtn = form.querySelector(".form-submit");
    submitBtn.innerHTML = "Sending... <i class='fas fa-spinner fa-spin'></i>";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                showModal('success', 'Thank You!', 'Your request has been submitted successfully. Our team will get in touch with you shortly.');
                form.reset();
            } else {
                console.log(response);
                showModal('error', 'Submission Failed', json.message || 'Something went wrong while submitting.');
            }
        })
        .catch((error) => {
            console.log(error);
            showModal('error', 'Error', 'Something went wrong! Please try again later.');
        })
        .then(function () {
            submitBtn.innerHTML = "Send Request <i class='fas fa-paper-plane'></i>";
        });
});

function showModal(type, title, message) {
    const modal = document.getElementById('formModal');
    const icon = document.getElementById('modalIcon');
    const titleEl = document.getElementById('modalTitle');
    const messageEl = document.getElementById('modalMessage');

    icon.className = 'modal-icon ' + type;
    icon.innerHTML = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    titleEl.textContent = title;
    messageEl.textContent = message;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('formModal').classList.remove('active');
}

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
});

const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburgerMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

console.log(
    "%c Website built by ApexCause %c https://apexcause.com",
    "color: white; background: #000; padding: 5px 10px; font-weight: bold;",
    "color: #888; background: #f4f4f4; padding: 5px 10px;",
);