"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Report {
  id: number;
  reportedUserId: number;
  reportedCourseId?: number;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export default function Report({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("access_token");
     
      setReport({
        id: parseInt(id),
        reportedUserId: 123,
        reportedCourseId: 456,
        description: "This is a detailed description of the report issue that needs to be addressed by the admin team.",
        status: "pending"
      });
    } catch (err: any) {
      setError("Failed to fetch report details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading report details...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!report) return <div style={{ padding: "20px" }}>Report not found</div>;

  return (
     <div className="container p-5 max-w-3xl mx-auto">
      <Image
        src="/reports.png"
        width={300}
        height={200}
        alt="Report details"
        className="mx-auto block"
      />
      
      <h1 className="text-center text-darker mt-4 mb-4">Report Details</h1>
      
      <div className="card p-5 rounded-lg shadow-md">
        <p className="text-dark"><strong className="text-darker">ID:</strong> {report.id}</p>
        <p className="text-dark"><strong className="text-darker">Reported User ID:</strong> {report.reportedUserId}</p>
        <p className="text-dark"><strong className="text-darker">Reported Course ID:</strong> {report.reportedCourseId || 'N/A'}</p>
        <p className="text-dark"><strong className="text-darker">Description:</strong> {report.description}</p>
        <p className="text-dark"><strong className="text-darker">Status:</strong> <span className={`status-${report.status}`}>{report.status}</span></p>
      </div>
      
      <div className="text-center mt-4">
        <Link href="/reports">
          <button>Back To Reports</button>
        </Link>
      </div>
    </div>
  );
}
