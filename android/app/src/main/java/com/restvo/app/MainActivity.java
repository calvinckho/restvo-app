package com.restvo.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.capacitor.jitsi.plugin.Jitsi;
//import com.capacitor.shareextension.plugin.ShareExtension;
//import com.byteowls.capacitor.oauth2.OAuth2ClientPlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    registerPlugin(Jitsi.class);
    //registerPlugin(ShareExtension.class);
  }
}
