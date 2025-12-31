import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim adiqua minim veniam quis nostrud exercitation ullamco
            </p>

            {/* Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
               <LocationOnIcon/>
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Our Location</h4>
                <p className="text-gray-600">
                  99 St. Jomblo Park Pekanbaru <br />
                  28292, Indonesia
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
                <CallIcon/>
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Phone Number</h4>
                <p className="text-gray-600">(+62) 81 414 257 9980</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-100 text-[#017F80]">
                <EmailIcon/>
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Email Address</h4>
                <p className="text-gray-600">info@yourdomain.com</p>
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
      </div>
    </section>
  );
};

export default ContactSection;
