const generateButton = document.getElementById('generateButton');
const generatedPassword = document.getElementById('generatedPassword');
const strengthMeter = document.getElementById('strengthMeter');
const strengthText = document.getElementById('strengthText');
const copyButton = document.getElementById('copyButton');

copyButton.style.display = 'none';

const generateStrongPassword = () => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';

  for (let i = 0; i < length; ++i) {
    const randomChar = Math.floor(Math.random() * charset.length);
    password += charset[randomChar];
  }

  return password;
};


const calculateStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*()_+~`|}{[\]:;?><,.\/-=]/.test(password)) strength++;

  return strength;
};

generateButton.addEventListener('click', () => {
  const password = generateStrongPassword();
  generatedPassword.value = password;

  const strength = calculateStrength(password);
  const strengthPercentage = (strength / 6) * 100;
  strengthMeter.style.width = `${strengthPercentage}%`;

  if (strength <= 2) {
    strengthText.textContent = 'Weak';
    strengthText.style.color = 'red';
  } else if (strength <= 4) {
    strengthText.textContent = 'Moderate';
    strengthText.style.color = 'orange';
  } else {
    strengthText.textContent = 'Strong';
    strengthText.style.color = 'green';
  }

  copyButton.style.display = 'inline'; 
  
  const inputPosition = generatedPassword.getBoundingClientRect();
  copyButton.style.top = `${inputPosition.top}px`;
  copyButton.style.left = `${inputPosition.right + 10}px`;
});

copyButton.addEventListener('click', () => {
  generatedPassword.select();
  document.execCommand('copy');
});
