import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useCallback ,useRef } from 'react';
import { addPost } from '../reducers/post';

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const imageInput = useRef();
    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    }, []);
    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText('');
    }, []);

    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
    return (
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?">

            </Input.TextArea>
            <div>
                <input type="file" multiple hidden ref={imageInput}></input>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v}></img>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm;