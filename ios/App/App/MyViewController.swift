//
//  MyViewController.swift
//  App
//
//  Created by Calvin Ho on 2/18/22.
//

import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    
    var touchUUID: String? = nil;
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    /**
     Returns a WKWebView initialized with the frame and configuration.
     Subclasses can override this method to return a subclass of WKWebView if needed.
     
    
    open override func webView(with frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        
        /* injecting JS into WKWebView. Refer to https://www.appsdeveloperblog.com/inject-javascript-into-wkwebview*/
        let js = getMyJavaScript()
        let script = WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: false)
        configuration.userContentController.addUserScript(script)
        return WKWebView(frame: frame, configuration: configuration)
    }
    
    func getMyJavaScript() -> String {
        if let filepath = Bundle.main.path(forResource: "textarea-caret-position", ofType: "js") {
            do {
                return try String(contentsOfFile: filepath)
            } catch {
                return ""
            }
        } else {
           return ""
        }
    }*/
}
