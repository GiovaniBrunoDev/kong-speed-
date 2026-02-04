import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable"; // 🔥 adicionado

function parseLocalDateTime(dateString) {
  return new Date(dateString);
}

function getDaysLabel(dateIso) {
  if (!dateIso || dateIso === "A definir") return "Em breve";

  const eventDate = new Date(dateIso);

  if (isNaN(eventDate.getTime())) return "Em breve";

  const now = new Date();

  const diffMs = eventDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Encerrado";
  if (diffDays === 0) return "HOJE";
  if (diffDays === 1) return "AMANHÃ";

  return `${diffDays} dias`;
}


const pilotsSample = [
  {
    id: 1,
    name: "Vander Pastrano",
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
    name: "Bruno Bressiani",
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
    name: "Isaque De Souza",
    number: 21,
    category: "Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    countryCode: "br",
    bio: "Vice-campeão em 2024, se destaca pelas ultrapassagens agressivas e ritmo constante. Destaque em corridas na chuva.",
    photo: "/images/isaque.png",
    achievements: ["Vice-campeão 2024"]
  },
  {
    id: 4,
    name: "Giovani Bruno",
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
    name: "Luiz Felipe",
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
    name: "Isaac Fernandes",
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
    name: "Tiago Leal",
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
  id: "2026-02-08",
  event: "Etapa 1 - Adrena Kart Kartódromo",
  date: "2026-02-08T17:35:00",
  location: "Adrena Kart – Foz do Iguaçu"
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
  "/assets/gallery/1.png",
  "/assets/gallery/2.png",
  "/assets/gallery/3.png",
  "/assets/gallery/4.png",
  "/assets/gallery/5.png",
  "/assets/gallery/6.png",
  "/assets/gallery/7.png",
  "/assets/gallery/8.png"
];

const newsSample = [
  {
    id: 1,
    title: "Kong Speed confirma retorno as pistas em Foz do Iguaçu",
    date: "2026-02-03",
    image: "/images/6.png",

    excerpt: [
      "Após um período afastada das competições, a Kong Speed está oficialmente de volta às pistas.",

      "O retorno acontece no dia 08/02, em uma corrida no Adrena Kart, em Foz do Iguaçu (PR). A equipe volta com foco total, ajustes feitos e muita vontade de acelerar forte já nesta primeira prova.",

      "A expectativa é de uma corrida intensa, marcando o início de uma nova fase para o time na temporada.",

      "O evento promete disputas acirradas e será um momento especial tanto para a equipe quanto para os apoiadores e fãs que acompanham a Kong Speed de perto."
    ]
  }
];



function formatEventDateSmart(iso) {
  const eventDate = new Date(iso);
  const now = new Date();

  const isSameDay =
    eventDate.getDate() === now.getDate() &&
    eventDate.getMonth() === now.getMonth() &&
    eventDate.getFullYear() === now.getFullYear();

  const time = eventDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (isSameDay) {
    return `HOJE ÀS ${time}`;
  }

  const date = eventDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return `${date} • ${time}`;
}




export default function App() {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [current, setCurrent] = useState(0);



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



  // 🔥 Suporte a swipe
  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true
  });

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!nextEvent || nextEvent.date === "A definir") return;

    const updateCountdown = () => {
      const eventDate = parseLocalDateTime(nextEvent.date);

      const now = new Date();

      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-sans overflow-x-hidden max-w-[100vw]">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-6 text-white font-medium text-sm sm:text-base md:text-lg">
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
        className="relative h-[90vh] md:h-screen flex flex-col items-center justify-end bg-cover bg-center"
        style={{ backgroundImage: "url('/images/kongspeed-banner.png')" }}
      >
        <div className="relative z-10 text-center text-white p-4 pb-12 md:pb-16">

          <div className="flex items-center justify-center gap-4">
            <a
              href="#pilots"
              className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-base font-semibold transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Conheça os Pilotos
            </a>

            <a
              href="#agenda"
              className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-base font-semibold transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Eventos
            </a>
          </div>
        </div>
      </section>




      {/* PILOTS - Carrossel estilo videogame */}
      <section id="pilots" className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Fundo da seção */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/boxe.png"
            alt="Fundo Pilotos"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Overlay preto para escurecer */}
          <div className="absolute inset-0 bg-black/40" />
        </div>


        {/* Gradiente no topo mais suave */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

        {/* Título e subtítulo */}
        <h3 className="text-3xl md:text-4xl font-extrabold text-center text-white relative z-20">
          Pilotos
        </h3>
        <p className="text-gray-300 mt-2 text-center relative z-20">
          Conheça nossa equipe
        </p>

        {/* Carrossel */}
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

              const scale = isActive ? 1.1 : 0.75;
              const opacity = isActive ? 1 : 0.5;
              const translateY = isActive ? 0 : 30;
              const xOffset = offset * 160;

              return (
                <motion.div
                  key={p.id}
                  animate={{
                    scale,
                    opacity,
                    y: translateY,
                    x: isActive ? "-50%" : `calc(-50% + ${xOffset}px)`,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className={`absolute left-1/2 ${isActive ? "z-20" : "z-10"}`}
                >
                  <div className={`${isActive ? "w-[340px]" : "w-[220px]"} relative`}>
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-auto object-cover rounded-xl shadow-xl"
                    />

                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 text-white px-4 py-3 rounded-b-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">{p.name}</h4>
                          <div className="flex items-center gap-1 text-sm">
                            <span>{p.country}</span>
                            <img
                              src={`https://flagcdn.com/w20/${p.countryCode}.png`}
                              alt={p.country}
                              className="w-4 h-3 object-cover rounded-sm"
                            />
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 mt-1 line-clamp-3">{p.bio}</p>
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


      {/* CLASSIFICAÇÃO */}
      <section id="ranking" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center">Classificação 2026</h3>
          <p className="text-gray-400 mt-1 text-center text-sm sm:text-base">
            Pontuação oficial da temporada.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 min-w-[320px]">
              <thead>
                <tr className="text-left text-gray-400 text-xs sm:text-sm">
                  <th className="px-3 sm:px-4 py-2">Posição</th>
                  <th className="px-3 sm:px-4 py-2">Piloto</th>
                  <th className="px-3 sm:px-4 py-2 hidden sm:table-cell">País</th>
                  <th className="px-3 sm:px-4 py-2 text-right">Pontos</th>
                </tr>
              </thead>
              <tbody>
                {pilotsSample.map((p, index) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/40 hover:bg-gray-800/70 transition rounded-lg text-sm sm:text-base"
                  >
                    {/* Posição */}
                    <td className="px-3 sm:px-4 py-3 font-bold text-gray-200">{index + 1}º</td>

                    {/* Piloto + bandeira */}
                    <td className="px-3 sm:px-4 py-3 font-medium flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w20/${p.countryCode}.png`}
                        alt={p.country}
                        className="w-5 h-4 object-cover rounded-sm shadow-sm"
                      />
                      <span>{p.name}</span>
                    </td>

                    {/* Pontos */}
                    <td className="px-3 sm:px-4 py-3 text-right font-semibold text-yellow-400">0</td>
                  </motion.tr>
                ))}
              </tbody>

            </table>
          </div>
        </motion.div>
      </section>





      {/* AGENDA */}
      <section id="agenda" className="relative bg-gradient-to-b from-black via-gray-900/80 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Agenda</h3>
          <p className="text-gray-400 mt-1">Calendário oficial de corridas e eventos da Kong Speed.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Próximos eventos */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-lg border border-gray-800 relative overflow-hidden">
              <h4 className="font-semibold text-xl text-white flex items-center gap-2">
                🏁 Próximos eventos
              </h4>

              {/* Banner */}
              <div className="relative mt-3 mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/7f/78/8e/pista-ao-ar-livre-com.jpg?w=1200&h=1200&s=1"
                  alt="Pista de Foz do Iguaçu"
                  className="w-full h-40 object-cover opacity-70"
                />
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
                          {isDefined ? formatEventDateSmart(ev.date) : "Data a definir"} • {ev.location}
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-sm text-gray-300 font-medium">
                          {getDaysLabel(ev.date)}

                        </div>

                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contagem regressiva */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-lg border border-gray-800">

              <h4 className="font-semibold text-xl text-white flex items-center gap-2">
                ⏳ Próxima corrida
              </h4>

              <div className="mt-6 text-center">

                {nextEvent ? (
                  <>
                    <div className="text-sm uppercase tracking-widest text-gray-400">
                      {nextEvent.event}
                    </div>

                    <div className="mt-1 text-gray-500 text-sm">
                     {formatEventDateSmart(nextEvent.date)}
                    </div>

                    {/* TIMER */}
                    {timeLeft ? (
                      <div className="grid grid-cols-4 gap-3 mt-6">

                        {[
                          { label: "Dias", value: timeLeft.days },
                          { label: "Horas", value: timeLeft.hours },
                          { label: "Min", value: timeLeft.minutes },
                          { label: "Seg", value: timeLeft.seconds },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="bg-gray-800/60 rounded-lg py-4 backdrop-blur-sm border border-gray-700"
                          >
                            <div className="text-3xl font-bold text-green-400">
                              {String(item.value).padStart(2, "0")}
                            </div>

                            <div className="text-xs uppercase text-gray-400 mt-1">
                              {item.label}
                            </div>
                          </div>
                        ))}

                      </div>
                    ) : (
                      <div className="mt-6 text-green-400 font-semibold">
                        Evento em andamento ou finalizado
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-500">
                    Nenhum evento agendado.
                  </div>
                )}

              </div>
            </div>


          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-center">Galeria</h3>
        <p className="text-gray-300 mt-2 text-center">Fotos e vídeos épicos da equipe.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallerySample.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox({ open: true, index: i })}
              className="relative group overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={src}
                alt={`gallery-${i}`}
                className="w-full h-48 sm:h-52 object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13.586 8.586M9 14l-4.553 4.553a1 1 0 001.414 1.414L10.414 15.414M15 10L9 14" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
            {/* Fechar */}
            <button
              className="absolute top-6 right-6 text-gray-300 hover:text-white"
              onClick={() => setLightbox({ open: false, index: 0 })}
            >
              ✕
            </button>

            {/* Navegação esquerda */}
            <button
              className="absolute left-4 text-gray-300 hover:text-white text-3xl"
              onClick={() =>
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index - 1 + gallerySample.length) % gallerySample.length,
                }))
              }
            >
              ‹
            </button>

            {/* Imagem central */}
            <img
              src={gallerySample[lightbox.index]}
              alt=""
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition"
            />

            {/* Navegação direita */}
            <button
              className="absolute right-4 text-gray-300 hover:text-white text-3xl"
              onClick={() =>
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index + 1) % gallerySample.length,
                }))
              }
            >
              ›
            </button>
          </div>
        )}
      </section>


      {/* NEWS */}
      <section id="news" className="py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">Notícias</h3>
          <p className="text-gray-400 text-center mt-2">
            Fique por dentro das últimas novidades da equipe.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {newsSample.map((n, idx) => (
              <article
                key={n.id}
                className={`bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${idx === 0 ? "md:col-span-2" : ""
                  }`}
              >
                {/* CAPA */}
                {n.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="p-4">
                  <div className="text-xs text-gray-400">
                    {formatEventDateSmart(n.date)}
                  </div>

                  <h4 className="mt-1 font-semibold text-lg text-white">
                    {n.title}
                  </h4>

                  <div className="mt-2 space-y-3">
                    {n.excerpt.map((paragraph, i) => (
                      <p key={i} className="text-gray-300 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
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
            <p className="mt-2 text-gray-300">Interessado em apoiar a Kong Speed? Envie uma proposta.</p>
            <div className="mt-4 flex gap-3 flex-wrap">

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

