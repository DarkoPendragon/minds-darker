# Minds Darker
Attempts to make [Minds'](https://www.minds.com/newsfeed/subscriptions) dark theme a bit better, which can be toggled by clicking the extension icon.  
This is a chrome based extension that will only work on chromium browsers (Chrome, Brave, etc.). I recommend using [Brave](https://brave.com/).  
It also could be a lot better. The main CSS file(s) will be pulled from this repo without you having to download them every time a change is made. If an update is pushed and you don't see a problem fixed you likely just have to close/open your browser. If that still doesn't work, you'll need to clear your browser cache and then relaunch.  

# Install
To install it (since it's not on the webstore):
1. Go to `Settings > Extensions > Manage Extensions`
2. Enable Developer Mode
3. Download the latest release under 'Releases' to the right and unzip it to desired location
4. Click `Load unpacked extension`
5. Select the folder you just made with the `manifest.json` in it  

# Importing/Exporting
As of [v1.2](https://github.com/DarkoPendragon/minds-darker/releases/tag/v1.2) you can export your own saved settings and import them or others as well. Hitting the `Export` button will copy your current settings to your clipboard, `Import` will prompt you for that or a similiar string. Just remember that this will overwrite your current settings and you will not be able to get them back.  
  
Here's an example theme you can import that uses less orange colors, called "Cool Blue":
```
{"bordercolor":"#333333","headerborder":"#1a1a1a","lightdark":"#191919","lightdarkinside":"#232121","link":"#005580","linktext":"#afb1b6","pitchdark":"#000000","primaryheader":"#322f4e","primeheader":"#005580","secondarylink":"#005580","state":"custom"}
```  
![image](https://user-images.githubusercontent.com/28911975/113521800-c9856780-9569-11eb-9392-2ab2220ddce8.png)  
  
Here's the same theme, but with an image background (gif) set instead of #000000 for the background:  
The full line set for `Background` is: `center no-repeat fixed url(https://data.whicdn.com/images/284177941/original.gif)`
```
{"bordercolor":"#333333","headerborder":"#1a1a1a","lightdark":"#191919","lightdarkinside":"#232121","link":"#005580","linktext":"#afb1b6","pitchdark":"center no-repeat fixed url(https://data.whicdn.com/images/284177941/original.gif)","primaryheader":"#322f4e","primeheader":"#005580","secondarylink":"#005580","state":"custom"}
```  
![image](https://user-images.githubusercontent.com/28911975/113522163-60ebba00-956c-11eb-955b-476c46aa5b6f.png)


# Default Themes
Basic "Darker" theme preview:
![Normal Preview Image Image](https://i.imgur.com/NzGsLJf.png "Preview Image")
