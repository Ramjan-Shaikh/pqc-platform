import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Github, Search, Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { mockAnalyses, type Analysis, type Status } from "../lib/mockData";
import { toast } from "sonner";

export function DashboardPage() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[]>(mockAnalyses);
  const [searchQuery, setSearchQuery] = useState("");

  const isValidGithubUrl =
    repoUrl.startsWith("https://github.com/") && repoUrl.split("/").length >= 5;

  const handleAnalyze = () => {
    if (!isValidGithubUrl) return;

    setIsAnalyzing(true);
    const repoName = repoUrl.replace("https://github.com/", "");

    setTimeout(() => {
      const newAnalysis: Analysis = {
        id: String(Date.now()),
        repository: repoName,
        status: "PENDING",
        startTime: "Just now",
      };

      setAnalyses([newAnalysis, ...analyses]);
      setRepoUrl("");
      setIsAnalyzing(false);
      toast.success("Analysis started", {
        description: `Analyzing ${repoName}`,
      });

      // Simulate status progression
      setTimeout(() => {
        setAnalyses((prev) =>
          prev.map((a) =>
            a.id === newAnalysis.id ? { ...a, status: "CLONING" as Status } : a
          )
        );
      }, 2000);

      setTimeout(() => {
        setAnalyses((prev) =>
          prev.map((a) =>
            a.id === newAnalysis.id ? { ...a, status: "ANALYZING" as Status } : a
          )
        );
      }, 4000);

      setTimeout(() => {
        setAnalyses((prev) =>
          prev.map((a) =>
            a.id === newAnalysis.id
              ? {
                  ...a,
                  status: "COMPLETED" as Status,
                  duration: "3m 12s",
                  riskScore: Math.floor(Math.random() * 100),
                }
              : a
          )
        );
        toast.success("Analysis completed", {
          description: `${repoName} analysis finished`,
        });
      }, 8000);
    }, 1000);
  };

  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.repository.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-screen-xl mx-auto p-6 space-y-6">
          {/* New Analysis Panel */}
          <Card>
            <CardHeader>
              <CardTitle>New Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repo-url">GitHub Repository URL</Label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="repo-url"
                        placeholder="https://github.com/username/repository"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className={`pl-10 h-12 ${
                          repoUrl && !isValidGithubUrl ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      disabled={!isValidGithubUrl || isAnalyzing}
                      className="h-12 px-6 bg-blue-900 hover:bg-blue-800"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Analyze Repository
                        </>
                      )}
                    </Button>
                  </div>
                  {repoUrl && !isValidGithubUrl && (
                    <p className="text-sm text-red-600">
                      Invalid GitHub URL format. Example: https://github.com/user/repo
                    </p>
                  )}
                  {!repoUrl && (
                    <p className="text-sm text-blue-600">Public repositories only</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle>Recent Analyses</CardTitle>
                  <span className="text-sm text-gray-500">
                    ({filteredAnalyses.length} total)
                  </span>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredAnalyses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No analyses yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Submit a repository above to get started
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Repository</TableHead>
                      <TableHead className="w-[140px] text-center">Status</TableHead>
                      <TableHead className="w-[160px]">Start Time</TableHead>
                      <TableHead className="w-[120px]">Duration</TableHead>
                      <TableHead className="w-[120px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAnalyses.map((analysis) => (
                      <TableRow
                        key={analysis.id}
                        className="cursor-pointer hover:bg-blue-50"
                      >
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-gray-500" />
                            {analysis.repository}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <StatusBadge status={analysis.status} />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {analysis.startTime}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {analysis.duration || "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {analysis.status === "COMPLETED" ? (
                            <Button
                              size="sm"
                              onClick={() => navigate(`/analysis/${analysis.id}`)}
                            >
                              View Results
                            </Button>
                          ) : analysis.status === "FAILED" ? (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Pending
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
