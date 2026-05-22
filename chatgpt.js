// Configuración
const AZURE_ENDPOINT = ``
const DEPLOYMENT_NAME = ``
const API_KEY = ``
const API_VERSION = ``

async function preguntarAzure(pregunta = ``, historial = []) {

    // EndPoint Final
    const url = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`

    // Objeto conteniendo información de BODY
    const body = {
        messages: [
            { role: "system", content: "Eres un sistente útil" },
            ...historial,
            { role: "user", content: pregunta },
        ],
        max_completion_tokens: 800,
        temperature: 0.7,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'api-key': API_KEY
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        console.error('No se accedió al servicio')
        return;
    }

    const data = await response.json()
    const mensaje = data.choices[0].message

    // Esta función devolverá un objeto
    return {
        respuesta: mensaje.content,
        tokens_usados: data.usage.total_tokens,
        nuevo_historial: [...historial, { role: 'user', content: pregunta }, mensaje]
    }

}

// Prepara el BATCH (lote) de preguntas que estarán relacionadas
async function test() {
    let historial = []

    // P1 - ¿Quién es Goku?
    console.log('--- Pregunta 1 ---')
    let r1 = await preguntarAzure('¿Quién es Goku? dame una respuesta corta')
    console.log(r1.respuesta)
    historial = r1.nuevo_historial

    // P2 - ¿Y Cómo se llaman sus hijos?
    console.log('\n --- Pregunta 2 ---')
    let r2 = await preguntarAzure('¿Y cómo se llaman sus hijos?', historial)
    console.log(r2.respuesta)
    historial = r2.nuevo_historial

    // P3 - ¿Y quién es el más poderoso?
    console.log('\n --- Pregunta 3 ---')
    let r3 = await preguntarAzure('¿Y quién de los dos es el más fuerte?', historial)
    console.log(r3.respuesta)
    historial = r3.nuevo_historial

    // FIN...
    console.log(`\n --- Tokens utilizados: ${r3.tokens_usados}`)
}


test()