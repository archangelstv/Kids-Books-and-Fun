

![](images/sometrainTT.png)


<source src="https://www.kidsbooksandfun.com/C:\Users\lfern\Videos\racoon.flv" />
<video width="560" height="340" preload controls>
<embed type="application/x-vlc-plugin" pluginspage="http://www.kidsbooksandfun.com" target="C:\Users\lfern\Videos\racoonT.flv" />
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
