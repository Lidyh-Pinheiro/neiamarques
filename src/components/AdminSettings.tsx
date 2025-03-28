
import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface AdminSettingsProps {
  currentPassword: string;
  onPasswordChange: (newPassword: string) => void;
  onLogout: () => void;
}

const AdminSettings = ({ currentPassword, onPasswordChange, onLogout }: AdminSettingsProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não correspondem",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onPasswordChange(newPassword);
      toast({
        title: "Senha alterada",
        description: "A senha foi alterada com sucesso",
      });
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="border-labor-200 shadow-lg bg-white">
      <CardHeader className="bg-labor-700 text-white rounded-t-lg py-6">
        <h2 className="text-xl font-display font-semibold text-center">Configurações Administrativas</h2>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              readOnly
              className="pr-10 bg-gray-50"
            />
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a nova senha"
              className="border-labor-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              className="border-labor-200"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-labor-700 hover:bg-labor-800"
            disabled={isLoading || !newPassword || !confirmPassword}
          >
            {isLoading ? "Alterando..." : "Alterar Senha"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-200 pt-4 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-labor-700 border-labor-200"
          onClick={onLogout}
        >
          Voltar para Agenda
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminSettings;
