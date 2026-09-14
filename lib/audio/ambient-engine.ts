export interface AmbientEngine {
  start: () => void;
  stop: () => void;
}

const FADE_SECONDS = 1.5;
const MASTER_VOLUME = 0.05;
const DRONE_FREQUENCIES = [82, 110, 164.81];

export function createAmbientEngine(): AmbientEngine {
  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let voices: { osc: OscillatorNode; lfo: OscillatorNode }[] = [];

  function start() {
    if (ctx) return;

    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(MASTER_VOLUME, ctx.currentTime + FADE_SECONDS);
    masterGain.connect(ctx.destination);

    voices = DRONE_FREQUENCIES.map((freq, index) => {
      const osc = ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const filter = ctx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600;

      const lfo = ctx!.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.05 + index * 0.02;
      const lfoGain = ctx!.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const voiceGain = ctx!.createGain();
      voiceGain.gain.value = 1 / DRONE_FREQUENCIES.length;

      osc.connect(filter);
      filter.connect(voiceGain);
      voiceGain.connect(masterGain!);

      osc.start();
      lfo.start();
      return { osc, lfo };
    });
  }

  function stop() {
    if (!ctx || !masterGain) return;

    const closingCtx = ctx;
    const closingGain = masterGain;
    const closingVoices = voices;
    closingGain.gain.linearRampToValueAtTime(0, closingCtx.currentTime + FADE_SECONDS);

    setTimeout(() => {
      closingVoices.forEach(({ osc, lfo }) => {
        osc.stop();
        lfo.stop();
      });
      closingCtx.close();
    }, FADE_SECONDS * 1000 + 100);

    ctx = null;
    masterGain = null;
    voices = [];
  }

  return { start, stop };
}
