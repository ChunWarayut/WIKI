/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "UFQWoqKIuOxhEk472R4flnZhraRSVXMJD9MOAHvYo5l5L7Rf5CuGe45CF1GVkVZTi+KKPL/Zd6t8UKC3Qa5RSYxSmTp6ewQoMGiiqocCqsuf5PnLAv0pZqouVi02NFMjhxToFULQcuJu5RYz5uuhe223g0aq1uvhsnDY+BzT8JNTYWx0ZWRfX4G4nt2wKd/hIVTpo1iR7gNBT1Uf8M64jBDDdrnyq5xjKOCjq+Zq+cn78Wo5masbBFg8K4tgtqdBLkOSwJyid0B+mtNAj75uk7uxWSGvI6UJSPvQoyXTq4fQBkAczTZOJNZ18W8j8Jbm0a328hJgSo6qPlsnh9yGJ/8UfP/7kWW8MZBNg3+f0KPUrbZLM2DB8y9QxfFTni5v9fhUF8Iho43tEI4IeRwQCu83mqMHGnrPdkqBtS0oAB0DQ3DvVzjKgRQ3uzn8tWdKqxs96x4vQI8N1LQhpn81W2yicSKNt/VIfNCkmD8hi5W60vC5TMqsyKjnf5DtCPTEjr4pBlaiLeQy4qGrNjyWBIFaf+18Ux+vAudOWtzTAXCxPoZ6DCXT9Rd1RTaozwtxIqEICzNA+DPM1pthItjeRve6hEOGT+dCxE9x1qbYmslIRTyAG05OvtUb4zlCuYjCLKXVeHNetJ8BiDrn/QlQvI7HvkuYvVZveYIFaHjxlM0=";
      
            /** Check if your device supports AR */
            WikitudePlugin.isDeviceSupported(
                function(success) {
                  console.log("Your platform supports AR/Wikitude. Have fun developing!!");
                },
                function(fail) {
                  console.log("Your platform failed to run AR/Wikitude: "+fail);
                },
                [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
            );                  
      
            /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
             * through the function below for the direction Ionic app --> Wikitude SDK 
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View  
            WikitudePlugin.setOnUrlInvokeCallback(function(url) {
      
              console.log("setOnUrlInvokeCallback ...");
              
              // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
              if (url.indexOf('captureScreen') > -1) {
                  WikitudePlugin.captureScreen(
                      (absoluteFilePath) => {
                          console.log("snapshot stored at:\n" + absoluteFilePath);
      
                          // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                          WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                      },
                      (errorMessage) => {
                          console.log(errorMessage);
                      },
                      true, null
                  );
              } else {
                  alert(url + "not handled");
              }
            });
      
            /**
             * Define the generic ok callback
             */
            WikitudePlugin.onWikitudeOK = function() {
                console.log("Things went ok.");
            }
            
            /**
             * Define the generic failure callback
             */
            WikitudePlugin.onWikitudeError = function() {
                console.log("Something went wrong");
            }
      
            // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
            // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
            //WikitudePlugin.setLocation(47, 13, 450, 1);
      
            /* for Android only
            WikitudePlugin.setBackButtonCallback(
                () => {
                    console.log("Back button has been pressed...");
                }
            );                  
            */
            
    });
  }
}
