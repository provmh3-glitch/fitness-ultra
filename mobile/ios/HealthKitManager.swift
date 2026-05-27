import Foundation
import HealthKit

final class HealthKitManager {
    static let shared = HealthKitManager()
    private let store = HKHealthStore()

    private init() {}

    func requestAuthorization(completion: @escaping (Bool, Error?) -> Void) {
        guard HKHealthStore.isHealthDataAvailable() else {
            completion(false, nil)
            return
        }

        let readTypes: Set<HKObjectType> = [
            HKObjectType.quantityType(forIdentifier: .stepCount)!,
            HKObjectType.quantityType(forIdentifier: .activeEnergyBurned)!,
            HKObjectType.quantityType(forIdentifier: .heartRate)!,
        ]

        store.requestAuthorization(toShare: [], read: readTypes) { success, error in
            completion(success, error)
        }
    }

    // Fetch the most recent quantity sample for a type
    private func fetchMostRecentQuantitySample(for identifier: HKQuantityTypeIdentifier, completion: @escaping (Double?) -> Void) {
        guard let type = HKObjectType.quantityType(forIdentifier: identifier) else { completion(nil); return }
        let predicate = HKQuery.predicateForSamples(withStart: Calendar.current.date(byAdding: .day, value: -1, to: Date()), end: Date(), options: .strictEndDate)
        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
        let query = HKSampleQuery(sampleType: type, predicate: predicate, limit: 1, sortDescriptors: [sortDescriptor]) { _, results, _ in
            guard let sample = results?.first as? HKQuantitySample else { completion(nil); return }
            let unit: HKUnit = (identifier == .heartRate) ? HKUnit.count().unitDivided(by: HKUnit.minute()) : HKUnit.count()
            let value = sample.quantity.doubleValue(for: unit)
            completion(value)
        }
        store.execute(query)
    }

    // Example: gather latest metrics and POST to server
    func syncLatestData(completion: ((Bool) -> Void)? = nil) {
        let group = DispatchGroup()
        var steps: Double? = nil
        var calories: Double? = nil
        var heartRate: Double? = nil

        group.enter()
        fetchMostRecentQuantitySample(for: .stepCount) { v in steps = v; group.leave() }

        group.enter()
        fetchMostRecentQuantitySample(for: .activeEnergyBurned) { v in calories = v; group.leave() }

        group.enter()
        fetchMostRecentQuantitySample(for: .heartRate) { v in heartRate = v; group.leave() }

        group.notify(queue: .main) {
            let payload: [String: Any] = [
                "deviceName": UIDevice.current.name,
                "workoutType": "HealthKitSync",
                "duration": 30,
                "calories": Int(calories ?? 0),
                "heartRate": Int(heartRate ?? 0),
                "steps": Int(steps ?? 0),
                "timestamp": ISO8601DateFormatter().string(from: Date())
            ]

            NetworkUploader.upload(path: "/api/fitness/apple-watch", json: payload) { success in
                completion?(success)
            }
        }
    }
}
