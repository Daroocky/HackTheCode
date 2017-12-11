class CodeGenerator {
    private code: number;

    public generateCode() {
        this.code = parseInt(this.shuffle("123456789".split('')).join('').substring(0, 4));
    }

    public checkCode(num: number) : resultJson {
        let result : resultJson = {
            "right": 0,
            "position": 0,
            "wrong": 0
        };

        let codeArray = ("" + this.code).split("");
        let numArray = ("" + num).split("");

        if (codeArray.length == numArray.length) {
            for (let i = 0; i < numArray.length; i++) {
                if (codeArray[i] == numArray[i]) {
                    result.right++;
                } else if (codeArray.indexOf(numArray[i]) != -1) {
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

    private shuffle(array: Array<any>) {
        for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) ;
        return array;
    }
}