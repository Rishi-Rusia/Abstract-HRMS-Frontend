import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { EMPLOYEE_HIERARCHY_DATA_FULL } from "../assets/employee";
import { EmployeePhotos } from "../assets/photos";

// Department colors (same as before)
const deptColors = {
  Engineering: "#2563EB",
  Delivery: "#10B981",
  "Central Services": "#9333EA",
  Talent: "#F59E0B",
  "Board of Director": "#DC2626",
};

// --- Utility Functions (Unchanged) ---

const getDirectReports = (name) => EMPLOYEE_HIERARCHY_DATA_FULL.filter((e) => e.reportsTo === name);
const getEmployeeByName = (name) => EMPLOYEE_HIERARCHY_DATA_FULL.find((e) => e.name === name);

// --- NodeBox Component (Unchanged) ---
const NodeBox = ({ id, name, title, department, pronouns }) => {
  const [flipped, setFlipped] = useState(false);
  const color = deptColors[department] || "#4F46E5";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const employeePhoto = EmployeePhotos[id];
  const hasPhoto = !!employeePhoto;

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      style={{
        perspective: "1000px",
        display: "inline-block",
        minWidth: "140px",
        maxWidth: "160px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "130px",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            // The department color accent bar is here
          }}
        >
          <div
            style={{
              height: "4px",
              background: color,
              borderRadius: "8px 8px 0 0",
              marginBottom: "8px",
            }}
          />
          <div style={{ padding: "8px 10px" }}>
            <strong style={{ fontSize: "0.9rem", color: "#111827" }}>{name}</strong>
            <div style={{ color: "#4B5563", fontSize: "0.8rem" }}>{title}</div>
            <div style={{ color, fontSize: "0.75rem", fontWeight: 500 }}>{department}</div>
            {pronouns && <div style={{ color: "#9CA3AF", fontSize: "0.7rem" }}>{pronouns}</div>}
          </div>
        </div>

        {/* Back (Unchanged) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            border: `1px solid ${color}`,
            borderRadius: "10px",
            background: color,
            color: "#fff",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 3px 8px ${color}55`,
          }}
        >
          {hasPhoto ? (
            <div style={{ textAlign: "center" }}>
              <img
                src={employeePhoto}
                alt={`Photo of ${name}`}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid white",
                  marginBottom: "8px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: "0.75rem" }}>{title}</div>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {initials}
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: "0.75rem" }}>{title}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Recursive Chart Render Function (Unchanged) ---
const renderTree = (manager, employees) => {
  const subordinates = employees.filter((e) => e.reportsTo === manager.name);
  if (subordinates.length === 0) return null;

  return subordinates.map((sub) => (
    <TreeNode
      key={sub.id}
      label={<NodeBox id={sub.id} name={sub.name} title={sub.title} department={sub.department} pronouns={sub.pronouns} />}
    >
      {renderTree(sub, employees)}
    </TreeNode>
  ));
};


// ----------------------------------------------------------------------
// --- Abstract Hierarchy Table Component (UPDATED VERSION) ---
// ----------------------------------------------------------------------
const AbstractHierarchyTable = ({ rootNode, onFocus, onClose }) => {
  // Set of employee names whose direct reports (juniors/next level) are visible
  const [expandedReports, setExpandedReports] = useState(new Set()); 
  
  // Toggle reports for any employee (Minan, or any manager/report in the panel)
  const toggleReports = (employeeName) => {
    const s = new Set(expandedReports);
    if (s.has(employeeName)) s.delete(employeeName);
    else s.add(employeeName);
    setExpandedReports(s);
  };

  // Recursive function to render the collapsible list items
  const renderEmployeeList = (employeeName, level = 0) => {
    const employee = getEmployeeByName(employeeName);
    if (!employee) return null;
    
    // NEW: Get the department color for the accent
    const deptColor = deptColors[employee.department] || "#4F46E5";

    const directReports = getDirectReports(employeeName);
    const isExpanded = expandedReports.has(employeeName);
    const hasReports = directReports.length > 0;
    
    // MODIFICATION HERE: Increased the multiplier from 15 to 30 for clearer indentation
    const paddingLeft = 10 + (level * 30);
    
    // UPDATED: Card style to match chart nodes
    const cardStyle = { 
      marginBottom: 8,
      padding: "8px 10px 8px 10px", 
      borderRadius: 10,
      background: "#fff", // Consistent white background
      color: "#111827", // Consistent dark text color
      border: "1px solid #e5e7eb", // Consistent subtle border
      borderLeft: `5px solid ${deptColor}`, // Department color accent bar (left border)
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)", // Consistent shadow
      cursor: "pointer",
      transition: 'background-color 0.1s'
    };
    
    return (
      <div key={employee.id}>
        {/* Employee Card */}
        <div 
            style={{ 
                ...cardStyle, 
                paddingLeft: paddingLeft, 
                display: "flex", 
                justifyContent: "flex-start", // Left alignment
                alignItems: "center" ,
            }}
            // Clicking card body toggles expansion
            onClick={(e) => { 
                if (hasReports) {
                    toggleReports(employeeName);
                }
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexGrow: 1 }}>
                {/* Initials/Avatar Box - Styled to match chart node back/color */}
                <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: 6, 
                    background: deptColor, // Department color background
                    color: "#fff", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontWeight: 700,
                    fontSize: 14
                }}>
                    {employee.name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase()}
                </div>
                {/* Employee Info - Styled to match chart node font/color */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong style={{ fontSize: "0.9rem", color: "#111827" }}>{employee.name}</strong>
                    <div style={{ color: "#4B5563", fontSize: "0.8rem", fontWeight: 400 }}>{employee.title}</div>
                    <div style={{ color: deptColor, fontSize: "0.75rem", fontWeight: 500 }}>{employee.department}</div>
                </div>
            </div>

            {/* Actions: Toggle Button (Focus button remains removed) */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {hasReports && (
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleReports(employeeName); }}
                        aria-expanded={isExpanded}
                        style={{ 
                            padding: "6px 10px", 
                            borderRadius: 6, 
                            // Neutral toggle button colors
                            background: isExpanded ? "#e0f2f1" : "#F1F5F9", 
                            border: "none", 
                            cursor: "pointer", 
                            fontSize: 12, 
                            color: "#0F172A", 
                            fontWeight: 700 
                        }}
                    >
                        {isExpanded ? "▾" : "▸"}
                    </button>
                )}
            </div>
        </div>

        {/* Recursive Reports List */}
        {isExpanded && directReports.map(rep => (
            <div key={rep.id} style={{ marginLeft: 10 }}>
                {renderEmployeeList(rep.name, level + 1)}
            </div>
        ))}
      </div>
    );
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.95)", // semi-transparent white backdrop
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  };

  return (
    <div style={modalStyle} role="dialog" aria-modal="true" aria-label="Abstract Hierarchy Table View">
      <div style={{ 
          padding: "20px 40px", 
          borderBottom: "1px solid #e6edf6",
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: '#fff',
          position: 'sticky', 
          top: 0,
          zIndex: 1001
        }}>
        <h2 style={{ margin: 0, color: "#0F172A" }}>Abstract Hierarchy - Table View</h2>
        <button
          onClick={onClose}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "#DC2626",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      </div>

      {/* MAX WIDTH REMAINS AT 800PX */}
      <div style={{ 
            padding: "20px 40px", 
            maxWidth: 800, 
            margin: '0 auto 0 0', 
            width: '100%', 
            flexGrow: 1 
        }}>
        {rootNode ? renderEmployeeList(rootNode.name, 0) : <p>Loading hierarchy data...</p>}
      </div>
    </div>
  );
};


// --- EmployeeHierarchyChart Main Component (Unchanged) ---
const EmployeeHierarchyChart = () => {
  const [selectedManager, setSelectedManager] = useState("");
  const [filtered, setFiltered] = useState(false);
  // New state for view mode: 'chart' (default) or 'table'
  const [viewMode, setViewMode] = useState('chart'); 

  // root (CEO)
  const root = EMPLOYEE_HIERARCHY_DATA_FULL.find((e) => e.reportsTo === "N/A");

  // managers for the dropdown filter (only used in chart view)
  const managers = EMPLOYEE_HIERARCHY_DATA_FULL.filter((emp) =>
    EMPLOYEE_HIERARCHY_DATA_FULL.some((sub) => sub.reportsTo === emp.name)
  );

  const handleClear = () => {
    setSelectedManager("");
    setFiltered(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (selectedManager) setFiltered(true);
  };

  const handleFocusFromTable = (employeeName) => {
    setSelectedManager(employeeName);
    setFiltered(true);
    setViewMode('chart'); // Switch to chart view after focusing
  };

  const renderFilteredChart = () => {
    const manager = EMPLOYEE_HIERARCHY_DATA_FULL.find((e) => e.name === selectedManager);
    if (!manager) return null;

    const directReports = EMPLOYEE_HIERARCHY_DATA_FULL.filter((e) => e.reportsTo === manager.name);

    return (
      <Tree
        label={<NodeBox id={manager.id} name={manager.name} title={manager.title} department={manager.department} pronouns={manager.pronouns} />}
      >
        {directReports.map((sub) => (
          <TreeNode
            key={sub.id}
            label={<NodeBox id={sub.id} name={sub.name} title={sub.title} department={sub.department} pronouns={sub.pronouns} />}
              // Renders all reports under the selected manager recursively
              > 
                {renderTree(sub, EMPLOYEE_HIERARCHY_DATA_FULL)}
              </TreeNode>
        ))}
      </Tree>
    );
  };

  // -------------------------
  // JSX return
  // -------------------------
  return (
    <div style={{ padding: "20px" }}>
      {/* Top controls */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        {/* View Mode Toggle Buttons */}
        <div style={{ display: "flex", borderRadius: 8, overflow: 'hidden' }}>
            <button
                onClick={() => setViewMode('chart')}
                style={{ 
                    padding: "10px 14px", 
                    background: viewMode === 'chart' ? "#0F172A" : "#E2E8F0", 
                    color: viewMode === 'chart' ? "white" : "#0F172A", 
                    border: "none", 
                    cursor: "pointer", 
                    fontWeight: 700,
                }}
            >
                Chart View 📊
            </button>
            <button
                onClick={() => setViewMode('table')}
                style={{ 
                    padding: "10px 14px", 
                    background: viewMode === 'table' ? "#0F172A" : "#E2E8F0", 
                    color: viewMode === 'table' ? "white" : "#0F172A", 
                    border: "none", 
                    cursor: "pointer", 
                    fontWeight: 700,
                }}
            >
                Table View 📋
            </button>
        </div>

        {/* Existing filter form (only visible in Chart View) */}
        {viewMode === 'chart' && (
        <form onSubmit={handleFilter} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: 220 }}
          >
            <option value="">-- Select Manager --</option>
            {managers.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={{ padding: "8px 14px", background: "#2563EB", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleClear}
            style={{ padding: "8px 14px", background: "#6B7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Clear
          </button>
        </form>
        )}
      </div>

      {/* Org Chart / Table Display */}
      <div style={{ marginTop: "20px" }}>
        {/* CHART VIEW */}
        {viewMode === 'chart' && (
            filtered && selectedManager ? (
            renderFilteredChart()
            ) : (
            <Tree
              label={<NodeBox id={root?.id} name={root?.name} title={root?.title} department={root?.department} pronouns={root?.pronouns} />}
            >
              {root && renderTree(root, EMPLOYEE_HIERARCHY_DATA_FULL)}
            </Tree>
            )
        )}

        {/* TABLE VIEW (Full Screen Modal) */}
        {viewMode === 'table' && root && (
            <AbstractHierarchyTable 
                rootNode={root} 
                onFocus={handleFocusFromTable}
                onClose={() => setViewMode('chart')}
            />
        )}
      </div>
    </div>
  );
};

export default EmployeeHierarchyChart;