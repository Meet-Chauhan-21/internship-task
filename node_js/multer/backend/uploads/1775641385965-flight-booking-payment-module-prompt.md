# ✈️ Flight Booking — Razorpay Payment Module Integration Prompt

---

## 🎯 PROJECT OVERVIEW

Add a **complete, production-grade Razorpay payment module** to the existing flight booking platform. The integration must work exactly like top-tier booking platforms (MakeMyTrip, Goibibo, Cleartrip). All payment transactions must be visible in the Admin Panel with full details, status tracking, and reporting.

---

## 🔐 ENVIRONMENT SETUP

### Frontend `.env` File (create if not exists: `.env` in `/frontend` root)

```env
# ─── App Config ───────────────────────────────────────────
REACT_APP_APP_NAME=FlightBooker
REACT_APP_API_BASE_URL=http://localhost:5000/api

# ─── Razorpay ─────────────────────────────────────────────
REACT_APP_RAZORPAY_KEY_ID=rzp_test_SO0qUUeGYxxFkV

# ─── Payment Config ───────────────────────────────────────
REACT_APP_CURRENCY=INR
REACT_APP_PAYMENT_TIMEOUT_SECONDS=600
REACT_APP_SUPPORT_EMAIL=support@flightbooker.com
REACT_APP_SUPPORT_PHONE=+91-XXXXXXXXXX

# ─── Feature Flags ────────────────────────────────────────
REACT_APP_ENABLE_UPI=true
REACT_APP_ENABLE_NETBANKING=true
REACT_APP_ENABLE_CARDS=true
REACT_APP_ENABLE_WALLETS=true
REACT_APP_ENABLE_EMI=true
```

### Backend `.env` File (create if not exists: `.env` in `/backend` root)

```env
# ─── Server ───────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ─── Database ─────────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/flight_booking

# ─── Razorpay Credentials ─────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_SO0qUUeGYxxFkV
RAZORPAY_KEY_SECRET=NWvnMmDg7kerPvAuLGjxp8cH

# ─── JWT ──────────────────────────────────────────────────
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# ─── Payment Settings ─────────────────────────────────────
PAYMENT_CURRENCY=INR
PAYMENT_RECEIPT_PREFIX=FLIGHT_
WEBHOOK_SECRET=your_razorpay_webhook_secret

# ─── Email (for booking confirmations) ───────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@flightbooker.com
```

> ⚠️ **IMPORTANT:** Add both `.env` files to `.gitignore` immediately. Never commit secrets to version control.

---

## 📁 FOLDER STRUCTURE TO CREATE

```
frontend/src/
├── components/
│   └── payment/
│       ├── PaymentGateway.jsx          # Main payment trigger component
│       ├── PaymentSummary.jsx          # Fare breakdown before payment
│       ├── PaymentStatus.jsx           # Success / Failure / Pending screens
│       ├── PaymentTimer.jsx            # Countdown timer (10 min session)
│       └── PaymentHistory.jsx          # User's past payments
│
├── pages/
│   ├── CheckoutPage.jsx                # Full checkout flow page
│   ├── PaymentSuccessPage.jsx          # Post-payment success
│   └── PaymentFailedPage.jsx           # Post-payment failure
│
├── hooks/
│   └── useRazorpay.js                  # Custom hook for Razorpay logic
│
├── services/
│   └── paymentService.js               # All payment API calls
│
└── utils/
    └── paymentHelpers.js               # Format currency, generate receipt ID, etc.

backend/
├── controllers/
│   └── paymentController.js
├── routes/
│   └── paymentRoutes.js
├── models/
│   └── Payment.js                      # Payment schema
├── middleware/
│   └── verifyPayment.js                # Razorpay signature verification
└── services/
    └── razorpayService.js              # Razorpay SDK wrapper
```

---

## 🗄️ DATABASE SCHEMA

### Payment Model (`Payment.js`)

Create a Mongoose schema with these fields:

```
Payment {
  bookingId          : ref → Booking (required)
  userId             : ref → User (required)
  
  // Razorpay IDs
  razorpayOrderId    : String (unique, required)
  razorpayPaymentId  : String (unique, sparse)
  razorpaySignature  : String
  
  // Amount Details
  amount             : Number (in paise, e.g. 500000 = ₹5000)
  amountPaid         : Number
  currency           : String (default: "INR")
  
  // Status
  status             : Enum ["created", "attempted", "paid", "failed", "refunded"]
  attempts           : Number (default: 0)
  
  // Payment Method Info (captured after payment)
  method             : String (card/upi/netbanking/wallet/emi)
  bank               : String
  wallet             : String
  vpa                : String (UPI ID)
  cardNetwork        : String (Visa/Mastercard/RuPay)
  cardLast4          : String
  emiMonths          : Number
  
  // Flight Info (snapshot at time of booking)
  flightDetails      : {
    flightNumber, airline, origin, destination,
    departureTime, arrivalTime, passengers: []
  }
  
  // Receipt & Notes
  receiptId          : String (auto-generated, e.g. FLIGHT_1234567890)
  notes              : Object
  description        : String
  
  // Refund
  refundId           : String
  refundAmount       : Number
  refundStatus       : String
  refundInitiatedAt  : Date
  
  // Meta
  ipAddress          : String
  userAgent          : String
  createdAt          : Date
  updatedAt          : Date
}
```

---

## 🔧 BACKEND IMPLEMENTATION

### 1. Install Dependencies
```bash
npm install razorpay crypto uuid nodemailer
```

### 2. API Endpoints to Build

#### `POST /api/payment/create-order`
- Authenticate user (JWT middleware)
- Validate bookingId exists and belongs to user
- Check booking status is "pending_payment"
- Create Razorpay order via SDK
- Save Payment document with status "created"
- Return: `{ orderId, amount, currency, key, bookingDetails, userDetails }`

#### `POST /api/payment/verify`
- Receive: `{ razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId }`
- Verify HMAC SHA256 signature using `RAZORPAY_KEY_SECRET`
- If valid:
  - Update Payment status → "paid"
  - Update Booking status → "confirmed"
  - Trigger booking confirmation email
  - Generate e-ticket/PNR number
  - Return: `{ success: true, booking, pnr, ticket }`
- If invalid:
  - Update Payment status → "failed"
  - Return: `{ success: false, error: "Payment verification failed" }`

#### `POST /api/payment/webhook`
- Razorpay Webhook endpoint (no JWT, verify webhook signature instead)
- Handle events: `payment.captured`, `payment.failed`, `order.paid`, `refund.created`
- Update payment/booking status accordingly
- Idempotent — skip if already processed

#### `GET /api/payment/status/:bookingId`
- Return current payment status for a booking

#### `POST /api/payment/refund/:paymentId`
- Admin only (admin role middleware)
- Initiate Razorpay refund
- Update refund fields in Payment document

#### `GET /api/admin/payments` (Admin Panel)
- Protected: admin role required
- Filters: status, dateRange, method, airline, amount range
- Pagination: page, limit
- Sorting: createdAt, amount, status
- Returns: payments with populated booking + user details
- Aggregated stats: total revenue, success rate, method breakdown

#### `GET /api/admin/payments/:paymentId` (Admin Panel)
- Full payment detail for one transaction

#### `GET /api/admin/payments/export`
- Export payments as CSV/Excel for date range

---

## 💳 FRONTEND IMPLEMENTATION

### 1. Install Razorpay Script
In `public/index.html`, add before `</body>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### 2. `useRazorpay.js` Hook Logic

```
1. Call POST /api/payment/create-order → get orderId, amount, key
2. Build Razorpay options object with:
   - key: REACT_APP_RAZORPAY_KEY_ID
   - amount, currency, orderId
   - name: "FlightBooker"
   - description: "Flight Booking - {flightNumber}"
   - image: logo URL
   - prefill: { name, email, contact } from logged-in user
   - notes: { bookingId, flightNumber, route }
   - theme: { color: "#2563EB" }
   - modal: { ondismiss: handleDismiss, confirm_close: true }
   - handler: async function(response) → call verify endpoint
3. On success → redirect to /payment/success with booking details
4. On failure → redirect to /payment/failed with retry option
5. On dismiss → show "Payment Cancelled" with option to retry
```

### 3. Checkout Page Flow

```
Step 1: Flight Review
  └── Show selected flight details (route, time, airline, class)
  └── Passenger details summary
  └── Fare breakdown table:
      ├── Base Fare (per passenger × count)
      ├── Taxes & Fees (GST, Airport charges)
      ├── Convenience Fee
      ├── Discount (if any coupon applied)
      └── TOTAL AMOUNT (bold, prominent)

Step 2: Add-ons (optional)
  └── Seat selection
  └── Meal preference
  └── Extra baggage
  └── Travel insurance (checkbox)

Step 3: Payment
  └── Show PaymentTimer (10 min countdown)
  └── "Pay ₹X,XXX" button → triggers Razorpay modal
  └── Show accepted payment logos (Visa, Mastercard, UPI, NetBanking)
  └── Security badges (256-bit SSL, PCI DSS compliant)
```

### 4. Payment Success Page
Show after successful payment:
- ✅ Booking Confirmed! 
- PNR Number (large, copyable)
- Booking ID & Payment ID
- Flight summary card
- Passenger list
- Amount paid
- "Download Ticket" button (PDF)
- "Email Ticket" button
- "Book Another Flight" CTA

### 5. Payment Failed Page
- ❌ Payment Failed or Cancelled
- Reason (if available from Razorpay)
- Booking ID preserved
- "Retry Payment" button (same booking, new Razorpay order)
- "Contact Support" button
- "Search New Flights" link

---

## 🛡️ ADMIN PANEL — PAYMENT SECTION

Add a **Payments** section in the admin dashboard with:

### Dashboard Cards (top of page)
- 💰 Total Revenue Today / This Month / All Time
- ✅ Successful Payments count
- ❌ Failed Payments count
- 🔄 Refunds Initiated
- 📊 Success Rate % (gauge chart)

### Payments Table Columns
| Column | Details |
|--------|---------|
| Receipt ID | Clickable, opens detail modal |
| Booking ID | Link to booking detail |
| Passenger Name | With avatar initials |
| Route | DEL → BOM |
| Amount | ₹X,XXX |
| Method | UPI / Card / NetBanking icon |
| Razorpay Payment ID | Copyable |
| Status | Color badge (green/red/yellow) |
| Date & Time | IST formatted |
| Actions | View, Refund button |

### Filters
- Date range picker
- Payment status (All / Paid / Failed / Refunded)
- Payment method (All / UPI / Card / NetBanking / Wallet)
- Airline
- Amount range slider
- Search by PNR / Email / Payment ID

### Payment Detail Modal/Page
Full breakdown including:
- All IDs (Order, Payment, Signature hash preview)
- Card/UPI details (masked appropriately)
- Booking snapshot
- Passenger details
- Timeline: Order Created → Payment Attempted → Captured/Failed
- Raw Razorpay response (expandable, for debugging)
- Refund section (if eligible)

### Refund Flow (Admin)
- Enter refund amount (partial or full)
- Reason dropdown (Flight Cancelled / Passenger Request / Duplicate Payment / Other)
- Confirmation dialog with amount
- Call Razorpay Refund API
- Show refund ID and status
- Email notification to passenger

### Export
- Export filtered results as CSV
- Columns: Date, Booking ID, PNR, Passenger, Route, Amount, Method, Status, Payment ID

---

## 🐛 BUGS & ISSUES TO FIX SIMULTANEOUSLY

While implementing the payment module, also fix these common issues:

1. **Double-click prevention** — Disable "Pay Now" button immediately on click to prevent duplicate orders
2. **Session expiry handling** — If JWT expires mid-checkout, save booking state and redirect to login, then back
3. **Price mismatch guard** — Re-validate fare on backend before creating Razorpay order; reject if frontend amount ≠ backend calculated amount
4. **Concurrent booking protection** — Lock seat/booking while payment is in progress; release after 10 min timeout
5. **Network failure recovery** — If verify endpoint fails after payment success, add retry mechanism and webhook as fallback
6. **Mobile responsiveness** — Ensure checkout and payment pages work perfectly on mobile (Razorpay modal is mobile-friendly by default)
7. **Loading states** — Show proper loaders during: order creation, payment processing, verification
8. **Error boundaries** — Wrap payment components in React Error Boundary; show user-friendly error instead of white screen
9. **CORS configuration** — Ensure backend allows frontend origin in payment routes
10. **Webhook idempotency** — Ensure duplicate webhook events don't double-confirm bookings

---

## 📧 EMAIL NOTIFICATIONS

### Send emails for:
1. **Booking Confirmed** — After successful payment
   - E-ticket as PDF attachment
   - Booking summary, PNR, passenger list, flight details
   
2. **Payment Failed** — After failed payment
   - Encourage retry with booking link
   
3. **Refund Initiated** — When admin initiates refund
   - Refund amount, expected timeline (5-7 business days)

4. **Refund Completed** — Via webhook when refund hits bank
   - Confirmation with refund reference number

---

## 🔒 SECURITY CHECKLIST

- [ ] Never log or store full card numbers
- [ ] Razorpay signature verification on EVERY payment (backend)
- [ ] Webhook endpoint verifies `X-Razorpay-Signature` header
- [ ] Admin payment routes protected by role-based middleware
- [ ] Rate limit payment creation endpoint (max 5 attempts per booking)
- [ ] HTTPS only in production
- [ ] `.env` files in `.gitignore`
- [ ] Input validation on all payment endpoints (Joi/Zod)
- [ ] Log all payment events to audit log collection

---

## 🧪 TESTING GUIDE

### Razorpay Test Cards
| Card Number | Network | Result |
|-------------|---------|--------|
| 4111 1111 1111 1111 | Visa | ✅ Success |
| 5267 3181 8797 5449 | Mastercard | ✅ Success |
| 4000 0000 0000 0002 | Visa | ❌ Failure |

- CVV: Any 3 digits
- Expiry: Any future date
- OTP: `1234` (test mode)

### Test UPI
- UPI ID: `success@razorpay` → Success
- UPI ID: `failure@razorpay` → Failure

### Test NetBanking
- Select any bank → Use test credentials shown

---

## 🚀 GO-LIVE CHECKLIST (When switching to Live Keys)

1. Replace `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in both `.env` files
2. Update `REACT_APP_RAZORPAY_KEY_ID` in frontend `.env`
3. Configure live Webhook URL in Razorpay Dashboard → Webhooks
4. Enable required events: `payment.captured`, `payment.failed`, `refund.created`
5. Set Webhook Secret and update `WEBHOOK_SECRET` in backend `.env`
6. Test one live transaction of minimum amount before full launch
7. Enable Razorpay Dashboard alerts for failed payments

---

## 📝 FINAL IMPLEMENTATION NOTES

- Use `amount` in **paise** everywhere (₹500 = `50000` paise)
- Always use `try/catch` around all Razorpay SDK calls
- Store `razorpayOrderId` before opening the modal (in case modal fails to open)
- The `handler` function in Razorpay options fires on SUCCESS only — always verify on backend
- For refunds, Razorpay takes 5–7 business days to credit back to the user
- In test mode, payments are not real — switch to live keys only when ready for production
- Keep test mode active during all development and QA phases

---

*Generated for: Flight Booking Platform — Razorpay Payment Module*  
*API Mode: TEST → Switch to LIVE when going to production*
