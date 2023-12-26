import fs from 'fs/promises'
import path from 'path'

export default async function handleFileSave(file) {
    const { name, size, type, lastModified } = file

    // Obtenha o buffer do conteúdo do arquivo
    const fileBuffer = await file.arrayBuffer()

    // Converta ArrayBuffer para Buffer
    const bufferData = Buffer.from(fileBuffer)

    const extension = name.split('.')[1]
    const fileName = `${Date.now()}.${extension}`
    const filePath = path.join(process.cwd(), `public/${fileName}`)

    await fs.writeFile(filePath, bufferData)

    return '/' + fileName
}
