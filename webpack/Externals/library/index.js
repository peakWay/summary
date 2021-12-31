
import React from 'react';
// import _ from 'loadash';

export function createReactButton() {
    console.log(React.version, 'React版本')
    return React.createElement('button', {disabled: true}, '确认')
}
