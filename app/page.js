import {
    Nav,
    Hero,
    Parceiros,
    Whatsapp,
    Departamentos,
    Servicos,
    Depoimentos,
    DepoimentosMobile,
    Footer,
} from './Components'

import { dbConnect } from './utils/dbConnect'

await dbConnect()

export default function Home() {
    return (
        <main className="">
            <Nav />
            <Hero />
            <Departamentos />
            <Servicos />
            <Depoimentos />
            <DepoimentosMobile />
            <Whatsapp />
            <Footer />
        </main>
    )
}
