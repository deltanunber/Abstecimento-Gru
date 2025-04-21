document.addEventListener('DOMContentLoaded', function() {
  // Gestão da visibilidade dos campos secundários
  const dataInput = document.getElementById('data');
  const camposSecundarios = document.querySelector('.campos-secundarios');
  
  dataInput.addEventListener('change', function() {
    if (this.value) {
      camposSecundarios.classList.remove('hidden');
      setTimeout(() => {
        camposSecundarios.classList.add('visible');
      }, 50);
    } else {
      camposSecundarios.classList.remove('visible');
      setTimeout(() => {
        camposSecundarios.classList.add('hidden');
      }, 300);
    }
  });
  
  // Gestão dos textos informativos
  const contadorInput = document.getElementById('contador-inicial');
  const contadorInfo = document.getElementById('contador-info');
  
  contadorInput.addEventListener('focus', function() {
    contadorInfo.classList.add('visible');
  });
  
  contadorInput.addEventListener('blur', function() {
    contadorInfo.classList.remove('visible');
  });
  
  const abastecedor = document.getElementById('abastecedor');
  const abastecedorInfo = document.getElementById('abastecedor-info');
  
  abastecedor.addEventListener('focus', function() {
    abastecedorInfo.classList.add('visible');
  });
  
  abastecedor.addEventListener('blur', function() {
    abastecedorInfo.classList.remove('visible');
  });
  
  // Gestão do envio do formulário
  const form = document.getElementById('abastecimentoForm');
  form.addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('.submit-button');
  submitButton.disabled = true;
  
  try {
    const formData = new FormData();
    formData.append('data', form.data.value);
    formData.append('hora', form.hora.value);
    formData.append('prefixoVeiculo', form.prefixo_veiculo.value);
    formData.append('placaVeiculo', form.placa_veiculo.value);
    formData.append('kmVeiculo', form.km_veiculo.value);
    formData.append('litragemDiesel', form.litragen_diesel.value);
    formData.append('contadorBomba', form.contador_bomba.value);
    formData.append('contadorInicial', form.contador_inicial.value);
    formData.append('arla', form.arla.value);
    formData.append('passouCartao', form.querySelector('input[name="passou_cartao"]:checked')?.value || '');
    formData.append('abastecedor', form.abastecedor.value);
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbwVzNRDy7SLGzdg6WOLbUiiWOcVBWsYPhiuhbFyG8GT_BstswPhIDqQFaGmu1I1FP7Y9g/exec', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    form.reset();
    alert('Registro enviado com sucesso!');
    
    document.querySelector('.campos-secundarios').classList.remove('visible');
    setTimeout(() => {
      document.querySelector('.campos-secundarios').classList.add('hidden');
    }, 300);
    
  } catch (error) {
    alert('Erro ao enviar o registro. Por favor, tente novamente.');
    console.error('Erro:', error);
  } finally {
    submitButton.disabled = false;
  }
}
