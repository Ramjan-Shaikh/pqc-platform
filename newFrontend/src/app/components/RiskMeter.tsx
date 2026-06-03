import { useEffect, useState } from "react";

interface RiskMeterProps {
  score: number;
}

export function RiskMeter({ score }: RiskMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getRiskLevel = (score: number) => {
    if (score < 30) return { label: "LOW RISK", color: "text-green-600" };
    if (score < 60) return { label: "MEDIUM RISK", color: "text-yellow-600" };
    return { label: "HIGH RISK", color: "text-red-600" };
  };

  const riskLevel = getRiskLevel(score);
  const rotation = (animatedScore / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32">
        {/* Background arc */}
        <svg
          className="w-full h-full"
          viewBox="0 0 200 100"
          style={{ overflow: "visible" }}
        >
          {/* Background track */}
          <path
            d="M 20,90 A 80,80 0 0,1 180,90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Gradient colored track */}
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M 20,90 A 80,80 0 0,1 180,90"
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            style={{
              strokeDasharray: "251.2",
              strokeDashoffset: 251.2 - (animatedScore / 100) * 251.2,
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            stroke="#1f2937"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              transformOrigin: "100px 90px",
              transform: `rotate(${rotation}deg)`,
              transition: "transform 1s ease-out",
            }}
          />
          <circle cx="100" cy="90" r="4" fill="#1f2937" />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{animatedScore}</div>
            <div className="text-sm text-gray-500 mt-1">Risk Score</div>
          </div>
        </div>
      </div>

      {/* Risk level badge */}
      <div className="mt-6">
        <div
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            score < 30
              ? "bg-green-100 text-green-700"
              : score < 60
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {riskLevel.label}
        </div>
      </div>
    </div>
  );
}
