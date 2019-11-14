

![](images/sometrainTT.png)

<div id="Container" 
	style="padding-bottom:56.25%; position:relative;
	display:block; width: 100%">
	<iframe width="100%" height="100%" 
		allowfullscreen webkitallowfullscreen
		src="http://www.kidsbooksandfun.com/embed/C:\Users\lfern\Videos\racoon.flv" 
		frameborder="0"
		style="position:absolute; top:0; left: 0">
	</iframe>
</div>

<source src="https://www.kidsbooksandfun.com/C:\Users\lfern\Videos\racoon.flv" />
<video width="560" height="340" preload controls>
<embed type="application/x-vlc-plugin" pluginspage="ttp://www.videolan.org" target="C:\Users\lfern\Videos\racoon.flv" />
</video>

<private void btnStart_Click(object sender, EventArgs e)
      {
          try
          {
              LibVlc vlc = new LibVlc();
              vlc.Initialize();
              vlc.VideoOutput = pictureBox1;
              vlc.PlaylistClear();
              string[] Options = { ":sout=#duplicate{dst=display,dst=std {access=udp,mux=ts,dst=224.100.0.1:1234}}" };
              vlc.AddTarget(@"d:\racoon.mp4", Options);
              vlc.Play();
          }
          catch (Exception e1)
          {
              MessageBox.Show($"Error!!! {e}");
          }
      }>
      
Magical stories from the Imagination of Dreams
And several from Strange and Unusual Tales to Boggle the Thoughts of the Most Stable Adults

A Special Book
![](images/wolves.png)

The Wolves the Opposums and the Squirrel with Two Tails

![](images/RingofSkeletons.jpg) ![](images/curse.jpg) ![](images/Bridge1.jpg) ![](images/godivawhata.jpg)

![](images/lady.jpg) ![](images/searchblackrose.jpg) ![](images/wizard.jpg) ![](images/tomturkey.jpg) 
![](images/unicorns.jpg)  ![](images/treasure.jpg) ![](images/summer.jpg)![](images/blackcats.jpg)
![](images/skeleton.png) ![](images/shipBirds.png) ![](images/cattmouseM.png)
