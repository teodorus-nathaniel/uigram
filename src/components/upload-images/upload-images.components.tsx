import React, { useState } from 'react';
import './upload-images.styles.scss';
import PlusIcon from '../icons/plus/plus.component';
import CrossIcon from '../icons/cross/cross.compnent';
import { Image } from '../../@types/image.interface';

interface IProps {
    images: Image[];
    setImages: (e: Image[]) => void;
}

export default function UploadImages({ images, setImages }: IProps) {

    const handleChange = (e: any) => {
        if (images.length) if (images[0].raw === 'test') images.pop();
        setImages(images.concat(
            {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            }
        ))
    }

    const handleDelete = (index: number) => {
        if (images.length > 0) {
            const copy = Object.assign([], images);
            copy.splice(index, 1);
            setImages(
                copy
            );
        }
    }

    return (
        <div className='upload-images'>
            <div className='upload-images__container'>
                {images.length > 0 && images[0].raw !== 'test' ?
                    images.map((image, index) => (
                        <div className='upload-images__container__images' key={index}>
                            <CrossIcon color='white' size={2} onClick={() => handleDelete(index)} className='cross-icon' />
                            <img
                                className="images"
                                src={image.preview}
                                alt="Images"
                                style={{
                                    height: '300px',
                                    width: '100%'
                                }}
                            />
                        </div>
                    )) : ''}
                <div className='upload-images__container__input'>
                    <label htmlFor="input-image" className='upload-images__container__input__label'>
                        <PlusIcon color='black' size={10} />
                    </label>
                    <input id="input-image" type="file" onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}