import React from "react";

const About = () => (
    <div className="min-h-screen bg-white p-8 text-gray-800 flex flex-col items-center">
    <h1 className="text-4xl font-extrabold mb-6 text-center">About Blogging Platform</h1>
      <p className="max-w-3xl text-center text-lg mb-8 leading-relaxed">
      Our Blogging Platform empowers writers, storytellers, and thinkers to share their ideas with the world. Whether you're penning personal stories, sharing expertise, or exploring your creativity, our platform provides the tools and space to express yourself and connect with others.
      </p>
      <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
      <div className="rounded-lg p-6 border bg-indigo-600 text-white shadow-md hover:shadow-xl transition hover:scale-105 cursor-pointer">
        <h2 className="text-2xl font-bold mb-3">Write & Publish</h2>
          <p>
          Enjoy a distraction-free writing experience and publish your posts with ease. Our editor is designed for clarity and focus.
          </p>
        </div>
      <div className="rounded-lg p-6 border bg-indigo-600 text-white shadow-md hover:shadow-xl transition hover:scale-105 cursor-pointer">
        <h2 className="text-2xl font-bold mb-3">Engage & Connect</h2>
          <p>
          Interact with readers, receive feedback, and grow your audience by connecting through meaningful stories and comments.
          </p>
        </div>
      <div className="rounded-lg p-6 border bg-indigo-600 text-white shadow-md hover:shadow-xl transition hover:scale-105 cursor-pointer">
        <h2 className="text-2xl font-bold mb-3">Responsive & Modern</h2>
          <p>
            Our platform works seamlessly across all devices, giving you the freedom to write and read on the go.
          </p>
        </div>
      </div>
      <section className="max-w-4xl w-full pt-6 px-4 mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 inline-block pb-2">
        Legal & Privacy
        </h2>
        <div className="space-y-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Terms and Conditions</h3>
            <p className="text-gray-700 leading-relaxed">
            By using our blogging platform, you agree to share content responsibly and respect the community guidelines. We do not tolerate abusive, illegal, or plagiarized content. Users are responsible for what they publish.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              We may update these terms at any time. Your continued use of the platform means you accept the updated terms.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Privacy Policy</h3>
            <p className="text-gray-700 leading-relaxed">
            We care about your privacy. Your account data and writing are yours alone—we do not sell or share personal data. We collect minimal data to improve your experience and maintain platform security.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Cookies may be used for personalization and analytics. You can disable them in your browser settings anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

export default About;
