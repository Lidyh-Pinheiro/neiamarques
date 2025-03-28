
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, Instagram, Facebook, MessageSquare } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface AgendaPost {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  tipo: string;
  status: string;
}

const Agenda = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [agendaPosts, setAgendaPosts] = useState<AgendaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendaPosts();
  }, []);

  const fetchAgendaPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("agenda_posts")
        .select("*")
        .order("data", { ascending: true });

      if (error) {
        console.error("Erro ao buscar agenda:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a agenda",
          variant: "destructive",
        });
      } else {
        setAgendaPosts(data || []);
      }
    } catch (error) {
      console.error("Erro ao buscar agenda:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "123") {
      setIsAuthenticated(true);
      toast({
        title: "Login realizado",
        description: "Bem-vinda, Vereadora Neia Marques!",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[date.getDay()];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-700';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'feed':
        return <MessageSquare className="h-4 w-4" />;
      case 'reels':
      case 'stories':
        return <Instagram className="h-4 w-4" />;
      case 'registro':
      case 'foto':
      case 'card':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-display font-bold mb-4 text-labor-800">Agenda de Postagens</h1>
            <div className="divider mx-auto"></div>
            <p className="text-gray-600 mt-4">Acompanhe a programação semanal da Vereadora Neia Marques</p>
            
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto">
              <Card className="border-labor-200 shadow-lg hover-scale">
                <CardHeader className="bg-labor-700 text-white rounded-t-lg py-6">
                  <h2 className="text-xl font-display font-semibold text-center">Acesso Administrativo</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-display font-semibold text-labor-700">Vereadora Neia Marques</h3>
                      <p className="text-sm text-muted-foreground">Acesso à agenda de postagens</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="border-labor-200"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-labor-700 hover:bg-labor-800">
                      Acessar Agenda
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="overflow-hidden border-labor-200 shadow-lg">
                <CardHeader className="bg-labor-700 text-white py-4">
                  <h2 className="text-xl font-display font-semibold">Programação da Semana</h2>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ) : agendaPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-500">Nenhum item na agenda</h3>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {/* Card view for mobile */}
                      <div className="md:hidden">
                        {agendaPosts.map((post) => (
                          <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="bg-labor-100 text-labor-700 rounded-full p-2 flex-shrink-0">
                                {getTypeIcon(post.tipo)}
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-semibold text-labor-700">{formatDate(post.data)}</span>
                                  <span className="text-sm text-gray-500">({getDayOfWeek(post.data)})</span>
                                </div>
                                <h3 className="font-medium text-gray-800">{post.titulo}</h3>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{post.descricao}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className="bg-labor-100 text-labor-700 text-xs px-2 py-1 rounded-full">
                                    {post.tipo}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                                    {post.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Table view for desktop */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-labor-50">
                              <TableHead className="w-[120px]">Data</TableHead>
                              <TableHead className="w-[180px]">Dia</TableHead>
                              <TableHead>Título/Descrição</TableHead>
                              <TableHead className="w-[100px]">Tipo</TableHead>
                              <TableHead className="w-[100px]">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {agendaPosts.map((post) => (
                              <TableRow key={post.id} className="hover:bg-labor-50/50">
                                <TableCell className="font-medium text-labor-700">{formatDate(post.data)}</TableCell>
                                <TableCell>{getDayOfWeek(post.data)}</TableCell>
                                <TableCell>
                                  <div>
                                    <h3 className="font-medium text-gray-800">{post.titulo}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{post.descricao}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex items-center gap-1 bg-labor-100 text-labor-700 px-2 py-1 rounded-full text-xs">
                                    {getTypeIcon(post.tipo)}
                                    <span>{post.tipo}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                                    {post.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="bg-white rounded-lg shadow-lg p-6 border border-labor-200">
                <h3 className="text-lg font-semibold mb-4 text-labor-700">Legenda</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Feed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Reels/Stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Registro/Foto/Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Concluído
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                      Pendente
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
