
import { Award, Heart, Users } from 'lucide-react';
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="section bg-labor-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h5 className="text-labor-700 font-medium mb-2">Conheça</h5>
          <h2 className="section-title text-foreground">Perfil da Vereadora</h2>
          <div className="divider mx-auto"></div>
          <p className="section-subtitle">
            Assistente social com mais de 18 anos de trabalho dedicado à comunidade.
            Sua principal bandeira de luta é o acolhimento da população.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-labor-200 rounded-2xl -m-2 animate-pulse-slow"></div>
              <div className="bg-labor-700 absolute top-0 left-0 right-0 h-1.5"></div>
              <div className="bg-labor-700 absolute bottom-0 left-0 right-0 h-1.5"></div>
              <img 
                src="/lovable-uploads/463841a3-fa8b-4b1f-a28a-d3e75a1ee5fd.png" 
                alt="Vereadora Neia Marques em sessão" 
                className="rounded-2xl w-full object-cover"
              />
            </div>
            <div className="bg-white card-shadow rounded-xl p-4 mx-auto -mt-16 relative max-w-xs text-center">
              <span className="text-sm font-medium text-labor-700">Mais de</span>
              <h3 className="text-3xl font-bold">5.443</h3>
              <p className="text-sm text-muted-foreground">Votos de confiança</p>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display">
              Missão como Vereadora
            </h3>
            <div className="divider"></div>
            <p className="text-muted-foreground leading-relaxed">
              Neia Marques é assistente social com mais de 18 anos de trabalho dedicado à
              comunidade. Sua principal bandeira de luta é o acolhimento da população,
              promovendo justiça social e melhoria na qualidade de vida dos munícipes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              É atuar de forma ativa na defesa dos direitos sociais, garantindo a escuta e o
              atendimento das demandas da comunidade, promovendo legislações e políticas
              públicas que impactem positivamente a cidade.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <Card className="p-4 text-center hover-scale bg-white">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center">
                  <Heart size={20} className="text-labor-700" />
                </div>
                <h4 className="font-semibold">Acolhimento</h4>
                <p className="text-sm text-muted-foreground">Escuta e apoio social</p>
              </Card>
              
              <Card className="p-4 text-center hover-scale bg-white">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center">
                  <Users size={20} className="text-labor-700" />
                </div>
                <h4 className="font-semibold">Comunidade</h4>
                <p className="text-sm text-muted-foreground">Proximidade e diálogo</p>
              </Card>
              
              <Card className="p-4 text-center hover-scale bg-white">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center">
                  <Award size={20} className="text-labor-700" />
                </div>
                <h4 className="font-semibold">Justiça Social</h4>
                <p className="text-sm text-muted-foreground">Equidade e direitos</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
