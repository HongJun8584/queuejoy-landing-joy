import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Bell, Users, ArrowRight, Check, Smartphone, ExternalLink } from "lucide-react";

export const InteractiveDemo = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [queueNumber, setQueueNumber] = useState("COFFEE001");
  const [currentServing, setCurrentServing] = useState("COFFEE000");
  const [showNotification, setShowNotification] = useState(false);

  const handleTakeNumber = () => {
    setStep(1);
    setQueueNumber("COFFEE003");
    setCurrentServing("COFFEE001");
  };

  const handleCallNext = () => {
    if (currentServing === "COFFEE001") {
      setCurrentServing("COFFEE002");
    } else if (currentServing === "COFFEE002") {
      setCurrentServing("COFFEE003");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleReset = () => {
    setStep(0);
    setQueueNumber("COFFEE001");
    setCurrentServing("COFFEE000");
    setShowNotification(false);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {t("demo.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {t("demo.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {t("demo.subtitle")}
          </p>
          
          {/* Live Demo Button */}
          <Button 
            size="lg" 
            className="rounded-full shadow-glow"
            asChild
          >
            <a href="https://queuejoy.netlify.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t("demo.liveDemo") || "Try Live Demo"}
            </a>
          </Button>
        </div>

        {/* Demo Interface */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer View */}
            <div className="relative">
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  {t("demo.customerView")}
                </span>
              </div>
              <div className="bg-card rounded-3xl border-4 border-gray-800 p-6 shadow-2xl relative overflow-hidden">
                {/* Notification */}
                {showNotification && (
                  <div className="absolute top-4 left-4 right-4 p-4 bg-green-500 text-white rounded-xl animate-bounce shadow-lg z-10">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      <span className="font-semibold">{t("demo.yourTurn")}</span>
                    </div>
                  </div>
                )}

                {step === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("demo.welcome")}</h3>
                    <p className="text-muted-foreground mb-6 text-sm">{t("demo.tapToJoin")}</p>
                    <Button onClick={handleTakeNumber} size="lg" className="rounded-full">
                      {t("demo.getNumber")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{t("demo.yourNumber")}</p>
                      <div className="text-4xl font-black text-primary">{queueNumber}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">{t("demo.nowServing")}</p>
                        <p className="text-lg font-bold">{currentServing}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">{t("demo.peopleAhead")}</p>
                        <p className="text-lg font-bold">
                          {Math.max(0, parseInt(queueNumber.slice(-1)) - parseInt(currentServing.slice(-1)))}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-green-500">
                      <Check className="w-4 h-4" />
                      <span>{t("demo.connected")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Staff View */}
            <div>
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  {t("demo.staffView")}
                </span>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">{t("demo.counterPanel")}</h4>
                  <div className="bg-muted/50 rounded-xl p-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">{t("demo.nowServing")}</p>
                    <p className="text-3xl font-black text-primary">{currentServing}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">{t("demo.lastIssued")}</p>
                      <p className="font-semibold">{queueNumber}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-muted-foreground text-xs">{t("demo.waiting")}</p>
                      <p className="font-semibold">
                        {step === 0 ? 0 : Math.max(0, parseInt(queueNumber.slice(-1)) - parseInt(currentServing.slice(-1)))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleCallNext} 
                    className="w-full rounded-xl"
                    disabled={step === 0 || currentServing === queueNumber}
                    size="lg"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {t("demo.callNext")}
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="w-full rounded-xl"
                    size="sm"
                  >
                    {t("demo.reset")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t("demo.instructions")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
