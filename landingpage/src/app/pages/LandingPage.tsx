import { Shield, Github, Lock, FileSearch, Brain, Target, CheckCircle, ArrowRight, Zap, Server, Code, Database } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-900" />
            <span className="font-semibold text-lg text-gray-900">CryptoGuard</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm">
                <Shield className="w-4 h-4" />
                Research-Grade Security Analysis
              </div>
              <h1 className="text-5xl font-semibold text-gray-900 leading-tight">
                Detect Quantum-Vulnerable Cryptography in GitHub Repositories
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Static analysis platform that identifies quantum-risky cryptographic implementations, computes risk scores, and recommends post-quantum cryptography migration strategies.
              </p>
              <div className="flex gap-4 pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-blue-900 hover:bg-blue-800 h-12 px-6">
                    Analyze Repository
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-2xl border-gray-200">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">Analysis Results</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm opacity-90">Quantum Risk Score</span>
                          <span className="text-2xl font-semibold">78/100</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: "78%" }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-2xl font-semibold">12</div>
                          <div className="text-xs opacity-90 mt-1">Findings</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-2xl font-semibold">8</div>
                          <div className="text-xs opacity-90 mt-1">High Risk</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-2xl font-semibold">94%</div>
                          <div className="text-xs opacity-90 mt-1">Confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="font-mono text-sm text-gray-900">RSA-2048</div>
                        <div className="text-sm text-gray-600">Signature algorithm vulnerable to Shor's algorithm</div>
                      </div>
                      <div className="text-sm font-semibold text-red-600">High</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="font-mono text-sm text-gray-900">ECDSA</div>
                        <div className="text-sm text-gray-600">Quantum vulnerable elliptic curve signature</div>
                      </div>
                      <div className="text-sm font-semibold text-yellow-600">Medium</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Built for Security Researchers & Engineers
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Context-aware static analysis with flow-sensitive evidence tracing, confidence scoring, and explainable PQC recommendations
          </p>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileSearch className="w-6 h-6 text-blue-900" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Static Analysis</div>
                <div className="text-sm text-gray-600">Flow-sensitive tracking</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-900" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Risk Scoring</div>
                <div className="text-sm text-gray-600">Exposure-aware computation</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-900" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Evidence Trace</div>
                <div className="text-sm text-gray-600">Explainable reasoning</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-900" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">PQC Migration</div>
                <div className="text-sm text-gray-600">Kyber/Dilithium recommendations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Automated quantum vulnerability analysis in five simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Submit Repository",
                description: "Provide GitHub repository URL",
                icon: Github,
              },
              {
                step: "2",
                title: "Static Analysis",
                description: "Code analysis engine runs",
                icon: FileSearch,
              },
              {
                step: "3",
                title: "Risk Calculation",
                description: "Quantum risk score computed",
                icon: Target,
              },
              {
                step: "4",
                title: "Generate Evidence",
                description: "Findings and traces created",
                icon: Brain,
              },
              {
                step: "5",
                title: "PQC Recommendations",
                description: "Migration strategies provided",
                icon: Lock,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-blue-900 font-semibold mb-2">Step {item.step}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive quantum vulnerability detection and migration planning
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileSearch,
                title: "Context-Aware Static Analysis",
                description: "Tracks how cryptographic APIs are used throughout your codebase with flow-sensitive analysis to understand real-world usage patterns.",
              },
              {
                icon: Target,
                title: "Quantum Risk Scoring",
                description: "Exposure-aware risk computation that evaluates algorithm vulnerability, key sizes, and usage context to generate accurate risk assessments.",
              },
              {
                icon: Lock,
                title: "PQC Migration Recommendations",
                description: "Suggests CRYSTALS-Kyber and CRYSTALS-Dilithium replacements for quantum-vulnerable algorithms with detailed implementation guidance.",
              },
              {
                icon: Brain,
                title: "Evidence Trace & Confidence Scores",
                description: "Explainable reasoning engine that shows exactly how findings were detected, with confidence metrics for each analysis result.",
              },
              {
                icon: Github,
                title: "GitHub Repository Analysis",
                description: "Analyze public GitHub repositories directly. Clone, scan, and generate comprehensive reports without manual setup.",
              },
              {
                icon: Zap,
                title: "Real-Time Analysis",
                description: "Fast, automated scanning pipeline with status tracking from cloning through analysis to final results generation.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Findings Explainability */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Transparent, Explainable Findings
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every finding includes detailed evidence traces showing exactly how the vulnerability was detected, classified, and scored.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    title: "Complete Evidence Chain",
                    description: "Step-by-step trace from detection to classification",
                  },
                  {
                    icon: Target,
                    title: "Confidence Scoring",
                    description: "Statistical confidence metrics for each finding",
                  },
                  {
                    icon: Brain,
                    title: "Auditability",
                    description: "Full transparency for security review and compliance",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Algorithm</span>
                      <span className="font-mono text-sm font-semibold text-gray-900">RSA-2048</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Usage Context</span>
                      <span className="font-mono text-sm font-semibold text-gray-900">SIGNATURE</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className="text-2xl font-semibold text-red-600">88/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="text-lg font-semibold text-blue-900">92%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Evidence Trace</h4>
                    <div className="space-y-3">
                      {[
                        'Detected Signature.getInstance("SHA256withRSA")',
                        "Classified as SIGNATURE usage context",
                        "RSA marked as quantum vulnerable (Shor's algorithm)",
                        "Recommended migration: CRYSTALS-Dilithium",
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="w-12 h-12 text-blue-900 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Secure, Isolated Analysis
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your code is analyzed in isolated, ephemeral environments with automatic cleanup after analysis completion.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                "Repositories analyzed in isolated containers",
                "Temporary processing with automatic cleanup",
                "Secure authentication and access control",
                "No persistent storage of source code",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-6 border-y border-gray-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">Technology Stack</h3>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {[
              { icon: Code, name: "Java" },
              { icon: Github, name: "GitHub" },
              { icon: Code, name: "React" },
              { icon: Server, name: "Node.js" },
              { icon: Database, name: "PostgreSQL" },
              { icon: Server, name: "Redis" },
            ].map((tech, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <tech.icon className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-sm text-gray-600">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">
            Start Analyzing Your Repository
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Identify quantum-vulnerable cryptography before it becomes a threat
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 h-12 px-8">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-300">CryptoGuard</span>
            </div>
            <div className="flex gap-8">
              <a href="https://github.com" className="hover:text-gray-300 transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                About
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2026 CryptoGuard. Research-grade quantum vulnerability analysis platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
