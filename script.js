
document.addEventListener("DOMContentLoaded", function () {
    // Menu responsivo
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });
    }

    // Máscara de telefone
    const telefone = document.getElementById("telefone");

    if (telefone) {
        telefone.addEventListener("input", function () {
            let value = telefone.value.replace(/\D/g, "").slice(0, 11);

            if (value.length > 10) {
                value = value.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );
            } else if (value.length > 6) {
                value = value.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    "($1) $2-$3"
                );
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
            }

            telefone.value = value;
        });
    }

    // Máscara de CPF
    const cpf = document.getElementById("cpf");

    if (cpf) {
        cpf.addEventListener("input", function () {
            let value = cpf.value.replace(/\D/g, "").slice(0, 11);

            value = value
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

            cpf.value = value;
        });
    }

    // Máscara de CEP
    const cep = document.getElementById("cep");

    if (cep) {
        cep.addEventListener("input", function () {
            let value = cep.value.replace(/\D/g, "").slice(0, 8);

            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d+)/, "$1-$2");
            }

            cep.value = value;
        });
    }

    // Seleção de valor ilustrativo de doação
    const donationButtons = document.querySelectorAll(".donation-option");
    const donationMessage = document.querySelector(".donation-message");

    donationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            donationButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (donationMessage) {
                donationMessage.textContent =
                    "Você selecionou R$ " +
                    button.dataset.value +
                    ". Esta é apenas uma demonstração acadêmica.";
            }
        });
    });

    // Demonstração de envio do formulário
    const volunteerForm = document.getElementById("volunteerForm");
    const formMessage = document.getElementById("formMessage");

    if (volunteerForm && formMessage) {
        volunteerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!volunteerForm.checkValidity()) {
                volunteerForm.reportValidity();
                return;
            }

            formMessage.textContent =
                "Cadastro demonstrativo preenchido com sucesso! Os dados não foram enviados nem armazenados.";

            formMessage.classList.add("show");
        });
    }
});