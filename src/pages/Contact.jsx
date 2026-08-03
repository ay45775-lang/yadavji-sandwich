import React from "react";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        📞 Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Contact Details */}
        <div className="bg-white shadow-xl rounded-2xl p-6">

          <h2 className="text-3xl font-bold mb-6">
            Yadavji Sandwich
          </h2>

          <p className="mb-3">
            📍 Mumbai, Maharashtra
          </p>

          <p className="mb-3">
            📞 +91 9876543210
          </p>

          <p className="mb-3">
            📧 info@yadavjisandwich.com
          </p>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl mt-6"
          >
            💬 Chat on WhatsApp
          </a>

        </div>

        {/* Google Map */}
        <div>

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Mumbai&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </div>
  );
}

export default Contact;