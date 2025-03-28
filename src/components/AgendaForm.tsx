
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Check, Pencil, Trash2, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

const AgendaForm = ({ onSuccess, editingPost }: AgendaFormProps) => {
  const [date, setDate] = useState<Date | undefined>(
    editingPost ? new Date(editingPost.data) : undefined
  );
  const [title, setTitle] = useState(editingPost?.titulo || "");
  const [description, setDescription] = useState(editingPost?.descricao || "");
  const [type, setType] = useState(editingPost?.tipo || "Feed");
  const [status, setStatus] = useState(editingPost?.status || "Pendente");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.titulo);
      setDescription(editingPost.descricao);
      setType(editingPost.tipo);
      setStatus(editingPost.status);
      setDate(new Date(editingPost.data));
    }
  }, [editingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !title || !type) {
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
      
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from("agenda_posts")
          .update({
            data: formattedDate,
            titulo: title,
            descricao: description,
            tipo: type,
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
            tipo: type,
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
      setType("Feed");
      setStatus("Pendente");
      setDate(undefined);
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
            <label className="block text-sm font-medium">Tipo *</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Feed">Feed</SelectItem>
                <SelectItem value="Reels">Reels</SelectItem>
                <SelectItem value="Stories">Stories</SelectItem>
                <SelectItem value="Registro">Registro</SelectItem>
                <SelectItem value="Foto">Foto</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
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
