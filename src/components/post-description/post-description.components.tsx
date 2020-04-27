import React from 'react';
import InputField from '../input-field/input-field.component';
import './post-description.styles.scss';

interface IProps {
    title: {
        value: string,
        error: string
    };
    description: {
        value: string,
        error: string
    };
    handleChange: (e: any, name: string) => void;
}

export default function PostDescription({ title, description, handleChange }: IProps) {
    return (
        <div className='post-description'>
            <InputField
                type='text'
                name='title'
                label='Title'
                onChange={(e) => handleChange(e, 'title')}
                value={title.value}
                errorMessage={title.error}
            />
            <InputField
                type='text'
                name='description'
                label='Description'
                onChange={(e) => handleChange(e, 'description')}
                value={description.value}
                errorMessage={description.error}
            />
        </div>
    );
}