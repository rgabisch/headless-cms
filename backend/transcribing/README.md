## Instructions

To use the speech to text please update the variables inside .env_sample with the data from IBM. Please save that changes to .env_sample. Do not overwrite .env_sample. Github will ignore your .env file with our secret keys.

## Tools for audio transcription

Unfortunately it is currently still difficult to get the lyrics from songs. Lyrics and music are difficult to separate. Some "quiet" music styles might work though. A way out of this problem would be to recognize the song via song recognition and then link the lyrics from a lyrics database. The requirement for this is that the song is available in this database. For our use case this will never be the case when publishing new content. For this reason I only refer my research to pure speech recognition. 

### Google Speech Recognition

Service from Google supports different languages. Speech recognition is widely used and there is a lot of documentation on google.The Google service becomes weaker with long audio files. In this case it is suitable to split the file into smaller parts.

* works with python
* requires a little bit of work for analysing

### Amazon AWS Transcribe

Service from Amazon that is very easy to use in connection to our hosted conent. It also transcribes videos and returns analysed data such as vocabulary filter.

* build in aws feature
* easy to use
* audio and video
* for first 12 month 60 minutes of speech-transcribing each month are free

### IBM (Watson)

Offers a great API for us to implement this feature in our REST platform. It is also possible to get confidence score, keywords etc.

* free for 50 minutes each  month 
* great for REST platform  
* audio and video
