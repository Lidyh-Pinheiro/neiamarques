
import { FileText, Heart, GraduationCap, Home } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Família Acolhedora",
      description: "Projeto que busca apoiar as famílias mais necessitadas da comunidade, convidando-as a compartilhar suas histórias de vida. Com edições previstas para o final de cada mês.",
      icon: <Heart className="h-12 w-12 text-labor-700" />,
    },
    {
      id: 2,
      title: "Projeto Mãe de Anjo",
      description: "Iniciativa dedicada às mães que passaram pela perda de um filho, oferecendo acolhimento, conforto e criando uma rede de apoio para mães que passaram pela mesma tragédia.",
      icon: <Heart className="h-12 w-12 text-labor-700" />,
    },
    {
      id: 3,
      title: "Programa Municipal de Inclusão",
      description: "Projeto de lei que institui o Programa de Inclusão e Desenvolvimento Social com foco em educação, saúde, assistência social e geração de renda.",
      icon: <FileText className="h-12 w-12 text-labor-700" />,
    },
    {
      id: 4,
      title: "Qualifica Belém",
      description: "Programa que oferece cursos gratuitos de capacitação profissional em áreas estratégicas, ampliando oportunidades de emprego.",
      icon: <GraduationCap className="h-12 w-12 text-labor-700" />,
    }
  ];

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h5 className="text-labor-700 font-medium mb-2">Iniciativas</h5>
          <h2 className="section-title text-foreground">Projetos em Destaque</h2>
          <div className="divider mx-auto"></div>
          <p className="section-subtitle">
            Conheça os principais projetos e ações legislativas desenvolvidos pela vereadora Neia Marques
            para o bem-estar social e o desenvolvimento da comunidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden border-none shadow-md hover-scale animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-labor-50 flex items-center justify-center">
                    {project.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-center mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-center mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="mt-auto text-center">
                  <Button variant="ghost" className="text-labor-700 hover:text-labor-800 hover:bg-labor-50">
                    Saiba mais →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-labor-700 text-labor-700 hover:bg-labor-50" size="lg">
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
