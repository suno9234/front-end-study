const React = require('react');
const {useState, useRef } = React;
const Try = require('./Try');

function getNumbers() { // 숫자 4개를 안겹치게 뽑는 함수
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = [];
    for (let i = 0; i < 4; i++) {
        result = [...result, (num.splice(Math.floor(Math.random() * num.length), 1))[0]];
    }
    return result;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers);
    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        console.log(answer.join(''));
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런');
            setTries([...tries, { try: value, result: '홈런!' }]);
            inputRef.current.focus();
            return;
        } else {
            let strike = 0;
            let ball = 0;
            const answerArray = value.split('').map((v) => parseInt(v));
            if (tries.length >= 9) {

                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);

                alert('게임을 다시 시작합니다!');

                setValue('')
                setAnswer(getNumbers());
                setTries([]);

            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
            }

            setTries([...tries, { try: value, result: `${strike}스트라이크 ${ball}볼` }]);
            setValue('');
            
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} type="text" />
                <button>입력!</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v) => {
                    return <Try key={v.try + v.result} tries={v}></Try>
                })}
            </ul>
        </>
    );

}

module.exports = NumberBaseball;