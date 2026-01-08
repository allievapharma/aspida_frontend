import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Conditions = () => {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
          
        </header>

        {/* Intro */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Please read these Terms and Conditions carefully before using Our
            Service.
          </p>
        </section>

        {/* Interpretation & Definitions */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Interpretation and Definitions</h2>

          <div>
            <h3 className="text-xl font-medium mb-2">Interpretation</h3>
            <p className="text-gray-700">
              The words whose initial letters are capitalized have meanings
              defined under the following conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">Definitions</h3>
            <p className="text-gray-700 mb-4">
              For the purposes of these Terms and Conditions:
            </p>

            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Affiliate:</strong> An entity under common control with
                the Company.
              </li>
              <li>
                <strong>Country:</strong> Uttar Pradesh, India
              </li>
              <li>
                <strong>Company:</strong> Aspida Lifesciences Pvt Ltd, 14/16/1
                Second Floor, Sahibabad Industrial Area, Ghaziabad, Uttar Pradesh
                201010.
              </li>
              <li>
                <strong>Device:</strong> Any device that can access the Service.
              </li>
              <li>
                <strong>Service:</strong> Refers to the Website.
              </li>
              <li>
                <strong>Third-party Social Media Service:</strong> Any services or
                content provided by third parties.
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://aspidalifesciences.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://aspidalifesciences.com/
                </a>
              </li>
              <li>
                <strong>You:</strong> The individual or entity using the Service.
              </li>
            </ul>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Acknowledgment</h2>
          <p>
            These Terms and Conditions govern the use of this Service and form the
            agreement between You and the Company.
          </p>
          <p>
            By accessing or using the Service, You agree to be bound by these
            Terms. If You disagree with any part, You may not access the Service.
          </p>
          <p>
            You represent that you are over the age of 18. The Company does not
            permit those under 18 to use the Service.
          </p>
          <p>
            Your use of the Service is also conditioned on acceptance of our
            Privacy Policy.
          </p>
        </section>

        {/* Links */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites not controlled
            by the Company.
          </p>
          <p>
            We assume no responsibility for the content or practices of any
            third-party sites.
          </p>
        </section>

        {/* Termination */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Termination</h2>
          <p>
            We may terminate or suspend access immediately without prior notice
            if You breach these Terms.
          </p>
        </section>

        {/* Liability */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, the Company shall not be
            liable for indirect or consequential damages.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">
            &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
          </h2>
          <p>
            The Service is provided without warranties of any kind, whether
            express or implied.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of Uttar Pradesh, India.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>If you have any questions about these Terms:</p>
          <p className="font-medium">📧 info@aspidalifesciences.com</p>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Conditions;
