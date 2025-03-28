
import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    closeMenu();
    const element = document.getElementById(id);
    const navbarHeight = 80;
    const offsetPosition = (element?.offsetTop || 0) - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-labor-700 flex items-center justify-center">
              <span className="text-white font-bold">NM</span>
            </div>
            <a href="#" className="text-xl font-display font-bold">
              <span className="text-labor-700">Neia</span> <span className="text-foreground">Marques</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a onClick={() => scrollToSection('hero')} className="nav-item cursor-pointer nav-item-active">Início</a>
            <a onClick={() => scrollToSection('about')} className="nav-item cursor-pointer">Perfil</a>
            <a onClick={() => scrollToSection('projects')} className="nav-item cursor-pointer">Projetos</a>
            <a onClick={() => scrollToSection('social')} className="nav-item cursor-pointer">Atuação</a>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-item">Agenda</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-3 p-4">
                      <NavigationMenuLink asChild>
                        <Link to="/agenda" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Agenda de Postagens</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Confira a agenda de publicações
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <a onClick={() => scrollToSection('contact')} className="nav-item cursor-pointer">Contato</a>
            
            <div className="ml-6 flex items-center space-x-3">
              <a href="https://www.facebook.com/p/Neia-Marques-100069084631480/" target="_blank" rel="noopener noreferrer" 
                className="text-labor-700 hover:text-labor-800 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/neiamarques.oficial/" target="_blank" rel="noopener noreferrer" 
                className="text-labor-700 hover:text-labor-800 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <a onClick={() => scrollToSection('hero')} className="text-foreground py-2 font-medium">Início</a>
              <a onClick={() => scrollToSection('about')} className="text-foreground py-2 font-medium">Perfil</a>
              <a onClick={() => scrollToSection('projects')} className="text-foreground py-2 font-medium">Projetos</a>
              <a onClick={() => scrollToSection('social')} className="text-foreground py-2 font-medium">Atuação</a>
              <Link to="/agenda" onClick={closeMenu} className="text-foreground py-2 font-medium">Agenda de Postagens</Link>
              <a onClick={() => scrollToSection('contact')} className="text-foreground py-2 font-medium">Contato</a>
              
              <div className="pt-4 flex space-x-4">
                <a href="https://www.facebook.com/p/Neia-Marques-100069084631480/" target="_blank" rel="noopener noreferrer" 
                  className="bg-labor-50 p-2 rounded-full text-labor-700">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/neiamarques.oficial/" target="_blank" rel="noopener noreferrer" 
                  className="bg-labor-50 p-2 rounded-full text-labor-700">
                  <Instagram size={18} />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
