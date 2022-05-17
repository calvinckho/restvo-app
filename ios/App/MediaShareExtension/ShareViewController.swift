//
//  ShareViewController.swift
//  MediaShareExtension
//
//  Created by Calvin Ho on 5/16/22.
//

import UIKit
import Social
import MobileCoreServices
import Foundation.NSURLSession
class ShareViewController:  UIViewController {

    //fileprivate var shareView: UIView?
    private var mediaURL: String?
    public var item: SLComposeSheetConfigurationItem!
    private var auth : String?
    private var dataPending = true

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let contentsOfKeychain = retreiveFromKeyChain()

        if contentsOfKeychain.isEmpty {
            //do nothing
            dataPending = false
        } else {
            //addConversationData(contentsOfKeychain: contentsOfKeychain)
        }

        //make sure data given is URL or text
        let extensionItem = extensionContext?.inputItems[0] as! NSExtensionItem

        for attachment in extensionItem.attachments as! [NSItemProvider] {
            print("check types", attachment.registeredTypeIdentifiers)
            
            if attachment.hasItemConformingToTypeIdentifier("public.jpeg" as String) {
                attachment.loadItem(forTypeIdentifier: "public.jpeg", options: nil, completionHandler: { (data, error) in
                    //let url = results as! URL?
                    //print("loaded photo: ", url);
                    //self.mediaURL = url!.absoluteString
                    
                    var contentData: Data? = nil

                    //data could be raw Data
                    if let data = data as? Data {
                        contentData = data

                    //data could be an URL
                    } else if let url = data as? URL {
                        contentData = try? Data(contentsOf: url)
                    }

                    //data could be an UIImage object (e.g. ios11 screenshot editor)
                    else if let imageData = data as? UIImage {
                        contentData = imageData.pngData()
                    
                    }

                    // proceed here with contentData
                    let image = UIImage(data: contentData ?? Data())
                    
                    // Convert to Data
                    if let data = image?.pngData() {
                        // Create URL
                        let documents = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
                        let url = documents.appendingPathComponent("uploaded.png")

                        do {
                            // Write to Disk
                            try data.write(to: url)

                            self.extensionContext!.completeRequest(returningItems: nil, completionHandler: { _ in
                                let application = UIApplication.value(forKeyPath: #keyPath(UIApplication.shared)) as! UIApplication

                                let selector = NSSelectorFromString("openURL:")

                                let appURL = URL(string: "restvo://%3BdataURL=" + url.absoluteString)!

                                application.perform(selector, with: appURL)
                            })

                        } catch {
                            print("Unable to Write Data to Disk (\(error))")
                        }
                    }
                })
                
            }
        }
        
        
        //self.extensionContext!.cancelRequest(withError: NSError())
    }
    
    func openURL(url: NSURL) -> Bool {
        do {
            let application = try self.sharedApplication()
            return application.perform("openURL:", with: url, afterDelay: 0.00) != nil
        }
        catch {
            return false
        }
    }

    func sharedApplication() throws -> UIApplication {
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                return application
            }

            responder = responder?.next
        }

        throw NSError(domain: "UIInputViewController+sharedApplication.swift", code: 1, userInfo: nil)
    }
    
    private func retreiveFromKeyChain()->String{
        print("Loading from keychain")
        //retrieve from keychain
        let getquery: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                       kSecAttrService as String: "token",
                                       kSecReturnData as String: kCFBooleanTrue,
                                       kSecMatchLimit as String  : kSecMatchLimitOne
        ]

        var dataTypeRef :AnyObject? = nil
        // Search for the keychain items
        let status: OSStatus = SecItemCopyMatching(getquery as CFDictionary, &dataTypeRef)

        var contentsOfKeychain: String?
        if status == errSecSuccess {
            if let retrievedData = dataTypeRef as? Data {
                contentsOfKeychain = String(data: retrievedData, encoding: String.Encoding.utf8)
            }
            else{
                print("Error converting data. Status code \(status)")
            }
        }
        else {
            print("Nothing was retrieved from the keychain. Status code \(status)")
            return("")
        }
        //return the contents of the keychain
        return (contentsOfKeychain!)

    }
}
