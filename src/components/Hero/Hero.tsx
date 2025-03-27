
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Background design elements */}
      <div className="absolute top-0 right-0 h-full w-1/3 bg-labor-50 -z-10"></div>
      <div className="absolute top-[15%] right-[15%] h-32 w-32 rounded-full bg-labor-100 -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] left-[10%] h-24 w-24 rounded-full bg-labor-50 -z-10 animate-pulse-slow"></div>
      
      {/* Red decorative stripes */}
      <div className="absolute top-0 left-0 h-2 w-full bg-labor-700"></div>
      <div className="absolute bottom-0 left-0 h-2 w-full bg-labor-700"></div>
      
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center animate-slide-in">
          <div className="inline-block bg-labor-50 text-labor-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Vereadora | Trabalho e Compromisso
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-4 font-display">
            <span className="text-labor-700">Neia Marques</span>
            <br />
            <span className="text-foreground">A voz do povo</span>
          </h1>
          <div className="divider"></div>
          <p className="text-lg text-muted-foreground mb-8">
            Assistente social com mais de 18 anos de trabalho dedicado à comunidade. 
            Comprometida com o acolhimento da população e a promoção da justiça social.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-labor-700 hover:bg-labor-800 text-white" size="lg">
              Conheça meus projetos
            </Button>
            <Button variant="outline" className="border-labor-700 text-labor-700 hover:bg-labor-50" size="lg">
              Entre em contato
            </Button>
          </div>
        </div>
        <div className="relative hidden md:flex items-center justify-center animate-fade-in">
          <div className="absolute -inset-4 rounded-full border-2 border-labor-100 animate-pulse-slow"></div>
          <div className="absolute inset-0 rounded-full border-2 border-labor-200 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="bg-white p-3 rounded-full shadow-xl">
            <div className="h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-white shadow-inner">
              <img 
                src="/lovable-uploads/00803268-75d6-468e-a7ab-a6971462761b.png" 
                alt="Vereadora Neia Marques" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Saiba mais</span>
        <ChevronDown 
          size={24} 
          className="text-labor-700 cursor-pointer" 
          onClick={scrollToAbout}
        />
      </div>
    </section>
  );
};

export default Hero;
