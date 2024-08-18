document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('form > section');
    const nextButtons = document.querySelectorAll('button.next');
    const prevButtons = document.querySelectorAll('button.prev');
    const summary = document.getElementById('summary');

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.style.display = (i === index) ? 'flex' : 'none';
        });

        updateButtons(index);
        if (index === steps.length - 1) {
            updateSummary();
        }
    }

    function updateButtons(index) {
        prevButtons.forEach(button => button.style.display = index === 0 ? 'none' : 'inline-block');
        nextButtons.forEach(button => button.style.display = index === steps.length - 1 ? 'none' : 'inline-block');
        document.querySelector('button.submit').style.display = index === steps.length - 1 ? 'inline-block' : 'none';
    }

    function updateSummary() {
        const personalInfo = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        const plan = document.querySelector('input[name="plan"]:checked');
        const planText = plan ? plan.parentElement.textContent.trim() : 'No plan selected';

        const addons = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.parentElement.textContent.trim());

        summary.innerHTML = `
            <h3>Resumen de tu Pedido</h3>
            <p><strong>Información Personal:</strong></p>
            <p>Nombre: ${personalInfo.name}</p>
            <p>Correo Electrónico: ${personalInfo.email}</p>
            <p>Número de Teléfono: ${personalInfo.phone}</p>
            <p><strong>Plan Seleccionado:</strong></p>
            <p>${planText}</p>
            <p><strong>Complementos Seleccionados:</strong></p>
            <ul>
                ${addons.length ? addons.map(addon => `<li>${addon}</li>`).join('') : '<li>Ninguno</li>'}
            </ul>
        `;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    
    showStep(currentStep);
});
