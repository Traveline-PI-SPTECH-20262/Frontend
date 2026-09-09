document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('authForm');
    const tabs = document.querySelectorAll('.auth-tabs button');
    const formTitle = document.querySelector('.form-header h3');
    const formSubtitle = document.querySelector('.form-header p');
    const dividerText = document.getElementById('oauthDividerText');

    const loginTemplate = `
        <div class="input-group">
            <label>Email de trabalho</label>
            <input type="email" name="email" placeholder="nome@suaagencia.com.br" required>
        </div>
        <div class="input-group">
            <label>Senha</label>
            <input type="password" name="password" placeholder="••••••••" required>
        </div>

        <div class="form-actions">
            <label class="checkbox-label">
                <input type="checkbox" name="remember"> Lembrar dispositivo
            </label>
            <a href="#" class="forgot-link">Esqueci minha senha</a>
        </div>

        <button type="button" class="btn-primary">Entrar no Dashboard</button>
    `;

    const registerTemplate = `
        <div class="input-group">
            <label>Nome da agência</label>
            <input type="text" name="companyName" placeholder="Traveline Agência" required>
        </div>
        <div class="input-group">
            <label>Email de trabalho</label>
            <input type="email" name="email" placeholder="nome@suaagencia.com.br" required>
        </div>
        <div class="input-group">
            <label>Senha</label>
            <input type="password" name="password" placeholder="Crie uma senha forte" required>
        </div>
        <div class="input-group">
            <label>Confirmar senha</label>
            <input type="password" name="confirmPassword" placeholder="Repita sua senha" required>
        </div>

        <button type="button" class="btn-primary">Criar Conta</button>
    `;

    function setMode(mode) {
        const isRegister = mode === 'register';

        form.innerHTML = isRegister ? registerTemplate : loginTemplate;

        formTitle.textContent = isRegister ? 'Crie sua conta' : 'Acesso à Plataforma';
        formSubtitle.textContent = isRegister
            ? 'Cadastre sua agência e acelere sua operação.'
            : 'Insira suas credenciais corporativas.';

        dividerText.textContent = isRegister ? 'Ou cadastre-se com' : 'Ou conecte via';

        tabs.forEach((button) => {
            button.classList.toggle('active', button.dataset.mode === mode);
        });
    }

    tabs.forEach((button) => {
        button.addEventListener('click', () => setMode(button.dataset.mode));
    });

    setMode('login');
});
