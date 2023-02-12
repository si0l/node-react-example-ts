import React from 'react';

type MyProps = {
    message: string,
}

const Loading = (props: MyProps) => <h2>{props.message}</h2>

export default Loading;