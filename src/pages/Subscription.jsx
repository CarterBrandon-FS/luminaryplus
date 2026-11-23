import { useEffect, useState } from "react";
import SubscriptionIntro from "../components/SubscriptionIntro";
import { getTrending } from "../utils/TMDB";
import "../styles/Dashboard.css";
import "../styles/Subscription.css";

// These prices and features are the plan information shown in your design.
// They are subscription details, so they come from your app's plan design,
// not from the TMDB movie API.
const plans = [
  {
    name: "Basic Plan",
    monthlyPrice: 5.99,
    description:
      "Enjoy an extensive library of movies and shows, including recently released titles.",
    devices: "Watch on one device simultaneously",
    dolbyAtmos: false,
    adFree: false,
    offlineViewing: "No",
    familySharing: "No",
  },
  {
    name: "Standard Plan",
    monthlyPrice: 9.99,
    description:
      "Access a wider selection of movies and shows, including new releases and exclusive content.",
    devices: "Watch on two devices simultaneously",
    dolbyAtmos: true,
    adFree: true,
    offlineViewing: "Yes, for selected titles",
    familySharing: "Yes, up to 5 family members",
    recommended: true,
  },
  {
    name: "Premium Plan",
    monthlyPrice: 14.99,
    description:
      "Access the widest selection of movies and shows, including new releases, exclusive content, and offline viewing.",
    devices: "Watch on three or more devices simultaneously",
    dolbyAtmos: true,
    adFree: true,
    offlineViewing: "Yes, for all titles",
    familySharing: "Yes, up to 6 family members",
  },
];

function Subscription() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isPageOpen = true;

    // The trial banner uses movie posters from TMDB for its background.
    getTrending()
      .then((response) => {
        if (isPageOpen) {
          setMovies((response.data.results || []).slice(0, 18));
        }
      })
      .catch(() => {
        // The rest of the subscriptions page still works if posters fail.
        setMovies([]);
      });

    return () => {
      isPageOpen = false;
    };
  }, []);

  function getPrice(plan) {
    if (billingPeriod === "yearly") {
      return (plan.monthlyPrice * 12).toFixed(2);
    }

    return plan.monthlyPrice.toFixed(2);
  }

  function scrollToPlans() {
    document.getElementById("plan-options")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="subscriptions-page">
      {/* <Header /> */}

      <main>
        <SubscriptionIntro />

        <section className="subscription-plans" id="plan-options">
          <div className="billing-toggle" aria-label="Choose billing period">
            <button
              type="button"
              className={billingPeriod === "monthly" ? "active" : ""}
              onClick={() => setBillingPeriod("monthly")}
              aria-pressed={billingPeriod === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              className={billingPeriod === "yearly" ? "active" : ""}
              onClick={() => setBillingPeriod("yearly")}
              aria-pressed={billingPeriod === "yearly"}
            >
              Yearly
            </button>
          </div>

          <div className="plan-card-grid">
            {plans.map((plan) => (
              <article
                className={`plan-card ${
                  selectedPlan === plan.name ? "selected" : ""
                }`}
                key={plan.name}
              >
                <div className="plan-card-heading">
                  <h2>{plan.name}</h2>
                  {plan.recommended && <span>Recommended</span>}
                </div>

                <p className="plan-description">{plan.description}</p>

                <p className="plan-price">
                  <strong>${getPrice(plan)}</strong>
                  <span>/{billingPeriod === "monthly" ? "month" : "year"}</span>
                </p>

                <div className="plan-card-buttons">
                  <button
                    type="button"
                    className="trial-button"
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    Start Free Trial
                  </button>
                  <button
                    type="button"
                    className="choose-plan-button"
                    onClick={() => setSelectedPlan(plan.name)}
                    aria-pressed={selectedPlan === plan.name}
                  >
                    {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="comparison-section">
          <h2 className="comparison-title">Compare plan features</h2>
          <div className="comparison-scroll">
            <table className="plan-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Features</th>
                  {plans.map((plan) => (
                    <th scope="col" key={plan.name}>
                      {plan.name.replace(" Plan", "")}
                      {plan.recommended && <span>Recommended</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Price</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>
                      ${getPrice(plan)} /{" "}
                      {billingPeriod === "monthly" ? "month" : "year"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Content</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.description}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Devices</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.devices}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Free Trial</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>Yes</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Cancel Anytime</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>Yes</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Dolby Atmos</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.dolbyAtmos ? "Yes" : "No"}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Ad Free</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.adFree ? "Yes" : "No"}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Offline Viewing</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.offlineViewing}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Family Sharing</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>{plan.familySharing}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="subscription-trial-banner">
          <div className="subscription-poster-grid" aria-hidden="true">
            {movies.map(
              (movie) =>
                movie.poster_path && (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt=""
                  />
                ),
            )}
          </div>
          <div className="subscription-trial-shade" />
          <div className="subscription-trial-copy">
            <h2>Start your free trial today!</h2>
            <p>Explore movies and shows with Luminary+.</p>
            <button type="button" onClick={scrollToPlans}>
              Start Trial
            </button>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default Subscription;
