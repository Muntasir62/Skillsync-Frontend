"use client";
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

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:4000/admin/reports", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(response.data);
    } catch (err: any) {
      setError("Failed to fetch reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resolveReport = async (reportId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(`http://localhost:4000/admin/reports/${reportId}/resolve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: 'resolved' } : report
      ));
      alert("Report resolved successfully");
    } catch (err: any) {
      setError("Failed to resolve report");
      console.error(err);
    }
  };

  const dismissReport = async (reportId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://localhost:4000/admin/reports/${reportId}/dismiss`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: 'dismissed' } : report
      ));
      alert("Report dismissed successfully");
    } catch (err: any) {
      setError("Failed to dismiss report");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading reports...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/reports.png"
          width={300}
          height={300}
          alt="Report management"
        />
      </header>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Report Management</h1>
        <Link href="/home">
          <button>Back To Homepage</button>
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reported User ID</th>
            <th>Reported Course ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.reportedUserId}</td>
              <td>{report.reportedCourseId || 'N/A'}</td>
              <td>{report.description.substring(0, 50)}...</td>
              <td>
                <span className={`status-${report.status}`}>
                  {report.status}
                </span>
              </td>
              <td>
                {report.status === 'pending' && (
                  <>
                    <button onClick={() => resolveReport(report.id)}>
                      Resolve
                    </button>
                    <button onClick={() => dismissReport(report.id)}>
                      Dismiss
                    </button>
                  </>
                )}
              </td>
              <td>
                <Link href={`/reports/${report.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {reports.length === 0 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <p>No reports found.</p>
        </div>
      )}
    </div>
  );
}