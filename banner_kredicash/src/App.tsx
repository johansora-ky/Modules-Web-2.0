import "./App.css";
import { BlackFridayBadge } from "./components/ui/black-friday-badge";
import { FeatureItem } from "./components/ui/feature-item";

function App() {
  const calculatorUrl =
    "https://tiendas-dot-krediapp-panama.uw.r.appspot.com/iframe/ventas/kredicash-cliente/categoria/kredicash/simulador?start_token=eyJzdG9yZV9pZCI6ICI2ZjExOGU5Yi1hMzZhLTQxM2ItYTYyOC1iMmI4NDE2ZjIwZTciLCAic291cmNlIjogIndlYi1wYWdlIiwgImN1cnJlbnRfdG9rZW4iOiAiIn0&utm_source=facebook&utm_medium=conversiones&utm_campaign=PA-KYA-CONV-202507-CONVERSIONES-KREDICASH-VERSION-NUEVALANDING&utm_id=kredicash&utm_term=krediya";

  return (
    <section id="banner-kredicash-section">
      <div id="banner-kredicash-container">
        <div id="banner-kredicash-grid">
          {/* Left Section - Blue Panel with Text */}
          <div id="banner-kredicash-text-panel">
            <BlackFridayBadge />
            <h1 id="banner-kredicash-headline">
              Obtén <span className="gradient-text">hasta $500</span>
            </h1>
            <p id="banner-kredicash-slogan">
              para estrenar lo que necesitas en este <br /> <span id="banner-kredicash-headline"><span className="gradient-text">Black Friday</span></span>
            </p>
            <div id="banner-kredicash-features">
              <FeatureItem
                title="Aprobación instantánea"
              />
              <FeatureItem
                title="Flexible"
              />
              <FeatureItem
                title="Seguro"
              />
            </div>
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
