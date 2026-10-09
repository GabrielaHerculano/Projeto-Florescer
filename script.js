
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

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#form-doacao");

    if (!formulario) return;

    const campoPersonalizado = document.querySelector("#valor-personalizado");
    const mensagem = document.querySelector("#mensagem-doacao");
    const opcoesValor = formulario.querySelectorAll('input[name="valor"]');

    campoPersonalizado.addEventListener("input", function () {
        if (campoPersonalizado.value !== "") {
            opcoesValor.forEach(function (opcao) {
                opcao.checked = false;
                opcao.required = false;
            });
        } else {
            opcoesValor.forEach(function (opcao, indice) {
                opcao.required = indice === 0;
            });
        }
    });

    opcoesValor.forEach(function (opcao) {
        opcao.addEventListener("change", function () {
            if (opcao.checked) {
                campoPersonalizado.value = "";
            }
        });
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const valorSelecionado = formulario.querySelector(
            'input[name="valor"]:checked'
        );

        const valorDigitado = Number(
            campoPersonalizado.value.replace(",", ".")
        );

        let valor = 0;

        if (campoPersonalizado.value.trim() !== "") {
            valor = valorDigitado;
        } else if (valorSelecionado) {
            valor = Number(valorSelecionado.value);
        }

        if (!Number.isFinite(valor) || valor <= 0) {
            mensagem.textContent = "Escolha ou informe um valor válido para continuar.";
            return;
        }

        const frequencia = formulario.querySelector(
            'input[name="frequencia"]:checked'
        );

        const valorFormatado = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const periodicidade = frequencia && frequencia.value === "mensal"
            ? "mensal"
            : "única";

        mensagem.textContent =
            "Sua contribuição de " + valorFormatado +
            " (" + (periodicidade === "mensal" ? "recorrência mensal" : "doação única") +
            ") foi selecionada! Esta demonstração não realiza pagamentos.";
    });
});