import UIKit
import Capacitor
import Security
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    //AppDelegate.savePassword(service: "com.restvo", account: "", data: "testdata12345")
    return true
  }

  func applicationWillResignActive(_ application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    /*let key = "testpass1234"
    let tag = "com.example.keys.mykey".data(using: .utf8)!
    let addquery: [String: Any] = [kSecClass as String: kSecClassKey,
                                   kSecAttrApplicationTag as String: tag,
                                   kSecValueRef as String: key]
    let status = SecItemAdd(addquery as CFDictionary, nil)
    print("key")*/
    
  }

  func applicationWillEnterForeground(_ application: UIApplication) {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
  }

  func applicationDidBecomeActive(_ application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  }

  func applicationWillTerminate(_ application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
  }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // Called when the app was launched with a url. Feel free to add additional processing here,
    // but if you want the App API to support tracking app url opens, make sure to keep this call
    return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
  }
  
  func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    // Called when the app was launched with an activity, including Universal Links.
    // Feel free to add additional processing here, but if you want the App API to support
    // tracking app url opens, make sure to keep this call
    return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }

  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)

    let statusBarRect = UIApplication.shared.statusBarFrame
    guard let touchPoint = event?.allTouches?.first?.location(in: self.window) else { return }

    if statusBarRect.contains(touchPoint) {
      NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
    }
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
  }

    class func savePassword(service: String, account:String, data: String) {
        if let dataFromString = data.data(using: String.Encoding.utf8, allowLossyConversion: false) {
            
            // Instantiate a new default keychain query
            let keychainQuery: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                                kSecAttrService as String: service,
                                                kSecAttrAccount as String: "testAcct",
                                                kSecValueData as String: dataFromString
                //kSecAttrService as String: "testservice",
                //kSecAttrApplicationTag as String: tag,
                //kSecValueData as String: key.data(using: String.Encoding.utf8)
            ]
            
            
            // Add the new keychain item
            let status = SecItemAdd(keychainQuery as CFDictionary, nil)
            
            if (status != errSecSuccess) {    // Always check the status
                /*if let err = SecCopyErrorMessageString(status, nil) {
                    print("Write failed: \(err)")
                }*/
                print("Write failed: \(status)")
            }
            else{
                print("Save to Keychain success")
            }
        }
    }
    
    class func loadPassword(service: String, account:String) -> String? {
        // Instantiate a new default keychain query
        // Tell the query to return a result
        // Limit our results to one item
        let keychainQuery: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                            kSecAttrService as String: service,
                                            kSecAttrAccount as String: "testAcct",
                                            kSecReturnData as String: kCFBooleanTrue
            //kSecAttrService as String: "testservice",
            //kSecAttrApplicationTag as String: tag,
            //kSecValueData as String: key.data(using: String.Encoding.utf8)
        ]
        
        var dataTypeRef :AnyObject?
        
        // Search for the keychain items
        let status: OSStatus = SecItemCopyMatching(keychainQuery as CFDictionary, &dataTypeRef)
        var contentsOfKeychain: String?
        
        if status == errSecSuccess {
            if let retrievedData = dataTypeRef as? Data {
                contentsOfKeychain = String(data: retrievedData, encoding: String.Encoding.utf8)
            }
        } else {
            print("Nothing was retrieved from the keychain. Status code \(status)")
        }
        
        return contentsOfKeychain
    }
}

