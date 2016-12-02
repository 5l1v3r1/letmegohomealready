const sektor = new Sektor('.sector', {
  angle: 0,
  stroke: 3,
  arc: true,
  fillCircle: false,
  sectorColor: 'black',
  circleColor: '#444444'
});

const getColor = percentage => {
    let value = percentage /= 100;
    let hue = (value * 120).toString(10);
    return `hsl(${hue}, 70%, 50%)`;
}

const calculatePercentage = () => {
  let start = timeToMinutes(document.getElementById('start').value);
  let end = timeToMinutes(document.getElementById('end').value);

  if(start && end) {
    let now = new Date();
    let minutes = now.getMinutes() + now.getHours() * 60 + now.getSeconds() / 60;

    let percent = Math.round((minutes - start) / (end - start) * 10000) / 100;

    //clamp between 0 and 100
    percent = Math.min(Math.max(percent, 0), 100);
    sektor.animateTo(percent * 3.6, 500);
    sektor.changeColor(getColor(percent));
    document.getElementById('percentage').textContent = percent;
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
