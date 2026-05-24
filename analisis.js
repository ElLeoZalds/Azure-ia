const suscriptionKey = ""
const endpoint = ""

// Descripción detallada de la imagen
const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Description,Tags,Objects`
const imageURL = "https://www.mindicsalud.com/sites/default/files/styles/blog_full/public/ninos-pelota.jpg"

async function analizarContenido() {
    try {
        console.log("Analizando imagen...")

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": suscriptionKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: imageURL })
        })

        if (!response.ok) {
            const errorData = await response.error
            throw new Error(errorData.error.message)
        }

        const data = await response.json()
        // console.log(data) // <== GUARDAR COMO MANUAL DE REFERENCIA

        // Etiquetas, descripción y objetos
        // Mostrar la descripción de la imágen
        const descripcion = data.description.captions[0].text
        const confianza = (data.description.captions[0].confidence * 100).toFixed(2)
        console.log(`Resumen: ${descripcion} - Confianza: ${confianza} %`)

        // Etiquetas
        const listaEtiquetas = data.tags.map(fila => `${fila.name} - ${(fila.confidence * 100).toFixed(2)} %`)
        // console.log(`Etiquetas detectadas: ${listaEtiquetas.join(', ')}`)
        listaEtiquetas.forEach(element => {
            console.log(`  ${element} `)
        });

        // Ubicación de objetos
        console.log("Ubicación de objetos")

        data.objects.forEach(element => {
            // element.rectangle.h (alto), element.rectangle.w (ancho), element.rectangle.x (posición x), element.rectangle.y (posición y)
            console.log(`  ${element.object} - x: ${element.rectangle.x} - y: ${element.rectangle.y}`)
        })


    } catch (error) {
        console.error(error.message)
    }
}

analizarContenido()