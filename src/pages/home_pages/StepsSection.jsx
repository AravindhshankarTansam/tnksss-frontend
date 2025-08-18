import React from "react";
import "../../all_css/StepsSection.css";

export default function StepsSection() {
  return (
    <section className="steps-section">
      <div className="steps-header">
        <h2>How does it work?</h2>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis.
        </p>
      </div>

      <div className="steps-wrapper">
        <div className="step">
          <div className="circle">1</div>
          <h3>Create a free account</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>

        <div className="step">
          <div className="circle">2</div>
          <h3>Build your website</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>

        <div className="step">
          <div className="circle">3</div>
          <h3>Release & Launch</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
      </div>
    </section>
  );
}
