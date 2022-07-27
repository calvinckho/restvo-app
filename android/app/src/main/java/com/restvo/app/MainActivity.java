package com.restvo.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.capacitor.jitsi.plugin.Jitsi;
import com.capacitor.shareextension.plugin.ShareExtension;

import java.util.ArrayList;
import android.content.Intent;
import android.webkit.ValueCallback;

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

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        String action = intent.getAction();
        String type = intent.getType();
        if ((Intent.ACTION_SEND.equals(action) || Intent.ACTION_SEND_MULTIPLE.equals(action)) && type != null) {
          bridge.getActivity().setIntent(intent);
          bridge.eval("window.dispatchEvent(new Event('sendIntentReceived'))", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String s) {}
          });
        }
    }
}
