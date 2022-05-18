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
    private var imageCounter = 0

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

        for attachment in extensionItem.attachments! {
            print("check types", attachment.registeredTypeIdentifiers)
            
            if attachment.hasItemConformingToTypeIdentifier("public.jpeg" as String) {
                attachment.loadItem(forTypeIdentifier: "public.jpeg", options: nil, completionHandler: { (data, error) in
                    //let url = results as! URL?
                    //print("loaded photo: ", url);
                    //self.mediaURL = url!.absoluteString
                    //data could be raw Data
                    var contentData: Data? = nil
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
                    if let image = UIImage(data: contentData ?? Data()) {
                        let jpeg = self.generateJPEG(image: image, metadata: [:], with: 90)
                        let fileURL = try? self.saveTemporaryImage(jpeg!);
                        print("file url", fileURL?.absoluteString)
                        let webPath = URL(string: "capacitor://localhost/_capacitor_file_")!.appendingPathComponent(fileURL!.path);
                        self.extensionContext!.completeRequest(returningItems: nil, completionHandler: { _ in
                            let application = UIApplication.value(forKeyPath: #keyPath(UIApplication.shared)) as! UIApplication

                            let selector = NSSelectorFromString("openURL:")

                            let appURL = URL(string: "restvo://%3BwebPath=" + webPath.absoluteString)!

                            application.perform(selector, with: appURL)
                        })
                    } else {
                        print("failed")
                        self.extensionContext!.cancelRequest(withError: NSError())
                    }
                })
            }
        }
    }
    
    func saveTemporaryImage(_ data: Data) throws -> URL {
        var url: URL
        repeat {
            imageCounter += 1
            url = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("photo-\(imageCounter).jpg")
        } while FileManager.default.fileExists(atPath: url.path)

        try data.write(to: url, options: .atomic)
        return url
    }
    
    
    func generateJPEG(image: UIImage, metadata: [String: Any], with quality: CGFloat) -> Data? {
        // convert the UIImage to a jpeg
        guard let data = image.jpegData(compressionQuality: quality) else {
            return nil
        }
        // define our jpeg data as an image source and get its type
        guard let source = CGImageSourceCreateWithData(data as CFData, nil), let type = CGImageSourceGetType(source) else {
            return data
        }
        // allocate an output buffer and create the destination to receive the new data
        guard let output = NSMutableData(capacity: data.count), let destination = CGImageDestinationCreateWithData(output, type, 1, nil) else {
            return data
        }
        // pipe the source into the destination while overwriting the metadata, this encodes the metadata information into the image
        CGImageDestinationAddImageFromSource(destination, source, 0, metadata as CFDictionary)
        // finish
        guard CGImageDestinationFinalize(destination) else {
            return data
        }
        return output as Data
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
