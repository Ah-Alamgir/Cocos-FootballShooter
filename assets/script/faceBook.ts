import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


var preloadedInterstitial = null;
var preloadedRewardedVideo = null;

@ccclass('faceBook')
export class faceBook extends Component {
    start() {


        FBInstant.getInterstitialAdAsync(
            '123123123123_123123123123' // Your Ad Placement Id
            ).then(function(interstitial) {
            // Load the Ad asynchronously
            preloadedInterstitial = interstitial;
            return preloadedInterstitial.loadAsync();
            }).then(function() {
            console.log('Interstitial preloaded');
            }).catch(function(err){
            console.error('Interstitial failed to preload: ' + err.message);
            });

            FBInstant.getRewardedVideoAsync(
                '456456456456_456456456456' // Your Ad Placement Id
              ).then(function(rewarded) {
                // Load the Ad asynchronously
                preloadedRewardedVideo = rewarded;
                return preloadedRewardedVideo.loadAsync();
              }).then(function() {
                console.log('Rewarded video preloaded');
              }).catch(function(err){
                console.error('Rewarded video failed to preload: ' + err.message);
              });


              FBInstant.loadBannerAdAsync(
                '123123123123_123123123123' // Replace with your Ad Placement ID.
              ).then(function () {
                console.log('loadBannerAdAsync resolved.');
              }).catch(function(err) {
                console.error('Banner failed to load: ' + err.message);
              }
            );
    }


    showInterstitial(){
        preloadedInterstitial.showAsync()
    .then(function() {
    // Perform post-ad success operation
    console.log('Interstitial ad finished successfully');        
    })
    .catch(function(e) {
    console.error(e.message);
    });
    }



    showReward(){
        preloadedRewardedVideo.showAsync()
        .then(function() {
        // Perform post-ad success operation
        console.log('Rewarded video watched successfully');        
        })
        .catch(function(e) {
        console.error(e.message);
        });
    }

}


