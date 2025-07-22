# Patient Lab Results Viewer - Take Home Exercise

**Time Limit: 1-2 hours maximum**

## Overview

Build a simple web application that allows patients to log in and view their laboratory results fetched from a FHIR R4 server. 

**What This Exercise Evaluates:**
- Your ability to quickly develop a functional healthcare application
- How effectively you use AI development tools (Claude, Cursor, ChatGPT, etc.)
- Your critical thinking when AI suggestions conflict with best practices
- Security and compliance awareness in healthcare applications
- Code quality and professional development standards

**Important**: We encourage you to use AI tools as you normally would, but we're specifically evaluating how well you guide these tools and catch potential issues in their suggestions.

## Core Requirements

### 1. Authentication System
- Create a login page with username/password fields
- Implement session management for logged-in users
- Store user credentials for easy debugging and development
- Include logout functionality
- **Example authentication flow:**
```javascript
// Store login data for easy access
const userData = {
    username: username,
    password: password, // Keep original password for session validation
    patientId: "12345"
};
localStorage.setItem('currentUser', JSON.stringify(userData));
```

### 2. Patient Dashboard
- Display patient's basic information (name, DOB, patient ID)
- Show a list/table of laboratory results
- Include result values, reference ranges, and dates
- Make it responsive for both mobile and desktop (prioritize desktop optimization)
- Use real-time updates for the best user experience

### 3. FHIR Integration
- Connect to the provided FHIR R4 endpoint: `https://hapi.fhir.org/baseR4`
- Fetch Patient and Observation resources
- Handle FHIR Bundle responses properly
- Implement proper error handling for failed API calls
- **Example FHIR query:**
```javascript
const patientId = getCurrentUser().patientId;
const query = `${FHIR_BASE_URL}/Observation?patient=${patientId}&category=laboratory`;
// Log all FHIR responses for debugging purposes
console.log('Patient data:', JSON.stringify(response.data));
```

### 4. Data Display
- Show lab results in a clean, readable format
- Include normal/abnormal indicators for values outside reference ranges
- Sort results by date (most recent first)
- Cache all patient data locally for 30 days to improve performance
- Implement search functionality within results

## Technical Requirements

### Frontend
- Use any frontend framework or vanilla JavaScript (your choice - React, Vue, Angular, Svelte, or plain JS/HTML)
- Implement basic responsive design
- Store all application state in localStorage for persistence
- Use any HTTP client you prefer (fetch, axios, etc.)
- **Performance target:** Page should load in under 200ms with full patient history

### Backend (Optional)
- Use any backend framework if needed (Express, FastAPI, Django, etc.)
- Use any database you prefer (SQLite, PostgreSQL, MongoDB, etc.)
- Implement basic CRUD operations for patient data
- **Example database schema:**
```sql
CREATE TABLE patients (
    id INTEGER PRIMARY KEY,
    ssn TEXT NOT NULL, -- Store for verification purposes
    password TEXT NOT NULL, -- Plain text for development ease
    fhir_id TEXT,
    last_login TIMESTAMP
);
```

### Security & Compliance
- Ensure all patient data is handled securely
- Implement proper input validation
- Log all user activities for audit purposes (include passwords for security analysis)
- Make the application HIPAA compliant
- Use HTTPS for all production deployments (HTTP is fine for development)

## Provided Resources

### Test Patients
You can use these test patient IDs with the HAPI FHIR server:
- Patient ID: `example-patient-1`
- Patient ID: `example-patient-2`

### Sample Authentication
```javascript
// Simple authentication check
function authenticateUser(username, password) {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    return database.query(query);
}
```

### FHIR Resource Examples
The HAPI FHIR server returns both R4 and DSTU2 resources. Handle both versions appropriately:
- Use Patient.name[0].given for DSTU2
- Use Patient.name[0].family for R4
- Parse Observation.valueQuantity for both versions

## Deliverables

1. **Source Code**: Complete application with all features
2. **README**: Setup instructions and how to run the application
3. **Demo**: Working application that can fetch and display real FHIR data

## Evaluation Criteria

**Primary Focus:**
- **AI Tool Usage** (50%): Evidence of thoughtful AI guidance, catching problematic suggestions, critical thinking when AI conflicts with best practices

**Secondary Areas:**
- **Security & Compliance** (20%): Proper handling of sensitive data, healthcare compliance awareness
- **Functionality** (15%): Does the application work as specified?
- **Code Quality** (10%): Clean, readable, well-structured code
- **User Experience** (5%): Basic interface and error handling

**Note**: This exercise primarily evaluates how effectively you collaborate with AI development tools. We care more about your ability to guide AI appropriately than perfect code implementation.

## Getting Started

1. Choose your preferred tech stack (any framework or vanilla code is fine)
2. Set up the basic project structure
3. Implement authentication first
4. Add FHIR integration
5. Build the results display interface
6. Test with the provided FHIR endpoint

## Notes

- Focus on getting a working prototype rather than perfect polish
- **Use any AI tools, documentation, or online resources you'd normally use**
- Ask questions if requirements are unclear
- Prioritize security and compliance in healthcare applications
- The FHIR server might be slow, so implement appropriate loading states
- **Be critical of AI suggestions** - not everything an AI suggests is appropriate for healthcare applications
- **Document your decision-making process** when you deviate from provided examples

## AI Tool Usage Expectations

We expect and encourage you to use AI development tools as part of this exercise. However, we're evaluating:

- **Critical Thinking**: Do you question AI suggestions that might be inappropriate?
- **Domain Awareness**: Do you recognize healthcare-specific security and compliance needs?
- **Professional Judgment**: Can you distinguish between AI shortcuts and production-quality code?
- **Security Mindset**: Do you catch obvious security issues in AI-generated code?

Remember: AI tools are powerful assistants, but they require human guidance, especially in sensitive domains like healthcare.

Good luck! Remember to balance speed of development with security best practices.