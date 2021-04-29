
const table = new Map();

// A ~ Z
table.set('._', 'A')
table.set('_...', 'B')
table.set('_._.', 'C')
table.set('_..', 'D')
table.set('.', 'E')
table.set('.._.', 'F')
table.set('__.', 'G')
table.set('....', 'H')
table.set('..', 'I')
table.set('.___', 'J')
table.set('_._', 'K')
table.set('._..', 'L')
table.set('__', 'M')
table.set('_.', 'N')
table.set('___', 'O')
table.set('.__.', 'P')
table.set('__._', 'Q')
table.set('._.', 'R')
table.set('...', 'S')
table.set('_', 'T')
table.set('.._', 'U')
table.set('..._', 'V')
table.set('.__', 'W')
table.set('_.._', 'X')
table.set('_.__', 'Y')
table.set('__..', 'Z')

// 0 ~ 9
table.set('.____', 1)
table.set('..___', 2)
table.set('...__', 3)
table.set('...._', 4)
table.set('.....', 5)
table.set('_....', 6)
table.set('__...', 7)
table.set('___..', 8)
table.set('____.', 9)
table.set('_____', 0)

// character
table.set('._._._', '.')
table.set('___...', ':')
table.set('__..__', ",")
table.set('_._._.', ':')
table.set('..__..', '?')
table.set('_..._', '=')
table.set('.____.', '\'')
table.set('_.._.', '/')
table.set('_._.__', '!')
table.set('_...._', '-')
table.set('..__._', '_')
table.set('._.._.', "\"")
table.set('_.__.', '(')
table.set('_.__._', ')')
table.set('..._.._', '$')
table.set('._...', '&')
table.set('.__._.', '@')
table.set('._._.', '+')

let unit_interval = 150

let char_interval = 2.5 * unit_interval

let word_interval = 7 * unit_interval



let sentence = []
let word = []
let knock_time_array = []

let interval_array = []


let audio = document.createElement("audio");
audio.src = "./music/di.wav";

let content = document.getElementById("content")
let timeInfo = document.getElementById("time")


// let cursor_flag = true

// setInterval(() => {
//   if (cursor_flag) {
//     content.innerText = sentence.join(" ")
//   } else {
//     content.innerText = sentence.join(" ") + "_"
//   }
//   cursor_flag = !cursor_flag
  
// }, 800)

function start() {

  let flag = false;
  let startTime;
  let endTime;

  document.onkeydown = function(e) { 
    var keyNum = window.event ? e.keyCode : e.which;
    
    if(keyNum == 32 && flag == false){     
      audio.play()
      flag = true
      startTime = new Date().getTime()
      
    }  
  }

  document.onkeyup = function(e) {
    var keyNum = window.event ? e.keyCode :e.which;
    if(keyNum == 32) {  
      audio.pause()
      audio.load()
      endTime = new Date().getTime()

      // 记录每次按键的时间
      knock_time_array.push(endTime - startTime)
      flag = false
      // 字符之间的间隔时间
      setTimeout(() => {
        let time = endTime + 0;
        let interval = new Date().getTime() - time;
        if (interval > char_interval) {
          interval_array.push(knock_time_array, interval);
          word.push(parseChar(knock_time_array))
          knock_time_array = []
        }
        
      }, char_interval)

      

      // 单词之间的间隔时间
      setTimeout(() => {
        let time = endTime + 0
        let interval = new Date().getTime() - time;
        if (interval > word_interval) {
          sentence.push(word.join(""))
          word = []
          timeInfo.innerText = parseTimeInfo(interval_array)
          content.innerText = sentence.join(" ")
          
          interval_array = []
        }
      }, word_interval)
      
    }  
  }
}

function parseChar(code_array) {
  let res = ''
  code_array.forEach(e => {
    if (e > unit_interval) {
      res += '_'
    } else {
      res += '.'
    }
  })
  return table.get(res)
}

function parseTimeInfo(interval_array) {
  let res = ""
  interval_array.forEach((e, i) => {
    if (i % 2 == 0) {
      let char = parseChar(e)
      if (char === undefined) {
        char = "error"
      }
      res += char + '(' + e.join("-") + ')'
    } else {
      res += '(' + e + ')  '
    }
  })
  return res
}


