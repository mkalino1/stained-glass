export const useArtControlsStore = defineStore('art-controls', () => {
  const shapeName = ref<ShapeName>('moon')
  const resolution = ref(5)
  const rotation = ref<Rotation>(Rotation.Angle0)

  function HSLToHex(hsl: { h: number; s: number; l: number }): string {
    const { h, s, l } = hsl;
  
    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }
  
  const randomHue = Math.floor(((Math.random() + Math.random()) / 2) * 359)
  const randomColor = HSLToHex({h: randomHue, s: 50, l: 20})
  const color = ref(randomColor)

  function rotate(deltaY: number) {
    rotation.value = (rotation.value + 4 + (deltaY < 0 ? 1 : -1)) % 4
  }

  return { shapeName, resolution, color, rotation, rotate }
})
