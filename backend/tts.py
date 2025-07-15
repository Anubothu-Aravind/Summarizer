# backend/tts.py
from gtts import gTTS
import tempfile
import os

def text_to_speech(text):
    try:
        # Create TTS object
        tts = gTTS(text=text, lang='en', slow=False)
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp_file:
            audio_path = tmp_file.name
        
        # Save to file
        tts.save(audio_path)
        
        return audio_path
    
    except Exception as e:
        print(f"TTS Error: {e}")
        raise e