package com.restvo.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.capacitor.jitsi.plugin.Jitsi;
import com.capacitor.shareextension.plugin.ShareExtension;
//import com.byteowls.capacitor.oauth2.OAuth2ClientPlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(Jitsi.class);
      add(ShareExtension.class);
      //add(OAuth2ClientPlugin.class);
    }});
  }
}
