import { FaPlayCircle, FaTv, FaCheckCircle } from "react-icons/fa";

function SubscriptionIntro() {
  return (
    <section className="subscription-intro">
      <div className="subscription-intro-copy">
        <h1>Choose the plan that's right for you</h1>
        <p>Watch movies and shows with a plan that fits how you watch.</p>
      </div>

      <div className="subscription-benefits">
        <div className="subscription-benefit">
          <FaPlayCircle aria-hidden="true" />
          <span>Free trial</span>
        </div>

        <div className="subscription-benefit">
          <FaTv aria-hidden="true" />
          <span>Watch on your devices</span>
        </div>

        <div className="subscription-benefit">
          <FaCheckCircle aria-hidden="true" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionIntro;
