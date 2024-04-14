<script setup>
  import { ref, onMounted } from 'vue';

  const password_input = ref([]);

  const list = ref([
    { name: "fake-1", placeholder: "Yes, fill me, sweetheart" },
    { name: "fake-2", placeholder: "Am? You're welcomed" },
    { name: "real", placeholder: "This one probably..." }
  ]);

  const passwords = ref([])

  const appearance = ref([0,0,0])
  const bar_1 = ref(null);
  const bar_2 = ref(null);
  const bar_guide = ref(null);
  const typing_1 = ref(null);
  const typing_2 = ref(null);
  const typing_guide = ref(null);

  const typer_list = ref([["Is that Alice?", "This one, can not you see?", "Ah, yes, it is a stupid kid,•must not be Alice!", "How could we tell Alice•that she should find it on the le-"], ["What? Where?", "This stupid one?", "I bet for an eye, she•does not even know the•password", "Stop, you dumbhead!•You are spoiling it!•Do not spoil it to•anyone that is not Alice!"]]);
  const active_typer = ref(null); //1: left, 2: right
  const wait_timer = ref(null);
  const wait_status = ref(null);
  const typing_done = ref(null);
  const index_active = ref([0,0]);
  const reset_status = ref([false, false]);

  onMounted(() => {
    typing(85, "guide", "Welcome to Wonderland!••Nice to meet you.••Try this one, please...");
    
    let time = 0;
    setInterval(() => {
      time += 100;
      if(time % 500 == 0) hide_and_seek(0), hide_and_seek(2);
      if(time % 350 == 0) hide_and_seek(1);

      if(!active_typer.value) {
        active_typer.value = 1;
        typing(75, "1", typer_list.value[0][index_active.value[0]]);
        index_active.value[0]++;
      }

      if(typing_done.value && wait_timer.value >= 5000) {
        console.log("phase changed");
      //checking old typer
        
         active_typer.value = active_typer.value == 1 ? 2 : 1;
         typing(75, active_typer.value.toString(), typer_list.value[active_typer.value-1][index_active.value[active_typer.value-1]]);
         if(index_active.value[active_typer.value-1] == (typer_list.value[active_typer.value-1].length-1)) index_active.value[active_typer.value-1] = 0;
         else index_active.value[active_typer.value-1]++;
    
          wait_status.value = false;
          wait_timer.value = 0;
          typing_done.value = false;
      } else if(wait_status.value) {
          wait_timer.value += 100;
      }
      
    }, 100)
    
  });

  function hide_and_seek(el) {
    if(el == "0") {
      bar_1.value.style.visibility = appearance.value[0] ? "hidden" : "visible";
       appearance.value[0] = !appearance.value[0];
    } else if(el == "1") {
      bar_2.value.style.visibility = appearance.value[1] ? "hidden" : "visible";
      appearance.value[1] = !appearance.value[1];
      } else if(el == "2") {
      bar_guide.value.style.visibility = appearance.value[2] ? "hidden" : "visible";
       appearance.value[2] = !appearance.value[2];
      }
  }

      const intervalFunc = ref({
        "guide": null,
        "1": null,
        "2": null
      });

      //typing done
      function typing(interval, el, words) {
        if(intervalFunc.value[el]) clearInterval(intervalFunc.value);
        let i = 0;
        intervalFunc.value[el] = setInterval(() => {
            let oldValue;

            if(el == "1") oldValue = typing_1.value.innerHTML;
            else if(el == "2") oldValue = typing_2.value.innerHTML;
            else if(el == "guide") oldValue = typing_guide.value.innerHTML;

            if(i == 0) oldValue = "";
            if(i == (words.length)) {
                clearInterval(intervalFunc.value[el]);
                intervalFunc.value[el] = null;
                if(el == "1" || el == "2") typing_done.value = true, wait_status.value = true;
            } else {
                let output;

                output = oldValue + (words[i] == "•" ? "<br>" : words[i] == " " ? "&nbsp;": words[i]); 
                i++;
              
                if(el == "1") typing_1.value.innerHTML = output;
                else if(el == "2") typing_2.value.innerHTML = output;
                else if(el == "guide") typing_guide.value.innerHTML = output;
              
            }


        }, interval);
      }
  
</script>
<template>
    <h1 class="text-0">
    <span class="changed" ref="typing_1"></span>
    <span class="bar" ref="bar_1">&nbsp;|</span>
  </h1>
  <h1 class="text-1">
    <span class="changed" ref="typing_2"></span>
    <span class="bar" ref="bar_2">&nbsp;|</span>
  </h1>
  <div class="main">
    <div class="hi">
      <h1>Hi, Alice.</h1>

      <p class="guide">
        <span class="changed" ref="typing_guide"></span>
        <span class="bar" ref="bar_guide">&nbsp;|</span>
      </p>
    </div>

    <!--
    
    1. USER GET INTO THE WEB
    2. TROLLED BY RANDOM CASE 2 RANDOM CASE THEN REAL 
    
    -->

    <div class="form real">
      
     <input v-for="item in list" :placeholder="item.placeholder" :class="item.name + ' password'" ref="passwords">

      <button class="eye" id="eye" onclick="show_password_text()"><i class="fas fa-eye"></i></button>
    </div>
    <button class="send" onclick="send_password_text()">Send?</button>
  </div>
</template>

<style scoped>
  body {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0e0e0e;
      color: #EDEDED;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .animate {
      transition: .5s ease-out;
    }

    h1 {
      font-weight: 500;
      font-size: 2.6rem;
    }

    h3 {
      font-size: 1.2rem;
    }

    .main {
      background-color: rgba(62, 62, 62, 0.27);
      box-shadow: 0 0 5px rgb(255, 255, 255, .1);
      margin: 20px;
      padding: 10px;
      border-radius: 20px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      backdrop-filter: blur(4px);
      transition: 1s;
    }

    .main:hover {
      box-shadow: 0 25px 50px -12px rgb(255, 255, 255, .1);
      user-select: none;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }

    .hi {
      margin-left: 50%;
      transform: translate(-50%, 0);
    }

    .password {
      outline: none;
      width: 85%;
      padding: 20px 10px 20px 10px;
      border-radius: 10px;
      border: none;
      background-color: #5555555C;
      color: #E9E9E9;
      box-shadow: 0 0 5px rgb(255, 255, 255, .1);
    }

    .form .eye {
      padding: 10px;
      background: transparent;
      outline: none;
      border: none;
      color: white;
    }


    .form {
      width: 100%;
      padding: 15px;
    }

    .password {
      display: none;
      animation: fade 1s ease-out;
    }

    @keyframes fade {
      from {
        opacity: 0;
      }
    }

    .text-0,
    .text-1 {
      position: absolute;
      break-word: word-break;
      font-size: 30px;
      font-style: italic;
    }

    .text-0 {
      transform: rotate(-10deg);
      top: 100px;
      left: 10px;
    }

    .text-1 {
      transform: rotate(5deg);
      right: 50px;
      bottom: 100px;
      text-align: right;
    }

    .send {
      width: 50%;
      padding: 20px;
      outline: none;
      border: none;
      border-radius: 5px 30px 5px 30px;
      margin: 15px;
      display: none;
      box-shadow: 0 0 5px rgb(255, 255, 255, .1);
      background-color: rgba(81, 81, 81, 0.58);
      color: white;
      transition: .5s ease-out;
      transform: translate(-50%);
      margin-left: 50%;
      animation: fade 1s ease-out;
    }

    .send:hover {
      box-shadow: 0 0 15px rgb(255, 255, 255, .1);
      border-radius: 30px 5px 30px 5px;
    }

    .bar {
      visibility: hidden;
    }

    .changed {
      word-break: break-word;
    }

    .guide {
      margin-top: 20px;
    }

    .hi {
      margin-top: 55px;
    }

    body.fake-1 .fake-1 {
      transition: .5s ease;
      opacity: 0%;
    }

    body.fake-2 {
      background-color: #530049;
      color: black;
    }

</style>