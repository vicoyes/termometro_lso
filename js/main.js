// Datos de la aplicación
const app = {
    currentQuestion: 0,
    answers: {},
    
    questions: [
        {
            id: 'intro',
            text: '¡Hola! Vamos a analizar tus finanzas. Sé sincero, la IA solo puede ayudarte si los datos son reales.',
            options: [
                { text: 'Entendido, vamos a empezar', value: 'start' }
            ]
        },
        {
            id: 'situacion_laboral',
            text: '¿Cuál es tu situación laboral actual?',
            options: [
                { text: 'Empleado con contrato fijo', value: 'empleado' },
                { text: 'Autónomo / Dueño de negocio', value: 'autonomo' },
                { text: 'Desempleado o ingresos irregulares', value: 'desempleado' }
            ]
        },
        {
            id: 'balance_financiero',
            text: 'Si comparamos tus Ingresos vs. Gastos mensuales, tú estás:',
            options: [
                { text: 'En superávit (Me sobra dinero a fin de mes)', value: 'superavit' },
                { text: 'Al día (Llego justo, pero pago todo)', value: 'equilibrio' },
                { text: 'En déficit (Gasto más de lo que gano / uso tarjetas para vivir)', value: 'deficit' }
            ]
        },
        {
            id: 'total_deudas',
            text: '¿A cuánto asciende aproximadamente el total de tus deudas? (Sin contar hipoteca de vivienda habitual)',
            options: [
                { text: 'Menos de 5.000 €', value: 'bajo' },
                { text: 'Entre 5.000 € y 15.000 €', value: 'medio' },
                { text: 'Más de 15.000 €', value: 'alto' }
            ]
        },
        {
            id: 'ratio_endeudamiento',
            text: '¿Qué porcentaje de tus ingresos destinas a pagar cuotas de préstamos o tarjetas?',
            options: [
                { text: 'Menos del 20% (Saludable)', value: 'bajo' },
                { text: 'Entre el 30% y 50% (Estrés moderado)', value: 'medio' },
                { text: 'Más del 50% (Situación crítica)', value: 'alto' }
            ]
        },
        {
            id: 'impagos',
            text: '¿En los últimos 6 meses, has tenido algún impago o retraso en tus cuotas?',
            options: [
                { text: 'No, pago todo religiosamente', value: 'no' },
                { text: 'Sí, alguna vez me he retrasado días', value: 'ocasional' },
                { text: 'Sí, actualmente tengo cuotas vencidas o estoy en ficheros de morosidad', value: 'si' }
            ]
        },
        {
            id: 'activos',
            text: '¿Tienes activos (casa, coche) que temes perder si la situación empeora?',
            options: [
                { text: 'No tengo activos importantes a mi nombre', value: 'no' },
                { text: 'Sí, y protegerlos es mi prioridad número uno', value: 'si_prioridad' },
                { text: 'Sí, pero no creo que estén en riesgo', value: 'si_tranquilo' }
            ]
        },
        {
            id: 'conocimiento_salida',
            text: 'Sinceramente, ¿sabes cómo salir de tus deudas por ti mismo?',
            options: [
                { text: 'Sí, tengo un plan claro y lo estoy ejecutando', value: 'si' },
                { text: 'Lo intento, pero los intereses se comen mis pagos', value: 'dificil' },
                { text: 'No, me siento atrapado y sin salida', value: 'no' }
            ]
        },
        {
            id: 'prioridad',
            text: 'Para mejorar tu situación, ¿qué consideras más urgente ahora mismo?',
            options: [
                { text: 'Necesito que me cancelen/reduzcan la deuda (No puedo pagar)', value: 'legal' },
                { text: 'Necesito ganar más dinero extra aparte de mi trabajo', value: 'negocio' },
                { text: 'Ambas cosas por igual', value: 'ambas' }
            ]
        },
        {
            id: 'tiempo_disponible',
            text: 'Si existiera un método probado para generar ingresos extra, ¿cuánto tiempo podrías dedicarle a la semana?',
            options: [
                { text: 'No tengo tiempo', value: 'no' },
                { text: 'De 5 a 10 horas semanales', value: 'medio' },
                { text: 'Lo que haga falta si el resultado vale la pena', value: 'alto' }
            ]
        },
        {
            id: 'compromiso',
            text: 'Del 1 al 10, ¿cuál es tu nivel de compromiso para solucionar tu situación financiera HOY si te damos el paso a paso?',
            options: [
                { text: '1-4 (Solo curiosidad)', value: 'bajo' },
                { text: '5-8 (Tengo interés real)', value: 'medio' },
                { text: '9-10 (Urgencia total / Listo para actuar)', value: 'alto' }
            ]
        }
    ],

    // Iniciar aplicación
    init() {
        console.log('App financiera iniciada');
    },

    // Cambiar vista
    showView(viewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    },

    // Iniciar quiz
    startQuiz() {
        this.currentQuestion = 0;
        this.answers = {};
        this.showView('quiz-view');
        this.renderQuestion();
    },

    // Renderizar pregunta
    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('question-number').textContent = 
            `Pregunta ${this.currentQuestion + 1} de ${this.questions.length}`;
        document.getElementById('question-text').textContent = question.text;
        
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.onclick = () => this.selectOption(question.id, option.value);
            optionsContainer.appendChild(button);
        });

        // Mostrar/ocultar botón anterior
        const backBtn = document.getElementById('btn-back');
        backBtn.style.display = this.currentQuestion > 0 ? 'block' : 'none';
    },

    // Seleccionar opción
    selectOption(questionId, value) {
        this.answers[questionId] = value;
        
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else {
            this.analyzeResults();
        }
    },

    // Pregunta anterior
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
    },

    // Analizar resultados
    analyzeResults() {
        this.showView('loading-view');
        
        const messages = [
            'Conectando con Gemini 3...',
            'Analizando ratio de endeudamiento...',
            'Evaluando capacidad de pago...',
            'Calculando viabilidad legal...',
            'Identificando oportunidades de negocio...',
            'Generando reporte personalizado...'
        ];

        let index = 0;
        const messageElement = document.getElementById('loading-message');
        
        const interval = setInterval(() => {
            messageElement.textContent = messages[index];
            index++;
            if (index >= messages.length) {
                clearInterval(interval);
                // Mostrar el gate en lugar de los resultados directamente
                setTimeout(() => this.showGate(), 500);
            }
        }, 600);
    },

    // Mostrar pantalla de captura (The Gate)
    showGate() {
        this.showView('gate-view');
    },

    // Enviar formulario
    submitForm(event) {
        event.preventDefault();
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value,
            timestamp: new Date().toISOString(),
            answers: this.answers
        };
        
        // Guardar datos (en producción, enviar a backend/API)
        console.log('Lead capturado:', formData);
        localStorage.setItem('leadData', JSON.stringify(formData));
        
        // Mostrar resultados
        this.showResults();
    },

    // Mostrar resultados
    showResults() {
        const profile = this.calculateProfile();
        const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
        const nombre = leadData.nombre || 'Usuario';
        
        this.showView('result-view');
        
        const resultCard = document.getElementById('result-card');
        const resultHeader = document.getElementById('result-header');
        const resultContent = document.getElementById('result-content');
        const resultCTA = document.getElementById('result-cta');

        if (profile === 'LEGAL') {
            // Perfil CRÍTICO - Segunda Oportunidad
            resultHeader.className = 'result-header critical';
            resultHeader.innerHTML = `
                <div class="result-status critical">🔴 ESTADO: CRÍTICO</div>
                <div style="font-size: 1.1rem; color: #991b1b;">INSOLVENCIA DETECTADA</div>
            `;
            
            resultContent.innerHTML = `
                <div class="result-section">
                    <h3>📊 Análisis de la IA</h3>
                    <p>Hola <strong>${nombre}</strong>. He procesado tus datos financieros. Tu ratio de endeudamiento y situación de pagos indica que estás en una situación <strong>matemáticamente insostenible</strong>.</p>
                    <p>Los intereses compuestos están generando un efecto bola de nieve que hace imposible salir de la deuda solo con pagos mínimos.</p>
                </div>

                <div class="result-highlight">
                    <h3>⚖️ Tu Oportunidad Legal</h3>
                    <p><strong>Cumples con el perfil para la Ley de Segunda Oportunidad.</strong></p>
                    <p>Podrías cancelar legalmente hasta el <strong>100% de tus deudas</strong> y proteger tus activos mediante un proceso legal supervisado.</p>
                </div>

                <div class="result-section">
                    <h3>✅ Próximos Pasos Recomendados</h3>
                    <p>1. Consulta gratuita con un abogado especializado<br>
                    2. Evaluación detallada de tu caso específico<br>
                    3. Inicio del proceso legal si procede</p>
                </div>
            `;
            
            resultCTA.textContent = '📞 HABLAR CON UN ABOGADO AHORA';
            resultCTA.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
        } else {
            // Perfil CRECIMIENTO - Oportunidad de Negocio
            resultHeader.className = 'result-header growth';
            resultHeader.innerHTML = `
                <div class="result-status growth">🟢 ESTADO: CAPACIDAD DE CRECIMIENTO</div>
                <div style="font-size: 1.1rem; color: #065f46;">FINANZAS ESTABLES / ESTANCADAS</div>
            `;
            
            resultContent.innerHTML = `
                <div class="result-section">
                    <h3>📊 Análisis de la IA</h3>
                    <p>Hola <strong>${nombre}</strong>. Tienes control sobre tus gastos y cumples con tus obligaciones financieras. Sin embargo, tus ingresos están limitados por tu situación laboral actual.</p>
                    <p><strong>No tienes un problema de deuda, tienes un problema de techo de ingresos.</strong></p>
                </div>

                <div class="result-highlight">
                    <h3>💼 Tu Oportunidad de Negocio</h3>
                    <p><strong>Eres candidato ideal para nuestro programa de Afiliados High-Ticket.</strong></p>
                    <p>Según tu perfil, tienes tiempo disponible y compromiso. Podrías generar un <strong>segundo sueldo</strong> sin dejar tu empleo actual.</p>
                </div>

                <div class="result-section">
                    <h3>✅ Próximos Pasos Recomendados</h3>
                    <p>1. Ver presentación del modelo de negocio<br>
                    2. Evaluación de tu encaje con el sistema<br>
                    3. Formación y acompañamiento personalizado</p>
                </div>
            `;
            
            resultCTA.textContent = '🎯 VER OPORTUNIDAD DE NEGOCIO';
            resultCTA.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        }
    },

    // Calcular perfil
    calculateProfile() {
        // Puntuación de urgencia legal
        let legalScore = 0;
        
        // Deuda alta (+3)
        if (this.answers.total_deudas === 'alto') legalScore += 3;
        else if (this.answers.total_deudas === 'medio') legalScore += 2;
        
        // Ratio alto (+2)
        if (this.answers.ratio_endeudamiento === 'alto') legalScore += 2;
        else if (this.answers.ratio_endeudamiento === 'medio') legalScore += 1;
        
        // Impagos (+2)
        if (this.answers.impagos === 'si') legalScore += 2;
        else if (this.answers.impagos === 'ocasional') legalScore += 1;
        
        // Déficit (+2)
        if (this.answers.balance_financiero === 'deficit') legalScore += 2;
        
        // Prioridad legal directa (+2)
        if (this.answers.prioridad === 'legal') legalScore += 2;
        else if (this.answers.prioridad === 'ambas') legalScore += 1;
        
        // No sabe salir (+1)
        if (this.answers.conocimiento_salida === 'no') legalScore += 1;
        
        // Si la puntuación legal es >= 6, es perfil LEGAL
        return legalScore >= 6 ? 'LEGAL' : 'NEGOCIO';
    },

    // Manejar CTA
    handleCTA() {
        alert('¡Gracias por tu interés! En una versión real, esto te llevaría a la página de contacto o registro.');
    },

    // Reiniciar
    restart() {
        this.currentQuestion = 0;
        this.answers = {};
        localStorage.removeItem('leadData');
        document.getElementById('lead-form').reset();
        this.showView('landing-view');
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
