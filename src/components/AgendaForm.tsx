
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Check, Pencil, Trash2, Plus, Facebook, Instagram, Twitter, MessageSquare, Camera } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AgendaPost {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  tipo: string;
  status: string;
}

interface AgendaFormProps {
  onSuccess: () => void;
  editingPost?: AgendaPost | null;
}

// Custom TikTok icon since it's not in lucide-react
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

const postTypeOptions = [
  { value: "Feed", label: "Feed", icon: <MessageSquare className="h-4 w-4" /> },
  { value: "Reels", label: "Reels", icon: <Instagram className="h-4 w-4" /> },
  { value: "Stories", label: "Stories", icon: <Instagram className="h-4 w-4" /> },
  { value: "Registro", label: "Registro", icon: <Camera className="h-4 w-4" /> },
  { value: "Foto", label: "Foto", icon: <Camera className="h-4 w-4" /> },
  { value: "Card", label: "Card", icon: <Camera className="h-4 w-4" /> },
];

const socialPlatforms = [
  { id: "instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  { id: "facebook", label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
  { id: "twitter", label: "Twitter", icon: <Twitter className="h-4 w-4" /> },
  { id: "tiktok", label: "TikTok", icon: <TikTokIcon /> },
];

const AgendaForm = ({ onSuccess, editingPost }: AgendaFormProps) => {
  const [date, setDate] = useState<Date | undefined>(
    editingPost ? new Date(editingPost.data) : undefined
  );
  const [title, setTitle] = useState(editingPost?.titulo || "");
  const [description, setDescription] = useState(editingPost?.descricao || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    editingPost?.tipo ? editingPost.tipo.split(",") : ["Feed"]
  );
  const [customType, setCustomType] = useState("");
  const [status, setStatus] = useState(editingPost?.status || "Pendente");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.titulo);
      setDescription(editingPost.descricao);
      setSelectedTypes(editingPost.tipo.split(","));
      setStatus(editingPost.status);
      setDate(new Date(editingPost.data));
    }
  }, [editingPost]);

  const handleTypeChange = (value: string[]) => {
    setSelectedTypes(value);
  };

  const handleAddCustomType = () => {
    if (customType && !selectedTypes.includes(customType)) {
      setSelectedTypes([...selectedTypes, customType]);
      setCustomType("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !title || selectedTypes.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const combinedTypes = selectedTypes.join(",");
      
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from("agenda_posts")
          .update({
            data: formattedDate,
            titulo: title,
            descricao: description,
            tipo: combinedTypes,
            status: status,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        
        toast({
          title: "Atualizado com sucesso",
          description: "O item da agenda foi atualizado",
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from("agenda_posts")
          .insert({
            data: formattedDate,
            titulo: title,
            descricao: description,
            tipo: combinedTypes,
            status: status,
          });

        if (error) throw error;
        
        toast({
          title: "Criado com sucesso",
          description: "Um novo item foi adicionado à agenda",
        });
      }
      
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedTypes(["Feed"]);
      setStatus("Pendente");
      setDate(undefined);
      setSelectedPlatforms([]);
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o item da agenda",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingPost ? (
          <Button variant="ghost" size="sm" className="p-1 h-8 text-labor-700 hover:bg-labor-100">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-labor-700 hover:bg-labor-800">
            <Plus className="mr-1 h-4 w-4" /> Novo Agendamento
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-labor-700">
            {editingPost ? "Editar Agendamento" : "Novo Agendamento"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Data *</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Título *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da postagem"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Descrição</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da postagem"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tipo de Conteúdo *</label>
            <ToggleGroup 
              type="multiple" 
              variant="outline"
              value={selectedTypes}
              onValueChange={handleTypeChange}
              className="flex flex-wrap gap-1"
            >
              {postTypeOptions.map((option) => (
                <ToggleGroupItem 
                  key={option.value} 
                  value={option.value}
                  className="flex items-center gap-1 text-xs"
                >
                  {option.icon}
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            
            <div className="flex gap-2 mt-2">
              <Input
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Adicionar outro tipo"
                className="text-sm"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddCustomType}
                disabled={!customType}
              >
                Adicionar
              </Button>
            </div>
            
            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTypes.filter(type => !postTypeOptions.some(opt => opt.value === type)).map((type) => (
                  <div key={type} className="bg-labor-100 text-labor-700 px-2 py-1 rounded-full text-xs flex items-center">
                    {type}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 text-labor-700"
                      onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Plataformas</label>
            <div className="grid grid-cols-2 gap-2">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPlatforms([...selectedPlatforms, platform.id]);
                      } else {
                        setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={platform.id}
                    className="text-sm font-medium leading-none flex items-center gap-1 cursor-pointer"
                  >
                    {platform.icon}
                    {platform.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="status-pendente"
                  checked={status === "Pendente"}
                  onChange={() => setStatus("Pendente")}
                  className="accent-labor-700"
                />
                <label htmlFor="status-pendente" className="text-sm font-medium leading-none cursor-pointer">
                  Pendente
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="status-concluido"
                  checked={status === "Concluído"}
                  onChange={() => setStatus("Concluído")}
                  className="accent-labor-700"
                />
                <label htmlFor="status-concluido" className="text-sm font-medium leading-none cursor-pointer">
                  Concluído
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-labor-700 hover:bg-labor-800"
              disabled={loading}
            >
              {loading ? "Salvando..." : editingPost ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgendaForm;
