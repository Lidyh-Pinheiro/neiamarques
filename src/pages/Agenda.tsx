
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Agenda de Postagens</h1>
        
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-display font-semibold text-labor-700">Vereadora Neia Marques</h2>
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
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Programação da Semana</h2>
              
              {isLoading ? (
                <div className="text-center py-8">Carregando agenda...</div>
              ) : agendaPosts.length === 0 ? (
                <div className="text-center py-8">Nenhum item na agenda</div>
              ) : (
                <div className="space-y-6">
                  {agendaPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-labor-700 font-bold">{formatDate(post.data)}</span>
                            <span className="bg-labor-100 text-labor-700 text-xs px-2 py-1 rounded">
                              {post.tipo}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              post.status === 'Concluído' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {post.status}
                            </span>
                          </div>
                          <h3 className="font-medium mt-2">{post.titulo}</h3>
                          <p className="text-gray-600 mt-1 text-sm whitespace-pre-line">{post.descricao}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
