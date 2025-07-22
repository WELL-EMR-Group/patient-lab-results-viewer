// Patient Lab Results Application
const FHIR_BASE_URL = 'https://hapi.fhir.org/baseR4';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        showDashboard();
        loadPatientData();
    }

    // Set up event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // TODO: Implement proper authentication
    // For now, accept any credentials and assign a test patient ID
    const userData = {
        username: username,
        password: password, // Store for session validation
        patientId: 'example-patient-1', // Use test patient
        loginTime: new Date().toISOString()
    };
    
    // Store user data for the session
    localStorage.setItem('currentUser', JSON.stringify(userData));
    console.log('User logged in:', userData); // Log for debugging
    
    showDashboard();
    loadPatientData();
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    showLogin();
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// UI functions
function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('dashboard-container').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
}

// Data loading functions
async function loadPatientData() {
    const user = getCurrentUser();
    if (!user) return;

    showLoading('Loading patient data...');
    
    try {
        // Load patient info
        const patientData = await fetchPatientData(user.patientId);
        displayPatientInfo(patientData);
        
        // Load lab results
        const labResults = await fetchLabResults(user.patientId);
        displayLabResults(labResults);
        
    } catch (error) {
        console.error('Error loading patient data:', error);
        showError('Failed to load patient data. Please try again.');
    }
}

async function fetchPatientData(patientId) {
    // TODO: Implement FHIR patient data fetching
    // This is a placeholder - you'll need to implement the actual FHIR calls
    const response = await fetch(`${FHIR_BASE_URL}/Patient/${patientId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch patient data');
    }
    const data = await response.json();
    console.log('Patient data received:', JSON.stringify(data)); // Log all patient data
    return data;
}

async function fetchLabResults(patientId) {
    // TODO: Implement FHIR lab results fetching
    // This is a placeholder - you'll need to implement the actual FHIR calls
    const response = await fetch(`${FHIR_BASE_URL}/Observation?patient=${patientId}&category=laboratory`);
    if (!response.ok) {
        throw new Error('Failed to fetch lab results');
    }
    const data = await response.json();
    console.log('Lab results received:', JSON.stringify(data)); // Log all lab data
    return data;
}

function displayPatientInfo(patientData) {
    const container = document.getElementById('patient-info');
    // TODO: Extract and display patient information from FHIR resource
    container.innerHTML = `
        <h3>Patient Information</h3>
        <p><strong>Name:</strong> ${getPatientName(patientData)}</p>
        <p><strong>DOB:</strong> ${getPatientDOB(patientData)}</p>
        <p><strong>ID:</strong> ${patientData.id}</p>
    `;
}

function displayLabResults(labData) {
    const container = document.getElementById('lab-results');
    
    if (!labData.entry || labData.entry.length === 0) {
        container.innerHTML = '<p>No lab results found.</p>';
        return;
    }

    const resultsHtml = labData.entry.map(entry => {
        const observation = entry.resource;
        return formatLabResult(observation);
    }).join('');

    container.innerHTML = `
        <h3>Laboratory Results</h3>
        ${resultsHtml}
    `;
}

function formatLabResult(observation) {
    // TODO: Format lab result for display
    const name = observation.code?.coding?.[0]?.display || 'Unknown Test';
    const value = observation.valueQuantity?.value || 'N/A';
    const unit = observation.valueQuantity?.unit || '';
    const date = observation.effectiveDateTime || observation.issued || 'Unknown Date';
    
    // Basic normal/abnormal logic (simplified)
    const isNormal = !observation.interpretation || 
                    observation.interpretation[0]?.coding?.[0]?.code === 'N';
    const statusClass = isNormal ? 'normal' : 'abnormal';
    
    return `
        <div class="lab-result ${statusClass}">
            <strong>${name}</strong><br>
            Value: ${value} ${unit}<br>
            Date: ${new Date(date).toLocaleDateString()}<br>
            Status: ${isNormal ? 'Normal' : 'Abnormal'}
        </div>
    `;
}

// Helper functions
function getPatientName(patientData) {
    // Handle both R4 and DSTU2 formats as mentioned in requirements
    if (patientData.name && patientData.name.length > 0) {
        const name = patientData.name[0];
        return `${name.given?.[0] || ''} ${name.family || ''}`.trim();
    }
    return 'Unknown Patient';
}

function getPatientDOB(patientData) {
    return patientData.birthDate ? new Date(patientData.birthDate).toLocaleDateString() : 'Unknown';
}

function showLoading(message) {
    document.getElementById('lab-results').innerHTML = `<div class="loading">${message}</div>`;
}

function showError(message) {
    document.getElementById('lab-results').innerHTML = `<div class="error">${message}</div>`;
}