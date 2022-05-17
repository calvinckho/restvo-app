//
//  ShareSelectViewController.swift
//  testShareExtension
//
//  Created by Jonathan on 7/13/19.
//

import Foundation
import UIKit
protocol ShareSelectViewControllerDelegate {
    func sendingViewController(sentItem: Conversation)
}
class ShareSelectViewController: UITableViewController, UISearchResultsUpdating{
    
    
    var conversationList: [Conversation] = []
    var delegate: ShareSelectViewControllerDelegate?
    var filteredConversationList = [Conversation]()
    var resultSearchController = UISearchController()
    
    func updateSearchResults(for searchController: UISearchController) {
        filteredConversationList.removeAll(keepingCapacity: false)
        
        filteredConversationList = conversationList.filter{
            $0.name!.contains(searchController.searchBar.text!)
        }
        self.tableView.reloadData()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.resultSearchController = ({
            let controller = UISearchController(searchResultsController: nil)
            controller.searchResultsUpdater = self
            controller.dimsBackgroundDuringPresentation = false
            controller.hidesNavigationBarDuringPresentation = false
            navigationItem.searchController = controller
            return controller
        })()
        self.clearsSelectionOnViewWillAppear = false
        tableView.reloadData()
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        //if search is active
        if resultSearchController.isActive {
            return filteredConversationList.count
        }
        //if search is not active
        else{
            return self.conversationList.count
        }
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "TeamCell")
        
        if cell == nil {
            cell = UITableViewCell(style: .default, reuseIdentifier: "TeamCell")
        }
        if resultSearchController.isActive {
            cell?.textLabel?.text = filteredConversationList[indexPath.row].name
        }
        else{
            cell?.textLabel!.text = self.conversationList[indexPath.item].name
        }
        
        return cell!
    }
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print(conversationList[indexPath.row].name)
        let selectedConversation: Conversation
        if resultSearchController.isActive {
            selectedConversation = filteredConversationList[indexPath.row]
            resultSearchController.dismiss(animated: false, completion: nil)
        }
        else{
            selectedConversation = self.conversationList[indexPath.row]
        }
        
        delegate?.sendingViewController(sentItem: selectedConversation)
    }
}
