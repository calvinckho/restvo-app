//
//  MyViewController.swift
//  App
//
//  Created by Calvin Ho on 2/18/22.
//

import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {

    var originalPoint: CGPoint? = nil;
    var scrollPointDelta: CGPoint? = nil;
    var touchesMoved: Bool? = nil;
    var touchUUID: String? = nil;
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    /**
     Returns a WKWebView initialized with the frame and configuration.
     Subclasses can override this method to return a subclass of WKWebView if needed.
     */
    /* open override func webView(with frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        let customizedWebView = super.webView(with: frame, configuration: configuration);
        return customizedWebView
    } */

    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        touchUUID = "0";
        originalPoint = touches.first?.location(in: self.webView) ?? nil // records the original scroll point on touch
        let view = self.webView?.hitTest(touches.first?.location(in: self.webView) ?? CGPoint.zero, with: event)
        print("Jitsi hitTest subview: " + String(describing: view))
        
        let scriptSource = "var el = document.elementFromPoint(" + String(Int(originalPoint!.x)) + ", " + String(Int(originalPoint!.y)) + ");var touchObj = new Touch({identifier:'" + touchUUID! + "',target:el,'pageX': " + String(Int(originalPoint!.x)) + ",'pageY': " + String(Int(originalPoint!.y)) + "});var ev = new TouchEvent('touchstart', {'view': window,'bubbles': true,'cancelable': true,touches:[touchObj],targetTouches:[touchObj],changedTouches:[touchObj],shiftKey:true});el.dispatchEvent(ev);"
                
        self.webView?.evaluateJavaScript(scriptSource, completionHandler: { (object, error) in
            //print(error ?? "no error x: " + String(Int(point!.x)) + ", y: " + String(Int(point!.y)))
        })
        
        view?.touchesBegan(touches, with: event)
    }
      
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        
        let point = touches.first?.location(in: self.webView)
        let view = self.webView?.hitTest(touches.first?.location(in: self.webView) ?? CGPoint.zero, with: event)
        
        if (touchesMoved == nil) { // if the view wasn't being scrolled, send the click event to JS
            
            let scriptSource = "var ev = new MouseEvent('click', {'view': window,'bubbles': true,'cancelable': true,'screenX': " + String(Int(point!.x)) + ",'screenY': " + String(Int(point!.y)) + "});var el = document.elementFromPoint(" + String(Int(point!.x)) + ", " + String(Int(point!.y)) + ");el.dispatchEvent(ev);"
            
            self.webView?.evaluateJavaScript(scriptSource, completionHandler: { (object, error) in
                print(error ?? "no error x: " + String(Int(point!.x)) + ", y: " + String(Int(point!.y)))
            })
            originalPoint = nil; // clean up originalPoint when touchesMoved is finished
            
        } else { // when touchesEnded ends, send event to JS
            let scriptSource = "var el = document.elementFromPoint(" + String(Int(point!.x)) + ", " + String(Int(point!.y)) + ");var touchObj = new Touch({identifier:'" + touchUUID! + "',target:el,'pageX': " + String(Int(point!.x) ) + ",'pageY': " + String(Int(point!.y)) + "});var ev = new TouchEvent('touchend', {'view': window,'bubbles': true,'cancelable': true,touches:[touchObj],targetTouches:[touchObj],changedTouches:[touchObj],shiftKey:true});el.dispatchEvent(ev);"
                    
            self.webView?.evaluateJavaScript(scriptSource, completionHandler: { (object, error) in
                print(error ?? "no error x: " + String(Int(point!.x)) + ", y: " + String(Int(point!.y)))
            })
        }
        touchesMoved = nil;
        touchUUID = nil;
        view?.touchesEnded(touches, with: event)
    }
      
      override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
          
          // make sure originalPoint and scrollPoint exist
          guard originalPoint != nil else { return }
          
          guard let scrollPoint = touches.first?.location(in: self.webView) else { return }
          
          // handle touchesMoved that result in scrolling of scrollView
          guard let scrollView = self.webView?.hitTest(touches.first?.location(in: self.webView) ?? CGPoint.zero, with: event) as? UIScrollView else { return }
          
          scrollPointDelta = CGPoint(x: (scrollView.contentSize.width > scrollView.frame.size.width) && (scrollView.contentOffset.x + originalPoint!.x - scrollPoint.x > 0) ? (scrollView.contentOffset.x + originalPoint!.x - scrollPoint.x <= scrollView.contentSize.width - scrollView.frame.size.width) ? scrollView.contentOffset.x + originalPoint!.x - scrollPoint.x : scrollView.contentSize.width - scrollView.frame.size.width : 0, y: (scrollView.contentSize.height > scrollView.frame.size.height) && (scrollView.contentOffset.y + originalPoint!.y - scrollPoint.y > 0)  ? (scrollView.contentOffset.y + originalPoint!.y - scrollPoint.y <= scrollView.contentSize.height - scrollView.frame.size.height) ? scrollView.contentOffset.y + originalPoint!.y - scrollPoint.y : scrollView.contentSize.height - scrollView.frame.size.height: 0);
          
          scrollView.setContentOffset(scrollPointDelta!, animated: false)
          
          print("delta point x: " + String(Int(scrollPointDelta!.x)) + ", y: " + String(Int(scrollPointDelta!.y)))
          originalPoint = scrollPoint;
          
          touchesMoved = true;
          
          // send touchmove event to JS
          let scriptSource = "var el = document.elementFromPoint(" + String(Int(scrollPoint.x)) + ", " + String(Int(scrollPoint.y)) + ");var touchObj = new Touch({identifier:'" + touchUUID! + "',target:el,'pageX': " + String(Int(originalPoint!.x) - Int(scrollPoint.x)) + ",'pageY': " + String(Int(originalPoint!.y) - Int(scrollPoint.y)) + "});var ev = new TouchEvent('touchmove', {'view': window,'bubbles': true,'cancelable': true,touches:[touchObj],targetTouches:[touchObj],changedTouches:[touchObj],shiftKey:true});el.dispatchEvent(ev);"
                  
          self.webView?.evaluateJavaScript(scriptSource, completionHandler: { (object, error) in
              print(error ?? "no error x: " + String(Int(scrollPoint.x)) + ", y: " + String(Int(scrollPoint.y)))
          })
          scrollView.touchesMoved(touches, with: event)
      }
      
      override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        print("[Jitsi Plugin Native iOS]: Root::touchesCancelled");
          
      }
    
}
