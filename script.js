//your code here
const images = document.querySelectorAll('img');
const main = document.querySelector('main');
const h3 = document.createElement('h3');
h3.id = 'h';
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
main.appendChild(h3);

let selectedImages = [];
let verifyButton;
let resetButton;
let para;

const renderImages = () => {
  const imageUrls = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/seed/picsum/200/300',
    'https://picsum.photos/200/300?grayscale',
    'https://picsum.photos/200/300/',
    'https://picsum.photos/200/300.jpg'
  ];

  const duplicateIndex = Math.floor(Math.random() * 5);
  const duplicateUrl = imageUrls[duplicateIndex];

  const shuffledUrls = [...imageUrls, duplicateUrl].sort(() => Math.random() - 0.5);

  images.forEach((img, index) => {
    img.src = shuffledUrls[index];
    img.classList.add(`img${index + 1}`);
    img.addEventListener('click', handleImageClick);
  });
};

const handleImageClick = (e) => {
  const img = e.target;
  if (selectedImages.includes(img)) {
    img.classList.remove('selected');
    selectedImages = selectedImages.filter(item => item !== img);
  } else {
    img.classList.add('selected');
    selectedImages.push(img);
  }

  if (selectedImages.length === 1) {
    renderResetButton();
  } else if (selectedImages.length === 2) {
    renderVerifyButton();
  }
};

const renderResetButton = () => {
  resetButton = document.createElement('button');
  resetButton.id = 'reset';
  resetButton.textContent = 'Reset';
  resetButton.addEventListener('click', resetState);
  main.appendChild(resetButton);
};

const renderVerifyButton = () => {
  verifyButton = document.createElement('button');
  verifyButton.id = 'verify';
  verifyButton.innerHTML = 'Verify';
  verifyButton.addEventListener('click', verifyImages);
  main.appendChild(verifyButton);
};

const verifyImages = () => {
  const [img1, img2] = selectedImages;
  const isIdentical = img1.src === img2.src;

  para = document.createElement('p');
  para.id = 'para';
  para.textContent = isIdentical
    ? "You are a human. Congratulations!"
    : "We can't verify you as a human. You selected the non-identical tiles.";

  main.appendChild(para);
  verifyButton.remove();
  resetState();
};

const resetState = () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  if (resetButton) resetButton.remove();
  if (verifyButton) verifyButton.remove();
  if (para) para.remove();
  renderImages();
};

renderImages();