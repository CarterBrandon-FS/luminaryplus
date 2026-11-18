import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const faqItems = [
  {
    question: "What is Luminary+?",
    answer:
      "Luminary+ is a place to explore movies and shows. Your available features depend on your membership plan.",
  },
  {
    question: "Can I download movies and shows to watch offline?",
    answer:
      "Offline viewing depends on the device and membership features available to your account.",
  },
  {
    question: "Can I share my account with others?",
    answer:
      "You can review the account and device options in your membership settings.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Use the password reset option on the sign-in page to get a password reset link.",
  },
  {
    question: "What subscription plans are offered?",
    answer:
      "Open Membership above to see the plan currently connected to your account.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Choose Manage in the Membership section to review your plan and billing options.",
  },
  {
    question: "How do I report an issue with the platform?",
    answer:
      "Send a message using the Contact Support form below, and include the device you are using.",
  },
  {
    question: "What are the terms and conditions?",
    answer:
      "You can find the terms and conditions from the links in the site footer.",
  },
];

function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <section className="settings-panel settings-faq">
      <h2>Frequently Asked Questions</h2>

      <div className="settings-faq-grid">
        {faqItems.map((item, index) => (
          <div className="settings-faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={openQuestion === index}
              onClick={() =>
                setOpenQuestion(openQuestion === index ? null : index)
              }
            >
              <span>{item.question}</span>
              {openQuestion === index ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            {openQuestion === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
