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
