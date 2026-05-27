HealthSync iOS Companion (Minimal scaffold)

This folder contains a minimal scaffold and example code for an iOS companion app that reads HealthKit data (steps, active energy, heart rate) and posts it to the app backend endpoint.

Overview
- Platform: iOS 16+ (Swift 5, SwiftUI-compatible)
- Purpose: Request HealthKit permission, read recent samples, and POST a small payload to `/api/fitness/apple-watch`.

Files
- `HealthKitManager.swift` — example HealthKit helper to request permissions and fetch latest samples.
- `NetworkUploader.swift` — simple URLSession POST helper. Update `serverBase` to your deployed site.

Setup
1. Open Xcode and create a new iOS app target (or add files to an existing project).
2. Enable the HealthKit capability for the app target (Signing & Capabilities → + Capability → HealthKit).
3. Add these Privacy keys to `Info.plist`:
   - `NSHealthShareUsageDescription` — Describe why you need to read HealthKit data.
   - `NSHealthUpdateUsageDescription` — Describe why you need to write HealthKit data (if applicable).
4. Replace `serverBase` in `NetworkUploader.swift` with your deployed URL (e.g. `https://fitness-ultra.vercel.app`). Use HTTPS.
5. Build and run on a real iPhone device (HealthKit requires a real device).

Usage
- Call `HealthKitManager.shared.requestAuthorization()` once at startup.
- Call `HealthKitManager.shared.syncLatestData()` to fetch and POST a small payload mirroring the web payload format.

Security & Notes
- This is a minimal example for demo/testing. For production, add authentication (user token), TLS verification, and privacy-preserving policies.
- Consider using CloudKit or a secure backend token exchange for per-user uploads.
- To provide deeper watch integration, add a watchOS companion that writes to HealthKit or directly posts to the server.

Example: `HealthKitManager.syncLatestData()` will POST payload like:
{
  "deviceName": "iPhone 14 Pro",
  "workoutType": "HealthKitSync",
  "duration": 30,
  "calories": 220,
  "heartRate": 78,
  "steps": 1250,
  "timestamp": "2026-05-27T12:34:56Z"
}
