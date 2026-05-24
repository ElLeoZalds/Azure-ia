const suscriptionKey = ""
const endpoint = ""

// const url = `${endpoint}/language/:query-knowledgebases?projectName=PruebaQA&api-version=2021-10-01`
const url = `${endpoint}/language/:query-text?api-version=2021-10-01`

async function responderPreguntas() {
    try {
        const contextoAnalizar =
            `La GPU se encarga de procesar y renderizar imagenes, video y animaciones para mostrarlas en pantalla. Tambien es el componente que corre los modelos de inteligencia artificial locales en las nuevas laptops con capacidades de IA. Existen dos tipos: integrada y dedicada. La GPU integrada comparte recursos con el procesador. No tiene su propia memoria de video (VRAM), sino que usa una parte de la RAM del sistema. Es suficiente para trabajo de oficina, videoconferencias, streaming y diseño gráfico básico. Los procesadores Intel Core de generaciones recientes y los AMD Ryzen con gráficos Radeon incluyen GPU integradas capaces. La GPU dedicada tiene su propio chip y su propia memoria VRAM, separada de la RAM principal. Para gaming, edición de video, modelado 3D o renderizado, la diferencia es fundamental: una GPU dedicada puede completar en segundos tareas que a una integrada le tomarían minutos.`

        const pregunta = `¿Cuántos tipos de GPU existen?`

        // Versión compacta de la petición de los servicios de Azure
        const cuerpoPeticion = {
            question: pregunta,
            records: [{
                id: "doc_01",
                text: contextoAnalizar
            }]
        }

        // const cuerpoPeticion = {
        //     kind: 'Conversation',
        //     analysisInput: {
        //         conversationItem: {
        //             id = "1",
        //             participantId: "usuario_final",
        //             text: pregunta
        //         }
        //     },

        //     parameters: {
        //         projectName: 'PruebaQA',
        //         deploymentName: 'production',
        //         stringIndexType: 'Utf16CodeUnit',
        //         records: [{
        //             id: "contexto_01",
        //             text: contextoAnalizar
        //         }]
        //     }
        // }

        console.log('Buscando respuestas en el documento...')

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Ocp-Apim-Subscription-Key": suscriptionKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cuerpoPeticion)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error.message)
        }

        const data = await response.json();
        // console.log(data)
        const respuesta = data.answers[0].answer
        const confianza = (data.answers[0].confidenceScore * 100).toFixed(2)

        console.log(`Respuesta: ${respuesta} | Confianza: ${confianza}`)

    } catch (error) {
        console.error(error.message)
    }
}

responderPreguntas()