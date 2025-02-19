import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdWork, MdAdminPanelSettings } from "react-icons/md";

const initialJobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "Tech Corp Inc.",
    description: "Looking for a passionate developer...",
    status: "Active"
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studios",
    description: "Creative designer needed for innovative projects...",
    status: "Pending"
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Global Solutions",
    description: "Experienced project manager for tech initiatives...",
    status: "Active"
  }
];

const JobPostings = ({ setCurrentView, setSelectedJobId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialJobs.map((job) => (
        <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{job.company}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{job.description}</p>
          <div className="mt-4">
            <button 
              onClick={() => {
                setSelectedJobId(job.id);
                setCurrentView("application");
              }} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminPanel = ({ jobs, setJobs, applications, setApplications }) => {
  const [activeTab, setActiveTab] = useState("postings");

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  const handleApplicationStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("postings")}
          className={`px-4 py-2 rounded ${activeTab === "postings" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          Job Postings
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded ${activeTab === "applications" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
        >
          Applications
        </button>
      </div>

      <div className="overflow-x-auto">
        {activeTab === "postings" ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{job.company}</td>
                  <td className="px-4 py-2">{job.title}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${job.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleStatusChange(job.id, "Active")} 
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleStatusChange(job.id, "Inactive")} 
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Applicant</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{application.name}</td>
                  <td className="px-4 py-2">{application.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${application.status === "Reviewed" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleApplicationStatus(application.id, "Reviewed")} 
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Review
                    </button>
                    <button 
                      onClick={() => handleApplicationStatus(application.id, "Contacted")} 
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const EmployerPosting = ({ jobs, setJobs, setCurrentView }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: jobs.length + 1,
      ...formData,
      status: "Pending"
    };
    setJobs([...jobs, newJob]);
    alert("Job posted successfully!");
    setFormData({ company: "", title: "", description: "" });
    setCurrentView("admin");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Post a New Job</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
          <input 
            type="text" 
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Job Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Posting
        </button>
      </form>
    </div>
  );
};

const StudentApplication = ({ applications, setApplications, selectedJobId, setCurrentView }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: applications.length + 1,
      jobId: selectedJobId,
      ...formData,
      status: "Pending"
    };
    setApplications([...applications, newApplication]);
    alert("Application submitted successfully!");
    setFormData({ name: "", email: "", coverLetter: "" });
    setCurrentView("admin");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Application</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Cover Letter</label>
          <textarea 
            value={formData.coverLetter}
            onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
            className="w-full border rounded-md p-2 dark:bg-gray-700" 
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("postings");
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([
    { id: 1, jobId: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, jobId: 2, name: "Jane Smith", email: "jane@example.com", status: "Reviewed" }
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MdWork className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                School Career Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("postings")}
                className={`px-3 py-2 rounded-md ${currentView === "postings" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300"}`}
              >
                Job Postings
              </button>
              <button
                onClick={() => setCurrentView("admin")}
                className={`px-3 py-2 rounded-md ${currentView === "admin" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300"}`}
              >
                <MdAdminPanelSettings className="inline-block mr-1" />
                Admin
              </button>
              <button
                onClick={() => setCurrentView("employer")}
                className={`px-3 py-2 rounded-md ${currentView === "employer" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300"}`}
              >
                Post Job
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "postings" && 
          <JobPostings 
            setCurrentView={setCurrentView} 
            setSelectedJobId={setSelectedJobId} 
          />}
        {currentView === "admin" && 
          <AdminPanel 
            jobs={jobs} 
            setJobs={setJobs} 
            applications={applications} 
            setApplications={setApplications} 
          />}
        {currentView === "employer" && 
          <EmployerPosting 
            jobs={jobs} 
            setJobs={setJobs} 
            setCurrentView={setCurrentView} 
          />}
        {currentView === "application" && 
          <StudentApplication 
            applications={applications} 
            setApplications={setApplications} 
            selectedJobId={selectedJobId}
            setCurrentView={setCurrentView} 
          />}
      </main>
    </div>
  );
}