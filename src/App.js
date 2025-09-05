import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable"; // 🔥 adicionado

const pilotsSample = [
  {
    id: 1,
    name: "Pastrano, Vander",
    number: 12,
    category: "Júnior",
    country: "Venezuela",
    flag: "🇻🇪",
    countryCode: "ve",
    bio: "Prodígio da equipe. Mesmo sem correr todas as etapas de 2024, brilhou nas provas em que participou e conquistou uma vitória marcante.",
    photo: "/images/vander.png",
    achievements: ["Piloto Prodígio"]
  },
  {
    id: 2,
    name: "Bressiani, Bruno",
    number: 7,
    category: "Sênior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Figura constante no pelotão da frente, já protagonizou algumas das disputas mais emocionantes do grid, tornando-se referência em velocidade.",
    photo: "/images/bruno.png",
    achievements: ["3º Lugar 2024"]
  },
  {
    id: 3,
    name: "De Souza, Isaque",
    number: 21,
    category: "Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Vice-campeão em 2024, se destaca pelas ultrapassagens agressivas e ritmo constante. Especialista em corridas na chuva, onde demonstra controle e confiança impressionantes.",
    photo: "/images/isaque.png",
    achievements: ["Vice-campeão 2024"]
  },
  {
    id: 4,
    name: "Bruno, Giovani",
    number: 9,
    category: "Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Campeão da temporada 2024, mostrou consistência e velocidade em todas as etapas, consolidando-se como referência da equipe.",
    photo: "/images/giovani.png",
    achievements: ["Campeão 2024"]
  },
  {
    id: 5,
    name: "Felipe, Luiz",
    number: 15,
    category: "Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Entrou no meio da temporada passada e rapidamente se destacou. Seu estilo arrojado e capacidade de adaptação chamam atenção.",
    photo: "/images/luiz.png",
    achievements: ["Melhor Estreante 2024"]
  },
  {
    id: 6,
    name: "Fernandes, Isaac",
    number: 33,
    category: "Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Mostrou grande evolução ao longo de 2024 e chega cada vez mais competitivo. Determinado, não desiste facilmente em pista.",
    photo: "/images/isaac.png",
    achievements: ["Piloto Revelação 2024"]
  },
  {
    id: 7,
    name: "Tiago",
    number: 99,
    category: "Rookie",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Estreante em 2025, chega cheio de motivação e dedicação. Promete aprendizado rápido e foco em evolução constante.",
    photo: "/images/tiago.png",
    achievements: ["Estreia 2025"]
  }
];




const calendarSample = [
  { 
    id: 1, 
    date: "A definir", 
    event: "Etapa 1 - Adrena Kart Kartódromo", 
    location: "Foz do Iguaçu" 
  },
  { 
    id: 2, 
    date: "A definir", 
    event: "Etapa 2 - Adrena Kart Kartódromo", 
    location: "Foz do Iguaçu" 
  },
  { 
    id: 3, 
    date: "A definir", 
    event: "Copa Nacional - Final", 
    location: "Foz do Iguaçu" 
  }
];


const gallerySample = [
  "/assets/gallery/1.jpg",
  "/assets/gallery/2.jpg",
  "/assets/gallery/3.jpg"
];

const newsSample = [
  { id: 1, title: "Treino intensivo antes da etapa 1", date: "2025-08-30", excerpt: "A equipe realizou sessões de acerto..." },
  { id: 2, title: "Patrocínio confirmado: FastFuel", date: "2025-07-12", excerpt: "Novo parceiro para a temporada 2025/26." }
];

function formatDateVerbose(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function daysUntil(iso) {
  const now = new Date();
  const then = new Date(iso);
  const diff = Math.max(0, then - now);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [now, setNow] = useState(new Date());
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const nextEvent = calendarSample.reduce((acc, cur) => {
    return new Date(cur.date) > new Date() && (!acc || new Date(cur.date) < new Date(acc.date)) ? cur : acc;
  }, null);

  const next = () => {
    setCurrent((prevIndex) => (prevIndex + 1) % pilotsSample.length);
  };

  const prev = () => {
    setCurrent((prevIndex) =>
      (prevIndex - 1 + pilotsSample.length) % pilotsSample.length
    );
  };

  const duplicatedPilots = [...pilotsSample, ...pilotsSample];


  // 🔥 Suporte a swipe
  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-sans overflow-x-hidden max-w-[100vw]">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-6 text-white font-medium text-sm sm:text-base md:text-lg">
            <a href="#home" className="hover:text-red-500 transition">Home</a>
            <a href="#pilots" className="hover:text-red-500 transition">Equipe</a>
            <a href="#agenda" className="hover:text-red-500 transition">Agenda</a>
            <a href="#gallery" className="hover:text-red-500 transition">Galeria</a>
            <a href="#news" className="hover:text-red-500 transition">Notícias</a>
            <a href="#contact" className="hover:text-red-500 transition">Contato</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative h-[90vh] md:h-screen flex items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/kongspeed-banner.png')" }}
      >
        <div className="relative z-10 text-center text-white p-4 pb-12 md:pb-20">
          <p className="text-lg md:text-2xl mb-4">Velocidade, Força e Paixão pelas pistas</p>
          <a
            href="#pilots"
            className="inline-block px-5 py-2 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 rounded-full text-base md:text-lg font-semibold transition"
          >
            Conheça os Pilotos
          </a>
        </div>
      </section>

      {/* PILOTS - Carrossel estilo videogame */}
      <section id="pilots" className="max-w-7xl mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-center">Pilotos</h3>
        <p className="text-gray-300 mt-1 text-center">Conheça o time que faz a KongSpeed acelerar.</p>

        <div className="relative mt-6 flex items-center justify-center" {...handlers}>
          {/* Botão anterior */}
          <button
            onClick={prev}
            className="absolute left-0 z-40 bg-black/50 p-2 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>

          {/* Carrossel */}
          <div className="relative flex justify-center items-center min-h-[600px]">

            {[-1, 0, 1].map((offset) => {
              const index = (current + offset + pilotsSample.length) % pilotsSample.length;
              const p = pilotsSample[index];
              const isActive = offset === 0;

              const scale = isActive ? 1.1 : 0.75; // principal maior
              const opacity = isActive ? 1 : 0.5;
              const translateY = isActive ? 0 : 30;
              const xOffset = offset * 160; // vizinhos próximos

              return (
                <motion.div
                  key={p.id}
                  animate={{
                    scale,
                    opacity,
                    y: translateY,
                    x: isActive ? "-50%" : `calc(-50% + ${xOffset}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                  className={`absolute left-1/2 ${isActive ? "z-20" : "z-10"}`}
                >
                  <div
                    className={`${isActive ? "w-[340px]" : "w-[220px]"} relative`}
                  >
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-auto object-cover rounded-xl shadow-xl"
                    />

                    {/* Card de informações só no principal, com z mais alto */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 text-white p-4 rounded-b-xl">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">{p.name}</h4>

                          {/* Bandeira + País */}
                          <div className="flex items-center gap-1 text-sm">
                            <span>{p.country}</span>
                            <img
                              src={`https://flagcdn.com/w20/${p.countryCode}.png`}
                              alt={p.country}
                              className="w-5 h-4 object-cover rounded-sm shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Troquei categoria/número por Achievements */}
                        <p className="text-sm text-yellow-400 font-semibold mt-1">
                          🏆 {p.achievements}
                        </p>

                        <p className="text-xs text-gray-200 mt-1 italic">{p.bio}</p>
                      </div>
                    )}



                  </div>
                </motion.div>

              );
            })}
          </div>

          {/* Botão próximo */}
          <button
            onClick={next}
            className="absolute right-0 z-40 bg-black/50 p-2 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        </div>
      </section>

      {/* AGENDA */}
{/* AGENDA */}
<section id="agenda" className="relative bg-gradient-to-b from-black via-gray-900/80 to-transparent py-12">
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <h3 className="text-3xl md:text-4xl font-bold text-white">📅 Agenda</h3>
    <p className="text-gray-400 mt-1">Calendário oficial de corridas e eventos da Kong Speed.</p>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Próximos eventos */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-lg border border-gray-800 relative overflow-hidden">
        <h4 className="font-semibold text-xl text-white flex items-center gap-2">
          🏁 Próximos eventos
        </h4>

  {/* Banner da pista entre o título e a lista */}
  <div className="relative mt-3 mb-4 rounded-lg overflow-hidden">
    <img
      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/7f/78/8e/pista-ao-ar-livre-com.jpg?w=1200&h=1200&s=1"
      alt="Pista de Foz do Iguaçu"
      className="w-full h-40 object-cover opacity-70"
    />
    {/* Gradiente mais forte para não brigar com o texto */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
  </div>
        <ul className="mt-5 space-y-4 relative z-10">
          {calendarSample.map((ev) => {
            const isDefined = ev.date !== "A definir";
            return (
              <li
                key={ev.id}
                className="flex items-center justify-between bg-gray-800/40 hover:bg-gray-800/60 transition rounded-lg p-4"
              >
                <div>
                  <div className="font-semibold text-white">{ev.event}</div>
                  <div className="text-sm text-gray-400">
                    {isDefined ? formatDateVerbose(ev.date) : "Data a definir"} • {ev.location}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-300 font-medium">
                    {isDefined ? `${daysUntil(ev.date)} dias` : "Em breve"}
                  </div>
                  {isDefined && (
                    <a
                      className="text-xs mt-1 underline text-blue-400 hover:text-blue-300"
                      href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        ev.event
                      )}&dates=${ev.date.replace(/-/g, "")}/${ev.date.replace(
                        /-/g,
                        ""
                      )}&details=${encodeURIComponent(
                        ev.event
                      )}&location=${encodeURIComponent(ev.location)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Adicionar
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

      </div>

      

      {/* Contagem regressiva */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-lg border border-gray-800">
        <h4 className="font-semibold text-xl text-white flex items-center gap-2">
          ⏳ Contagem regressiva
        </h4>
        <div className="mt-6 text-gray-300">
          {nextEvent ? (
            <div className="text-center">
              <div className="text-sm uppercase tracking-wide">Próxima corrida</div>
              <div className="font-bold text-2xl text-yellow-400">{nextEvent.event}</div>
              <div className="mt-2 text-gray-400">
                {nextEvent.date !== "A definir" ? formatDateVerbose(nextEvent.date) : "Data a definir"}
              </div>
              <div className="mt-4 text-4xl font-extrabold text-green-400">
                {nextEvent.date !== "A definir" ? `${daysUntil(nextEvent.date)} dias` : "Em breve"}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Nenhum evento agendado.</div>
          )}
        </div>
      </div>
    </div>
  </div>
</section>



      {/* GALLERY */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold">Galeria</h3>
        <p className="text-gray-300 mt-2">Fotos e vídeos épicos da equipe.</p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallerySample.map((src, i) => (
            <button key={i} onClick={() => setLightbox({ open: true, index: i })} className="overflow-hidden rounded-lg">
              <img src={src} alt={`gallery-${i}`} className="w-full h-40 object-cover transform hover:scale-105 transition" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <button className="absolute top-6 right-6 text-gray-300" onClick={() => setLightbox({ open: false, index: 0 })}>Fechar</button>
            <img src={gallerySample[lightbox.index]} alt="" className="max-w-4xl max-h-[80vh] object-contain" />
          </div>
        )}
      </section>

      {/* NEWS */}
      <section id="news" className="py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold">Notícias</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {newsSample.map((n) => (
              <article key={n.id} className="p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400">{formatDateVerbose(n.date)}</div>
                <h4 className="mt-2 font-bold">{n.title}</h4>
                <p className="mt-2 text-gray-300 text-sm">{n.excerpt}</p>
                <a className="mt-4 inline-block text-red-500 underline text-sm" href="#">Leia mais</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / SPONSORS */}
      <footer id="contact" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="font-bold text-2xl">Patrocínios & Parcerias</h4>
            <p className="mt-2 text-gray-300">Interessado em apoiar a Kong Speed? Envie uma proposta ou solicite o nosso kit de mídia.</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              {/* Placeholder sponsor logos */}
              <div className="px-3 py-2 bg-white/5 rounded">FastFuel</div>
              <div className="px-3 py-2 bg-white/5 rounded">GripTech</div>
              <div className="px-3 py-2 bg-white/5 rounded">ProTires</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg">
            <h4 className="font-bold">Contato</h4>
            <form className="mt-4 grid gap-3">
              <input className="bg-black/20 rounded px-3 py-2 text-white" placeholder="Nome" />
              <input className="bg-black/20 rounded px-3 py-2 text-white" placeholder="Email" />
              <textarea className="bg-black/20 rounded px-3 py-2 text-white" placeholder="Mensagem" rows={4}></textarea>
              <div className="flex items-center justify-between">
                <button type="button" className="bg-red-600 px-4 py-2 rounded font-semibold">Enviar</button>
                <div className="text-xs text-gray-400">Ou mande mensagem via Instagram</div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">© {new Date().getFullYear()} Kong Speed — Todos os direitos reservados</div>
      </footer>
    </div>
  );
}
