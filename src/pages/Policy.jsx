import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Policy = () => {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        </header>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>

          <p>
            We use Your Personal Data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </section>

        {/* Interpretation & Definitions */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">
            Interpretation and Definitions
          </h2>

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
              For the purposes of this Privacy Policy:
            </p>

            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Account:</strong> A unique account created to access our
                Service.
              </li>
              <li>
                <strong>Affiliate:</strong> An entity under common control with
                the Company.
              </li>
              <li>
                <strong>Company:</strong> Aspida Lifesciences Pvt Ltd, 14/16/1
                Second Floor, Sahibabad Industrial Area, Ghaziabad, Uttar
                Pradesh 201010.
              </li>
              <li>
                <strong>Cookies:</strong> Small files stored on your device.
              </li>
              <li>
                <strong>Country:</strong> Uttar Pradesh, India
              </li>
              <li>
                <strong>Device:</strong> Any device that accesses the Service.
              </li>
              <li>
                <strong>Personal Data:</strong> Information relating to an
                identifiable individual.
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
                <strong>You:</strong> The individual using the Service.
              </li>
            </ul>
          </div>
        </section>

        {/* Data Collection */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">
            Collecting and Using Your Personal Data
          </h2>

          <h3 className="text-xl font-medium">Types of Data Collected</h3>

          <div>
            <h4 className="font-semibold">Usage Data</h4>
            <p>
              Usage Data is collected automatically when using the Service and
              may include IP address, browser type, pages visited, and time
              spent.
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">
            Tracking Technologies & Cookies
          </h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Essential Cookies:</strong> Required for basic site
              functionality.
            </li>
            <li>
              <strong>Acceptance Cookies:</strong> Store cookie consent
              preferences.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Remember user preferences.
            </li>
          </ul>
        </section>

        {/* Security */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">
            Security of Your Personal Data
          </h2>
          <p>
            While we strive to use commercially acceptable means to protect your
            Personal Data, no method of transmission over the Internet is 100%
            secure.
          </p>
        </section>

        {/* Children */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Children’s Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy:</p>
          <p className="font-medium">📧 info@aspidalifesciences.com</p>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Policy;
