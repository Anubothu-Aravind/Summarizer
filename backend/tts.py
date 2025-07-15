import pyttsx3
import tempfile
import os

def text_to_speech(text):
    """Convert text to speech and return audio file path"""
    engine = pyttsx3.init()
    
    # Configure voice settings
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 0.8)
    
    # Create temporary audio file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_file:
        engine.save_to_file(text, tmp_file.name)
        engine.runAndWait()
        return tmp_file.name