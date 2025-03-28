
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from "react-share";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialShareProps {
  url: string;
  title?: string;
}

const SocialShare = ({ url, title = "Agenda de Postagens - Vereadora Neia Marques" }: SocialShareProps) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-labor-700 border-labor-200">
          <Share2 className="h-4 w-4 mr-1" /> Compartilhar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-labor-700">Compartilhar Agenda</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">Link para compartilhar:</span>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={url} 
                className="flex-1 p-2 text-sm border rounded-md"
              />
              <Button 
                onClick={handleCopyLink} 
                variant="outline" 
                className="text-labor-700"
              >
                Copiar
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">Compartilhar nas redes sociais:</span>
            <div className="flex justify-center gap-4 py-2">
              <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              
              <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              
              <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              
              <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;
