const React = require('react');
const ReactDOM = require('react-dom');
const {useState,useRef} = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSumbitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답 : ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }
    return (
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSumbitForm}>
                <input ref={inputRef} type="number" value={value} onChange={onChangeInput}></input>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    )
}

module.exports = GuGuDan;