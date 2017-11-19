declare const $ : any;

class Game {
  private code : number;

  constructor() {
    this.registerEvents();
    this.createCode();
  }

  createCode() {
    this.code = parseInt(this.shuffle( "123456789".split('') ).join('').substring(0,4));
  }

  shuffle(array : Array<any>) {
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }

  registerEvents() {
    $(document).ready(() => {
      $("#lock").on("click", () => { this.eventCheckCode() });
      $("input").on("keyup", (e : any) => { this.eventNextInput(e) });
      $("input").on("keydown", (e : any) => { this.eventNavigate(e) });
    });
  }

  eventNavigate(event : any) {
    if(event.keyCode == 37) {
      $(event.target).prev("input").focus();
    }

    if(event.keyCode == 39) {
      $(event.target).next("input").focus();
    }
  }

  eventNextInput(event : any) {

    if(isNaN($(event.target).val())) {
      $(event.target).val("");
    }

    if($(event.target).val() !== "") {
      $(event.target).next().focus();
    }
  }

  eventCheckCode() {
    let num = "";
    num = num + $("#num1").val();
    num = num + $("#num2").val();
    num = num + $("#num3").val();
    num = num + $("#num4").val();

    let numRes = parseInt(num);

    let result = this.checkCode(numRes);

    this.addLogEntry(numRes, result);

    $("#num1").val("").focus();
    $("#num2").val("");
    $("#num3").val("");
    $("#num4").val("");
  }

  addLogEntry(num : number, result : any) {
    let numArray = (""+num).split("");

    let $html = $($("#logEntry").html());

    $html.find(".num").eq(0).text(numArray[0]);
    $html.find(".num").eq(1).text(numArray[1]);
    $html.find(".num").eq(2).text(numArray[2]);
    $html.find(".num").eq(3).text(numArray[3]);

    let index = 0;

    for(let i = 0; i<result.right; i++) {
      $html.find(".status").eq(index).addClass("right");
      index++;
    }

    for(let i = 0; i<result.position; i++) {
      $html.find(".status").eq(index).addClass("position");
      index++;
    }

    for(let i = 0; i<result.wrong; i++) {
      $html.find(".status").eq(index).addClass("wrong");
      index++;
    }

    $("#log").prepend($html);
  }

  checkCode(num : number) {
    let result = {
      "right": 0,
      "position": 0,
      "wrong": 0
    };

    let codeArray = (""+this.code).split("");
    let numArray = (""+num).split("");

    if(codeArray.length == numArray.length) {
      for (let i = 0; i<numArray.length; i++) {
        if(codeArray[i] == numArray[i]) {
          result.right++;
        } else if(codeArray.indexOf(numArray[i]) != -1) {
          result.position++;
        } else {
          result.wrong++;
        }
      }

      return result;
    } else {
      return null;
    }
  }
}

new Game();