import "./App.css";

function App() {
  const calculatorUrl =
    "https://tiendas-dot-krediapp-panama.uw.r.appspot.com/iframe/ventas/kredicash-cliente/categoria/kredicash/simulador?start_token=eyJzdG9yZV9pZCI6ICI2ZjExOGU5Yi1hMzZhLTQxM2ItYTYyOC1iMmI4NDE2ZjIwZTciLCAic291cmNlIjogIndlYi1wYWdlIiwgImN1cnJlbnRfdG9rZW4iOiAiIn0&utm_source=facebook&utm_medium=conversiones&utm_campaign=PA-KYA-CONV-202507-CONVERSIONES-KREDICASH-VERSION-NUEVALANDING&utm_id=kredicash&utm_term=krediya";

  return (
    <section id="banner-kredicash-section">
      <div id="banner-kredicash-container">
        <div id="banner-kredicash-grid">
          {/* Left Section - Blue Panel with Text */}
          <div id="banner-kredicash-text-panel">
            <h1 id="banner-kredicash-headline">
              Conoce todo sobre tu crédito online
            </h1>
            <div id="banner-kredicash-offer">Hasta $500 USD</div>
            <p id="banner-kredicash-slogan">
              Resuelve hoy todos los imprevistos
            </p>
          </div>

          {/* Right Section - Calculator Iframe */}
          <div id="banner-kredicash-iframe-container">
            <iframe
              id="banner-kredicash-calculator"
              src={calculatorUrl}
              title="KrediCash Calculator"
              allow="payment"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
