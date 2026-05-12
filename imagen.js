// La URL describe las funcionalidades que deseamos aprovechar
const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Categories,Description,Color`

// Imagen que analizaremos
const imageURL = "https://static.vecteezy.com/system/resources/thumbnails/079/131/527/small/thinking-woman-and-relax-with-coffee-at-house-for-peace-daydreaming-and-calm-morning-smile-female-person-and-caffeine-beverage-with-reflection-nostalgia-memory-and-perspective-for-weekend-break-photo.jpg"

// Esta funcionalidad requiere ejecutarse como promesa
async function analizarImagen() {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": suscriptionKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: imageURL })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Error en: ${errorData.error.message}`)
        }

        // Logramos recibir un resultado favorable
        const data = await response.json()
        const confianza = (data.description.captions[0].confidence * 100).toFixed(2)

        // Muestra todos los datos
        // console.log(data.description)
        console.log("Descripción: ", data.description.captions[0].text)
        console.log("Etiquetas: ", data.description.tags.join(", "))

        // join método que itera y concatena valores de un array
        console.log(`Confianza: ${confianza} %`)
        // console.log(data.description)

    } catch (error) {
        console.error(`Error analizando imagen: ${error.message}`)
    }
}

analizarImagen()