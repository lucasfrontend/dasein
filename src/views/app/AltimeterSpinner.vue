<template>
  <section class="altimeters">
    <div class="altimeter2">
      <div class="altimeter">
        <input type="hidden" name="clockMinutes" id="clockMinutes" value="21" />
        <article class="clock">
          <div class="minutes-container">
            <div class="minutes"></div>
          </div> 
          <div class="seconds-container-bobo">
            <div class="seconds"></div>
          </div>
          <div class="seconds-container">
            <div class="seconds"></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: 'AltimeterSpinner',
  components: {},
  data: () => ({
    showText: false
  }),
};
</script>

<style>

@media (max-width: 850px) {
    .content .title {
    font-size: 1.2rem;
  }
}

 .altimeter {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #be854076;
  backdrop-filter: blur(5px);
  transition:all 1.05s ease-in-out; 
  width: 100%;
  height: 100vh;
  z-index: 100;
}
.altimeters .altimeter2 .altimeter .clock {
  border-radius: 50%;
/*  background: #fefefe url("../assets/altimeter.png") no-repeat center;
*/
  background: url("../../assets/altimeter.png") no-repeat center;
  background-size: 100%; /* originalmente 100 */
  height: 17em;
  position: relative;
  width: 17em;
}
@media (max-width: 600px) {
  .altimeters .altimeter2 .altimeter .clock {
    font-size: 0.7rem;
  }
}
@media (max-width: 500px) {
  .altimeters .altimeter2 .altimeter .clock {
    font-size: 0.6rem;
  }
}
.altimeters .altimeter2 .altimeter .clock .seconds-container-bobo {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.altimeters .altimeter2 .altimeter .clock .seconds-container-bobo .seconds {
  background: #000;
  height: 45%;
  left: 49.6%;
  position: absolute;
  top: 14%;
  transform-origin: 50% 80%;
  width: 2%;
  z-index: 8;
}
.altimeters .altimeter2 .altimeter .clock .seconds-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
  .altimeter .clock .seconds-container .seconds {
  background: #000;
  height: 45%;
  left: 49.6%;
  position: absolute;
  top: 14%;
  transform-origin: 50% 80%;
  width: 2%;
  z-index: 8;
}
@keyframes rotate {
  100% {
    transform: rotateZ(360deg);
  }
}
 .altimeters .altimeter2 .altimeter .clock .seconds-container {

  animation: rotate 4.8s reverse linear;
}
 .altimeters .altimeter2 .altimeter .clock:after {
  background: #000;
  border-radius: 50%;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8%;
  height: 8%;
  z-index: 10;
}
 .altimeters .altimeter2 .altimeter .canopyRelease {
  position: absolute;
  left: 2.5rem;
  top: 0;
  right: 0;
  color: #fff;
  letter-spacing: 1px;
}
 .altimeters .altimeter2 .altimeter .canopyRelease .text2 {
  width: 90%;
  padding: 3px 3px;
  color: #ff4747;
  order: 2px solid #fff;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 1.5rem;
}
 .altimeters .altimeter2 .altimeter .canopyRelease .aterrizaje {
  display: block;
  color: #fff;
}
 .altimeters .altimeter2 .altimeter .canopyRelease .aterrizaje .at {
  padding: 3px;
  font-size: 0.7rem;
}
 .altimeters .altimeter2 .altimeter .converter {
  position: absolute;
  left: 2.5rem;
  bottom: 2.5rem;
  right: 0;
  color: #fff;
  opacity: 75%;
}
@media (max-width: 500px) {
   .altimeters .altimeter2 .altimeter .converter {
    width: 20%;
  }
}
 .altimeters .altimeter2 .altimeter .converter .converter-title {
  font-size: 1.2rem;
  background: transparent;
  margin: 4px;
  text-align: start;
}
@media (max-width: 500px) {
   .altimeters .altimeter2 .altimeter .converter .converter-title {
    font-size: 0.8rem;
  }
}
 .altimeters .altimeter2 .altimeter .converter .feet {
  display: block;
  font-size: 1rem;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 4px;
  width: 100px;
  margin-bottom: 8px;
  padding: 3px 5px;
  color: #fff;
}
@media (max-width: 500px) {
   .altimeters .altimeter2 .altimeter .converter .feet {
    width: 70%;
  }
}
 .altimeters .altimeter2 .altimeter .converter .mts {
  display: block;
  font-size: 1rem;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 4px;
  width: 100px;
  margin-bottom: 8px;
  padding: 3px 5px;
  color: #fff;
}
@media (max-width: 500px) {
   .altimeters .altimeter2 .altimeter .converter .mts {
    width: 70%;
  }
}
 .altimeters .altimeter2 .altimeter .converter .resultFt {
  font-size: 0.8rem;
  background: transparent;
  width: 100px;
  opacity: 50%;
  text-align: center;
}
@media (max-width: 500px) {
   .altimeters .altimeter2 .altimeter .converter .resultFt {
    width: 70%;
  }
}
 .main2 {
  height: 5vh;
  background-color: gray;
  width: 100%;
}


</style>