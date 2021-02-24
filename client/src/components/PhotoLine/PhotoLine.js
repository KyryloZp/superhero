import React from "react";

const PhotoLine = (props) => {
    const {el, hero, setHero} = props;

    const onSubmit = (e) => {
        e.preventDefault()
        let index = hero.previewImage.indexOf(el);
        let newPreview = hero.previewImage.filter(element => hero.previewImage.indexOf(element) !== index)
        let newCurrentFile = hero.currentFile.filter(element => hero.currentFile.indexOf(element) !== index)

        setHero({
            ...hero,
            currentFile: newCurrentFile,
            previewImage: newPreview
        })

    }

    return (
        <div className='create__images'>
            <img className="create__preview" src={el} alt=""/>
            <button className="create__images__delete" onClick={onSubmit}>X</button>
        </div>
    )
}

export default PhotoLine