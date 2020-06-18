var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
require('dotenv').config();

var speech_to_text = new SpeechToTextV1({
   iam_apikey: process.env.API_KEY,
   url: process.env.URL
  });

var file = './audio-file.flac';
var params = {
    audio: fs.createReadStream(file),
    content_type: 'audio/flac',
    timestamps: true,
    word_alternatives_threshold: 0.9,
};
speech_to_text.recognize(params, function (error, transcript) {
 if (error)
      console.log('Error:', error);
 else
    console.log(transcript.results[0].alternatives[0].transcript);
});
 