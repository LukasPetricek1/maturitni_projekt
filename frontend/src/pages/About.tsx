import { Link } from "react-router-dom";

const MoreInfoPage = () => {
  const features = [
    {
      title: "Spojení s přáteli",
      description:
        "Sdílejte své zážitky a zůstaňte v kontaktu s lidmi, na kterých vám záleží.",
      icon: "🤝",
    },
    {
      title: "Sdílení příběhů",
      description:
        "Inspirujte ostatní svými momenty a čerpejte inspiraci od svých přátel.",
      icon: "📸",
    },
    {
      title: "Privátní chaty a skupiny",
      description:
        "Zůstaňte ve spojení prostřednictvím chatů, které respektují vaše soukromí.",
      icon: "💬",
    },
    {
      title: "Objevujte nové přátele",
      description: "Najděte nové kontakty podle svých zájmů a aktivit.",
      icon: "🌐",
    },
    {
      title: "Přizpůsobený obsah",
      description:
        "Prohlížejte si obsah a příběhy, které vás opravdu zajímají.",
      icon: "✨",
    },
  ];

  return (
    <div className="relative min-h-full text-gray-800">
      <header className=" text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600">
          Více informací o naší aplikaci
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Poznejte všechny funkce, které vám pomohou zůstat propojeni se světem.
        </p>
      </header>

      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">
            Co vám aplikace nabízí?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-300/30 shadow-md rounded-lg p-6 text-center cursor-pointer hover:scale-105 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10  text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-600">
          Připravení se připojit?
        </h2>
        <p className="text-lg mb-6">
          Zaregistrujte se a zažijte propojení, které vás inspiruje.
        </p>
        <Link to="/signup">
          <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Zaregistrujte se nyní
          </button>
        </Link>
      </section>
    </div>
  );
};

export default MoreInfoPage;
