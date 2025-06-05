import React from "react";

const Home = () => {
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-cover bg-center bg-fixed text-white relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        {/* Overview Section */}
        <section className="text-center">
          <style>{`
            @keyframes rainbowText {
              0% { color: #ff0000; }
              16% { color: #ffa500; }
              32% { color: #ffff00; }
              48% { color: #00ff00; }
              64% { color: #00ffff; }
              80% { color: #0000ff; }
              100% { color: #ff00ff; }
            }

            .animated-color {
              animation: rainbowText 6s linear infinite;
            }

            .animated-paragraph {
              animation: rainbowText 8s linear infinite;
            }
          `}</style>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 animated-color">
            Welcome to the Ultimate Blogging Platform
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto animated-paragraph px-4">
            Discover a seamless way to write, connect, and grow your audience.
            Whether you're a seasoned blogger or just getting started, we offer
            the tools you need to shine.
          </p>
        </section>

        {/* Section 1 */}
        <section className="bg-white text-black rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/home1.png"
              alt="Blogger writing"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left px-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Write Your Story
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Pen down your thoughts with our intuitive editor. Add images, code
              snippets, and rich formatting. Let your creativity flow and build
              content that resonates with readers worldwide. Whether you're a
              seasoned writer or just starting out, our platform supports your
              unique voice and style. Share your stories, inspire others, and
              grow your audience effortlessly.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white text-black rounded-xl shadow-xl p-6 flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/home2.png"
              alt="Engaging readers"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left px-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Connect with Readers
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Get feedback, build a following, and interact with readers through
              comments and shares. Blogging is more than writing—it's about
              community. Our platform helps you foster meaningful conversations,
              understand your audience better, and create content that truly
              connects. Engage with your readers, receive valuable insights, and
              grow your blog into a thriving space where ideas flourish and
              voices are heard.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white text-black rounded-xl shadow-xl p-6 flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/home3.png"
              alt="Engaging with community"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left px-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Build Your Community
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Foster a loyal audience by nurturing conversations and sharing
              ideas. Our tools empower you to create engaging forums, host live
              Q&A sessions, and celebrate your readers' voices. Transform your
              blog into a vibrant community where connections grow naturally and
              your content inspires meaningful dialogue.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
