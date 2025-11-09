import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileCheck, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: FileCheck,
      title: "No Paperwork",
      description: "Digital loan processing with minimal documentation required",
    },
    {
      icon: Zap,
      title: "Instant Decision",
      description: "Get loan approval decisions in minutes, not days",
    },
    {
      icon: ShieldCheck,
      title: "Automated Sanction",
      description: "Receive your sanction letter instantly upon approval",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/95 to-accent/10" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Zap className="w-4 h-4" />
                Powered by Agentic AI
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Get Instant Personal Loan
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Approval
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of lending with our AI-powered loan assistant. 
              Get pre-approved in minutes with intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 group shadow-lg hover:shadow-xl"
                onClick={() => navigate("/chat")}
              >
                Try Chatbot Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Our AI Loan Assistant?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience seamless loan processing with cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple Three-Step Process
              </h2>
              <p className="text-xl text-muted-foreground">
                From application to approval in minutes
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Share Your Requirements",
                  description: "Tell our AI assistant your loan amount and tenure preferences",
                },
                {
                  step: "02",
                  title: "Instant Verification",
                  description: "We automatically verify your KYC and fetch your credit score",
                },
                {
                  step: "03",
                  title: "Get Approved",
                  description: "Receive instant approval and your sanction letter within minutes",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Experience the fastest and most intelligent loan approval process
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 mt-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              onClick={() => navigate("/chat")}
            >
              Start Your Application Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
