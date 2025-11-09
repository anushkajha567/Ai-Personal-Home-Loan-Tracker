import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2, CheckCircle2, XCircle, FileText, User, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface CustomerData {
  name: string;
  pan: string;
  phone: string;
  email: string;
  creditScore?: number;
  kycVerified: boolean;
}

interface LoanStatus {
  stage: "initial" | "kyc" | "credit" | "underwriting" | "approved" | "rejected";
  loanAmount?: number;
  tenure?: number;
  interestRate?: number;
  sanctionLetter?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Loan Assistant. I can help you get instant personal loan approval. How much loan amount do you need?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "Rajesh Kumar",
    pan: "ABCDE1234F",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    kycVerified: false,
  });
  const [loanStatus, setLoanStatus] = useState<LoanStatus>({
    stage: "initial",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgenticFlow = async (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Stage 1: Collect loan amount
    if (loanStatus.stage === "initial") {
      const amountMatch = userMessage.match(/(\d+)/);
      if (amountMatch) {
        const amount = parseInt(amountMatch[1]);
        setLoanStatus(prev => ({ ...prev, loanAmount: amount }));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        addMessage("assistant", `Great! You're requesting ₹${amount.toLocaleString()}. What tenure would you prefer? (e.g., 12, 24, 36 months)`);
        setLoanStatus(prev => ({ ...prev, stage: "kyc" }));
      } else {
        addMessage("assistant", "Please provide a loan amount (e.g., 500000 or 5 lakh)");
      }
      return;
    }

    // Stage 2: Collect tenure and verify KYC
    if (loanStatus.stage === "kyc") {
      const tenureMatch = userMessage.match(/(\d+)/);
      if (tenureMatch) {
        const tenure = parseInt(tenureMatch[1]);
        setLoanStatus(prev => ({ ...prev, tenure }));
        
        addMessage("assistant", "Perfect! Let me verify your KYC details...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate KYC verification
        setCustomerData(prev => ({ ...prev, kycVerified: true }));
        toast.success("KYC Verified Successfully ✅");
        
        addMessage("assistant", "KYC verification successful! Now fetching your credit score...");
        setLoanStatus(prev => ({ ...prev, stage: "credit" }));
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate credit score fetch
        const creditScore = 750;
        setCustomerData(prev => ({ ...prev, creditScore }));
        toast.success("Credit Score Fetched 📊");
        
        addMessage("assistant", `Your credit score is ${creditScore}. Excellent! Let me process your loan application...`);
        setLoanStatus(prev => ({ ...prev, stage: "underwriting" }));
        
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Simulate underwriting
        const approved = creditScore >= 700;
        if (approved) {
          const interestRate = 10.5;
          setLoanStatus(prev => ({ 
            ...prev, 
            stage: "approved",
            interestRate 
          }));
          toast.success("Loan Approved ✅");
          
          addMessage("assistant", 
            `Congratulations! Your loan of ₹${loanStatus.loanAmount?.toLocaleString()} for ${tenure} months has been approved at ${interestRate}% interest rate. Generating your sanction letter...`
          );
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setLoanStatus(prev => ({ 
            ...prev, 
            sanctionLetter: "/sample-sanction-letter.pdf"
          }));
          
          addMessage("assistant", 
            "Your sanction letter has been generated! You can download it from the status panel on the right. Is there anything else I can help you with?"
          );
        } else {
          setLoanStatus(prev => ({ ...prev, stage: "rejected" }));
          toast.error("Loan Rejected ❌");
          
          addMessage("assistant", 
            "I'm sorry, but we cannot approve your loan at this time due to credit score requirements. You may reapply after 6 months or consider a lower loan amount."
          );
        }
      } else {
        addMessage("assistant", "Please provide a tenure in months (e.g., 12, 24, or 36)");
      }
      return;
    }

    // Default response for approved/rejected stage
    addMessage("assistant", "Your loan application has been processed. Is there anything else I can help you with?");
  };

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    addMessage("user", userMessage);
    setInput("");
    setIsLoading(true);

    try {
      await simulateAgenticFlow(userMessage);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusColor = () => {
    switch (loanStatus.stage) {
      case "approved":
        return "text-success";
      case "rejected":
        return "text-destructive";
      default:
        return "text-warning";
    }
  };

  const getStatusText = () => {
    switch (loanStatus.stage) {
      case "initial":
        return "Awaiting Details";
      case "kyc":
        return "Collecting Information";
      case "credit":
        return "Verifying Credit Score";
      case "underwriting":
        return "Processing Application";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Loan Assistant
          </h1>
          <p className="text-muted-foreground mt-2">
            Get instant loan approval through our intelligent assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <Card className="lg:col-span-2 p-6 shadow-lg">
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      } animate-fade-in`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Customer KYC Data */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Customer Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{customerData.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">PAN</p>
                  <p className="font-medium">{customerData.pan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{customerData.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{customerData.email}</p>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2">
                    {customerData.kycVerified ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">KYC Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">KYC Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Credit Score */}
            {customerData.creditScore && (
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Credit Assessment</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {customerData.creditScore}
                  </div>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <p className="text-sm text-success mt-2">Excellent</p>
                </div>
              </Card>
            )}

            {/* Loan Status */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Application Status</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className={`font-medium ${getStatusColor()}`}>
                    {getStatusText()}
                  </p>
                </div>
                {loanStatus.loanAmount && (
                  <div>
                    <p className="text-muted-foreground">Loan Amount</p>
                    <p className="font-medium">₹{loanStatus.loanAmount.toLocaleString()}</p>
                  </div>
                )}
                {loanStatus.tenure && (
                  <div>
                    <p className="text-muted-foreground">Tenure</p>
                    <p className="font-medium">{loanStatus.tenure} months</p>
                  </div>
                )}
                {loanStatus.interestRate && (
                  <div>
                    <p className="text-muted-foreground">Interest Rate</p>
                    <p className="font-medium">{loanStatus.interestRate}% per annum</p>
                  </div>
                )}
                {loanStatus.sanctionLetter && (
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-success to-success/80"
                    onClick={() => toast.success("Sanction letter download started!")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download Sanction Letter
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
