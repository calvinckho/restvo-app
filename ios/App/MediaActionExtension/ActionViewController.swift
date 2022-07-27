//
//  ActionViewController.swift
//  MediaActionExtension
//
//  Created by Calvin Ho on 5/16/22.
//

import UIKit
import MobileCoreServices
import UniformTypeIdentifiers

class ActionViewController: UIViewController {

    //@IBOutlet weak var imageView: UIImageView!

    override func viewDidLoad() {
        super.viewDidLoad()
    
        // Get the item[s] we're handling from the extension context.
        
        // For example, look for an image and place it into an image view.
        // Replace this with something appropriate for the type[s] your extension supports.
        var imageFound = false
        for item in self.extensionContext!.inputItems as! [NSExtensionItem] {
            for provider in item.attachments! {
                if provider.hasItemConformingToTypeIdentifier(kUTTypeImage as String) {
                    // This is an image. We'll load it, then place it in our image view.
                    //weak var weakImageView = self.imageView
                    provider.loadItem(forTypeIdentifier: kUTTypeImage as String, options: nil, completionHandler: { (imageURL, error) in
                        //self.extensionContext!.open(URL(string: "https://apple.news/A0PICfkdmTi227OZa-j6XQw")!, completionHandler: nil)
                        print("photo", imageURL);
                        self.extensionContext!.completeRequest(returningItems: nil, completionHandler: {_ in
                            //self.openURL(url: NSURL(string: "restvo://")!)
                            let application = UIApplication.value(forKeyPath: #keyPath(UIApplication.shared)) as! UIApplication

                            let selector = NSSelectorFromString("openURL:")

                            let url = URL(string: "restvo://")!

                            application.perform(selector, with: url)
                        })
                        
                    })

                    imageFound = true
                    break
                }
            }

            if (imageFound) {
                // We only handle one image, so stop looking for more.
                break
            }
        }
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
}
