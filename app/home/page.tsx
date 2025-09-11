import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome To SkillSync Admin Dashboard</h1>
        <Image
          src="/skillsync.jpg"
          width={200}
          height={200}
          alt="SkillSync Logo"
        />
      </header>
      
      <h1>Admin Dashboard</h1>
      <nav className="nav-grid">
        <Link href="/users">
          <div className="nav-card">
            <h3>Manage Users</h3>
            <p>View, edit, and manage platform users</p>
          </div>
        </Link>
        
        <Link href="/courses">
          <div className="nav-card">
            <h3>Manage Courses</h3>
            <p>Approve, reject, and manage courses</p>
          </div>
        </Link>
        
        <Link href="/reviews">
          <div className="nav-card">
            <h3>Watch Reviews</h3>
            <p>Monitor and manage course reviews</p>
          </div>
        </Link>
        
        <Link href="/reports">
          <div className="nav-card">
            <h3>Manage Reports</h3>
            <p>Handle user and content reports</p>
          </div>
        </Link>
        
        <Link href="/notifications">
          <div className="nav-card">
            <h3>Manage Notifications</h3>
            <p>Send and manage system notifications</p>
          </div>
        </Link>
      </nav>
      
      <div className="text-center mt-8">
        <Link href="/login">
          <button className="danger">Logout</button>
        </Link>
      </div>
      
      <footer className="footer">
        <p>SkillSync Admin Panel v1.0</p>
      </footer>
    </div>
  );
}
