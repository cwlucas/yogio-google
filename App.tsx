import React, { useState, useEffect, useRef, useCallback } from 'react';
import { YogaPose } from './types';
import { YOGA_POSES } from './constants';
import MicButton from './components/MicButton';
import YogaPoseDisplay from './components/YogaPoseDisplay';

// Renamed to avoid conflict with the SpeechRecognition interface type
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

const App: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [currentPose, setCurrentPose] = useState<YogaPose | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [speechApiAvailable, setSpeechApiAvailable] = useState<boolean>(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  const manuallyStoppedRef = useRef<boolean>(true); // Start in a "stopped" state

  const processPoseQuery = useCallback((heardPhrase: string) => {
    const lowerCasePhrase = heardPhrase.toLowerCase();
    
    const foundPose = YOGA_POSES.find(pose =>
      pose.keys.some(key => lowerCasePhrase.includes(key))
    );

    if (foundPose) {
      setCurrentPose(foundPose);
      setError(null);
    } else {
      console.warn(`Pose not recognized in: "${heardPhrase}"`);
       if (!currentPose) { 
         const examplePoseName = YOGA_POSES[0]?.displayName || "a known pose";
         setError(`Pose not recognized: "${heardPhrase}". Try saying a pose like "${examplePoseName}".`);
       }
    }
  }, [currentPose]);

  const startListening = useCallback(() => {
    if (!speechApiAvailable) {
      console.log("Cannot start: API not available.");
      setError("Speech recognition not supported or permission denied.");
      return;
    }
    if (!recognitionRef.current) {
      console.log("Cannot start: recognition not initialized.");
      setError("Speech recognition system not initialized. Please refresh.");
      return;
    }

    console.log("Attempting to start speech recognition...");
    
    try {
      if (error && (error.includes("No speech detected") || error.includes("Pose not recognized"))) {
        setError(null);
      }
      recognitionRef.current.start();
    } catch (e: any) {
      console.error("Error starting recognition in startListening:", e);
      setError(`Error starting listening: ${e.message || e.name}.`);
      setIsListening(false); 
      manuallyStoppedRef.current = true; 
    }
  }, [speechApiAvailable, error]);


  useEffect(() => {
    if (!SpeechRecognitionAPI) { 
      setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      setSpeechApiAvailable(false);
      manuallyStoppedRef.current = true;
      return;
    }

    const recognitionInstance = new SpeechRecognitionAPI(); 
    recognitionInstance.continuous = true; 
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      console.log("Speech recognition started successfully.");
      setIsListening(true);
      setError(null); 
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const lastResultIndex = event.results.length - 1;
      const fullTranscriptHeard = event.results[lastResultIndex][0].transcript.trim();
      console.log("Result received:", fullTranscriptHeard);
      setTranscript(fullTranscriptHeard);

      if (fullTranscriptHeard) {
        processPoseQuery(fullTranscriptHeard);
      } else {
        console.log("Empty transcript received.");
      }
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error, event.message);
      let newError = `Speech recognition error: ${event.error}.`;

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        newError = "Microphone access denied. Please allow microphone access in browser settings.";
        setSpeechApiAvailable(false); 
        manuallyStoppedRef.current = true; 
      } else if (event.error === 'no-speech') {
        newError = "No speech detected. Listening might restart if active, or click mic.";
      } else if (event.error === 'audio-capture') {
        newError = "Microphone error. Ensure it's connected and working.";
      }
      
      setError(newError);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended.");
      setIsListening(false); 

      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }

      if (speechApiAvailable && !manuallyStoppedRef.current) {
        console.log("Attempting to restart speech recognition after onend (not manually stopped)...");
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && speechApiAvailable && !manuallyStoppedRef.current && !isListening) {
             console.log("Restarting now...");
            startListening();
          } else {
            console.log("Conditions for restart no longer met.");
          }
        }, 500); 
      } else {
        console.log("Speech recognition will not restart (API unavailable or manually stopped).");
      }
    };

    recognitionRef.current = recognitionInstance;
    manuallyStoppedRef.current = true; 
    
    return () => {
      console.log("Cleaning up speech recognition.");
      manuallyStoppedRef.current = true; 
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort(); 
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  const handleMicButtonClick = () => {
    if (!speechApiAvailable) {
      setError("Speech recognition not available or permission denied. Cannot change state.");
      return;
    }
    if (!recognitionRef.current) {
        setError("Speech recognition system not initialized. Please refresh.");
        return;
    }

    if (isListening) {
      console.log("Mic button clicked: stopping listening.");
      manuallyStoppedRef.current = true;
      recognitionRef.current.stop(); 
      setIsListening(false); 
    } else {
      console.log("Mic button clicked: starting listening.");
      setError(null); 
      setCurrentPose(null); 
      setTranscript('');
      manuallyStoppedRef.current = false; 
      startListening();
    }
  };

  let statusMessageText = "";
  if (!speechApiAvailable) {
    statusMessageText = error || "Speech recognition not supported or permission denied.";
  } else if (isListening) {
    statusMessageText = error ? `Listening... (Note: ${error})` : "Listening for a pose name...";
  } else { 
    if (error) {
      statusMessageText = `${error} Click mic to try again.`;
    } else if (transcript && currentPose) {
      statusMessageText = `Last recognized: "${transcript}". Click mic to listen again.`;
    } else if (transcript) {
      statusMessageText = `Heard: "${transcript}". Pose not found. Click mic to listen again.`;
    } else {
      statusMessageText = "Click the mic icon to start listening for yoga poses.";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-xl p-6 sm:p-10 max-w-xl w-full text-center space-y-6">
        <header>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
            Yoga Pose Visualizer
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            {isListening ? "Listening..." : "Click the mic to start."}
          </p>
        </header>

        <MicButton
          isListening={isListening}
          onClick={handleMicButtonClick}
          disabled={!speechApiAvailable} 
        />

        <div className="min-h-[4em] flex flex-col justify-center items-center">
          <p className="text-slate-300 text-lg">{statusMessageText}</p>
        </div>

        {currentPose ? (
          <YogaPoseDisplay pose={currentPose} />
        ) : (
          <div className="mt-6 p-6 bg-transparent rounded-lg w-full max-w-sm mx-auto min-h-[300px] flex flex-col items-center justify-center">
             {!isListening && !error && speechApiAvailable && !transcript && !currentPose && (
              <div className="text-slate-300">
                <p className="text-xl mb-2">Try saying a pose name like:</p>
                <ul className="list-disc list-inside text-left">
                  {YOGA_POSES.slice(0, 4).map(p => <li key={p.keys[0]}>{p.displayName}</li>)}
                </ul>
              </div>
            )}
            {(!speechApiAvailable && !error && !isListening) && <p className="text-xl text-yellow-400">Please use a compatible browser (like Chrome or Edge) and grant microphone permissions if prompted.</p>}
            {(error && !isListening && !statusMessageText.includes(error)) && <p className="text-sm text-red-300 bg-red-800/70 px-3 py-2 rounded-md mt-2">{error}</p>}
          </div>
        )}
      </div>
       <footer className="absolute bottom-4 text-center w-full text-slate-400 text-sm">
        Yoga Pose Visualizer &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;