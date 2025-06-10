import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const imageUrls = [
  "https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1689016466283-2e99396646f9?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const loaderRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  cardsRef.current = [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true),
      });

      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      });

      gsap.from("nav", {
        y: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 2,
      });

      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 2.2,
      });

      cardsRef.current.slice(0, 3).forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
        });
      });

      [3, 4].forEach((i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        tl.fromTo(
          card.children[0],
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        );

        tl.fromTo(
          card.children[1],
          { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power4.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {!isLoaded && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-3xl font-bold"
        >
          Loading Artistry...
        </div>
      )}

      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577084381314-cae9920e6871?q=80&w=1704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <nav className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-60 text-white shadow-md">
          <div className="text-3xl font-bold tracking-wide">🎨 Artistry</div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
              Login
            </button>
            <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              Sign Up
            </button>
          </div>
        </nav>

        <section
          ref={heroRef}
          className="flex flex-col items-center justify-center px-6 text-center py-28 backdrop-blur-sm text-white"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover & Own Timeless Art
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-4">
            Find, fall in love with, and collect art from creative minds all
            from all the corners of the country.
          </p>
          <Link
          to="/explore"
           className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            Explore Gallery
          </Link>
        </section>

        <section className="bg-white px-6 py-20 text-black">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Artworks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {imageUrls.map((url, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="rounded-lg overflow-hidden bg-white shadow-xl hover:shadow-2xl transition transform hover:scale-105"
              >
                <img
                  src={url}
                  alt={`Artwork ${i + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    Artwork Title {i + 1}
                  </h3>
                  <p className="text-sm text-gray-600">
                    A bold expression captured in every brush stroke.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="relative px-6 py-20 text-white min-h-[80vh]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583119912267-cc97c911e416?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose Us?
            </h2>

            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="flex flex-col md:flex-row items-center md:items-start gap-10"
            >
              <div className="md:w-1/2">
                <h3 className="text-3xl font-semibold mb-4">
                  Curated Art from Global Talents
                </h3>
                <p className="text-lg leading-loose">
                  Our platform carefully selects talented artists from around
                  the world, ensuring you discover unique and authentic artworks
                  that inspire.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="Curated Art"
                className="w-full md:w-[500px] max-h-[350px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <div
              ref={(el) => (cardsRef.current[4] = el)}
              className="flex flex-col items-center md:items-start gap-10 md:flex-row-reverse"
            >
              <div className="md:w-1/2">
                <h3 className="text-3xl font-semibold mb-4">
                  Secure and Transparent Transactions
                </h3>
                <p className="text-lg leading-relaxed">
                  We prioritize your trust with seamless and secure payment
                  options, transparent pricing, and verified sellers, making art
                  collecting easy and reliable.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1578301996581-bf7caec556c0?q=80&w=400&auto=format&fit=crop"
                alt="Secure Transactions"
                className="w-full md:w-[500px] max-h-[350px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section
          ref={ctaRef}
          className="px-6 py-20 text-white text-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577084381314-cae9920e6871?q=80&w=1704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="backdrop-blur-sm bg-opacity-60 p-6 rounded-lg inline-block">
            <h2 className="text-4xl font-bold mb-6">Are You an Artist?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Join our platform and showcase your talent to art lovers across
              the globe.
            </p>
            <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-300 transition">
              Become a Seller
            </button>
          </div>
        </section>

        <footer className="bg-black text-white text-center p-6">
          &copy; {new Date().getFullYear()} Artistry. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
