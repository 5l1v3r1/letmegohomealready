const calculatePercentage = () => {
  let start = timeToMinutes(document.getElementById('start').value);
  let end = timeToMinutes(document.getElementById('end').value);

  if(start && end) {
    let now = new Date();
    let minutes = now.getMinutes() + now.getHours() * 60 + now.getSeconds() / 60;

    let percent = Math.round((minutes - start) / (end - start) * 10000) / 100;
    document.getElementById('percentage').textContent = percent < 100 && percent >= 0 ? percent : 100;
  }
};

const timeToMinutes = time => {
  let split = time.split(':').map(Number);
  return split[0] * 60 + split[1];
};

document.querySelectorAll('input').forEach(input => {
  let stored = localStorage[input.id];
  if(stored) {
    input.value = stored;
  }
  input.addEventListener('change', e => {
    localStorage.setItem(e.target.id, e.target.value);
    calculatePercentage();
  });
});
setInterval(calculatePercentage, 1000);
calculatePercentage();
