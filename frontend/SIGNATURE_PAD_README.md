# Signature Pad Implementation

## Overview
This document describes the signature pad functionality implemented in the Log Book Keamanan frontend application.

## Features Implemented

### 1. Reusable SignaturePad Component (`src/components/SignaturePad.js`)
- **Purpose**: A reusable component for capturing digital signatures
- **Features**:
  - Canvas-based signature drawing
  - Clear button functionality
  - Visual feedback when signature is captured
  - Disabled state support
  - Customizable dimensions and colors
  - Responsive design

### 2. Officer Report Creation (`src/components/AddLogBook.js`)
- **Signature Requirements**:
  - Officer must sign as the report creator (`ttd_pembuat`)
  - Officer must sign as the report receiver (`ttd_penerima`)
- **Validation**: Both signatures are required before submitting to supervisor
- **UI**: Two signature pads side by side with officer names displayed below
- **Status Restriction**: Signatures only available when status is "draft"

### 3. Officer Report Editing (`src/components/UpdateLogBook.js`)
- **Signature Requirements**: Same as AddLogBook.js
- **Status Restriction**: 
  - Signature pads only visible when status is "draft"
  - Submit and Delete buttons disabled when status is not "draft"
  - Clear status indication for non-draft reports

### 4. Supervisor Report Approval (`src/components/ViewReport.js`)
- **Signature Display**: Shows all three signatures (pembuat, penerima, supervisor)
- **Approval Process**: Supervisor can sign and approve reports with status "submit to supervisor"
- **Status Update**: Changes report status to "done" upon approval
- **UI**: 
  - Signature pad appears only for supervisors viewing reports with status "submit to supervisor"
  - Status information displayed for non-approvable reports

## Database Schema
The signature data is stored in the `laporan` table with the following fields:
- `ttd_pembuat` (TEXT): Signature of the report creator
- `ttd_penerima` (TEXT): Signature of the report receiver  
- `ttd_supervisor` (TEXT): Signature of the approving supervisor

## Backend Integration
- **Controller**: `backend/controllers/laporanController.js`
- **Model**: `backend/models/laporan_model.js`
- **API Endpoints**:
  - `PUT /api/laporan/:id` - Update report with signatures
  - `GET /api/laporan/:id` - Retrieve report with signature data

## Workflow

### Officer Workflow:
1. Create report with activities and inventory (status: "draft")
2. Fill in signature pads for both pembuat and penerima (only available in draft status)
3. Submit to supervisor (status: "submit to supervisor")
4. Cannot modify signatures after submission

### Supervisor Workflow:
1. View pending reports with status "submit to supervisor"
2. Review report details and existing signatures
3. Add supervisor signature (only available for "submit to supervisor" status)
4. Approve report (status: "done")

## Technical Details

### Dependencies
- `react-signature-canvas`: Core signature drawing functionality
- `react`: React framework
- `axios`: HTTP client for API calls

### Signature Format
- Signatures are captured as base64-encoded PNG images
- Stored as TEXT in database
- Displayed as `<img>` elements in the UI

### Validation Rules
- **Officer Signature Rules:**
  - Officers can only sign reports with status "draft"
  - Both pembuat and penerima signatures are required before submission
  - Once status is "submit to supervisor", officers cannot modify signatures
- **Supervisor Signature Rules:**
  - Supervisors can only sign reports with status "submit to supervisor"
  - Supervisor signature is required before approval
  - Reports cannot be edited after approval (status "done")

## Usage Examples

### Basic SignaturePad Usage:
```jsx
import SignaturePad from './components/SignaturePad';

<SignaturePad
  onSignatureChange={(signature) => setSignature(signature)}
  placeholder="Sign here..."
  width={320}
  height={120}
/>
```

### Officer Report Creation:
```jsx
// In AddLogBook.js
<SignaturePad
  onSignatureChange={setSignaturePembuat}
  placeholder="Tanda tangan pembuat laporan"
/>
<SignaturePad
  onSignatureChange={setSignaturePenerima}
  placeholder="Tanda tangan penerima laporan"
/>
```

### Officer Report Editing:
```jsx
// In UpdateLogBook.js - Only shown when status is "draft"
{laporan.status === 'draft' && (
  <SignaturePad
    onSignatureChange={setSignaturePembuat}
    placeholder="Tanda tangan pembuat laporan"
  />
)}
```

### Supervisor Approval:
```jsx
// In ViewReport.js
{auth.user.role === 'supervisor' && laporan.status === 'submit to supervisor' && (
  <SignaturePad
    onSignatureChange={setSignatureSupervisor}
    placeholder="Tanda tangan supervisor untuk menyetujui laporan"
  />
)}
```

## Security Considerations
- Signatures are validated on both frontend and backend
- Only authorized users can sign (officers for their reports, supervisors for approval)
- Signature data is stored securely in the database
- No signature manipulation is allowed after submission

## Future Enhancements
- Signature verification/validation
- Digital certificate integration
- Signature timestamping
- Audit trail for signature changes
- Mobile-optimized signature capture 