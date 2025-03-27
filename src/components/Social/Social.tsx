
import { Newspaper, Clock, Calendar, MapPin } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Social = () => {
  const activities = [
    {
      id: 1,
      title: "Reunião na COHAB",
      date: "11 de fevereiro de 2023",
      description: "Encontro com o presidente da COHAB para discutir projetos habitacionais beneficiando a comunidade.",
      image: "/lovable-uploads/0bcc626c-8394-4046-8d9c-1d2dde85b46c.png",
      category: "Habitação"
    },
    {
      id: 2,
      title: "Participação em reunião na FUNPAPA",
      date: "05 de fevereiro de 2023",
      description: "Reunião com o presidente da FUNPAPA para discutir melhorias nos serviços destinados à população.",
      image: "/lovable-uploads/67cfcebf-4a79-4849-818a-ec72c2d617e6.png",
      category: "Assistência Social"
    },
    {
      id: 3,
      title: "Visita à SESMA",
      date: "07 de fevereiro de 2023",
      description: "Visita à Secretaria Municipal de Saúde para discutir estratégias para fortalecer o atendimento e garantir maior qualidade de vida para a população.",
      image: "/lovable-uploads/bc147dfa-6c08-4256-8373-31dafc62420a.png",
      category: "Saúde"
    }
  ];

  return (
    <section id="social" className="section bg-labor-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h5 className="text-labor-700 font-medium mb-2">Acompanhe</h5>
          <h2 className="section-title text-foreground">A Voz da Comunidade</h2>
          <div className="divider mx-auto"></div>
          <p className="section-subtitle">
            Acompanhe as atividades e ações da vereadora Neia Marques em defesa dos interesses da população
            e no fortalecimento das políticas públicas municipais.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Card key={activity.id} className="overflow-hidden border-none shadow-md hover-scale animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative h-48">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-labor-700">
                    {activity.category}
                  </span>
                </div>
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar size={14} className="mr-1" />
                  <span>{activity.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {activity.description}
                </p>
                <Button variant="ghost" className="text-labor-700 hover:text-labor-800 hover:bg-labor-50 p-0">
                  Leia mais →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md">
          <div className="md:w-1/2 bg-labor-700 text-white p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4 font-display">Acompanhe nas Redes Sociais</h3>
            <p className="mb-6">
              Siga a vereadora Neia Marques nas redes sociais para acompanhar seu trabalho diário
              e ficar por dentro de todas as ações e projetos em andamento.
            </p>
            <div className="flex space-x-3">
              <Button asChild className="bg-white text-labor-700 hover:bg-labor-50">
                <a href="https://www.instagram.com/neiamarques.oficial/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-labor-800">
                <a href="https://www.facebook.com/p/Neia-Marques-100069084631480/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4 font-display">Mandato Participativo</h3>
            <p className="text-muted-foreground mb-6">
              A participação popular é fundamental para um mandato verdadeiramente representativo.
              Envie suas sugestões, demandas e participe ativamente das decisões que impactam nossa cidade.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock size={18} className="text-labor-700 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Atendimento ao cidadão</p>
                  <p className="text-sm text-muted-foreground">Segunda a sexta, das 8h às 17h</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-labor-700 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Gabinete</p>
                  <p className="text-sm text-muted-foreground">Câmara Municipal de Belém</p>
                </div>
              </li>
              <li className="flex items-start">
                <Newspaper size={18} className="text-labor-700 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Boletim informativo</p>
                  <p className="text-sm text-muted-foreground">Receba atualizações sobre o mandato</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
