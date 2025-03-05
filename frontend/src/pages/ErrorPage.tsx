import React from "react";
import { Link, useRouteError } from "react-router-dom";

interface RouteError {
  status: number;
  message : string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;

  let title = "Neznámá chyba!";
  const status = error.status;
  let message = "Došlo k neočekávané chybě. Zkuste to prosím později.";

  
    if (error.status === 400) {
      title = "Špatný požadavek!";
      message = "Server nemohl zpracovat váš požadavek. Zkontrolujte prosím vstupní data.";
    } else if (error.status === 401) {
      title = "Neautorizováno!";
      message = "Pro přístup k tomuto zdroji se musíte přihlásit.";
      // window.location.href = "/login"
    } else if (error.status === 403) {
      title = "Zakázáno!";
      message = "Nemáte oprávnění k přístupu k tomuto zdroji.";
    } else if (error.status === 404) {
      title = "Nenalezeno!";
      message = "Požadovaný zdroj nebo stránku se nepodařilo najít.";
    } else if (error.status === 405) {
      title = "Metoda není povolena!";
      message = "Požadovaná metoda není pro tento zdroj povolena.";
    } else if (error.status === 408) {
      title = "Časový limit požadavku!";
      message =
        "Server čekal na váš požadavek příliš dlouho. Zkuste to prosím znovu.";
    } else if (error.status === 409) {
      title = "Konflikt!";
      message = "Došlo ke konfliktu se současným stavem zdroje.";
    } else if (error.status === 410) {
      title = "Pryč!";
      message = "Požadovaný zdroj již není k dispozici.";
    } else if (error.status === 413) {
      title = "Příliš velký požadavek!";
      message =
        "Obsah požadavku je příliš velký na to, aby ho server mohl zpracovat.";
    } else if (error.status === 415) {
      title = "Nepodporovaný typ obsahu!";
      message = "Server nepodporuje typ obsahu požadavku.";
    } else if (error.status === 429) {
      title = "Příliš mnoho požadavků!";
      message =
        "Provedli jste příliš mnoho požadavků v krátkém čase. Zpomalte prosím.";
    } else if (error.status === 500) {
      title = "Interní chyba serveru!";
      message = "Na serveru došlo k chybě a váš požadavek nemohl být dokončen.";
    } else if (error.status === 501) {
      title = "Funkce není implementována!";
      message = "Server nepodporuje funkci potřebnou k dokončení požadavku.";
    } else if (error.status === 502) {
      title = "Špatná brána!";
      message = "Server obdržel neplatnou odpověď od jiného serveru.";
    } else if (error.status === 503) {
      title = "Služba nedostupná!";
      message = "Server je momentálně nedostupný. Zkuste to prosím později.";
    } else if (error.status === 504) {
      title = "Časový limit brány!";
      message = "Server neobdržel včasnou odpověď od jiného serveru.";
    }
  


  return (
    <div className="flex items-center justify-center h-screen text-white bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="text-center">
        <h1 className="text-6xl ">{title}</h1>
        <h1 className="m-5 text-6xl font-bold text-red-500">
          {status && status}
        </h1>
        <p className="mb-6 text-2xl">{message}</p>
        <Link to="..">
          <button className="px-6 py-3 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700">
            Domů
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
