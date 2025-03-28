
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DeleteAgendaItemProps {
  postId: string;
  onSuccess: () => void;
}

const DeleteAgendaItem = ({ postId, onSuccess }: DeleteAgendaItemProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("agenda_posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;
      
      toast({
        title: "Item removido com sucesso",
        description: "O item da agenda foi removido permanentemente",
      });
      
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o item. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-8 text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover este item da agenda? 
            Esta ação não pode ser desfeita e o item será excluído permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Removendo..." : "Remover permanentemente"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAgendaItem;
