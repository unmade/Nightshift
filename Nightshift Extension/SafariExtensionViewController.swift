//
//  SafariExtensionViewController.swift
//  Nightshift Extension
//
//  Created by Леша Маслаков on 3/23/20.
//  Copyright © 2020 Леша Маслаков. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {

    @IBOutlet weak var titleLabel: NSTextField!
    @IBOutlet weak var toggleButton: NSButton!
    
    var darkMode: Bool = false {
        didSet {
            if darkMode {
                toggleButton.title = "Dark Mode Off"
            } else {
                toggleButton.title = "Dark Mode On"
            }
        }
    }
    
    var host: String? {
        didSet {
            if let host = host {
                titleLabel.stringValue = host
            } else {
                titleLabel.stringValue = "loading..."
            }
        }
    }
    
    var onDarkModeOn: (() -> Void)?
    var onDarkModeOff: (() -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:120)
        return shared
    }()
    
    @IBAction func onClick(_ sender: Any) {
        if darkMode {
            onDarkModeOff?()
        } else {
            onDarkModeOn?()
        }
        darkMode = !darkMode;
    }

}
