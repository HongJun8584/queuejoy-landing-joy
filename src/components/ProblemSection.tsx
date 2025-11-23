import queueCrowd from "@/assets/queue-crowd.png";
import queueOutdoor from "@/assets/queue-outdoor.png";
import { Clock, Users, TrendingDown, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Hospitals & Clinics",
    description: "Patients wait hours to register or see a doctor. Peak times mean congestion, stress, and dissatisfaction."
  },
  {
    icon: Users,
    title: "Banks & Service Counters",
    description: "Complex transactions + high traffic = long queues and low efficiency."
  },
  {
    icon: TrendingDown,
    title: "Fast Food & Coffee Shops",
    description: "Morning rush hours and lunch crowds slow down orders and frustrate loyal customers."
  },
  {
    icon: AlertCircle,
    title: "Public Transport & Events",
    description: "Crowded entrances create delays and safety risks at concerts, sports events, and transit hubs."
  }
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop losing customers to <span className="text-gradient">long lines</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From hospitals to concerts, waiting is frustrating — for your customers and your staff.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="scroll-reveal hover-lift">
            <img 
              src={queueCrowd} 
              alt="Large crowd waiting in queue at night" 
              className="w-full h-64 object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="scroll-reveal hover-lift" style={{ animationDelay: "0.1s" }}>
            <img 
              src={queueOutdoor} 
              alt="People waiting in organized outdoor queue" 
              className="w-full h-64 object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border/50 scroll-reveal hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
