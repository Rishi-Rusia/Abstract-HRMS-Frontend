import React, {useState} from 'react';
import { Tree, TreeNode } from "react-organizational-chart";
import { EMPLOYEE_HIERARCHY_DATA_FULL } from "../assets/employee";


const deptColors = {
  Engineering: "#2563EB",
  Delivery: "#10B981",
  "Central Services": "#9333EA",
  Talent: "#F59E0B",
  "Board of Director": "#DC2626",
};

// Node UI (unchanged)
const NodeBox = ({ name, title, department, pronouns }) => {
  const [flipped, setFlipped] = useState(false);
  const color = deptColors[department] || "#4F46E5";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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
            <strong style={{ fontSize: "0.9rem", color: "#111827" }}>
              {name}
            </strong>
            <div style={{ color: "#4B5563", fontSize: "0.8rem" }}>{title}</div>
            <div style={{ color, fontSize: "0.75rem", fontWeight: 500 }}>
              {department}
            </div>
            {pronouns && (
              <div style={{ color: "#9CA3AF", fontSize: "0.7rem" }}>
                {pronouns}
              </div>
            )}
          </div>
        </div>

        {/* Back */}
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
        </div>
      </div>
    </div>
  );
};

// Recursive render function
const renderTree = (manager, employees) => {
  const subordinates = employees.filter((e) => e.reportsTo === manager.name);
  if (subordinates.length === 0) return null;

  return subordinates.map((sub) => (
    <TreeNode
      key={sub.id}
      label={
        <NodeBox
          name={sub.name}
          title={sub.title}
          department={sub.department}
          pronouns={sub.pronouns}
        />
      }
    >
      {renderTree(sub, employees)}
    </TreeNode>
  ));
};

const EmployeeHierarchyChart = () => {
  const [selectedManager, setSelectedManager] = useState("");
  const [filtered, setFiltered] = useState(false);

  const root = EMPLOYEE_HIERARCHY_DATA_FULL.find((e) => e.reportsTo === "N/A");

  // Managers with at least one direct report
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

  const renderFilteredChart = () => {
    const manager = EMPLOYEE_HIERARCHY_DATA_FULL.find(
      (e) => e.name === selectedManager
    );
    if (!manager) return null;

    const directReports = EMPLOYEE_HIERARCHY_DATA_FULL.filter(
      (e) => e.reportsTo === manager.name
    );

    return (
      <Tree
        label={
          <NodeBox
            name={manager.name}
            title={manager.title}
            department={manager.department}
            pronouns={manager.pronouns}
          />
        }
      >
        {directReports.map((sub) => (
          <TreeNode
            key={sub.id}
            label={
              <NodeBox
                name={sub.name}
                title={sub.title}
                department={sub.department}
                pronouns={sub.pronouns}
              />
            }
          />
        ))}
      </Tree>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Filter Form */}
      <form
        onSubmit={handleFilter}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <select
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
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
          style={{
            padding: "8px 14px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Filter
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: "8px 14px",
            background: "#6B7280",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </form>

      {/* Org Chart */}
      <div style={{ marginTop: "20px" }}>
        {filtered && selectedManager
          ? renderFilteredChart()
          : (
            <Tree
              label={
                <NodeBox
                  name={root.name}
                  title={root.title}
                  department={root.department}
                  pronouns={root.pronouns}
                />
              }
            >
              {renderTree(root, EMPLOYEE_HIERARCHY_DATA_FULL)}
            </Tree>
          )}
      </div>
    </div>
  );
};

export default EmployeeHierarchyChart;