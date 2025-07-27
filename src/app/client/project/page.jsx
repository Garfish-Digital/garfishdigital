"use client";

import { motion } from "framer-motion";
import Navigation from "../../../components/Navigation";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import "./project.css";

export default function Project() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();
  
  // Get milestones from authenticated client data
  const milestones = authenticatedClient?.milestones || [];

  const handleViewProject = () => {
    if (authenticatedClient && authenticatedClient.path) {
      window.open(`https://${authenticatedClient.path}`, '_blank');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-[var(--color-white)] bg-[var(--color-green-dark)]";
      case "In Progress":
        return "text-[var(--color-white)] bg-[var(--color-green-light)]";
      case "Pending":
        return "text-[var(--color-gray-faint)] bg-[var(--color-white)]";
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
            {authenticatedClient?.project || "Project Overview"}
          </h3>
          <button 
            className="garfish-button font-arial"
            onClick={handleViewProject}
          >
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
                {milestones.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-[color:var(--color-gray-dark)] font-arial">
                      No milestones available. Please contact support if you believe this is an error.
                    </td>
                  </tr>
                ) : (
                  milestones.map((milestone, index) => (
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
                  ))
                )}
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