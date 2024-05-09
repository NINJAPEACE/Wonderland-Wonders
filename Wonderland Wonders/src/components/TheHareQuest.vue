<script setup>
  import { reactive, ref, onMounted } from 'vue';

  // VARIABLE DECLARATIONS
  const password_input = ref([]);

  const list = ref([
    { name: "fake_1", placeholder: "Yes, fill me, sweetheart" },
    { name: "fake_2", placeholder: "Am? You're welcomed" },
    { name: "real", placeholder: "This one probably..." }
  ]);

   const fake_1 = ref(null);
   const fake_2 = ref(null);
   const real = ref(null);

  const password = reactive({ fake_1, fake_2, real });
  
  const send = ref(null);

  const appearance = ref([0,0,0]);
  const bar_1 = ref(null);
  const bar_2 = ref(null);
  const bar_guide = ref(null);
  const typing_1 = ref(null);
  const typing_2 = ref(null);
  const typing_guide = ref(null);
  const form = ref(null);

  const typer_list = ref([
    [
      "Is that Alice?", 
      "This one, can not you see?", 
      "Ah, yes, it is a stupid kid,•must not be Alice!", 
      "How could we tell Alice•that she should find it on the le-"], 
    [
      "What? Where?", 
      "This stupid one?", 
      "I bet for an eye, she•does not even know the•password", 
      "Stop, you dumbhead!•You are spoiling it!•Do not spoil it to•anyone that is not Alice!"
    ]
  ]); // 0: first-typer, 1: second-typer
  const active_typer = ref(null); //1: first-typer, 2: second-typer
  const wait_timer = ref(null);
  const wait_status = ref(null);
  const typing_done = ref(null);
  const index_active = ref([0,0]);
  const reset_status = ref([false, false]);

  // WHEN READY
  onMounted(() => {
    typing(85, "guide", "Welcome to Wonderland!••Nice to meet you.••Try this one, please...");

   generate_form()
    
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

  // TYPING BAR HIDE AND SEEK
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

  // ACTIVE INTERVAL FUNCTIONS
      const interval_functions = ref({
        "guide": null,
        "1": null,
        "2": null
      });

      //typing done
      function typing(interval, el, words) {
        if(interval_functions.value[el]) clearInterval(interval_functions.value[el]);
        let i = 0;
        interval_functions.value[el] = setInterval(() => {
            let oldValue;

            if(el == "1") oldValue = typing_1.value.innerHTML;
            else if(el == "2") oldValue = typing_2.value.innerHTML;
            else if(el == "guide") oldValue = typing_guide.value.innerHTML;

            if(i == 0) oldValue = "";
            if(i == (words.length)) {
                clearInterval(interval_functions.value[el]);
                interval_functions.value[el] = null;
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

  function generate_form(status) {
    let num = 0;

    if (status) {
      num = "real";
      typing(85, "guide", "Ah, Alice, finally you have passed those imaginations!••I have found the real one, here..");
      send.value.style.display = "block";
      document.body.className = "";
    } else num = "fake_" + fake_list.value[Math.floor(Math.random() * fake_list.value.length)];

    if (active_password.value) {
      password[active_password.value][0].classList.remove("active")
    }
    
    password[num][0].classList.add("active");
    active_password.value = num;
    if (fake_list_length.value != fake_list.value.length && !status) typing(85, "guide", "The real input should be this one, Alice, I guess...");

    fake_list.value = fake_list.value.splice(fake_list.value.indexOf(Number(num.replace("fake_", ""))) - 1, 1);
  }
  
      const on_fake = ref(false);
      const fake_list = ref([1, 2]);
      const fake_list_length = ref(fake_list.value.length);
      const active_password = ref(null); // fake-1 or fake-2
      const fake_given = ref(null);
      const input_is_password = ref(true);

      function show_password(enter) {
        if (active_password.value != "real" && fake_given.value == 1) {
            generate_form(1);
        } else if (active_password.value == "real" || !enter) {
          password.real[0].type = input_is_password.value ? "text" : "password";
          input_is_password.value = !input_is_password.value;
        } else if (!on_fake.value) {
          on_fake.value = 1;
          fake_given.value++;
          /* ALL TRICKS HERE */
          let fake_details = {
            "fake_1": {
              guide: "Ahahaha, sometimes humans are foolish••Click again, you dumb!",
              placeholder: ""
            },
            "fake_2": {
              guide: "Did you just consume something? I feel something weird has happened...••Hey, click again! You want to do the quest right?",
              placeholder: "Eat me or drink me?"
            }
          }

          password[active_password.value][0].placeholder = fake_details[active_password.value].placeholder;
          password[active_password.value][0].value = '';

          typing(85, "guide", fake_details[active_password.value].guide);
          document.body.className = active_password.value;
        } else {
          on_fake.value = 0;
          generate_form();
        }
      }

  
    function send_password() {
      let password_inputted = password.real[0].value;

      if (!password_inputted) {
        typing(85, "guide", "Hmm, fill in the password, Alice. Do not be dumb like those creatures...")
      } else {
        password_inputted = password_inputted.replace(/\s/g, "");

        let the_key = ["eatme", "drinkme"];
        let the_key_links = ["https://github.com/NINJAPEACE", "https://tryitands.ee"]

        if (the_key.includes(password_inputted)) {
          window.location.href = the_key_links[the_key.indexOf(password_inputted)];
        } else {
          typing(85, "guide", "Alice, I think it does not work, maybe you have input the wrong password?")
        }
      }
    }

  function onEnter() {
    show_password(1);
  }
</script>
<template>
  <!--
  MECHANISM
  
  1. USER GET INTO THE WEB
  2. TROLLED BY 2 RANDOM CASE THEN REAL 
  -->
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

    <div class="form">
      <form>
     <input v-for="item in list" :placeholder="item.placeholder" :class="item.name + ' password'" :ref="item.name" type="password" v-on:keyup.enter="onEnter" autocomplete="true">
      <button class="eye" id="eye" :onclick="show_password"><i class="fas fa-eye"></i></button>
        </form>
    </div>
    <button class="send" :onclick="send_password" ref="send">Send?</button>
  </div>
</template>

<style scoped>
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
      padding: 5px;
      background: transparent;
      outline: none;
      border: none;
      color: white;
      margin-left: 5%;
    }

    .form .eye:hover {
      color:black;
    }

    .form {
      width: 100%;
      padding: 15px;
      transform: translate(-50%);
      margin-left: 50%;
    }

    .password {
      display: none;
      animation: fade 1s ease-out;
      max-width:768px;
    }

  .password.active {
    display:inline;
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

    body.fake_1 .fake_1 {
      transition: .5s ease;
      opacity: 0%;
    }

</style>