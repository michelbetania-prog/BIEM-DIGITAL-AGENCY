// --------------------------------------------------
// Interacciones principales: mostrar formulario y validar envío
// --------------------------------------------------

const startBtn = document.getElementById('startBtn');
const formSection = document.getElementById('formSection');
const diagnosticForm = document.getElementById('diagnosticForm');
const successMessage = document.getElementById('successMessage');
const commitmentRange = document.querySelector('input[name="nivelCompromiso"]');
const commitmentValue = document.getElementById('commitmentValue');

// Muestra el formulario con animación y desplazamiento suave.
startBtn.addEventListener('click', () => {
  formSection.classList.add('visible');
  formSection.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
});

// Refleja en tiempo real el valor del slider de compromiso.
commitmentRange.addEventListener('input', () => {
  commitmentValue.textContent = commitmentRange.value;
});

// Limpia estado visual de error cuando el usuario corrige.
diagnosticForm.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('invalid')) {
    target.classList.remove('invalid');
  }
});

// Validación básica de campos obligatorios y confirmación de envío.
diagnosticForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const requiredFields = diagnosticForm.querySelectorAll('[required]');
  let isFormValid = true;

  requiredFields.forEach((field) => {
    const value = typeof field.value === 'string' ? field.value.trim() : field.value;
    const isEmpty = !value;

    if (isEmpty || !field.checkValidity()) {
      field.classList.add('invalid');
      isFormValid = false;
    } else {
      field.classList.remove('invalid');
    }
  });

  if (!isFormValid) {
    const firstInvalid = diagnosticForm.querySelector('.invalid');
    firstInvalid?.focus();
    return;
  }

  // Simulación de envío exitoso en entorno estático.
  diagnosticForm.reset();
  commitmentValue.textContent = '5';
  successMessage.classList.add('show');
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
