import React, { useState, useEffect, useRef } from "react"; // Import useRef for focus management
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, UsersIcon, UserPlusIcon, ChevronLeftIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid"; // Import XMarkIcon for removing tags
import axios from "axios";

// Custom Colors
const PRIMARY_COLOR = "#3C467B";
const ACCENT_BG = "#EEF1FD"; // Lighter background for elements
const ACCENT_TEXT = "#50589C";
const CHIP_BG = "#E0E7FF"; // Background for selected tags/chips
const CHIP_TEXT = "#3C467B"; // Text color for selected tags/chips
const SUGGESTION_BG_HOVER = "#F0F4FF"; // Hover background for suggestions

// --- Validation and Helper Functions ---

const validateStep = (step, formData) => {
    const newErrors = {};

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 1) {
        // 1. Combined Name Validation
        if (!formData.name) newErrors.name = "Full Name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format (e.g., user@example.com)";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits and contain numbers only";
        }

        // New password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

    } else if (step === 2) {
        if (!formData.department) newErrors.department = "Department is required";
        if (!formData.reportingManager) newErrors.reportingManager = "Reporting Manager ID is required";
        if (!formData.joiningDate) newErrors.joiningDate = "Joining date required";
        if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
        if (!formData.isAdmin) newErrors.isAdmin = "Admin status is required"; // New validation for isAdmin

        // If hasSubordinates is "Yes", ensure at least one subordinate is added
        if (formData.hasSubordinates === "Yes" && (!formData.subordinates || formData.subordinates.length === 0)) {
            newErrors.subordinates = "Please add at least one subordinate.";
        }
    }
    return newErrors;
};

// --- Custom TagInputWithSuggestions Component (Unchanged) ---
const TagInputWithSuggestions = ({
    label,
    name,
    value, // This will be an array of selected names
    onChange, // This will handle adding/removing names from the array
    suggestions, // Array of existing employee names
    error
}) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    // Filter suggestions based on input value and already selected tags
    const filteredSuggestions = suggestions.filter(
        (suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.includes(suggestion) // Don't show already selected suggestions
    );

    const addTag = (tag) => {
        if (tag && !value.includes(tag)) {
            onChange({
                target: {
                    name: name,
                    value: [...value, tag],
                },
            });
            setInputValue(""); // Clear input after adding
            inputRef.current?.focus(); // Keep focus on the input
        }
    };

    const removeTag = (tagToRemove) => {
        onChange({
            target: {
                name: name,
                value: value.filter((tag) => tag !== tagToRemove),
            },
        });
        inputRef.current?.focus();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault(); // Prevent form submission
            addTag(inputValue.trim());
        }
        // Allow backspace to remove last tag if input is empty
        if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
            e.preventDefault();
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className={`relative border rounded-lg p-2.5 min-h-[44px] flex flex-wrap items-center gap-2 ${error ? 'border-red-400' : 'border-gray-300'} focus-within:ring-2 focus-within:ring-[${ACCENT_TEXT}] transition`}>
                {value.map((tag) => (
                    <span
                        key={tag}
                        className={`inline-flex items-center text-sm font-medium bg-[${CHIP_BG}] text-[${CHIP_TEXT}] rounded-full px-3 py-1`}
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 -mr-1 text-[${CHIP_TEXT}] hover:text-red-600 rounded-full focus:outline-none"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={value.length === 0 ? "Type or select a name..." : ""}
                    className="flex-grow bg-transparent text-sm focus:outline-none min-w-[100px]"
                />
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

            {filteredSuggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {filteredSuggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => addTag(suggestion)}
                            className={`flex items-center text-sm px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-[${SUGGESTION_BG_HOVER}] transition`}
                        >
                            {suggestion} <PlusIcon className="w-3 h-3 ml-1" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- FormField Component (Slightly modified to remove maxLength from text) ---
const FormField = ({ label, name, type = "text", value, onChange, options, error, suggestions }) => {
    const errorClass = error ? 'border-red-400' : 'border-gray-300';
    const baseClasses = `w-full border ${errorClass} rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[${ACCENT_TEXT}] transition`;

    if (type === "tag-input-with-suggestions") {
        return (
            <TagInputWithSuggestions
                label={label}
                name={name}
                value={value || []} // Ensure value is always an array for this type
                onChange={onChange}
                suggestions={suggestions || []}
                error={error}
            />
        );
    }

    // Specific props for 'phone' and other types
    const inputProps = {
        ...(['phone', 'password'].includes(name) && { autoComplete: 'off' }),
        ...(name === 'phone' && { maxLength: 10, inputMode: 'numeric' }),
    };


    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClasses}
                >
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClasses}
                    {...inputProps}
                />
            )}
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

// --- EmployeeCard Component (Modified for single name field) ---
const EmployeeCard = ({ employee }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-[${ACCENT_BG}] text-[${PRIMARY_COLOR}] font-bold text-lg flex-shrink-0`}>
                    {employee.name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.department} Dept.</p>
                </div>
            </div>
            <div className="mt-3 text-xs text-gray-600 space-y-1">
                <p><strong>ID:</strong> {employee.employeeId}</p>
                <p><strong>Joined:</strong> {new Date(employee.joiningDate).toLocaleDateString()}</p>
                <p><strong>Manager ID:</strong> {employee.reportingManager}</p>
                <p><strong>Admin:</strong> {employee.isAdmin}</p>
                {employee.subordinates && employee.subordinates.length > 0 && (
                    <p><strong>Subordinates:</strong> {employee.subordinates.join(", ")}</p>
                )}
            </div>
        </div>
    );
};

// --- RecentHiresDashboard Component (Unchanged) ---
const RecentHiresDashboard = ({ employees, onViewForm }) => {

    const sortedEmployees = [...employees].sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthHires = sortedEmployees.filter(e => {
        const joinDate = new Date(e.joiningDate);
        return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
    });

    const isThisMonth = thisMonthHires.length > 0;
    const displayEmployees = isThisMonth ? thisMonthHires : sortedEmployees;
    const title = isThisMonth ? "Hired This Month" : "All Recent Hires (No Hires This Month)";

    return (
        <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
        >
            <button
                onClick={onViewForm}
                className={`flex items-center text-sm font-medium text-gray-600 hover:text-[${ACCENT_TEXT}] transition mb-4`}
            >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Back to Onboarding Form
            </button>

            <h2 className="text-2xl font-extrabold text-[#3C467B] flex items-center">
                <UsersIcon className={`w-7 h-7 mr-2 text-[${ACCENT_TEXT}]`} />
                Recent Hires Dashboard
            </h2>
            <p className="text-lg font-semibold text-gray-700 pt-2 border-t border-gray-100">{title} ({displayEmployees.length})</p>

            {displayEmployees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayEmployees.map((employee, index) => (
                        <EmployeeCard key={index} employee={employee} />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-100 p-8 rounded-xl text-center text-gray-500">
                    No new employees found for this month. Use the form to onboard one!
                </div>
            )}
        </motion.div>
    );
};

// --- Main Component ---
export default function OnboardEmployee() {
    const [step, setStep] = useState(1);
    const [currentView, setCurrentView] = useState('form');

    const [existingEmployeeNames, setExistingEmployeeNames] = useState([]);
    const [onboardedEmployees, setOnboardedEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("https://localhost:7164/api/Employee");
                const allEmployees = response.data;

                // Store full list for manager/subordinate mapping
                setOnboardedEmployees(allEmployees);

                // Filter only non-admins for subordinate suggestions
                const nonAdminEmployees = allEmployees.filter(emp => !emp.isAdmin);
                setExistingEmployeeNames(nonAdminEmployees.map(emp => emp.name));
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    // UPDATED initialFormData
    const initialFormData = {
        name: "", email: "", phone: "", password: "", // single name, new password
        employeeId: "", department: "",
        reportingManager: "", hasSubordinates: "No",
        subordinates: [],
        joiningDate: new Date().toISOString().split('T')[0],
        employmentType: "",
        isAdmin: "No", // new field
    };
    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});
    const [completedSteps, setCompletedSteps] = useState([]);

    const steps = ["Personal Info & Login", "Job Details", "Review & Confirm"];

    const generateEmployeeId = () => {
        // Generate an ID for the new employee, ensuring it doesn't clash with existing ones (for mock purposes)
        const allIds = new Set(onboardedEmployees.map(emp => parseInt(emp.employeeId.replace('EMP', ''))));
        let nextIdNum = 1;
        while (allIds.has(nextIdNum)) {
            nextIdNum++;
        }
        return `EMP${String(nextIdNum).padStart(3, '0')}`;
    }

    const goToStep = (targetStep) => {
        if (targetStep === step) {
            setErrors({});
            return;
        }

        if (targetStep < step) {
            setStep(targetStep);
            setErrors({});
            return;
        }

        if (targetStep > step) {
            const stepErrors = validateStep(step, formData);

            if (Object.keys(stepErrors).length === 0) {
                setCompletedSteps(prev => [...new Set([...prev, step])]);
                setErrors({});

                if (targetStep === step + 1) {
                    setStep(targetStep);
                }

            } else {
                setErrors(stepErrors);
            }
        }
    };

    const handleNext = () => {
        const stepErrors = validateStep(step, formData);
        if (Object.keys(stepErrors).length === 0) {
            setCompletedSteps(prev => [...new Set([...prev, step])]);
            setStep((prev) => prev + 1);
            setErrors({});
        } else {
            setErrors(stepErrors);
        }
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;
        if (name === 'phone') {
            newValue = value.replace(/\D/g, '').slice(0, 10);
        }

        // Special handling for subordinates: if hasSubordinates changes to "No", clear the array
        if (name === 'hasSubordinates' && value === 'No') {
            setFormData((prev) => ({
                ...prev,
                hasSubordinates: value,
                subordinates: [], // Clear subordinates if "No" is selected
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const API_BASE_URL = "https://localhost:7164/api";

    const handleSubmit = async () => {
        try {
            // Map manager name to ID
            const manager = onboardedEmployees.find(e => e.name === formData.reportingManager);
            const managerId = manager ? manager.employeeId : null;

            // Map subordinate names to IDs
            const subordinatesIds = formData.subordinates
                .map(name => {
                    const emp = onboardedEmployees.find(e => e.name === name);
                    return emp ? emp.employeeId : null;
                })
                .filter(id => id !== null);

            // Prepare payload for API
            const payload = {
                employeeId: 0, // backend will generate
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                department: formData.department,
                joiningDate: formData.joiningDate,
                employmentType: formData.employmentType,
                managerId: managerId,
                myJuniors: subordinatesIds,
                isAdmin: formData.isAdmin === "Yes",
                totalLeaves: 0 // backend will set 60 automatically
            };

            // Send POST request to backend
            const response = await axios.post(`${API_BASE_URL}/Employee`, payload);

            // Update frontend state with the returned employee
            const createdEmployee = response.data;
            // setOnboardedEmployees(prev => [createdEmployee, ...prev]);
            const refreshed = await axios.get(`${API_BASE_URL}/Employee`);
            setOnboardedEmployees(refreshed.data);


            // Refresh subordinate suggestions (non-admins)
            const responsee = await axios.get("https://localhost:7164/api/Employee");
            const nonAdminEmployees = responsee.data.filter(emp => !emp.isAdmin);
            setExistingEmployeeNames(nonAdminEmployees.map(emp => emp.name));

            // Reset form
            setFormData(initialFormData);
            setCompletedSteps([]);
            setStep(1);
            setCurrentView('dashboard');

            alert(`Employee "${createdEmployee.name}" (${createdEmployee.employeeId}) onboarded successfully!`);
        } catch (error) {
            console.error("Error creating employee:", error);
            alert("Failed to onboard employee. Check console for details.");
        }
    };


    const renderFormContent = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div key="personal-form" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-xl font-semibold text-[#3C467B] pb-2 border-b border-gray-100">1. Personal Information & Login</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Name is now one field */}
                            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                            <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                            {/* New Password Field */}
                            <FormField label="Password (Min 8 Chars)" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="job-form" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-xl font-semibold text-[#3C467B] pb-2 border-b border-gray-100">2. Job Details & Structure</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <FormField label="Department" name="department" value={formData.department} onChange={handleChange} error={errors.department} />

                            {/* Label changed to Manager ID */}
                            <FormField label="Reporting Manager ID" name="reportingManager" value={formData.reportingManager} onChange={handleChange} error={errors.reportingManager} />

                            {/* Removed Designation and Work Location */}

                            <FormField label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} error={errors.joiningDate} />

                            <FormField
                                label="Employment Type" name="employmentType" type="select" value={formData.employmentType} onChange={handleChange} error={errors.employmentType}
                                options={[{ value: "", label: "Select Type" }, { value: "Fulltime", label: "Full-Time" }, { value: "Parttime", label: "Part-time" }, { value: "Contract", label: "Contract" }, { value: "Internship", label: "Internship" }]}
                            />

                            {/* New isAdmin field */}
                            <FormField
                                label="Is this employee an Admin?" name="isAdmin" type="select" value={formData.isAdmin} onChange={handleChange} error={errors.isAdmin}
                                options={[{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }]}
                            />

                            <FormField
                                label="Does this employee have subordinates?" name="hasSubordinates" type="select" value={formData.hasSubordinates} onChange={handleChange}
                                options={[{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }]}
                            />

                            {formData.hasSubordinates === "Yes" && (
                                <div className="sm:col-span-2">
                                    {/* Using the new tag-input-with-suggestions type */}

                                    <FormField
                                        label="List Subordinates (Names)"
                                        name="subordinates"
                                        type="tag-input-with-suggestions"
                                        value={formData.subordinates}
                                        onChange={handleChange}
                                        suggestions={existingEmployeeNames} // ✅ This will now come from API
                                        error={errors.subordinates}
                                    />

                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            case 3:
                const displayId = "Generated upon submission";
                return (
                    <motion.div key="review-form" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-xl font-semibold text-[#3C467B] pb-2 border-b border-gray-100">3. Review and Confirm</h2>
                        <div className="bg-[#EEF1FD] rounded-xl p-6 border border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
                                {Object.entries({
                                    "Full Name": formData.name, "Employee ID": displayId, // Updated for single name
                                    Email: formData.email, Phone: formData.phone,
                                    "Department": formData.department,
                                    "Reporting Manager ID": formData.reportingManager, // Updated Label
                                    "Joining Date": formData.joiningDate,
                                    "Employment Type": formData.employmentType,
                                    "Is Admin": formData.isAdmin, // New field
                                    "Has Subordinates": formData.hasSubordinates,
                                    ...(formData.hasSubordinates === "Yes" && { Subordinates: formData.subordinates.join(", ") || "None listed" }),
                                }).map(([label, value]) => (
                                    <div key={label}>
                                        <p className="font-medium text-gray-500 text-sm">{label}</p>
                                        <p className="font-semibold text-base">{value || "-"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">The Employee ID will be generated by the system upon submission.</p>
                    </motion.div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen">

            {/* Header and View Toggle */}
            <div className="flex justify-between items-start pt-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#3C467B]">
                        {currentView === 'form' ? "New Employee Onboarding" : "HR Dashboard"}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {currentView === 'form' ? "Follow the steps to capture all required details. ID will be generated automatically." : "Quick view of recently onboarded personnel."}
                    </p>
                </div>
                <button
                    onClick={() => setCurrentView(currentView === 'form' ? 'dashboard' : 'form')}
                    className={`px-4 py-2 flex items-center rounded-lg transition font-medium text-white ${currentView === 'form'
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {currentView === 'form' ? (
                        <>
                            <UsersIcon className="w-5 h-5 mr-2" />
                            View Recent Hires
                        </>
                    ) : (
                        <>
                            <UserPlusIcon className="w-5 h-5 mr-2" />
                            Start New Onboarding
                        </>
                    )}
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentView === 'form' ? (
                        <motion.div key="onboarding-form">

                            {/* Stepper Indicator */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center relative">
                                    {/* Progress Bar Line */}
                                    <div
                                        className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-0 rounded-full"
                                        style={{ width: `${(steps.length - 1) * 100 / steps.length}%`, marginLeft: `${100 / (steps.length * 2)}%` }}
                                    >
                                        <motion.div
                                            className="h-full bg-[#50589C] rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(step - 1) / (steps.length - 1) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>

                                    {steps.map((label, index) => {
                                        const stepNum = index + 1;
                                        const isCompleted = completedSteps.includes(stepNum);
                                        const isActive = step === stepNum;
                                        // Clickable if completed OR is the current step OR is the step immediately following a completed step.
                                        const isClickable = isCompleted || isActive || completedSteps.includes(stepNum - 1);

                                        return (
                                            <div key={label} className="flex-1 flex flex-col items-center z-10 min-w-0">
                                                <button
                                                    onClick={() => goToStep(stepNum)}
                                                    disabled={!isClickable && !isActive}
                                                    className={`flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                                >
                                                    <div
                                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isCompleted
                                                            ? "bg-green-500 border-green-500 text-white"
                                                            : isActive
                                                                ? `bg-[${ACCENT_BG}] border-[${ACCENT_TEXT}] text-[${ACCENT_TEXT}] font-semibold`
                                                                : "bg-white border-gray-300 text-gray-400"
                                                            }`}
                                                    >
                                                        {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : stepNum}
                                                    </div>
                                                    <p
                                                        className={`mt-2 text-xs md:text-sm font-medium text-center transition-colors duration-300 ${isActive ? `text-[${ACCENT_TEXT}] font-bold` : "text-gray-500"
                                                            }`}
                                                    >
                                                        {label}
                                                    </p>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Form Fields and Content */}
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: step > completedSteps.length ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AnimatePresence mode="wait">
                                    {renderFormContent()}
                                </AnimatePresence>
                            </motion.div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                                {step > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                                    >
                                        Back
                                    </button>
                                )}
                                <div className={step === 1 ? 'w-full flex justify-end' : ''}>
                                    {step < steps.length ? (
                                        <button
                                            onClick={handleNext}
                                            className={`px-6 py-2 bg-[#3C467B] text-white rounded-lg hover:bg-[#2E3569] transition font-medium ${step === 1 ? 'ml-auto' : ''}`}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                                        >
                                            Submit Employee
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                    ) : (
                        <RecentHiresDashboard employees={onboardedEmployees} onViewForm={() => setCurrentView('form')} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}