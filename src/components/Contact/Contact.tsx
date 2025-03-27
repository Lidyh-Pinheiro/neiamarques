
import { Phone, Mail, MapPin, FileText } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h5 className="text-labor-700 font-medium mb-2">Entre em Contato</h5>
          <h2 className="section-title text-foreground">Gabinete Aberto à População</h2>
          <div className="divider mx-auto"></div>
          <p className="section-subtitle">
            O mandato da vereadora Neia Marques está sempre de portas abertas para ouvir as demandas
            da população e trabalhar em conjunto por uma cidade melhor.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6 animate-slide-in">
            <h3 className="text-2xl font-bold font-display">Informações de Contato</h3>
            <div className="divider"></div>
            <p className="text-muted-foreground">
              Entre em contato com o gabinete da vereadora Neia Marques para agendar uma visita, 
              apresentar demandas ou obter informações sobre os projetos em andamento.
            </p>

            <div className="space-y-4 pt-4">
              <Card className="p-4 flex items-start hover-scale">
                <div className="h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center mr-4">
                  <Phone size={18} className="text-labor-700" />
                </div>
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <p className="text-sm text-muted-foreground">(91) 3344-5566</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start hover-scale">
                <div className="h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center mr-4">
                  <Mail size={18} className="text-labor-700" />
                </div>
                <div>
                  <h4 className="font-medium">E-mail</h4>
                  <p className="text-sm text-muted-foreground">gabinete@neiamarquesvereadora.com</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start hover-scale">
                <div className="h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center mr-4">
                  <MapPin size={18} className="text-labor-700" />
                </div>
                <div>
                  <h4 className="font-medium">Endereço</h4>
                  <p className="text-sm text-muted-foreground">
                    Câmara Municipal de Belém<br />
                    Praça Dom Pedro II, s/n - Cidade Velha<br />
                    Belém - PA, 66020-240
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start hover-scale">
                <div className="h-10 w-10 rounded-full bg-labor-50 flex items-center justify-center mr-4">
                  <FileText size={18} className="text-labor-700" />
                </div>
                <div>
                  <h4 className="font-medium">Horário de Atendimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Segunda a sexta-feira<br />
                    08h às 17h
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="md:col-span-3 animate-slide-up">
            <Card className="p-6 md:p-8 border-none shadow-md">
              <h3 className="text-xl font-bold mb-6">Envie sua mensagem</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                  <Input id="subject" placeholder="Assunto da mensagem" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                  <Textarea id="message" placeholder="Escreva sua mensagem" rows={5} />
                </div>
                <div className="pt-2">
                  <Button className="w-full bg-labor-700 hover:bg-labor-800 text-white">
                    Enviar mensagem
                  </Button>
                </div>
              </form>
            </Card>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Ao enviar este formulário, você concorda com nossa política de privacidade
                e termos de uso de informações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
