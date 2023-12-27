<template>
<div class="radial">
  <div class="radial__track">
  </div>
  <div class="radial__indicators">
    <div class="radial__indicator">
      <svg viewBox="0 0 640 512"  title="cloud-sun">
        <path d="M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z" />
      </svg>
    </div>
    <div class="radial__indicator">
      <svg viewBox="0 0 576 512" title="cloud-moon">
        <path d="M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z" />
      </svg>
    </div>

  </div>
  <div class="radial__ring">
    <button class="radial__handle">
      <svg viewBox="0 0 512 512" title="sun">
        <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
      </svg>
      <svg viewBox="0 0 512 512" title="moon">
        <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
      </svg>
    </button>
  </div>
  <h2 class="radial__time">{{ formattedTime }}</h2>
</div>
  <!--
  <svg width="30" height="17.5" viewBox="0 0 307 179" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_7_2202)">
    <path d="M182 146H129L155 163.5L182 146Z" fill="#FA9F42"/>
    <path d="M9.5 150.325H127.063L154.928 168.935L183.5 150.325H297.5" stroke="#D0D0D0" stroke-width="10" stroke-linecap="round"/>
    <mask id="mask0_7_2202" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="0" width="301" height="146">
    <rect x="2" width="301" height="146" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_7_2202)">
    <path d="M153 246.361C212.094 246.361 260 200.493 260 143.913C260 87.3317 212.094 41.4639 153 41.4639C93.9055 41.4639 46 87.3317 46 143.913C46 200.493 93.9055 246.361 153 246.361Z" fill="#FA9E42"/>
    <path d="M153 272.213C227.006 272.213 287 214.771 287 143.913C287 73.0543 227.006 15.6123 153 15.6123C78.9938 15.6123 19 73.0543 19 143.913C19 214.771 78.9938 272.213 153 272.213Z" stroke="#FA9E42" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 66"/>
    <g filter="url(#filter1_f_7_2202)">
    <path d="M141.57 123.615C179.001 104.58 200.174 72.6188 188.863 52.2283C177.551 31.8377 138.038 30.739 100.608 49.7743C63.1773 68.8096 42.0037 100.771 53.3152 121.161C64.6267 141.552 104.14 142.65 141.57 123.615Z" fill="#F8E36F"/>
    </g>
    </g>
    </g>
    <defs>
    <filter id="filter0_f_7_2202" x="0.5" y="6.6123" width="306" height="172.312" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_7_2202"/>
    </filter>
    <filter id="filter1_f_7_2202" x="30.2695" y="16.1865" width="181.639" height="141.016" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_7_2202"/>
    </filter>
    </defs>
  </svg>
  -->
</template>

<script>
import gsap from 'gsap';
//import Draggable from 'gsap/Draggable';
export default {
  name: 'IconSunset',
  data() {
    return {
      rotationDegrees: 0,
      formattedTime: 'null'
    };
  },
  mounted() {
    this.updateRotation();
      // Actualiza la rotación cada minuto (puedes ajustar la frecuencia)
    setInterval(() => {
      this.updateRotation();
      console.log("actualiza por min")
    }, 60000); // Actualizar cada minuto
    
    //this.setupRadialLogic();
  },
  methods: {
    updateRotation() {
    // Obtiene la hora actual
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calcula el ángulo de rotación en función de la hora actual
    // Puedes ajustar cómo mapear la hora en ángulos según tus necesidades
    const totalMinutes = currentHour * 60 + currentMinute;
    const maxMinutes = 24 * 60; // 24 horas en minutos
    this.rotationDegrees = (totalMinutes / maxMinutes) / 360 ;
    console.log("this.rotationDegrees", this.rotationDegrees)
    this.formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;


    // Aplica la rotación al elemento HTML
    gsap.set(".radial__ring", {
      rotate: this.rotationDegrees
    });

    // Agrega lógica para cambiar entre sol y luna según la hora del día
    // ...
  }
  }
}
</script>


<style >
@import "https://unpkg.com/open-props/open-props.min.css";
/*
@import "https://unpkg.com/open-props/normalize.min.css";
*/
.radial {
  --border-width: 12px;
  --diameter: clamp(200px, 30vmin, 28rem);
  --handle-size: 48px;
  width: var(--diameter);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  position: relative;
}

.radial__ring {
  position: absolute;
  height: 100%;
  width: 100%;
}

.radial__handle {
  width: var(--handle-size);
  aspect-ratio: 1;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: calc(100% - (var(--border-width) * 0.5));
  transform: translate(-50%, 50%);
  box-shadow: var(--shadow-6);
  padding: 0;
  border: 2px solid hsl(0 0% 85%);
  background: var(--gray-0);
  display: grid;
  place-items: center;
}

.radial__handle svg {
  width: 70%;
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background 0.25s;
}

.radial__handle [title=sun] {
  fill: var(--yellow-4);
}

.radial__handle [title=moon] {
  width: 45%;
  fill: var(--gray-4);
  transform: translate(-50%, -50%) scale(0);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.radial__track {
  height: 100%;
  width: 100%;
  position: absolute;
  background:
    conic-gradient(from 270deg, var(--yellow-4) calc(var(--sun-stop, 0) * 1%), transparent calc(var(--sun-stop, 0) * 1%)),
    conic-gradient(from 90deg, var(--gray-7) calc(var(--moon-stop, 0) * 1%), transparent calc(var(--moon-stop, 0) * 1%)),
    var(--surface-2);
  border-radius: 50%;
  --stop: calc(var(--diameter) * 0.5 - var(--border-width));
  mask: radial-gradient(transparent var(--stop), black var(--stop));
}

.radial__indicators {
  height: 100%;
  width: 100%;
  position: absolute;
}

.radial__indicator {
  width: 48px;
  aspect-ratio: 1;
  position: absolute;
  background: var(--gray-0);
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 2px solid var(--gray-4);
}

.radial__indicator:first-of-type {
  --fill: var(--yellow-4);
  top: 50%;
  right: 100%;
  transform: translate(calc(50% + (var(--border-width) * 0.5)), -50%);
}

.radial__indicator:last-of-type {
  --fill: var(--gray-4);
  top: 50%;
  left: 100%;
  transform: translate(calc(-50% - (var(--border-width) * 0.5)), -50%);
}

.radial__indicator svg {
  fill: var(--fill);
  width: 55%;
}

.radial__time {
  transition: color 0.25s;
  font-variant: tabular-nums;
}

.radial__track circle {
  stroke-width: 12px;
  stroke: red;
}
</style>
