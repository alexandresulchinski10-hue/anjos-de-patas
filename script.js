document.addEventListener('DOMContentLoaded', function() {

    
    // 1. SELEÇÃO DOS ELEMENTOS

    
    // --- Elementos do Menu ---
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.querySelector('nav');

    // --- Elementos do Formulário ---
    // (Estes só existem na página de cadastro, por isso verificamos se são nulos)
    const form = document.querySelector('form');
    const inputCPF = document.querySelector('#cpf');
    const inputTelefone = document.querySelector('#telefone');
    const inputCEP = document.querySelector('#cep');

    

    // 2. OUVINTES DE EVENTOS (LISTENERS)


    // --- Listener do Menu Hambúrguer (Em todas as páginas) ---
    if (btnMobile && nav) {
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu); // Para mobile
    }

    // --- Listeners das Máscaras (Só executa se os inputs existirem) ---
    if (inputCPF) {
        inputCPF.addEventListener('input', formatarCPF);
    }
    if (inputTelefone) {
        inputTelefone.addEventListener('input', formatarTelefone);
    }
    if (inputCEP) {
        inputCEP.addEventListener('input', formatarCEP);
    }

    // --- Listener da Validação (Só executa se o formulário existir) ---
    if (form) {
        form.setAttribute('novalidate', true);
        form.addEventListener('submit', handleFormSubmit);
    }

    
   
    // 3. FUNÇÕES
   

    // --- Função do Menu ---
    function toggleMenu(event) {
        // Previne clique duplo em touch e click
        if (event.type === 'touchstart') event.preventDefault();
        
        nav.classList.toggle('nav-active');

        // Atualiza atributos de acessibilidade (ARIA)
        const menuAberto = nav.classList.contains('nav-active');
        event.currentTarget.setAttribute('aria-expanded', menuAberto);
        
        if (menuAberto) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
    }

    // --- Funções de Formatação de Máscara ---
    function formatarCPF(e) {
        let valor = e.target.value.replace(/\D/g, ''); 
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = valor;
    }

    function formatarTelefone(e) {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2'); 
        e.target.value = valor;
    }

    function formatarCEP(e) {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = valor;
    }

    // --- Funções de Validação de Formulário ---
    
    // Função principal que é chamada no 'submit'
    function handleFormSubmit(event) {
        event.preventDefault();

        let isFormValid = true;
        const allRequiredInputs = form.querySelectorAll('[required]');

        clearAllErrors(form);

        allRequiredInputs.forEach(input => {
            if (!input.checkValidity()) {
                isFormValid = false;
                // Usando nossa função de mensagens em Português
                const errorMessage = getErrorMessagePtBr(input); 
                showError(input, errorMessage);
            }
        });

        if (isFormValid) {
            console.log('Formulário válido! Enviando...');
            window.location.href = '#feedback-modal';
        } else {
            console.log('Formulário com erros. Corrija os campos destacados.');
        }
    }

    // Função que traduz as mensagens de erro
    function getErrorMessagePtBr(input) {
        if (input.validity.valueMissing) {
            return 'Este campo é obrigatório. Por favor, preencha-o.';
        }
        if (input.validity.typeMismatch) {
            if (input.type === 'email') {
                return 'Por favor, insira um endereço de e-mail válido (ex: seuemail@dominio.com).';
            }
        }
        if (input.validity.tooShort) {
            return `O valor precisa ter no mínimo ${input.minLength} caracteres.`;
        }
        // Mensagem genérica
        return 'O valor inserido neste campo é inválido.';
    }

    // Função que cria e mostra o elemento de erro
    function showError(inputElement, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputElement.insertAdjacentElement('afterend', errorElement);
    }

    // Função que limpa os erros da tela
    function clearAllErrors(formElement) {
        const existingErrors = formElement.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
    }

}); 