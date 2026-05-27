import Foundation

struct NetworkUploader {
    static var serverBase = "https://fitness-ultra.vercel.app" // change to your deployment URL

    static func upload(path: String, json: [String: Any], completion: @escaping (Bool) -> Void) {
        guard let url = URL(string: serverBase + path) else { completion(false); return }
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.addValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            req.httpBody = try JSONSerialization.data(withJSONObject: json, options: [])
        } catch {
            completion(false)
            return
        }

        let task = URLSession.shared.dataTask(with: req) { data, resp, err in
            guard err == nil else { completion(false); return }
            completion(true)
        }
        task.resume()
    }
}
