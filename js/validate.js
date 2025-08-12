// js/validate.js - Client-side validation
import { showToast } from './ui.js';

function validateField(input) {
  if (input.validity.valid) return '';
  if (input.validity.valueMissing) return 'This field is required';
  if (input.validity.typeMismatch) return 'Please enter a valid value';
  if (input.validity.patternMismatch) return 'Please match the requested format';
  return 'Please correct this field';
}

function attachValidation(form) {
  form.querySelectorAll('input, textarea, select').forEach((input) => {
    input.addEventListener('input', () => {
      const msg = validateField(input);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      let err = input.nextElementSibling?.classList.contains('error') ? input.nextElementSibling : null;
      if (msg) {
        if (!err) { err = document.createElement('div'); err.className = 'error'; input.insertAdjacentElement('afterend', err); }
        err.textContent = msg;
      } else if (err) { err.remove(); }
    });
  });
}

function handleSubmit(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('input, textarea, select').forEach((input) => {
      const msg = validateField(input);
      if (msg && !firstInvalid) firstInvalid = input;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Simulate async submit; keep server load minimal
    await new Promise(r => setTimeout(r, 400));
    form.reset();
    showToast('Thanks! Your message has been sent.');
  });
}

function init() {
  document.querySelectorAll('form').forEach((form) => {
    if (form.hasAttribute('data-validate')) return; // prevent double init
    form.setAttribute('data-validate', '');
    attachValidation(form);
    handleSubmit(form);
  });
}

init(); 