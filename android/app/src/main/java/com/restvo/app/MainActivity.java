package com.restvo.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.capacitor.jitsi.plugin.Jitsi;
import com.capacitor.shareextension.plugin.ShareExtension;
//import com.byteowls.capacitor.oauth2.OAuth2ClientPlugin;

import android.content.Intent;
import android.webkit.ValueCallback;


import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    registerPlugin(Jitsi.class);
    registerPlugin(ShareExtension.class);
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    String action = intent.getAction();
    String type = intent.getType();
    if (Intent.ACTION_SEND.equals(action) && type != null) {
      bridge.getActivity().setIntent(intent);
      bridge.eval("window.dispatchEvent(new Event('sendIntentReceived'))", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {
        }
      });
    }
  }

}
