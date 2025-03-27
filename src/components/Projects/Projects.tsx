
import { FileText, Heart, GraduationCap, Home, BookOpen } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Família Acolhedora",
      description: "Projeto que busca apoiar as famílias mais necessitadas da comunidade, convidando-as a compartilhar suas histórias de vida. Com edições previstas para o final de cada mês.",
      icon: <Heart className="text-labor-700" size={20} />,
      image: "/lovable-uploads/f7b1d259-3020-43c5-8d5e-ef0ef5dba1ca.png"
    },
    {
      id: 2,
      title: "Projeto Mãe de Anjo",
      description: "Iniciativa dedicada às mães que passaram pela perda de um filho, oferecendo acolhimento, conforto e criando uma rede de apoio para mães que passaram pela mesma tragédia.",
      icon: <Heart className="text-labor-700" size={20} />,
      image: "/lovable-uploads/f21a65da-df57-4975-86f0-85de8d5be23d.png"
    },
    {
      id: 3,
      title: "Programa Municipal de Inclusão",
      description: "Projeto de lei que institui o Programa de Inclusão e Desenvolvimento Social com foco em educação, saúde, assistência social e geração de renda.",
      icon: <FileText className="text-labor-700" size={20} />,
      image: "/lovable-uploads/64006d17-8680-404a-bf34-abcf4c327f10.png"
    },
    {
      id: 4,
      title: "Qualifica Belém",
      description: "Programa que oferece cursos gratuitos de capacitação profissional em áreas estratégicas, ampliando oportunidades de emprego.",
      icon: <GraduationCap className="text-labor-700" size={20} />,
      image: "/lovable-uploads/87d7b72b-6635-48d7-a560-86b65996ae75.png"
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
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 h-48 md:h-auto relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-labor-700 opacity-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-5 md:p-6 flex flex-col">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-labor-50 flex items-center justify-center mr-3">
                      {project.icon}
                    </div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <Button variant="ghost" className="text-labor-700 hover:text-labor-800 hover:bg-labor-50 p-0">
                      Saiba mais →
                    </Button>
                  </div>
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
