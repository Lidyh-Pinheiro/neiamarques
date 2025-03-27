
import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import Social from "@/components/Social/Social";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const navbarHeight = 80;
            const offsetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Page load animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  useEffect(() => {
    // Set page title
    document.title = "Vereadora Neia Marques | A voz do povo";
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Social />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
