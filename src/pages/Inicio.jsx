import hero from "../assets/hero.png";
import reactLogo from "../assets/react.jfif";
import viteLogo from "../assets/vite.svg";
import reactRouter from "../assets/react_router.png";
import tailwindcss from "../assets/tailwind_css.png";

function Inicio() {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario.",
      imagen: reactLogo,
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
      imagen: viteLogo,
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS basado en clases de utilidad.",
      imagen: tailwindcss,
    },
    {
      nombre: "React Router",
      descripcion: "Librería para gestionar la navegación de la aplicación.",
      imagen: reactRouter,
    },
  ];

  return (
    <main className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* HERO SECTION */}
      <section className="bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <img
              src={hero}
                    alt="React705"
              className="w-40 h-40 object-contain mb-8 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">
              ¡Bienvenidos a React705!
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8">
              Un espacio creado para aprender a desarrollar aplicaciones
              web modernas utilizando React y Vite.
            </p>
            <p className="max-w-3xl text-slate-600 dark:text-slate-400 mb-8">
              Durante este proyecto exploraremos componentes, navegación,
              consumo de APIs, estilos y diferentes herramientas del
              ecosistema de React.
            </p>
            <button
              className="
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                font-semibold
                px-8
                py-3
                rounded-lg
                transition
                duration-300
                shadow-lg
                shadow-cyan-500/30
                cursor-pointer
              "
            >
              Comenzar a aprender
            </button>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">
          Tecnologías utilizadas
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
          Este proyecto integra diferentes tecnologías y librerías
          utilizadas actualmente en el desarrollo frontend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tecnologia) => (
            <div
              key={tecnologia.nombre}
              className="
                bg-white/90
                dark:bg-slate-900/90
                border
                border-slate-200
                dark:border-slate-800
                rounded-2xl
                shadow-xl
                p-6
                text-center
                hover:-translate-y-2
                transition
                duration-300
                flex
                flex-col
                items-center
              "
            >
              {/* Contenedor de la imagen */}
              <div className="w-full h-32 mb-5 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={tecnologia.imagen}
                  alt={tecnologia.nombre}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-cyan-600 dark:text-cyan-400">
                {tecnologia.nombre}
              </h3>
              
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* APRENDIZAJE */}
      <section className="bg-slate-200/60 dark:bg-slate-900/60 backdrop-blur-sm border-t border-slate-300 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">
            ¿Qué aprenderemos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-cyan-600 dark:text-cyan-400">Componentes</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Aprenderemos a dividir nuestra aplicación en componentes
                reutilizables.
              </p>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-cyan-600 dark:text-cyan-400">Navegación</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Utilizaremos React Router para crear diferentes páginas
                dentro de nuestra aplicación.
              </p>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-cyan-600 dark:text-cyan-400">APIs</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Aprenderemos a consumir información desde servicios
                externos mediante APIs.
              </p>
            </div>
            <div className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-cyan-600 dark:text-cyan-400">Tailwind CSS</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Construiremos interfaces modernas utilizando clases
                de utilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-300 dark:bg-slate-950 text-slate-700 dark:text-slate-400 text-center py-8 border-t border-slate-400 dark:border-slate-800 transition-colors">
        <p>React705 · Aprendiendo desarrollo web moderno</p>
      </footer>
    </main>
  );
}

export default Inicio;