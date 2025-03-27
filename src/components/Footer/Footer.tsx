
import { Heart, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-labor-800 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-labor-700 font-bold">NM</span>
              </div>
              <a href="#" className="text-xl font-display font-bold">
                <span className="text-white">Neia</span> <span className="text-labor-200">Marques</span>
              </a>
            </div>
            <p className="text-labor-100 mb-6">
              Vereadora comprometida com o acolhimento da população e a promoção da justiça social.
              Trabalhando por uma cidade mais justa, inclusiva e acolhedora.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/Neia-Marques-100069084631480/" target="_blank" rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full bg-labor-700 flex items-center justify-center hover:bg-labor-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/neiamarques.oficial/" target="_blank" rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full bg-labor-700 flex items-center justify-center hover:bg-labor-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="mailto:gabinete@neiamarquesvereadora.com" 
                className="h-10 w-10 rounded-full bg-labor-700 flex items-center justify-center hover:bg-labor-600 transition-colors">
                <Mail size={18} />
              </a>
              <a href="tel:+559133445566" 
                className="h-10 w-10 rounded-full bg-labor-700 flex items-center justify-center hover:bg-labor-600 transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Áreas de Atuação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Assistência Social</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Saúde</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Educação</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Trabalho e Renda</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Defesa dos Direitos da Mulher</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Habitação</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Informações Úteis</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Horário de Atendimento</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Projetos de Lei</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Agenda Parlamentar</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Notícias</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Transparência</a>
              </li>
              <li>
                <a href="#" className="text-labor-100 hover:text-white transition-colors">Prestação de Contas</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-labor-700 text-center">
          <p className="text-labor-200 text-sm">
            © {year} Gabinete da Vereadora Neia Marques. Todos os direitos reservados.
          </p>
          <div className="mt-2 flex items-center justify-center text-xs text-labor-300">
            <span>Feito com</span>
            <Heart size={14} className="mx-1 text-labor-500" />
            <span>para a comunidade de Belém</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
