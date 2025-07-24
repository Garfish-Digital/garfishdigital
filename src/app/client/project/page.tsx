"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useClientAuth } from "@/hooks/useClientAuth";
import "./project.css";

export default function Project() {
  const { isClientAuthenticated } = useClientAuth();
  
  // Sample milestone data
  const milestones = [
    { section: "Discovery", milestone: "Requirements Gathering", status: "Completed", dateCompleted: "2024-01-15" },
    { section: "Discovery", milestone: "Technical Specification", status: "Completed", dateCompleted: "2024-01-22" },
    { section: "Discovery", milestone: "User Research & Analysis", status: "Completed", dateCompleted: "2024-01-29" },
    { section: "Discovery", milestone: "Competitive Analysis", status: "Completed", dateCompleted: "2024-02-02" },
    { section: "Design", milestone: "Information Architecture", status: "Completed", dateCompleted: "2024-02-05" },
    { section: "Design", milestone: "Wireframes & Mockups", status: "Completed", dateCompleted: "2024-02-12" },
    { section: "Design", milestone: "Visual Design System", status: "Completed", dateCompleted: "2024-02-19" },
    { section: "Design", milestone: "UI/UX Review", status: "Completed", dateCompleted: "2024-02-26" },
    { section: "Design", milestone: "Responsive Design", status: "Completed", dateCompleted: "2024-03-05" },
    { section: "Design", milestone: "Design System Documentation", status: "Completed", dateCompleted: "2024-03-08" },
    { section: "Development", milestone: "Project Setup & Architecture", status: "Completed", dateCompleted: "2024-03-12" },
    { section: "Development", milestone: "Database Schema Design", status: "Completed", dateCompleted: "2024-03-15" },
    { section: "Development", milestone: "Authentication System", status: "Completed", dateCompleted: "2024-03-22" },
    { section: "Development", milestone: "Product Catalog Backend", status: "Completed", dateCompleted: "2024-03-29" },
    { section: "Development", milestone: "Shopping Cart Functionality", status: "Completed", dateCompleted: "2024-04-05" },
    { section: "Development", milestone: "Payment Gateway Integration", status: "Completed", dateCompleted: "2024-04-12" },
    { section: "Development", milestone: "Frontend Implementation", status: "In Progress", dateCompleted: "" },
    { section: "Development", milestone: "Admin Dashboard", status: "In Progress", dateCompleted: "" },
    { section: "Development", milestone: "Search & Filtering", status: "Pending", dateCompleted: "" },
    { section: "Development", milestone: "Order Management System", status: "Pending", dateCompleted: "" },
    { section: "Development", milestone: "Email Notifications", status: "Pending", dateCompleted: "" },
    { section: "Development", milestone: "Performance Optimization", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Unit Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Integration Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "User Acceptance Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Performance Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Security Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Cross-browser Testing", status: "Pending", dateCompleted: "" },
    { section: "Testing", milestone: "Mobile Responsiveness Testing", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "Staging Environment Setup", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "Production Environment Setup", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "DNS & SSL Configuration", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "Data Migration", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "Production Deployment", status: "Pending", dateCompleted: "" },
    { section: "Launch", milestone: "Go-Live Testing", status: "Pending", dateCompleted: "" },
    { section: "Post-Launch", milestone: "Performance Monitoring", status: "Pending", dateCompleted: "" },
    { section: "Post-Launch", milestone: "Bug Fixes & Hotfixes", status: "Pending", dateCompleted: "" },
    { section: "Post-Launch", milestone: "User Training", status: "Pending", dateCompleted: "" },
    { section: "Post-Launch", milestone: "Documentation Handover", status: "Pending", dateCompleted: "" },
    { section: "Post-Launch", milestone: "30-Day Support Period", status: "Pending", dateCompleted: "" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50";
      case "In Progress":
        return "text-blue-600 bg-blue-50";
      case "Pending":
        return "text-gray-500 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };
  
  return (
    <div className="min-h-screen text-black project-page-container">
      {/* Static Logo - Upper Left */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
          Garfish Digital
        </div>
      </motion.div>

      <div className="flex flex-col h-screen px-8 pt-24 pb-8">
        {/* Project Name Row */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-[color:var(--color-gray-faint)] font-arial">
            E-Commerce Platform Redesign
          </h3>
          <button className="garfish-button font-arial">
            View Project
          </button>
        </motion.div>

        {/* Scrollable Table Container */}
        <motion.div
          className="flex-1 overflow-hidden rounded-lg border border-[color:var(--color-gray-light)] mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              {/* Sticky Header */}
              <thead className="sticky top-0 bg-[color:var(--color-gray-light)] bg-opacity-20 backdrop-blur-sm z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[color:var(--color-black)] font-arial border-b border-[color:var(--color-gray-light)]">
                    Section
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[color:var(--color-black)] font-arial border-b border-[color:var(--color-gray-light)]">
                    Milestone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[color:var(--color-black)] font-arial border-b border-[color:var(--color-gray-light)]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[color:var(--color-black)] font-arial border-b border-[color:var(--color-gray-light)]">
                    Date Completed
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {milestones.map((milestone, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-[color:var(--color-gray-light)] hover:bg-opacity-10 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.05) }}
                  >
                    <td className="px-6 py-4 text-sm text-[color:var(--color-gray-dark)] font-arial border-b border-[color:var(--color-gray-light)] border-opacity-30">
                      {milestone.section}
                    </td>
                    <td className="px-6 py-4 text-sm text-[color:var(--color-black)] font-arial border-b border-[color:var(--color-gray-light)] border-opacity-30">
                      {milestone.milestone}
                    </td>
                    <td className="px-6 py-4 text-sm border-b border-[color:var(--color-gray-light)] border-opacity-30">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[color:var(--color-gray-dark)] font-arial border-b border-[color:var(--color-gray-light)] border-opacity-30">
                      {milestone.dateCompleted || "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation currentPage="project" isClientAuthenticated={isClientAuthenticated} />
    </div>
  );
}