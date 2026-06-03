import { Code2, FileText, Lightbulb, X } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import type { Finding } from "../lib/mockData";

interface FindingDetailPanelProps {
  finding: Finding;
  onClose: () => void;
}

export function FindingDetailPanel({ finding, onClose }: FindingDetailPanelProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-8 animate-in slide-in-from-top-2 duration-300">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Evidence Trace */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Code2 className="w-4 h-4" />
            Evidence Trace
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs text-gray-100 font-mono whitespace-pre">
              {finding.evidence}
            </pre>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Copy Code
          </Button>
        </div>

        {/* Detection Reasoning */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FileText className="w-4 h-4" />
            Analysis Details
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-gray-700">Detection Method</div>
              <div className="text-gray-600">Static AST analysis</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">API Call Detected</div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
                {finding.algorithm}
              </code>
            </div>
            <div>
              <div className="font-medium text-gray-700">Usage Classification</div>
              <Badge variant="outline" className="mt-1">
                {finding.usageType}
              </Badge>
            </div>
            <div>
              <div className="font-medium text-gray-700">Vulnerability Analysis</div>
              <p className="text-gray-600 mt-1">{finding.reasoning}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">Risk Calculation</div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Base risk:</span>
                  <span className="font-mono">60</span>
                </div>
                <div className="flex justify-between">
                  <span>Exposure modifier:</span>
                  <span className="font-mono">+{finding.exposure === "NETWORK" ? 15 : 5}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tainted data:</span>
                  <span className="font-mono">+{finding.tainted ? 10 : 0}</span>
                </div>
                <div className="border-t pt-1 flex justify-between font-medium text-gray-900">
                  <span>Final risk:</span>
                  <span className="font-mono">{finding.riskScore}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Lightbulb className="w-4 h-4" />
            Migration Guidance
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-gray-700">Recommended PQC</div>
              <Badge className="mt-1 bg-blue-900 text-white">
                {finding.recommendedPQC}
              </Badge>
            </div>
            <div>
              <div className="font-medium text-gray-700">NIST Status</div>
              <div className="text-gray-600">Selected for standardization</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Security Level</div>
              <div className="text-gray-600">Level 3 (AES-192 equivalent)</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Migration Difficulty</div>
              <Badge variant="outline" className="mt-1 border-yellow-500 text-yellow-700">
                Medium
              </Badge>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">Confidence Score</div>
              <Progress value={finding.confidence} className="h-2" />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">
                  {finding.confidence}% confidence
                </span>
                <span className="text-xs font-medium text-green-600">High</span>
              </div>
            </div>
            <div className="pt-2 space-y-2">
              <p className="text-xs text-gray-600">
                High confidence based on:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-start gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Unambiguous API call</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Clear cryptographic context</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Standard library usage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-blue-200">
        <Button variant="outline" size="sm">
          Mark as False Positive
        </Button>
        <Button variant="outline" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={`https://github.com/user/repo/blob/main/${finding.file}#L${finding.line}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View File on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
