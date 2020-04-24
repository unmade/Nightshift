//
//  ViewController.swift
//  Nightshift
//
//  Created by Леша Маслаков on 3/23/20.
//  Copyright © 2020 Леша Маслаков. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = "Nightshift";
    }

    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.fdooch.Nightshift-Extension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.
            }
        }
    }

}
