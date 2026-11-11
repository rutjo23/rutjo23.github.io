const artwork = document.querySelector('.playground');
const sculpture = document.querySelector('.sculpture');
const remix = document.querySelector('.remix');
const palettes = [
  { piece: '#ff9477', background: '#243447' },
  { piece: '#b9b2f0', background: '#302d46' },
  { piece: '#b8d5ae', background: '#253c39' },
  { piece: '#edc274', background: '#3c3330' }
];
let spin = 0;
remix.addEventListener('click', () => {
  spin += 1;
  const index = spin % palettes.length;
  artwork.style.setProperty('--piece', palettes[index].piece);
  artwork.style.backgroundColor = palettes[index].background;
  sculpture.style.transform = `translate(-50%, -50%) rotate(${-18 + spin * 60}deg)`;
  document.querySelector('#variation').textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#art-status').textContent = `Perspective ${index + 1} of ${palettes.length}. Artwork colors and orientation changed.`;
});
