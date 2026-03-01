// --------------------------------------------------
// Interacciones principales: mostrar formulario y validar envío
// --------------------------------------------------

const startBtn = document.getElementById('startBtn');
const formSection = document.getElementById('formSection');
const diagnosticForm = document.getElementById('diagnosticForm');
const successMessage = document.getElementById('successMessage');
const diagnosticInsight = document.getElementById('diagnosticInsight');
const internalScoresField = document.getElementById('internalScores');
const groupedPayloadField = document.getElementById('groupedPayload');

// Muestra el formulario con animación y desplazamiento suave.
startBtn.addEventListener('click', () => {
  formSection.classList.add('visible');
  formSection.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
});

// Limpia estado de error cuando el usuario corrige campos.
diagnosticForm.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('invalid')) {
    target.classList.remove('invalid');
  }
});

// Obtiene valor normalizado de un campo del formulario.
const getValue = (formData, key) => (formData.get(key) || '').toString().trim();

// Clasificación general de cliente según reglas internas de negocio.
function calculateGeneralClassification(formData) {
  let score = 0;

  if (getValue(formData, 'urgencia') === 'alta') score += 3;
  if (getValue(formData, 'invertirAds') === 'Sí') score += 3;

  const usesCrm = getValue(formData, 'gestionContactos') === 'CRM' || getValue(formData, 'gestionLeads') === 'Uso CRM';
  if (!usesCrm) score += 2;

  const noConversionTracking =
    getValue(formData, 'medicionResultados') !== 'Analizo conversiones' &&
    getValue(formData, 'tasaConversion') !== 'Sí';
  if (noConversionTracking) score += 2;

  const commitment = Number(getValue(formData, 'nivelCompromiso'));
  if (commitment >= 8) score += 3;

  let segment = 'Cliente mantenimiento';
  if (score >= 11) {
    segment = 'Cliente listo para servicio premium consultivo';
  } else if (score >= 6) {
    segment = 'Cliente expansión';
  }

  return { score, segment };
}

// Calcula necesidad de Sistema de Embudos.
function calculateFunnelScore(formData) {
  let score = 0;
  if (getValue(formData, 'rutaCompra') === 'No') score += 3;

  const conversionRate = getValue(formData, 'tasaConversion');
  if (conversionRate === 'No' || conversionRate === 'Nunca la he medido') score += 2;

  if (getValue(formData, 'conversionSeguidores') === 'Solo publico contenido') score += 2;

  return score;
}

// Calcula necesidad de Dirección Comercial.
function calculateSalesDirectionScore(formData) {
  let score = 0;
  if (getValue(formData, 'seguimientoContacto') === 'No') score += 3;
  if (getValue(formData, 'leadsPerdidos') === 'Muchos') score += 2;

  const closingProcess = getValue(formData, 'procesoCierreEquipo');
  if (closingProcess === 'No tengo equipo' || closingProcess === 'Más o menos') score += 2;

  return score;
}

// Calcula necesidad de Automatización.
function calculateAutomationScore(formData) {
  let score = 0;

  const contactManagement = getValue(formData, 'gestionContactos');
  if (contactManagement === 'Manualmente' || contactManagement === 'No llevo control') score += 3;
  if (contactManagement !== 'CRM') score += 2;

  const repetitiveTime = getValue(formData, 'tiempoRespuestaRepetida');
  if (repetitiveTime === 'Mucho') score += 1;
  if (repetitiveTime === 'Demasiado') score += 2;

  return score;
}

// Construye recomendaciones estratégicas según puntajes internos.
function buildRecommendations(scores) {
  const recommendations = [];
  if (scores.embudo > 5) recommendations.push('Recomendar Sistema de Embudos');
  if (scores.direccionComercial > 5) recommendations.push('Recomendar Dirección Comercial');
  if (scores.automatizacion > 5) recommendations.push('Recomendar Automatización');

  const areasAboveThreshold = [scores.embudo, scores.direccionComercial, scores.automatizacion].filter((value) => value > 5).length;
  if (areasAboveThreshold >= 2) recommendations.push('Recomendar Plan Integral');

  return recommendations;
}

// Crea mensaje visible para el cliente según brechas detectadas.
function buildClientInsight(scores) {
  const detectedAreas = [scores.embudo > 5, scores.direccionComercial > 5, scores.automatizacion > 5].filter(Boolean).length;

  if (detectedAreas >= 2) {
    return 'Detectamos varias áreas de crecimiento. Te propondremos un plan integral estratégico.';
  }

  if (scores.embudo > 5) {
    return 'Detectamos oportunidades claras en tu sistema de conversión. Te contactaremos para estructurar un embudo estratégico adaptado a tu negocio.';
  }

  if (scores.direccionComercial > 5) {
    return 'Tu principal brecha está en estructura comercial. Podemos ayudarte a organizar y optimizar tu proceso de cierre.';
  }

  if (scores.automatizacion > 5) {
    return 'Hay una oportunidad fuerte en automatizar procesos para escalar sin aumentar carga operativa.';
  }

  return 'Tu diagnóstico muestra una base sólida. Te compartiremos próximos ajustes para sostener y acelerar tu crecimiento.';
}

// Organiza respuestas en grupos para lectura en email / CRM / Google Sheets.
function buildGroupedPayload(formData, internalAssessment) {
  return {
    '📌 Visión': {
      meta12: getValue(formData, 'meta12'),
      facturacionDeseada: getValue(formData, 'facturacionDeseada'),
      ticketPromedio: getValue(formData, 'ticketPromedio'),
      clientesMes: getValue(formData, 'clientesMes'),
      objetivoPrincipal: getValue(formData, 'objetivoPrincipal'),
      urgencia: getValue(formData, 'urgencia'),
      resultado90: getValue(formData, 'resultado90')
    },
    '📌 Ventas': {
      llegadaClientes: getValue(formData, 'llegadaClientes'),
      pasoAPasoVenta: getValue(formData, 'pasoAPasoVenta'),
      quienCierra: getValue(formData, 'quienCierra'),
      objeciones: getValue(formData, 'objeciones'),
      tiempoCierre: getValue(formData, 'tiempoCierre'),
      rutaCompra: getValue(formData, 'rutaCompra'),
      tasaConversion: getValue(formData, 'tasaConversion'),
      seguimientoContacto: getValue(formData, 'seguimientoContacto')
    },
    '📌 Operación': {
      gestionLeads: getValue(formData, 'gestionLeads'),
      medicionResultados: getValue(formData, 'medicionResultados'),
      friccionMarketing: getValue(formData, 'friccionMarketing'),
      gestionContactos: getValue(formData, 'gestionContactos'),
      automatizacionesActivas: getValue(formData, 'automatizacionesActivas'),
      tiempoRespuestaRepetida: getValue(formData, 'tiempoRespuestaRepetida'),
      leadsPerdidos: getValue(formData, 'leadsPerdidos')
    },
    '📌 Oportunidades': {
      valorBiem: getValue(formData, 'valorBiem'),
      elevarConBiem: getValue(formData, 'elevarConBiem'),
      metaNoTrabajada: getValue(formData, 'metaNoTrabajada'),
      mejorasConBiem: getValue(formData, 'mejorasConBiem'),
      noExplotado: getValue(formData, 'noExplotado'),
      oportunidadesNoTrabajadas: getValue(formData, 'oportunidadesNoTrabajadas'),
      recomendacionesInternas: internalAssessment.recommendations
    },
    '📌 Ambición': {
      alineacionMarketing: getValue(formData, 'alineacionMarketing'),
      estructuraEscalar: getValue(formData, 'estructuraEscalar'),
      impedimentoCrecimiento: getValue(formData, 'impedimentoCrecimiento'),
      escenarioSinCambios: getValue(formData, 'escenarioSinCambios'),
      grabarContenido: getValue(formData, 'grabarContenido'),
      invertirAds: getValue(formData, 'invertirAds'),
      nivelCompromiso: getValue(formData, 'nivelCompromiso'),
      clasificacionGeneral: internalAssessment.generalSegment
    }
  };
}

// Validación básica de campos obligatorios + cálculo de puntuación interna.
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

  const formData = new FormData(diagnosticForm);

  // Cálculo interno no visible para cliente (listo para enviarse al backend).
  const general = calculateGeneralClassification(formData);
  const embudo = calculateFunnelScore(formData);
  const direccionComercial = calculateSalesDirectionScore(formData);
  const automatizacion = calculateAutomationScore(formData);

  const scoringSummary = { embudo, direccionComercial, automatizacion };

  const internalAssessment = {
    generalScore: general.score,
    generalSegment: general.segment,
    ...scoringSummary,
    recommendations: buildRecommendations(scoringSummary)
  };

  // Payload interno para backend.
  internalScoresField.value = JSON.stringify(internalAssessment);

  // Payload agrupado para lectura rápida (email, CRM o Google Sheet).
  groupedPayloadField.value = JSON.stringify(buildGroupedPayload(formData, internalAssessment));

  // Mensaje dinámico para cliente según brechas detectadas.
  diagnosticInsight.textContent = buildClientInsight(scoringSummary);

  // Referencia técnica temporal para debugging/QA local.
  window.lastDiagnosticScore = internalAssessment;
  window.lastGroupedPayload = JSON.parse(groupedPayloadField.value);

  // Simulación de envío exitoso en entorno estático.
  diagnosticForm.reset();
  successMessage.classList.add('show');
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
