import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Github,
  Download,
  RefreshCw,
  Search,
  ChevronRight,
  AlertTriangle,
  Shield,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { StatusBadge } from "../components/StatusBadge";
import { RiskMeter } from "../components/RiskMeter";
import { FindingDetailPanel } from "../components/FindingDetailPanel";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { mockFindings, type Finding } from "../lib/mockData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export function AnalysisResultPage() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<"risk" | "confidence" | null>("risk");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Mock data - in real app would fetch based on id
  const analysis = {
    id,
    repository: "facebook/react",
    status: "COMPLETED" as const,
    startTime: "May 12, 2026 14:23 UTC",
    completionTime: "May 12, 2026 14:25 UTC",
    duration: "2m 34s",
    jobId: "a3f8b2c1",
    riskScore: 67,
  };

  const findings = mockFindings;

  // Calculate statistics
  const highRiskCount = findings.filter((f) => f.riskScore >= 60).length;
  const mediumRiskCount = findings.filter((f) => f.riskScore >= 30 && f.riskScore < 60).length;
  const lowRiskCount = findings.filter((f) => f.riskScore < 30).length;

  // Filter findings
  let filteredFindings = findings.filter((finding) => {
    const matchesSearch =
      finding.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.algorithm.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "high" && finding.riskScore >= 60) ||
      (riskFilter === "medium" && finding.riskScore >= 30 && finding.riskScore < 60) ||
      (riskFilter === "low" && finding.riskScore < 30);

    return matchesSearch && matchesRisk;
  });

  // Sort findings
  if (sortColumn) {
    filteredFindings = [...filteredFindings].sort((a, b) => {
      const aVal = sortColumn === "risk" ? a.riskScore : a.confidence;
      const bVal = sortColumn === "risk" ? b.riskScore : b.confidence;
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });
  }

  // Chart data
  const riskDistributionData = [
    { name: "High Risk", value: highRiskCount, color: "#ef4444" },
    { name: "Medium Risk", value: mediumRiskCount, color: "#f59e0b" },
    { name: "Low Risk", value: lowRiskCount, color: "#10b981" },
  ];

  const algorithmData = Object.entries(
    findings.reduce((acc, f) => {
      acc[f.algorithm] = (acc[f.algorithm] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const exposureData = Object.entries(
    findings.reduce((acc, f) => {
      if (!acc[f.exposure]) {
        acc[f.exposure] = { high: 0, medium: 0, low: 0 };
      }
      if (f.riskScore >= 60) acc[f.exposure].high++;
      else if (f.riskScore >= 30) acc[f.exposure].medium++;
      else acc[f.exposure].low++;
      return acc;
    }, {} as Record<string, { high: number; medium: number; low: number }>)
  ).map(([name, counts]) => ({ name, ...counts }));

  const handleSort = (column: "risk" | "confidence") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 60) return "text-red-600 bg-red-50";
    if (score >= 30) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-screen-2xl mx-auto p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/dashboard" className="hover:text-gray-900">
                Dashboard
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Analysis Results</span>
            </div>

            {/* Status and Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Analysis Status Card */}
              <Card className="lg:col-span-2 border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-gray-500" />
                    <a
                      href={`https://github.com/${analysis.repository}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-blue-900 hover:underline"
                    >
                      {analysis.repository}
                    </a>
                  </div>

                  <div>
                    <StatusBadge status={analysis.status} size="lg" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Started</div>
                      <div className="text-gray-900">{analysis.startTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Completed</div>
                      <div className="text-gray-900">{analysis.completionTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Duration</div>
                      <div className="text-gray-900 font-mono">{analysis.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Job ID</div>
                      <div className="text-gray-900 font-mono text-xs">
                        {analysis.jobId}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Re-analyze
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Summary Card */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg">Quantum Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                      <RiskMeter score={analysis.riskScore} />
                    </div>

                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-gray-900">
                            {findings.length}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
                            <FileText className="w-4 h-4" />
                            Total
                          </div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-red-600">
                            {highRiskCount}
                          </div>
                          <div className="text-sm text-red-700 mt-1 flex items-center justify-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            High
                          </div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-yellow-600">
                            {mediumRiskCount}
                          </div>
                          <div className="text-sm text-yellow-700 mt-1 flex items-center justify-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            Medium
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {lowRiskCount}
                          </div>
                          <div className="text-sm text-green-700 mt-1 flex items-center justify-center gap-1">
                            <Shield className="w-4 h-4" />
                            Low
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-900 font-medium">
                          {highRiskCount} high-risk cryptographic vulnerabilities detected
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          Immediate migration to PQC algorithms recommended
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Visualization Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Risk Distribution */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Risk Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2 text-xs">
                      {riskDistributionData.map((item) => (
                        <div key={item.name} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-600">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Algorithm Distribution */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Algorithm Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={algorithmData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 11 }} />
                        <RechartsTooltip />
                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Exposure Distribution */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Exposure Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={exposureData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11 }} />
                        <RechartsTooltip />
                        <Bar dataKey="high" stackId="a" fill="#ef4444" key="bar-high" />
                        <Bar dataKey="medium" stackId="a" fill="#f59e0b" key="bar-medium" />
                        <Bar dataKey="low" stackId="a" fill="#10b981" key="bar-low" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-3 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-red-500" />
                        <span className="text-gray-600">High</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-yellow-500" />
                        <span className="text-gray-600">Medium</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span className="text-gray-600">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Findings Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CardTitle>Detailed Findings</CardTitle>
                    <Badge variant="outline">{filteredFindings.length} findings</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search file, algorithm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full sm:w-64"
                      />
                    </div>
                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risks</SelectItem>
                        <SelectItem value="high">High Only</SelectItem>
                        <SelectItem value="medium">Medium Only</SelectItem>
                        <SelectItem value="low">Low Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">#</TableHead>
                        <TableHead className="w-[200px]">File</TableHead>
                        <TableHead className="w-16 text-center">Line</TableHead>
                        <TableHead className="w-[120px]">Algorithm</TableHead>
                        <TableHead className="w-20 text-center">
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">Key Size</TooltipTrigger>
                            <TooltipContent>Cryptographic key size in bits</TooltipContent>
                          </Tooltip>
                        </TableHead>
                        <TableHead className="w-[100px] text-center">
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">Exposure</TooltipTrigger>
                            <TooltipContent>
                              How the cryptographic material is exposed
                            </TooltipContent>
                          </Tooltip>
                        </TableHead>
                        <TableHead className="w-20 text-center">
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">Tainted</TooltipTrigger>
                            <TooltipContent>
                              Data flows from untrusted external source
                            </TooltipContent>
                          </Tooltip>
                        </TableHead>
                        <TableHead
                          className="w-[100px] text-center cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("risk")}
                        >
                          <div className="flex items-center justify-center gap-1">
                            Risk
                            {sortColumn === "risk" && (
                              sortDirection === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="w-[120px]">Usage</TableHead>
                        <TableHead className="w-[180px]">Recommended PQC</TableHead>
                        <TableHead
                          className="w-[100px] text-center cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("confidence")}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Tooltip>
                              <TooltipTrigger className="cursor-help">Confidence</TooltipTrigger>
                              <TooltipContent>
                                Algorithm's confidence in detection accuracy
                              </TooltipContent>
                            </Tooltip>
                            {sortColumn === "confidence" && (
                              sortDirection === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="w-20"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFindings.map((finding, index) => (
                        <>
                          <TableRow
                            key={finding.id}
                            className="cursor-pointer hover:bg-blue-50"
                            onClick={() =>
                              setExpandedRow(expandedRow === finding.id ? null : finding.id)
                            }
                          >
                            <TableCell className="text-center text-gray-500 text-sm">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              <Tooltip>
                                <TooltipTrigger className="truncate block max-w-[200px]">
                                  {finding.file}
                                </TooltipTrigger>
                                <TooltipContent>{finding.file}</TooltipContent>
                              </Tooltip>
                            </TableCell>
                            <TableCell className="text-center font-mono text-xs">
                              {finding.line}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono text-xs">
                                {finding.algorithm}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {finding.keySize} bits
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="secondary"
                                className={
                                  finding.exposure === "NETWORK"
                                    ? "bg-red-100 text-red-700"
                                    : finding.exposure === "FILE"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-blue-100 text-blue-700"
                                }
                              >
                                {finding.exposure}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {finding.tainted ? (
                                <span className="text-red-600">✓</span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div
                                className={`inline-flex items-center justify-center px-2 py-1 rounded font-semibold text-sm ${getRiskColor(
                                  finding.riskScore
                                )}`}
                              >
                                {finding.riskScore}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {finding.usageType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-blue-900 text-white text-xs">
                                {finding.recommendedPQC}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${
                                        finding.confidence >= 85
                                          ? "bg-green-500"
                                          : finding.confidence >= 70
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}
                                      style={{ width: `${finding.confidence}%` }}
                                    />
                                  </div>
                                </div>
                                <span className="text-xs text-gray-600 w-8">
                                  {finding.confidence}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {expandedRow === finding.id ? (
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </TableCell>
                          </TableRow>
                          {expandedRow === finding.id && (
                            <TableRow>
                              <TableCell colSpan={12} className="p-0">
                                <FindingDetailPanel
                                  finding={finding}
                                  onClose={() => setExpandedRow(null)}
                                />
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredFindings.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-600">No findings match your filters</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("");
                        setRiskFilter("all");
                      }}
                      className="mt-2"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}