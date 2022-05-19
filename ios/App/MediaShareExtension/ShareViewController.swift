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

class ShareItem {
    
    public var title: String?
    public var type: String?
    public var url: String?
    public var webPath: String?
}

class ShareViewController:  UIViewController {
    
    private var shareItems: [ShareItem] = []
        
    override public func viewDidAppear(_ animated: Bool) {
       super.viewDidAppear(animated)
       self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    override public func viewDidLoad() {
        super.viewDidLoad()
        
        shareItems.removeAll()
        
        let extensionItem = extensionContext?.inputItems[0] as! NSExtensionItem
        Task {
            try await withThrowingTaskGroup(
                of: ShareItem.self,
                body: { taskGroup in
                    
                    for attachment in extensionItem.attachments! {
                        if attachment.hasItemConformingToTypeIdentifier(kUTTypeURL as String) {
                            taskGroup.addTask {
                                return try await self.handleTypeUrl(attachment)
                            }
                        } else if attachment.hasItemConformingToTypeIdentifier(kUTTypeText as String) {
                            taskGroup.addTask {
                                return try await self.handleTypeText(attachment)
                            }
                        } else if attachment.hasItemConformingToTypeIdentifier(kUTTypeMovie as String) {
                            taskGroup.addTask {
                                return try await self.handleTypeMovie(attachment)
                            }
                        } else if attachment.hasItemConformingToTypeIdentifier(kUTTypeImage as String) {
                            taskGroup.addTask {
                                return try await self.handleTypeImage(attachment)
                            }
                        }
                    }
                    
                    for try await item in taskGroup {
                        self.shareItems.append(item)
                    }
                })
            
            self.sendData()
            
        }
    }
    
    private func sendData() {
        let queryItems = shareItems.map {
            [
                URLQueryItem(
                    name: "title",
                    value: $0.title?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? ""),
                URLQueryItem(name: "description", value: ""),
                URLQueryItem(
                    name: "type",
                    value: $0.type?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? ""),
                URLQueryItem(
                    name: "url",
                    value: $0.url?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? ""),
                URLQueryItem(
                    name: "webPath",
                    value: $0.webPath?.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed) ?? "")
            ]
        }.flatMap({ $0 })
        var urlComps = URLComponents(string: "restvo://;")!
        urlComps.queryItems = queryItems
        openURL(urlComps.url!)
    }
    
    fileprivate func createSharedFileUrl(_ url: URL?) -> String {
        let fileManager = FileManager.default
        print("share url: " + url!.absoluteString)
        let copyFileUrl =
        fileManager.containerURL(forSecurityApplicationGroupIdentifier: "group.com.restvo.test")!
            .absoluteString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)! + url!
            .lastPathComponent.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        try? Data(contentsOf: url!).write(to: URL(string: copyFileUrl)!)
        
        return copyFileUrl
    }
    
    func saveScreenshot(_ image: UIImage) -> String {
        let fileManager = FileManager.default
        
        let copyFileUrl =
        fileManager.containerURL(forSecurityApplicationGroupIdentifier: "group.com.restvo.test")!
            .absoluteString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        + "/screenshot.png"
        do {
            try image.pngData()?.write(to: URL(string: copyFileUrl)!)
            return copyFileUrl
        } catch {
            print(error.localizedDescription)
            return ""
        }
    }
    
    fileprivate func handleTypeUrl(_ attachment: NSItemProvider)
    async throws -> ShareItem
    {
        let results = try await attachment.loadItem(forTypeIdentifier: kUTTypeURL as String, options: nil)
        let url = results as! URL?
        let shareItem: ShareItem = ShareItem()
        
        if url!.isFileURL {
            shareItem.title = url!.lastPathComponent
            shareItem.type = "application/" + url!.pathExtension.lowercased()
            shareItem.url = createSharedFileUrl(url)
            shareItem.webPath = "capacitor://localhost/_capacitor_file_" + URL(string: shareItem.url ?? "")!.path
        } else {
            shareItem.title = url!.absoluteString
            shareItem.url = url!.absoluteString
            shareItem.webPath = url!.absoluteString
            shareItem.type = "text/plain"
        }
        
        return shareItem
    }
    
    fileprivate func handleTypeText(_ attachment: NSItemProvider)
    async throws -> ShareItem
    {
        let results = try await attachment.loadItem(forTypeIdentifier: kUTTypeText as String, options: nil)
        let shareItem: ShareItem = ShareItem()
        let text = results as! String
        shareItem.title = text
        shareItem.type = "text/plain"
        return shareItem
    }
    
    fileprivate func handleTypeMovie(_ attachment: NSItemProvider)
    async throws -> ShareItem
    {
        let results = try await attachment.loadItem(forTypeIdentifier: kUTTypeMovie as String, options: nil)
        let shareItem: ShareItem = ShareItem()
        
        let url = results as! URL?
        shareItem.title = url!.lastPathComponent
        shareItem.type = "video/" + url!.pathExtension.lowercased()
        shareItem.url = createSharedFileUrl(url)
        shareItem.webPath = "capacitor://localhost/_capacitor_file_" + URL(string: shareItem.url ?? "")!.path
        return shareItem
    }
    
    fileprivate func handleTypeImage(_ attachment: NSItemProvider)
    async throws -> ShareItem
    {
        let data = try await attachment.loadItem(forTypeIdentifier: kUTTypeImage as String, options: nil)
        
        let shareItem: ShareItem = ShareItem()
        switch data {
        case let image as UIImage:
            shareItem.title = "screenshot"
            shareItem.type = "image/png"
            shareItem.url = self.saveScreenshot(image)
            shareItem.webPath = "capacitor://localhost/_capacitor_file_" + URL(string: shareItem.url ?? "")!.path
        case let url as URL:
            shareItem.title = url.lastPathComponent
            shareItem.type = "image/" + url.pathExtension.lowercased()
            shareItem.url = self.createSharedFileUrl(url)
            shareItem.webPath = "capacitor://localhost/_capacitor_file_" + URL(string: shareItem.url ?? "")!.path
        default:
            print("Unexpected image data:", type(of: data))
        }
        return shareItem
    }
    
    @objc func openURL(_ url: URL) -> Bool {
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                return application.perform(#selector(openURL(_:)), with: url) != nil
            }
            responder = responder?.next
        }
        return false
    }

    //fileprivate var shareView: UIView?
    /*private var mediaURL: String?
    public var item: SLComposeSheetConfigurationItem!
    private var auth : String?
    private var dataPending = true
    private var imageCounter = 0

    override func viewDidLoad() {
        super.viewDidLoad()

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
    }*/
}
