// #order <= id로 찾을때 .class <= 클래스 
//

const number = parseInt(prompt('몇 명이 참가하나요?'), 10);
if (number) {
    const $input = document.querySelector('input');
    const $button = document.querySelector('button');
    const $word = document.querySelector('#word');
    const $order = document.querySelector('#order');

    let word;
    let newWord;



    $button.addEventListener('click', () => {
        if (newWord.length === 3) {
            if (!word || word[word.length - 1] === newWord[0]) {
                word = newWord;
                $word.textContent = word;
                $input.value = '';
                $input.focus();
                const order = Number($order.textContent);
                if (order + 1 > number) {
                    $order.textContent = 1;
                } else {
                    $order.textContent = order + 1;
                }
            } else {
                $input.value = '';
                $input.focus();
                alert('틀렸습니다');
            }
        } else {
            alert('다시 입력하세요');
            $input.value = '';
            $input.focus();
        }


    });

    $input.addEventListener('input', (event) => {
        newWord = event.target.value;
        console.log('글자 입력', event.target.value);
    });
}



