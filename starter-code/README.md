# Patient Lab Results Viewer - Starter Code

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Use any username/password to test the login

## Project Structure

```
starter-code/
├── index.html          # Main HTML file with login and dashboard
├── app.js             # JavaScript application logic
├── styles.css         # Basic CSS styles
├── package.json       # Node.js dependencies
└── README.md         # This file
```

## What's Provided

### HTML Structure
- Basic login form with username/password fields
- Dashboard container for patient info and lab results
- Responsive layout structure

### JavaScript Framework
- Event handlers for login/logout
- Basic authentication flow (placeholder)
- FHIR API integration stubs
- Data display functions (incomplete)

### CSS Styles
- Professional healthcare application styling
- Responsive design foundation
- Styling for lab results display

## What You Need to Implement

### 1. Complete Authentication
- The current login accepts any credentials
- Implement proper session management
- Consider security best practices

### 2. FHIR Integration
- Finish the `fetchPatientData()` function
- Complete the `fetchLabResults()` function  
- Handle FHIR R4 Bundle responses properly
- Implement error handling for API failures

### 3. Data Display
- Parse and display patient information correctly
- Format lab results with proper values and ranges
- Show normal/abnormal indicators
- Sort results by date

### 4. Error Handling
- Add loading states during API calls
- Handle network failures gracefully
- Provide user feedback for errors

## FHIR Endpoint Information

**Base URL:** `https://hapi.fhir.org/baseR4`

**Test Patient IDs:**
- `example-patient-1`
- `example-patient-2`

**Sample API Calls:**
```javascript
// Get patient info
GET https://hapi.fhir.org/baseR4/Patient/example-patient-1

// Get lab results  
GET https://hapi.fhir.org/baseR4/Observation?patient=example-patient-1&category=laboratory
```

## Tips

- The HAPI FHIR server is public and may be slow - implement loading states
- FHIR resources can be complex - focus on essential fields first
- Pay attention to healthcare data security considerations
- Test with different patient IDs to ensure robustness

## Resources

- [FHIR R4 Documentation](https://hl7.org/fhir/R4/)
- [HAPI FHIR Public Server](https://hapi.fhir.org/)
- [Patient Resource](https://hl7.org/fhir/R4/patient.html)
- [Observation Resource](https://hl7.org/fhir/R4/observation.html)

## Need Help?

If you get stuck:
1. Check the browser console for errors
2. Test API endpoints directly in your browser
3. Review the sample FHIR responses in `../test-data/`
4. Focus on core functionality first, polish later

Good luck with your implementation!