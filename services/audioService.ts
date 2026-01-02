import { GoogleGenAI, Modality } from "@google/genai";

let currentAudioSource: AudioBufferSourceNode | null = null;
let audioContext: AudioContext | null = null;
let currentNativeAudio: HTMLAudioElement | null = null;

// Standard base64 to Uint8Array decoder
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Decodes raw PCM audio data from Gemini TTS
const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

export const stopCurrentAudio = () => {
  // Stop Gemini TTS source
  if (currentAudioSource) {
    try { currentAudioSource.stop(); } catch (e) {}
    currentAudioSource = null;
  }
  // Stop native audio elements (if any)
  if (currentNativeAudio) {
    currentNativeAudio.pause();
    currentNativeAudio.currentTime = 0;
    currentNativeAudio = null;
  }
};

export const playText = async (text: string, voice: string = 'Kore'): Promise<void> => {
  if (!text || text.trim() === '') return;
  
  stopCurrentAudio();

  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }

  // Ensure AudioContext is running
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        // thinkingConfig is not supported for TTS models and causes 400 error
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) {
      throw new Error("No candidates returned from the AI model.");
    }

    if (candidate.finishReason && candidate.finishReason !== 'STOP' && !candidate.content) {
      throw new Error(`Audio generation failed. Reason: ${candidate.finishReason}`);
    }

    const base64Audio = candidate.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

    if (!base64Audio) {
      // Check if model returned text (e.g., feedback or safety refusal) instead of audio
      const textPart = candidate.content?.parts?.find(p => p.text)?.text;
      if (textPart) {
         console.warn("Model returned text instead of audio:", textPart);
         throw new Error(`Audio generation failed. Model returned text feedback: ${textPart}`);
      }
      throw new Error("No audio data received from the model.");
    }

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      audioContext,
      24000,
      1,
    );

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    
    currentAudioSource = source;
    source.start(0);
    
    return new Promise((resolve) => {
      source.onended = () => {
        if (currentAudioSource === source) currentAudioSource = null;
        resolve();
      };
    });
  } catch (error: any) {
    console.error("Audio playback error:", error);
    throw error;
  }
};

export const playRecording = (blob: Blob): Promise<void> => {
  stopCurrentAudio();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  currentNativeAudio = audio;
  
  return new Promise((resolve) => {
    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentNativeAudio = null;
      resolve();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      currentNativeAudio = null;
      resolve();
    };
    audio.play().catch(err => {
      console.error("Recording playback error:", err);
      resolve();
    });
  });
};