
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarView } from "@/components/ui/calendar";
import { Calendar, Clock, Instagram, Facebook, Twitter, LogOut, Share2, Edit, Trash2, Plus, Settings, Check, Camera } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AgendaForm from "@/components/AgendaForm";
import DeleteAgendaItem from "@/components/DeleteAgendaItem";
import SocialShare from "@/components/SocialShare";
import AdminSettings from "@/components/AdminSettings";

interface AgendaPost {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  tipo: string;
  status: string;
}

const TikTokIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M16.6 5.82C15.9165 5.03962 15.5697 4.03743 15.63 3.02C15.63 3.01 15.63 3 15.63 3H12.66V16.5C12.66 17.0636 12.4347 17.6042 12.031 18.0016C11.6273 18.3989 11.083 18.6139 10.52 18.6C9.36 18.6 8.4 17.7 8.32 16.56C8.26933 15.9038 8.48205 15.2571 8.90541 14.763C9.32876 14.2689 9.92944 13.9695 10.59 13.92C10.89 13.9 11.19 13.93 11.47 14.02V11.11C11.18 11.0517 10.8855 11.0185 10.59 11.01C9.28534 10.9728 8.01661 11.4052 7.02893 12.221C6.04125 13.0368 5.40838 14.1788 5.26 15.42C5.11162 16.6612 5.46752 17.9066 6.25016 18.9121C7.0328 19.9176 8.18537 20.6108 9.47 20.86C9.91 20.95 10.36 21 10.83 21C11.7 21 12.57 20.8 13.37 20.43C14.3721 19.9578 15.1975 19.1732 15.7224 18.1953C16.2473 17.2174 16.4436 16.0962 16.28 15C16.28 10.86 16.28 6.73 16.28 6.73C16.4259 6.77498 16.5772 6.81105 16.73 6.84C17.3556 7.02228 18.0143 7.0858 18.6666 7.02656C19.319 6.96732 19.9512 6.78657 20.53 6.49V3.74C19.674 4.14171 18.7251 4.34932 17.77 4.35C17.3703 4.3532 16.9728 4.31451 16.58 4.23C16.59 4.76 16.86 5.36 16.6 5.82Z"
      className="fill-current"
    />
  </svg>
);

// Function to get months in Portuguese
const getMonths = () => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2023, i, 1);
    months.push(format(date, 'MMMM', { locale: ptBR }));
  }
  return months;
};

const Agenda = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("123");
  const [agendaPosts, setAgendaPosts] = useState<AgendaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminSettings, setShowAdminSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
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
    if (password === adminPassword) {
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setShowAdminSettings(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu da área administrativa",
    });
  };

  const handlePasswordChange = (newPassword: string) => {
    setAdminPassword(newPassword);
  };

  const shareUrl = window.location.href;

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
    const typeIcons: Record<string, JSX.Element> = {
      feed: <Calendar className="h-4 w-4" />,
      reels: <Instagram className="h-4 w-4" />,
      stories: <Instagram className="h-4 w-4" />,
      registro: <Camera className="h-4 w-4" />,
      foto: <Camera className="h-4 w-4" />,
      card: <Camera className="h-4 w-4" />,
      facebook: <Facebook className="h-4 w-4" />,
      twitter: <Twitter className="h-4 w-4" />,
      tiktok: <TikTokIcon />
    };
    
    return typeIcons[type.toLowerCase()] || <Clock className="h-4 w-4" />;
  };

  const getMonthFilteredPosts = () => {
    if (!selectedMonth) return agendaPosts;
    
    return agendaPosts.filter(post => {
      const postDate = new Date(post.data);
      const postMonth = format(postDate, 'MMMM', { locale: ptBR });
      return postMonth === selectedMonth;
    });
  };

  const filteredPosts = selectedDate 
    ? agendaPosts.filter(post => {
        const postDate = new Date(post.data);
        return postDate.getDate() === selectedDate.getDate() && 
               postDate.getMonth() === selectedDate.getMonth() && 
               postDate.getFullYear() === selectedDate.getFullYear();
      })
    : getMonthFilteredPosts();

  const datesWithPosts = agendaPosts.map(post => new Date(post.data));

  const handleStatusChange = async (postId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("agenda_posts")
        .update({ status: newStatus })
        .eq("id", postId);

      if (error) throw error;
      
      toast({
        title: "Status atualizado",
        description: `O item foi marcado como ${newStatus}`,
      });
      
      setAgendaPosts(agendaPosts.map(post => 
        post.id === postId ? { ...post, status: newStatus } : post
      ));
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-labor-50/50 bg-opacity-80">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-display font-bold mb-4 text-labor-800">Agenda de Postagens</h1>
            <div className="divider mx-auto"></div>
            <p className="text-gray-600 mt-4 text-white">Confira a agenda de publicações</p>
            
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-labor-700 hover:text-labor-900 transition-colors">
                <TikTokIcon />
              </a>
            </div>
            
            <div className="mt-6 flex justify-center">
              <SocialShare url={shareUrl} />
            </div>
          </div>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto">
              <Card className="border-labor-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="bg-labor-700 text-white rounded-t-lg py-6">
                  <h2 className="text-xl font-display font-semibold text-center">Acesso Administrativo</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-display font-semibold text-labor-700">Vereadora Neia Marques</h3>
                      <p className="text-sm text-muted-foreground mt-2">Acompanhe a programação nas Redes Sociais da Vereadora Neia Marques</p>
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
          ) : showAdminSettings ? (
            <div className="max-w-md mx-auto">
              <AdminSettings 
                currentPassword={adminPassword}
                onPasswordChange={handlePasswordChange}
                onLogout={() => setShowAdminSettings(false)}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="bg-white rounded-lg shadow-md overflow-hidden border-labor-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="bg-labor-700 text-white py-4 flex flex-row justify-between items-center">
                  <div>
                    <h2 className="text-xl font-display font-semibold">Programação da Semana</h2>
                  </div>
                  <div className="flex gap-2">
                    <AgendaForm onSuccess={fetchAgendaPosts} />
                    
                    <Select 
                      value={selectedMonth} 
                      onValueChange={setSelectedMonth}
                    >
                      <SelectTrigger className="w-[140px] bg-white text-black">
                        <SelectValue placeholder="Filtrar mês" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os meses</SelectItem>
                        {getMonths().map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-red-600 text-white border-white/30 hover:bg-red-800 hover:text-white"
                      onClick={() => setShowAdminSettings(true)}
                    >
                      <Settings className="h-4 w-4 mr-1" /> Admin
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-red-600 text-white border-white/30 hover:bg-red-800 hover:text-white"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-1" /> Sair
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 block">
                      <Card className="border-labor-200 shadow-sm hover:shadow transition-shadow duration-300">
                        <CardHeader className="bg-labor-50 pb-2">
                          <h3 className="font-medium text-labor-700">Calendário</h3>
                        </CardHeader>
                        <CardContent>
                          <CalendarView
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                            modifiers={{
                              highlighted: datesWithPosts
                            }}
                            modifiersClassNames={{
                              highlighted: "bg-labor-100 font-bold text-labor-700"
                            }}
                          />
                          {selectedDate && (
                            <div className="mt-4 text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedDate(undefined)}
                                className="text-xs"
                              >
                                Limpar seleção
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className="border-labor-200 shadow-sm hover:shadow transition-shadow duration-300 mt-6">
                        <CardHeader className="bg-labor-50 pb-2">
                          <h3 className="font-medium text-labor-700">Legenda</h3>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                                <Calendar className="h-3 w-3" />
                              </div>
                              <span className="text-xs">Feed</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                                <Instagram className="h-3 w-3" />
                              </div>
                              <span className="text-xs">Reels/Stories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                                <Camera className="h-3 w-3" />
                              </div>
                              <span className="text-xs">Registro/Foto</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-labor-100 text-labor-700 rounded-full p-1.5">
                                <Facebook className="h-3 w-3" />
                              </div>
                              <span className="text-xs">Facebook</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                                Concluído
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">
                                Pendente
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="md:col-span-2">
                      {isLoading ? (
                        <div className="text-center py-12">
                          <div className="animate-pulse flex flex-col items-center">
                            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                            <div className="h-6 w-32 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-labor-200 p-6">
                          <h3 className="text-lg font-medium text-gray-500">
                            {selectedDate 
                              ? "Nenhum item agendado para esta data" 
                              : selectedMonth
                                ? `Nenhum item agendado para ${selectedMonth}`
                                : "Nenhum item na agenda"}
                          </h3>
                          <p className="text-gray-400 mt-2">
                            {selectedDate 
                              ? `${format(selectedDate, 'dd/MM/yyyy')} - ${getDayOfWeek(selectedDate.toISOString())}`
                              : "Adicione novos itens usando o botão acima"}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredPosts.map((post) => (
                            <Card key={post.id} className="bg-white border-labor-200 shadow-sm hover:shadow-md transition-all duration-300">
                              <CardHeader className="pb-2 flex flex-row justify-between">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-labor-700">{formatDate(post.data)}</span>
                                    <span className="text-xs text-gray-500">({getDayOfWeek(post.data)})</span>
                                  </div>
                                  <h3 className="font-medium text-gray-800 mt-1">{post.titulo}</h3>
                                </div>
                                <div className="flex space-x-1">
                                  <AgendaForm onSuccess={fetchAgendaPosts} editingPost={post} />
                                  <DeleteAgendaItem postId={post.id} onSuccess={fetchAgendaPosts} />
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                {post.descricao && (
                                  <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">{post.descricao}</p>
                                )}
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {post.tipo.split(",").map((type, idx) => (
                                    <span key={idx} className="bg-labor-100 text-labor-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                      {getTypeIcon(type)}
                                      {type}
                                    </span>
                                  ))}
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                  <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${getStatusColor(post.status)}`}>
                                    {post.status === "Concluído" && <Check className="h-3 w-3" />}
                                    {post.status}
                                  </span>
                                  
                                  <div className="flex items-center gap-2">
                                    <label className="flex items-center cursor-pointer text-xs text-gray-700">
                                      <input
                                        type="checkbox"
                                        checked={post.status === "Concluído"}
                                        onChange={() => handleStatusChange(
                                          post.id, 
                                          post.status === "Concluído" ? "Pendente" : "Concluído"
                                        )}
                                        className="rounded border-gray-300 text-labor-700 mr-1 focus:ring-labor-700"
                                      />
                                      Realizado
                                    </label>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white rounded-lg shadow-md overflow-hidden border-labor-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="bg-labor-50 py-3">
                  <h3 className="font-medium text-labor-700">Todos os Agendamentos</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-labor-50">
                          <TableHead className="w-[120px]">Data</TableHead>
                          <TableHead className="w-[180px]">Dia</TableHead>
                          <TableHead>Título/Descrição</TableHead>
                          <TableHead className="w-[150px]">Tipo</TableHead>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead className="w-[80px]">Ações</TableHead>
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
                              <div className="flex flex-wrap gap-1">
                                {post.tipo.split(",").map((type, idx) => (
                                  <div key={idx} className="inline-flex items-center gap-1 bg-labor-100 text-labor-700 px-2 py-1 rounded-full text-xs">
                                    {getTypeIcon(type)}
                                    <span>{type}</span>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                                  {post.status === "Concluído" && <Check className="h-3 w-3" />}
                                  {post.status}
                                </span>
                                <input
                                  type="checkbox"
                                  checked={post.status === "Concluído"}
                                  onChange={() => handleStatusChange(
                                    post.id, 
                                    post.status === "Concluído" ? "Pendente" : "Concluído"
                                  )}
                                  className="rounded border-gray-300 text-labor-700 focus:ring-labor-700"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <AgendaForm onSuccess={fetchAgendaPosts} editingPost={post} />
                                <DeleteAgendaItem postId={post.id} onSuccess={fetchAgendaPosts} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="md:hidden divide-y divide-gray-200">
                    {agendaPosts.map((post) => (
                      <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="bg-labor-100 text-labor-700 rounded-full p-2 flex-shrink-0">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-semibold text-labor-700">{formatDate(post.data)}</span>
                                <span className="text-sm text-gray-500">({getDayOfWeek(post.data)})</span>
                              </div>
                              <h3 className="font-medium text-gray-800">{post.titulo}</h3>
                              {post.descricao && (
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{post.descricao}</p>
                              )}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {post.tipo.split(",").map((type, idx) => (
                                  <span key={idx} className="bg-labor-100 text-labor-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    {getTypeIcon(type)}
                                    {type}
                                  </span>
                                ))}
                                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(post.status)}`}>
                                  {post.status === "Concluído" && <Check className="h-3 w-3" />}
                                  {post.status}
                                </span>
                              </div>
                              <div className="mt-2">
                                <label className="flex items-center cursor-pointer text-xs text-gray-700">
                                  <input
                                    type="checkbox"
                                    checked={post.status === "Concluído"}
                                    onChange={() => handleStatusChange(
                                      post.id, 
                                      post.status === "Concluído" ? "Pendente" : "Concluído"
                                    )}
                                    className="rounded border-gray-300 text-labor-700 mr-1 focus:ring-labor-700"
                                  />
                                  Realizado
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <AgendaForm onSuccess={fetchAgendaPosts} editingPost={post} />
                            <DeleteAgendaItem postId={post.id} onSuccess={fetchAgendaPosts} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
