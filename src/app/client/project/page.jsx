"use client";

import { motion } from "framer-motion";
import Navigation from "../../../components/Navigation";
import Logo from "../../../components/Logo";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import "./project.css";

export default function Project() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();

  // Get milestones from authenticated client data
  const milestones = authenticatedClient?.milestones || [];

  const handleViewProject = () => {
    if (authenticatedClient && authenticatedClient.path) {
      window.open(`https://${authenticatedClient.path}`, "_blank");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-[var(--color-white)] bg-[var(--color-green-dark)]";
      case "In Progress":
        return "text-[var(--color-white)] bg-[var(--soft-orange)]";
      case "Pending":
        return "text-[var(--color-gray-light)] bg-[var(--color-black)]";
      default:
        return "text-[color:var(--color-gray-dark)] bg-[color:var(--color-gray-faint)]";
    }
  };

  return (
    <>
      {/* Static Logo - Upper Left */}
      <Logo />
      
      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="project"
        isClientAuthenticated={isClientAuthenticated}
      />
      
      <div className="fixed inset-0 overflow-hidden bg-[color:var(--color-black)]">
        <div className="text-[color:var(--color-white)] project-page-container bg-[color:var(--color-black)] h-full overflow-y-auto" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <div className="flex flex-col min-h-screen px-8 pt-24 pb-8">
    
        {/* Project Name Row */}
        <motion.div
          className="flex flex-col justify-between mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4 text-[color:var(--color-cyan-dark)] font-primary">
            Project Overview for{" "}
            <strong className="text-[var(--color-white)]">
              {authenticatedClient?.project || "your project"}
            </strong>
          </h2>
          <button
            className="garfish-button self-end font-primary w-40"
            onClick={handleViewProject}
          >
            View Project
          </button>
        </motion.div>

        {/* Table Container */}
        <motion.div
          className="flex-1 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <table className="w-full">
              {/* Sticky Header */}
              <thead className="sticky top-0 bg-[color:var(--color-gray-shadow)] backdrop-blur-sm text-[color:var(--color-gray-light)] z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold font-primary first:rounded-tl-lg last:rounded-tr-lg">
                    Section
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold font-primary first:rounded-tl-lg last:rounded-tr-lg">
                    Milestone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold font-primary first:rounded-tl-lg last:rounded-tr-lg">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold font-primary first:rounded-tl-lg last:rounded-tr-lg">
                    Date Completed
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {milestones.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center font-primary table-border-bottom text-[color:var(--color-gray-light)]"
                    >
                      No milestones available. Please contact support if you
                      believe this is an error.
                    </td>
                  </tr>
                ) : (
                  milestones.map((milestone, index) => (
                    <motion.tr
                      key={index}
                      className={`
                        ${milestone.status === 'In Progress' ? 'bg-[color:var(--color-green-half-light)]' : ''} 
                        hover:bg-[color:var(--color-gray-faint)] hover:bg-opacity-10 transition-colors duration-200`}
                      style={{ borderBottom: "1px solid var(--color-gray-shadow)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-sm text-[color:var(--color-gray-light)] font-primary">
                        {milestone.section}
                      </td>
                      <td className="px-6 py-4 text-sm text-[color:var(--color-white)] font-primary">
                        {milestone.milestone}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 text-xs text-center font-medium rounded-full ${getStatusColor(milestone.status)}`}
                        >
                          {milestone.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[color:var(--color-gray-light)] font-primary">
                        {milestone.dateCompleted || "-"}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
