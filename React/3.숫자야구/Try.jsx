const React = require('react');
const {memo} = React;


const Try = memo(({ tries }) => {

    return (
        <>
            <li>
                <div>{tries.try}</div>
                <div>{tries.result}</div>
            </li>
        </>
    )

});

Try.displayName = 'Try';
module.exports = Try;