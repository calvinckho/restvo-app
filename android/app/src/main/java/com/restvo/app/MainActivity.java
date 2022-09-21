package com.restvo.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.capacitor.jitsi.plugin.Jitsi;
import com.capacitor.shareextension.plugin.ShareExtension;

import android.content.Intent;
import android.webkit.ValueCallback;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    String action = intent.getAction();
    String type = intent.getType();
    if ((Intent.ACTION_SEND.equals(action) || Intent.ACTION_SEND_MULTIPLE.equals(action)) && type != null) {
      bridge.getActivity().setIntent(intent);
      bridge.eval("window.dispatchEvent(new Event('sendIntentReceived'))", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {
        }
      });
    }
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    registerPlugin(Jitsi.class);
    registerPlugin(ShareExtension.class);
  }
}
