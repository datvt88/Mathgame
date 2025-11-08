// Sound Manager using Web Audio API for simple sound effects

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.audioContext || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play correct answer sound - happy ascending notes
  playCorrect() {
    if (!this.audioContext || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 'sine', 0.2);
      }, index * 100);
    });
  }

  // Play incorrect answer sound - descending notes
  playIncorrect() {
    if (!this.audioContext || this.isMuted) return;

    const notes = [392, 349.23]; // G4, F4
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'triangle', 0.15);
      }, index * 150);
    });
  }

  // Play button click sound
  playClick() {
    if (!this.audioContext || this.isMuted) return;
    this.playTone(800, 0.05, 'square', 0.1);
  }

  // Play reward sound - celebration
  playReward() {
    if (!this.audioContext || this.isMuted) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]; // C5, D5, E5, G5, A5, C6
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 'sine', 0.2);
      }, index * 80);
    });
  }

  // Play level complete sound
  playLevelComplete() {
    if (!this.audioContext || this.isMuted) return;

    const melody = [
      { freq: 659.25, duration: 0.15 },
      { freq: 659.25, duration: 0.15 },
      { freq: 659.25, duration: 0.15 },
      { freq: 523.25, duration: 0.1 },
      { freq: 659.25, duration: 0.15 },
      { freq: 783.99, duration: 0.3 },
    ];

    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.freq, note.duration, 'sine', 0.25);
      }, time);
      time += note.duration * 1000 + 50;
    });
  }

  // Play character select sound
  playSelect() {
    if (!this.audioContext || this.isMuted) return;

    setTimeout(() => this.playTone(587.33, 0.1, 'sine', 0.15), 0);
    setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.15), 100);
  }

  // Play equipment unlock sound
  playUnlock() {
    if (!this.audioContext || this.isMuted) return;

    const sparkle = [440, 554.37, 659.25, 880];
    sparkle.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, 'sine', 0.15);
      }, index * 60);
    });
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Get mute state
  getMuted() {
    return this.isMuted;
  }

  // Set mute state
  setMuted(muted: boolean) {
    this.isMuted = muted;
  }
}

// Singleton instance
let soundManagerInstance: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
}

export default getSoundManager;
