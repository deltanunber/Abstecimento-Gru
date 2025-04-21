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
    const formData = {
      data: form.data.value,
      hora: form.hora.value,
      prefixoVeiculo: form.prefixo_veiculo.value,
      placaVeiculo: form.placa_veiculo.value,
      kmVeiculo: form.km_veiculo.value,
      litragemDiesel: form.litragen_diesel.value,
      contadorBomba: form.contador_bomba.value,
      contadorInicial: form.contador_inicial.value,
      arla: form.arla.value,
      passouCartao: form.querySelector('input[name="passou_cartao"]:checked')?.value || '',
      abastecedor: form.abastecedor.value
    };
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbwB1-GIbEcakB8o3Ri5d6N3Y1MzPn7ptrq-ug6v0UlivGcMETwZxT9KEZp2PCasH1HScw/exec', {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Limpa o formulário e mostra mensagem de sucesso
    form.reset();
    alert('Registro enviado com sucesso!');
    
    // Esconde os campos secundários
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