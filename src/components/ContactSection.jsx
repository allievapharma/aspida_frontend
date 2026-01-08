import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const ContactSection = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-20 lg:py-[120px] ">
      <div className="container mx-auto px-4 aspida-max-w">
        <div className="flex flex-wrap lg:justify-between gap-8">
          {/* LEFT SIDE - Contact Info */}
          <div className="w-full lg:w-5/12">
            <h5 className="text-primary font-semibold mb-2">Contact Us</h5>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-black mb-4">
              GET IN TOUCH WITH US
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              If you have any questions, inquiries, or business opportunities,
              please get in touch with us using the form below. Our team will
              review your message and respond promptly to assist you.
            </p>

            {/* Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
                <LocationOnIcon />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Our Location</h4>
                <p className="text-gray-600">
                  Aspida Lifesciences Pvt Ltd 14/16/1 Second Floor Sahibabad
                  Industrial Area, above Allieva <br />
                  28292, Indonesia
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
                <CallIcon />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Phone Number</h4>
                <p className="text-gray-600">(+91) 9311028639</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
                <EmailIcon />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Email Address</h4>
                <p className="text-gray-600">info@aspidalifesciences.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="w-full lg:w-6/12 xl:w-5/12 ">
            <div className="contact-shadow rounded-xl bg-white p-8">
              <form className="space-y-4 ">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full rounded border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full rounded border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="w-full bg-[#017F80] text-white p-3 rounded hover: transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[450px] mt-12 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.891043456235!2d77.3336561!3d28.6629809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb0dfc7af7cf%3A0xb98c7285c616dddb!2sAspida%20Lifesciences%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1767700006767"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aspida Location"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
