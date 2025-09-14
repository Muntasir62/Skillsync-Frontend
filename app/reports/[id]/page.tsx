"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Report {
  id: number;
  title: string;
  description: string;
  reportType: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export default function ReportDetails() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/admin/reports/${params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setReport(response.data);
      } catch (err: any) {
        console.error("Error fetching report:", err);
        setError(err.response?.data?.message || "Failed to fetch report details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

  if (loading) return <div className="p-6">Loading report details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!report) return <div className="p-6">Report not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Report Details</h1>
        <Image
          src="/reports.png"
          width={200}
          height={200}
          alt="Report details"
          className="mx-auto"
        />
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="font-semibold text-white">ID:</div>
          <div className="text-white">{report.id}</div>

          <div className="font-semibold text-white">Title:</div>
          <div className="text-white">{report.title}</div>

          <div className="font-semibold text-white">Description:</div>
          <div className="text-white">{report.description}</div>

         

          <div className="font-semibold text-white">Status:</div>
          <div>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              report.status === 'resolved' 
                ? "bg-green-600 text-white border-2 border-green-700"
                : "bg-yellow-600 text-white border-2 border-yellow-700"
            }`}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
          </div>

          

          {report.resolvedAt && (
            <>
              <div className="font-semibold text-white">Resolved At:</div>
              <div className="text-white">
                {new Date(report.resolvedAt).toLocaleString()}
              </div>
            </>
          )}

          {report.resolution && (
            <>
              <div className="font-semibold text-white">Resolution:</div>
              <div className="text-white">{report.resolution}</div>
            </>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Link href="/reports" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Reports
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}