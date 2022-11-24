const React = require('react');
const ReactDOM = require('react-dom');
const { useState, useRef } = React;

const WordRelay = () => {
    const [lastWord, setLast] = useState('신순호');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const input = useRef(null);

    const onSumbitForm = (e) => {
        e.preventDefault();
        if (lastWord[lastWord.length - 1] === value[0]) {
            setLast(value);
            setValue('');
            setResult('정답');
            return;
        }
        setResult('땡');
        setValue('');
        input.current.focus();
    }
    const onChangeInput = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <div>{lastWord}</div>
            <form onSubmit={onSumbitForm}>
                <input ref={input} type="text" value={value} onChange={onChangeInput}></input>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    )
}

module.exports = WordRelay;