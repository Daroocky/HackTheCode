declare const $: any;

interface resultJson {
    "right": number,
    "position": number,
    "wrong": number
}

class Game {
    private code: number;

    private resultLog: ResultLog;
    private codeGenerator: CodeGenerator;

    constructor() {
        this.resultLog =  new ResultLog();
        this.codeGenerator =  new CodeGenerator();

        this.registerEvents();
        this.createCode();
    }

    createCode() {
        this.codeGenerator.generateCode();
    }

    registerEvents() {
        $(document).ready(() => {
            $("#lock").on("click", () => {
                this.eventCheckCode()
            });
            $("input").on("keyup", (e: any) => {
                this.eventNavigate(e)
                this.eventNextInput(e)
            });
        });
    }

    eventNavigate(event: any) {
         if (event.keyCode == 37) {
            $(event.target).prev("input").focus().select();
        }

        if (event.keyCode == 39) {
            $(event.target).next("input").focus().select();
        }
    }

    eventNextInput(event: any) {
        if(event.keyCode != 37 && event.keyCode != 39) {
            if (isNaN($(event.target).val())) {
                $(event.target).val("");
            }

            var inputValues = ["0"];
            if($(event.target).attr("id") != "num1") inputValues.push($("#num1").val());
            if($(event.target).attr("id") != "num2") inputValues.push($("#num2").val());
            if($(event.target).attr("id") != "num3") inputValues.push($("#num3").val());
            if($(event.target).attr("id") != "num4") inputValues.push($("#num4").val());

            if(inputValues.indexOf($(event.target).val()) != -1) {
                $(event.target).val("");
            }

            if ($(event.target).val() !== "") {
                $(event.target).next().focus();
            }
        }
    }

    eventCheckCode() {
        let num = "";
        num = num + $("#num1").val();
        num = num + $("#num2").val();
        num = num + $("#num3").val();
        num = num + $("#num4").val();

        let numRes = parseInt(num);

        let result = this.codeGenerator.checkCode(numRes);
        this.checkWin(result);

        this.resultLog.add(numRes, result);

        $("#num1").val("").focus();
        $("#num2").val("");
        $("#num3").val("");
        $("#num4").val("");
    }

    checkWin(result : resultJson) {
        if(result.right >= 4) {
            $(".icon").removeClass("icon-lock-closed").addClass("icon-lock-open");

            return true;
        } else {
            return false;
        }
    }
}

new Game();