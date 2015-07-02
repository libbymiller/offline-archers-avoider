## Install wheezy on a card

    diskutil list
    diskutil unmountDisk /dev/diskn
    sudo dd bs=1m if=~/Downloads/2015-05-05-raspbian-wheezy.img of=/dev/rdiskn

## Provison a radiodan

    sudo LOG_LEVEL=DEBUG ./provision all

## Checkout the offline Archers Avoider code

    cd /opt/radiodan
    git clone https://github.com/libbymiller/offline-archers-avoider
    cd offline-archers-avoider
    npm install

## Make an accesss point

edit /etc/nginx/sites-enabled/wpa_cli_web_redirect

    upstream debug {
       server 127.0.0.1:5000 max_fails=0;
    }

edit /opt/radiodan/adhoc/try_adhoc_network to remove

     # Do 6 scans over 1 min
     #for i in {1..6}
     #do
     #  echo "Scan $i of 6"
     #  /sbin/wpa_cli scan
     #  /bin/sleep 10
     #done

and

     #echo "Starting wpa-cli-web"
     #/etc/init.d/wpa-cli-web start


     sudo cp status511.html /opt/radiodan/static/status511.html

## switch device type

     sudo cp radiodan-type-offline-archers-avoider.conf /etc/supervisor/available
     sudo radiodan-device-type radiodan-type-offline-archers-avoider.conf

## Download the audio

 * a podcast of the Archers http://www.bbc.co.uk/podcasts/series/archers and download to /media/music/TheArchers.mp3
 * a podcast of Tim Westwood e.g. from https://soundcloud.com/timwestwood and download to /media/music/TimWestwood.mp3
 * some birdsong e.g. from http://www.pdsounds.org/tag/birdsong and download to /media/music/birdsong.mp3

## Add a button to the raspberry pi on WiringPi pin GPIO 7 


## Reboot

 * The Archers should start playing
 * the Button plays Tim Westwood for 10 seconds then goes back to the Achers

## Join radiodan-configuration

 * a web page should pop up allowing you to stop or pause or avoid


