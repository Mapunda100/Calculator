import React from 'react';
import Wrapper from './Wrapper';
import Screen from './Screen';
import ButtonBox from './ButtonBox';
import Button from './Button';
import { useState } from 'react';

const buttonValue = [
    ["C", "+-", "%", "/"],
    ["7", "8", "9", "X",],
    ["4","5", "6",  "-",],
    ["1", "2", "3", "+",],
    ["0", ".", "=",]
]

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const Calculator = () => {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    })

    //function for clicked number
    function numClickHandler(e) {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 15) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    }

    function signClickHandler(e) {
        e.preventDefault()
        let value = e.target.innerHTML;

       
            setCalc({
                ...calc,
                sign: value,
                res: !calc.res && calc.num ? calc.num : calc.res, 
                num: 0,
            })
    }

    function resetClickHandler(e) {
        e.preventDefault()

      
            setCalc({
                ...calc,
                num: 0,
                sign: "", 
                res: 0,
            })
    }

    function invertClickHandler() {
        setCalc({
          ...calc,
            num: calc.num * -1, 
            res: calc.res * -1,
            sign: " ",
        })
    }

    function commaClickHandler(e) {
        e.preventDefault();
        let value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        })
    }

    function percentageClickHandler() {
        let num = calc.num ? parseFloat(calc.num) : 0;
        let res = calc.res ? parseFloat(calc.res) : 0;
        setCalc({
            ...calc,
            res: (res /= Math.pow(100, 1)),
            num: (num /= Math.pow(100, 1)),
                 
        })
    }

    function equalsClickHandler(e) {
        e.preventDefault();

        if (calc.num && calc.sign) {
            const math = (a, b, sign) =>
                sign === "+"
                ? a + b 
                : sign === "-"
                ? a - b
                : sign === "/"
                ? a / b 
                : a * b
                
            setCalc({
                ...calc,
                res: 
                    calc.num === "0" && calc.sign === "/" 
                    ? "Math error" 
                        : toLocaleString(
                            math(
                            Number(removeSpaces(calc.res)),
                            Number(removeSpaces(calc.num)),
                            calc.sign
                        )
                    ),
                    
                sign: "",
                num: 0,
            })
        }
    }

    
    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res}></Screen>
            <ButtonBox>
                {
                    buttonValue.flat().map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                value={btn}
                                className={btn === '=' ? 'equals' : ""}
                                onClick={
                                    btn === "C"
                                     ? resetClickHandler
                                     : btn === "+-"
                                     ? invertClickHandler
                                     : btn === "."
                                     ? commaClickHandler
                                     : btn === "="
                                     ? equalsClickHandler
                                     : btn === "%"
                                     ? percentageClickHandler
                                    : btn === "/" || btn ==="X" || btn === "-" || btn === "+"
                                    ? signClickHandler
                                    : numClickHandler
                                     
                                }
                            >

                            </Button>
                        );
                    })
             }
            </ButtonBox>
        </Wrapper>
    );
};

export default Calculator;